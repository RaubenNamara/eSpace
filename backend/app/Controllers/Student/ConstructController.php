<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Constructs (read-only)
 *
 * Lets a student browse and view the Constructs an admin has defined, scoped to whichever
 * department(s) they're actively enrolled in - mirrors Teacher\ConstructController's shape, just
 * scoped via student_department_enrollments instead of a single active department. No create/
 * edit/delete; that's admin-only.
 */
class ConstructController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getStudentId(): ?int
    {
        $userId = $_SESSION['user_id'] ?? null;
        if (!$userId) {
            return null;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM students WHERE id = :user_id AND deleted_at IS NULL");
        $stmt->execute(['user_id' => $userId]);
        $student = $stmt->fetch();

        return $student ? (int) $student['id'] : null;
    }

    private function enrolledDepartmentsClause(): string
    {
        return "EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            WHERE sde.student_id = :student_id AND sde.department_id = c.department_id
              AND sde.status = 'active' AND sde.deleted_at IS NULL
        )";
    }

    /**
     * List constructs in any department the student is actively enrolled in, optionally filtered
     * by level/subject/search.
     * GET /student/constructs?level=&subject_id=&search=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $db = $this->getDb();
        $where = ['c.deleted_at IS NULL', $this->enrolledDepartmentsClause()];
        $params = ['student_id' => $studentId];

        $level = $this->query('level', '');
        if ($level !== '' && $level !== null) {
            $where[] = 'c.level = :level';
            $params['level'] = $level;
        }

        $subjectId = $this->query('subject_id', '');
        if ($subjectId !== '' && $subjectId !== null) {
            $where[] = 'c.subject_id = :subject_id';
            $params['subject_id'] = (int) $subjectId;
        }

        $search = $this->query('search', '');
        if ($search !== '' && $search !== null) {
            $where[] = '(c.name LIKE :search OR c.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        $whereClause = implode(' AND ', $where);

        // topic_count is the number of DISTINCT topics, not the raw construct_topics row count -
        // a topic is linked once per class-stream, so counting raw rows would overstate it (e.g.
        // "19" for a construct spanning 3 real topics across ~6-7 streams each).
        $stmt = $db->prepare(
            "SELECT c.id, c.name, c.subject_id, c.level, c.assessment_objective, c.description,
                    s.name AS subject_name, COUNT(DISTINCT ct.topic, ct.theme_branch, ct.competence) AS topic_count
             FROM constructs c
             LEFT JOIN subjects s ON c.subject_id = s.id
             LEFT JOIN construct_topics ctp ON ctp.construct_id = c.id
             LEFT JOIN enote_curriculum_topics ct ON ct.id = ctp.curriculum_topic_id
             WHERE {$whereClause}
             GROUP BY c.id, c.name, c.subject_id, c.level, c.assessment_objective, c.description, s.name
             ORDER BY c.assessment_objective ASC, c.name ASC"
        );
        $stmt->execute($params);

        $this->success(['constructs' => $stmt->fetchAll()]);
    }

    /**
     * GET /student/constructs/{id}
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $whereClause = $this->enrolledDepartmentsClause();
        $stmt = $db->prepare(
            "SELECT c.id, c.name, c.subject_id, c.level, c.assessment_objective, c.description,
                    s.name AS subject_name
             FROM constructs c
             LEFT JOIN subjects s ON c.subject_id = s.id
             WHERE c.id = :id AND c.deleted_at IS NULL AND {$whereClause}"
        );
        $stmt->execute(['id' => $id, 'student_id' => $studentId]);
        $construct = $stmt->fetch();

        if (!$construct) {
            $this->notFound('Construct not found');
            return;
        }

        // Grouped by (topic, theme, competence, class level, year, term) - a topic linked once per
        // stream (S.1-A, S.1-B...) shows once per class level instead, matching the admin picker.
        $topicsStmt = $db->prepare(
            "SELECT MIN(ct.id) AS id, ct.topic, ct.theme_branch, ct.competence,
                    c.name AS class_stream_name,
                    ay.name AS academic_year_name, t.name AS term_name
             FROM construct_topics cpt
             INNER JOIN enote_curriculum_topics ct ON ct.id = cpt.curriculum_topic_id
             LEFT JOIN classes c ON ct.class_id = c.id
             LEFT JOIN academic_years ay ON ct.academic_year_id = ay.id
             LEFT JOIN terms t ON ct.term_id = t.id
             WHERE cpt.construct_id = :id
             GROUP BY ct.topic, ct.theme_branch, ct.competence, c.name, ct.academic_year_id, ct.term_id
             ORDER BY ct.topic ASC"
        );
        $topicsStmt->execute(['id' => $id]);
        $topics = $topicsStmt->fetchAll();

        $ids = array_map(fn($t) => (int) $t['id'], $topics);
        if (!empty($ids)) {
            $placeholders = implode(',', array_fill(0, count($ids), '?'));
            $outcomesStmt = $db->prepare(
                "SELECT curriculum_topic_id, learning_outcome FROM enote_learning_outcomes
                 WHERE curriculum_topic_id IN ({$placeholders}) ORDER BY curriculum_topic_id ASC, order_number ASC"
            );
            $outcomesStmt->execute($ids);
            $outcomesByTopic = [];
            foreach ($outcomesStmt->fetchAll() as $row) {
                $outcomesByTopic[(int) $row['curriculum_topic_id']][] = $row['learning_outcome'];
            }
            foreach ($topics as &$topic) {
                $topic['learning_outcomes'] = $outcomesByTopic[(int) $topic['id']] ?? [];
            }
            unset($topic);
        }

        $construct['topics'] = $topics;

        $this->success($construct);
    }
}
