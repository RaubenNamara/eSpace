<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Read-only curriculum browsing for the teacher's "Create New Topic" flow: cascading
 * Subject -> Academic Year -> Class-Stream -> Term -> Theme/Branch -> Topic, backed by
 * admin-authored enote_curriculum_topics/enote_learning_outcomes rows. A teacher only ever sees
 * curriculum for their own active department. Deliberately NOT gated on live student enrollment
 * (curriculum data and enrollment data are authored/entered independently and can legitimately
 * be out of sync - e.g. curriculum prepared ahead of enrollment being finalized) - a teacher
 * should be able to see and attach content to every academic year/class/term admin has actually
 * set up curriculum for in their department, full stop.
 */
class ENoteCurriculumController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getTeacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return $_SESSION['teacher_id'] ?? null;
        }
        return $_SESSION['user_id'] ?? null;
    }

    private function getTeacherDepartmentId(): ?int
    {
        return $this->getActiveDepartmentId();
    }

    /**
     * Every curriculum-topic query is gated behind this: the topic's subject must belong to the
     * teacher's own department (never gated on live student enrollment - see class docblock).
     * Only the equality filters named in $applyKeys are added, so callers can compute "what are
     * the valid options for dimension X" by asking for every filter *except* X.
     *
     * @param array<string, int|string> $filters
     * @param string[] $applyKeys
     * @return array{0: string, 1: array<string, mixed>}
     */
    private function curriculumFilterClause(array $filters, array $applyKeys, int $departmentId): array
    {
        $where = [
            'ct.deleted_at IS NULL',
            "EXISTS (
                SELECT 1 FROM subjects sub
                WHERE sub.id = ct.subject_id AND sub.department_id = :dept_scope AND sub.deleted_at IS NULL
            )"
        ];
        $params = ['dept_scope' => $departmentId];

        foreach ($applyKeys as $key) {
            $value = $filters[$key] ?? '';
            if ($value !== '' && $value !== 0) {
                $where[] = "ct.$key = :$key";
                $params[$key] = $value;
            }
        }

        return [implode(' AND ', $where), $params];
    }

    /**
     * Returns the valid option list for every step of the cascade, each filtered by whichever
     * *earlier* steps the caller has already chosen (so re-selecting an earlier step and
     * re-fetching always yields consistent, non-empty-if-possible downstream options).
     * GET /teacher/enotes/curriculum/meta
     */
    public function meta(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department', 403);
            return;
        }

        $db = $this->getDb();

        $filters = [
            'subject_id' => (int) $this->query('subject_id', 0),
            'academic_year_id' => (int) $this->query('academic_year_id', 0),
            'class_id' => (int) $this->query('class_id', 0),
            'term_id' => (int) $this->query('term_id', 0),
            'theme_branch' => (string) $this->query('theme_branch', '')
        ];

        // Subjects are just the teacher's department's subjects - not filtered by curriculum
        // data, so a subject with no curriculum yet still shows up (its downstream steps will
        // just come back empty, which is the correct/expected state).
        $subjectsStmt = $db->prepare("SELECT id, name FROM subjects WHERE department_id = :dept AND deleted_at IS NULL ORDER BY name ASC");
        $subjectsStmt->execute(['dept' => $departmentId]);
        $subjects = $subjectsStmt->fetchAll();

        [$whereYears, $paramsYears] = $this->curriculumFilterClause($filters, ['subject_id'], $departmentId);
        $yearsStmt = $db->prepare(
            "SELECT DISTINCT ay.id, ay.name
             FROM enote_curriculum_topics ct
             INNER JOIN academic_years ay ON ct.academic_year_id = ay.id
             WHERE {$whereYears}
             ORDER BY ay.name DESC"
        );
        $yearsStmt->execute($paramsYears);
        $academicYears = $yearsStmt->fetchAll();

        [$whereClasses, $paramsClasses] = $this->curriculumFilterClause($filters, ['subject_id', 'academic_year_id'], $departmentId);
        $classesStmt = $db->prepare(
            "SELECT DISTINCT c.id, CONCAT(c.name, '-', c.stream_name) AS display_name
             FROM enote_curriculum_topics ct
             INNER JOIN classes c ON ct.class_id = c.id
             WHERE {$whereClasses}
             ORDER BY display_name ASC"
        );
        $classesStmt->execute($paramsClasses);
        $classStreams = $classesStmt->fetchAll();

        [$whereTerms, $paramsTerms] = $this->curriculumFilterClause($filters, ['subject_id', 'academic_year_id', 'class_id'], $departmentId);
        $termsStmt = $db->prepare(
            "SELECT DISTINCT t.id, t.name
             FROM enote_curriculum_topics ct
             INNER JOIN terms t ON ct.term_id = t.id
             WHERE {$whereTerms}
             ORDER BY t.name ASC"
        );
        $termsStmt->execute($paramsTerms);
        $terms = $termsStmt->fetchAll();

        [$whereThemes, $paramsThemes] = $this->curriculumFilterClause($filters, ['subject_id', 'academic_year_id', 'class_id', 'term_id'], $departmentId);
        $themesStmt = $db->prepare(
            "SELECT DISTINCT ct.theme_branch
             FROM enote_curriculum_topics ct
             WHERE {$whereThemes}
             ORDER BY ct.theme_branch ASC"
        );
        $themesStmt->execute($paramsThemes);
        $themes = array_column($themesStmt->fetchAll(), 'theme_branch');

        [$whereTopics, $paramsTopics] = $this->curriculumFilterClause($filters, ['subject_id', 'academic_year_id', 'class_id', 'term_id', 'theme_branch'], $departmentId);
        $topicsStmt = $db->prepare(
            "SELECT DISTINCT ct.id, ct.topic
             FROM enote_curriculum_topics ct
             WHERE {$whereTopics}
             ORDER BY ct.topic ASC"
        );
        $topicsStmt->execute($paramsTopics);
        $topics = $topicsStmt->fetchAll();

        $this->success([
            'subjects' => $subjects,
            'academic_years' => $academicYears,
            'class_streams' => $classStreams,
            'terms' => $terms,
            'themes' => $themes,
            'topics' => $topics
        ]);
    }

    /**
     * Full detail for one curriculum topic - theme/branch, topic, competence, ordered learning
     * outcomes, plus subject_id and class_id so the frontend can submit the real eNote topic
     * (POST /teacher/enotes/topics) with matching values. Re-checks the department scope
     * directly (not just trusting that the cascading dropdowns were followed correctly) - not
     * gated on live student enrollment, see class docblock.
     * GET /teacher/enotes/curriculum/topics/{id}
     */
    public function showTopic($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $teacherId = $this->getTeacherId();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher must be assigned to a department', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT ct.id, ct.subject_id, ct.academic_year_id, ct.class_id, ct.term_id,
                    ct.theme_branch, ct.topic, ct.competence,
                    s.name AS subject_name, CONCAT(c.name, '-', c.stream_name) AS class_stream_name
             FROM enote_curriculum_topics ct
             INNER JOIN classes c ON ct.class_id = c.id
             LEFT JOIN subjects s ON ct.subject_id = s.id
             WHERE ct.id = :id AND ct.deleted_at IS NULL
               AND EXISTS (
                 SELECT 1 FROM subjects sub
                 WHERE sub.id = ct.subject_id AND sub.department_id = :dept AND sub.deleted_at IS NULL
               )"
        );
        $stmt->execute(['id' => $id, 'dept' => $departmentId]);
        $topic = $stmt->fetch();

        if (!$topic) {
            $this->notFound('Curriculum topic not found');
            return;
        }

        $outcomesStmt = $db->prepare(
            "SELECT id, learning_outcome FROM enote_learning_outcomes WHERE curriculum_topic_id = :id ORDER BY order_number ASC"
        );
        $outcomesStmt->execute(['id' => $id]);
        $outcomeRows = $outcomesStmt->fetchAll();
        $topic['learning_outcomes'] = array_column($outcomeRows, 'learning_outcome');
        // Additive - the Assignment module's LOA flow needs each outcome's own id (to check
        // one/more as "being assessed" and link questions to it), not just its display text.
        $topic['learning_outcome_ids'] = array_map('intval', array_column($outcomeRows, 'id'));

        $this->success($topic);
    }
}
