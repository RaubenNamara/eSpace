<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * Admin Constructs
 *
 * The definition layer for EOC (Elements of Construct): a named competency tied to a Department,
 * Subject, Level (O Level / A Level) and Assessment Objective (AO1-AO8), grouping one or more
 * existing enote_curriculum_topics rows via construct_topics. Deliberately independent of
 * academic year/term - unlike the curriculum topics it links to, which each still carry their own
 * academic_year_id/term_id (shown for disambiguation in the topic picker, not filtered on).
 * Mirrors Admin\ENoteCurriculumController's conventions throughout (requireAdmin() guard,
 * prepared statements, soft delete).
 */
class ConstructController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function requireAdmin(): bool
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return false;
        }
        if (!$this->hasAnyRole(['admin', 'super_admin'])) {
            $this->forbidden();
            return false;
        }
        return true;
    }

    /**
     * Departments, subjects (with department_id, for the Department -> Subject cascade), and the
     * two static option lists the create form needs.
     * GET /admin/constructs/meta
     */
    public function meta(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $db = $this->getDb();

        $departments = $db->query("SELECT id, name FROM departments WHERE deleted_at IS NULL ORDER BY name ASC")->fetchAll();
        $subjects = $db->query("SELECT id, name, department_id FROM subjects WHERE deleted_at IS NULL ORDER BY name ASC")->fetchAll();

        $this->success([
            'departments' => $departments,
            'subjects' => $subjects,
            'levels' => ['O Level', 'A Level'],
            'assessment_objectives' => ['AO1', 'AO2', 'AO3', 'AO4', 'AO5', 'AO6', 'AO7', 'AO8'],
        ]);
    }

    /**
     * Curriculum topics available to attach to a construct: the chosen subject, within a class
     * whose level matches the chosen O Level / A Level. Not filtered by academic year/term - every
     * matching topic across every year is listed. A topic is authored once per class-stream (a
     * "classes" row is one stream, e.g. S.1-A), so the same topic text/outcomes are otherwise
     * repeated once per stream of the same class (S.1-A, S.1-B, S.1-C...) - grouped here by
     * (topic, theme_branch, competence, class level e.g. "S.1", year, term) so it's offered once
     * per class level instead, with `topic_ids` carrying every underlying stream row that group
     * represents (the frontend expands a selected group back to this full list before saving, so
     * every stream still gets linked - see insertConstructTopics()).
     * Still not filtered by year/term - every matching group across every year is listed, each
     * carrying its own year/term for disambiguation, plus its learning_outcomes (for the picker's
     * per-topic reveal toggle, read from one representative row - outcomes are expected to be
     * identical across streams of the same topic).
     * GET /admin/constructs/topics?subject_id=&level=
     */
    public function topicsFor(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $subjectId = (int) $this->query('subject_id', 0);
        $level = (string) $this->query('level', '');

        if (!$subjectId || !in_array($level, ['O Level', 'A Level'], true)) {
            $this->validationError(['subject_id' => 'subject_id and a valid level are required']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT MIN(ct.id) AS id, GROUP_CONCAT(ct.id ORDER BY ct.id) AS topic_ids,
                    ct.topic, ct.theme_branch, ct.competence,
                    c.name AS class_stream_name,
                    ay.name AS academic_year_name, t.name AS term_name
             FROM enote_curriculum_topics ct
             INNER JOIN classes c ON ct.class_id = c.id AND c.level = :level
             LEFT JOIN academic_years ay ON ct.academic_year_id = ay.id
             LEFT JOIN terms t ON ct.term_id = t.id
             WHERE ct.subject_id = :subject_id AND ct.deleted_at IS NULL
             GROUP BY ct.topic, ct.theme_branch, ct.competence, c.name, ct.academic_year_id, ct.term_id
             ORDER BY ay.name DESC, ct.topic ASC"
        );
        $stmt->execute(['subject_id' => $subjectId, 'level' => $level]);
        $topics = $stmt->fetchAll();

        foreach ($topics as &$topic) {
            $topic['topic_ids'] = array_map('intval', explode(',', $topic['topic_ids']));
        }
        unset($topic);

        $this->attachLearningOutcomes($topics);

        $this->success(['topics' => $topics]);
    }

    /**
     * List constructs, optionally filtered by department/subject/level, plus a free-text search
     * across name/description. Each row carries a topic_count instead of the full topic list.
     * GET /admin/constructs
     */
    public function index(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $db = $this->getDb();
        $where = ['c.deleted_at IS NULL'];
        $params = [];

        foreach (['department_id', 'subject_id'] as $field) {
            $value = $this->query($field, '');
            if ($value !== '' && $value !== null) {
                $where[] = "c.$field = :$field";
                $params[$field] = (int) $value;
            }
        }

        $level = $this->query('level', '');
        if ($level !== '' && $level !== null) {
            $where[] = 'c.level = :level';
            $params['level'] = $level;
        }

        $search = $this->query('search', '');
        if ($search !== '' && $search !== null) {
            $where[] = '(c.name LIKE :search OR c.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        $whereClause = implode(' AND ', $where);

        // topic_count is the number of DISTINCT topics (topic/theme_branch/competence), not the raw
        // construct_topics row count - a topic is linked once per class-stream (see topicsFor()'s
        // docblock), so counting raw rows would show e.g. "19" for a construct spanning 3 real
        // topics across ~6-7 streams each.
        $stmt = $db->prepare(
            "SELECT c.id, c.name, c.department_id, c.subject_id, c.level, c.assessment_objective,
                    c.description, c.created_at, c.updated_at,
                    s.name AS subject_name, d.name AS department_name,
                    COUNT(DISTINCT ct.topic, ct.theme_branch, ct.competence) AS topic_count
             FROM constructs c
             LEFT JOIN subjects s ON c.subject_id = s.id
             LEFT JOIN departments d ON c.department_id = d.id
             LEFT JOIN construct_topics ctp ON ctp.construct_id = c.id
             LEFT JOIN enote_curriculum_topics ct ON ct.id = ctp.curriculum_topic_id
             WHERE {$whereClause}
             GROUP BY c.id, c.name, c.department_id, c.subject_id, c.level, c.assessment_objective,
                      c.description, c.created_at, c.updated_at, s.name, d.name
             ORDER BY c.assessment_objective ASC, c.updated_at DESC"
        );
        $stmt->execute($params);
        $constructs = $stmt->fetchAll();

        $this->success(['constructs' => $constructs]);
    }

    /**
     * GET /admin/constructs/{id}
     */
    public function show($id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $construct = $this->fetchConstructWithTopics((int) $id);
        if (!$construct) {
            $this->notFound('Construct not found');
            return;
        }

        $this->success($construct);
    }

    /**
     * POST /admin/constructs
     */
    public function store(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $data = $this->input();
        $errors = $this->validateRequired(['name', 'department_id', 'subject_id', 'level', 'assessment_objective']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        if (!in_array($data['level'], ['O Level', 'A Level'], true)) {
            $this->validationError(['level' => 'Level must be O Level or A Level']);
            return;
        }
        if (!in_array($data['assessment_objective'], ['AO1', 'AO2', 'AO3', 'AO4', 'AO5', 'AO6', 'AO7', 'AO8'], true)) {
            $this->validationError(['assessment_objective' => 'Invalid assessment objective']);
            return;
        }

        $topicIds = $this->cleanTopicIds($data['topic_ids'] ?? null);
        if (empty($topicIds)) {
            $this->validationError(['topic_ids' => 'Select at least one topic']);
            return;
        }

        $db = $this->getDb();

        try {
            $db->beginTransaction();

            $stmt = $db->prepare(
                "INSERT INTO constructs (name, department_id, subject_id, level, assessment_objective, description, created_by, created_at, updated_at)
                 VALUES (:name, :department_id, :subject_id, :level, :assessment_objective, :description, :created_by, NOW(), NOW())"
            );
            $stmt->execute([
                'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
                'department_id' => (int) $data['department_id'],
                'subject_id' => (int) $data['subject_id'],
                'level' => $data['level'],
                'assessment_objective' => $data['assessment_objective'],
                'description' => isset($data['description']) ? htmlspecialchars(trim((string) $data['description']), ENT_QUOTES, 'UTF-8') : null,
                'created_by' => $this->getCurrentUserId(),
            ]);
            $constructId = (int) $db->lastInsertId();

            $this->insertConstructTopics($constructId, $topicIds);

            $db->commit();

            $this->success($this->fetchConstructWithTopics($constructId), 'Construct created successfully');
        } catch (\PDOException $e) {
            $db->rollBack();
            error_log('Failed to create construct: ' . $e->getMessage());
            $this->error('Failed to create construct', 500);
        }
    }

    /**
     * PUT /admin/constructs/{id}
     */
    public function update($id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $id = (int) $id;
        $data = $this->input();
        $errors = $this->validateRequired(['name', 'department_id', 'subject_id', 'level', 'assessment_objective']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        if (!in_array($data['level'], ['O Level', 'A Level'], true)) {
            $this->validationError(['level' => 'Level must be O Level or A Level']);
            return;
        }
        if (!in_array($data['assessment_objective'], ['AO1', 'AO2', 'AO3', 'AO4', 'AO5', 'AO6', 'AO7', 'AO8'], true)) {
            $this->validationError(['assessment_objective' => 'Invalid assessment objective']);
            return;
        }

        $topicIds = $this->cleanTopicIds($data['topic_ids'] ?? null);
        if (empty($topicIds)) {
            $this->validationError(['topic_ids' => 'Select at least one topic']);
            return;
        }

        $db = $this->getDb();

        try {
            $db->beginTransaction();

            $exists = $db->prepare("SELECT id FROM constructs WHERE id = :id AND deleted_at IS NULL");
            $exists->execute(['id' => $id]);
            if (!$exists->fetch()) {
                $db->rollBack();
                $this->notFound('Construct not found');
                return;
            }

            $stmt = $db->prepare(
                "UPDATE constructs SET name = :name, department_id = :department_id, subject_id = :subject_id,
                    level = :level, assessment_objective = :assessment_objective, description = :description, updated_at = NOW()
                 WHERE id = :id"
            );
            $stmt->execute([
                'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
                'department_id' => (int) $data['department_id'],
                'subject_id' => (int) $data['subject_id'],
                'level' => $data['level'],
                'assessment_objective' => $data['assessment_objective'],
                'description' => isset($data['description']) ? htmlspecialchars(trim((string) $data['description']), ENT_QUOTES, 'UTF-8') : null,
                'id' => $id,
            ]);

            $db->prepare("DELETE FROM construct_topics WHERE construct_id = :id")->execute(['id' => $id]);
            $this->insertConstructTopics($id, $topicIds);

            $db->commit();

            $this->success($this->fetchConstructWithTopics($id), 'Construct updated successfully');
        } catch (\PDOException $e) {
            $db->rollBack();
            error_log('Failed to update construct: ' . $e->getMessage());
            $this->error('Failed to update construct', 500);
        }
    }

    /**
     * Soft delete only, matching ENoteCurriculumController::destroy() - construct_topics rows
     * cascade-delete at the DB level (ON DELETE CASCADE), but the construct row itself just gets
     * deleted_at set so it can still be traced/restored.
     * DELETE /admin/constructs/{id}
     */
    public function destroy($id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $db = $this->getDb();
        $id = (int) $id;

        $stmt = $db->prepare("SELECT id FROM constructs WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Construct not found');
            return;
        }

        try {
            $db->prepare("UPDATE constructs SET deleted_at = NOW() WHERE id = :id")->execute(['id' => $id]);
            $this->success([], 'Construct deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete construct: ' . $e->getMessage());
            $this->error('Failed to delete construct', 500);
        }
    }

    /**
     * @param mixed $rawTopicIds
     * @return int[]
     */
    private function cleanTopicIds($rawTopicIds): array
    {
        $ids = is_array($rawTopicIds) ? $rawTopicIds : [];
        return array_values(array_unique(array_filter(array_map('intval', $ids))));
    }

    /**
     * @param int[] $topicIds
     */
    private function insertConstructTopics(int $constructId, array $topicIds): void
    {
        $stmt = $this->getDb()->prepare(
            "INSERT INTO construct_topics (construct_id, curriculum_topic_id, created_at) VALUES (:construct_id, :topic_id, NOW())"
        );
        foreach ($topicIds as $topicId) {
            $stmt->execute(['construct_id' => $constructId, 'topic_id' => $topicId]);
        }
    }

    private function fetchConstructWithTopics(int $id): ?array
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT c.*, s.name AS subject_name, d.name AS department_name
             FROM constructs c
             LEFT JOIN subjects s ON c.subject_id = s.id
             LEFT JOIN departments d ON c.department_id = d.id
             WHERE c.id = :id AND c.deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id]);
        $construct = $stmt->fetch();
        if (!$construct) {
            return null;
        }

        // Grouped by (topic, theme, competence, class level, year, term) - same reasoning as
        // topicsFor(): a construct that has every stream of "S.1 - application software" linked
        // should still display/edit as one topic, not four.
        $topicsStmt = $db->prepare(
            "SELECT MIN(ct.id) AS id, GROUP_CONCAT(ct.id ORDER BY ct.id) AS topic_ids,
                    ct.topic, ct.theme_branch, ct.competence,
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
        foreach ($topics as &$topic) {
            $topic['topic_ids'] = array_map('intval', explode(',', $topic['topic_ids']));
        }
        unset($topic);
        $this->attachLearningOutcomes($topics);
        $construct['topics'] = $topics;

        return $construct;
    }

    /**
     * Batch-attaches each row's ordered learning_outcomes array in one extra query instead of
     * N+1 per-topic queries - same pattern as Admin\ENoteCurriculumController.
     */
    private function attachLearningOutcomes(array &$topics): void
    {
        if (empty($topics)) {
            return;
        }

        $ids = array_map(fn($t) => (int) $t['id'], $topics);
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $stmt = $this->getDb()->prepare(
            "SELECT curriculum_topic_id, learning_outcome
             FROM enote_learning_outcomes
             WHERE curriculum_topic_id IN ({$placeholders})
             ORDER BY curriculum_topic_id ASC, order_number ASC"
        );
        $stmt->execute($ids);

        $outcomesByTopic = [];
        foreach ($stmt->fetchAll() as $row) {
            $outcomesByTopic[(int) $row['curriculum_topic_id']][] = $row['learning_outcome'];
        }

        foreach ($topics as &$topic) {
            $topic['learning_outcomes'] = $outcomesByTopic[(int) $topic['id']] ?? [];
        }
        unset($topic);
    }
}
