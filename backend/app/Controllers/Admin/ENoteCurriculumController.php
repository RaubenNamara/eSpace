<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * Admin eNotes Curriculum Setup
 *
 * Lets an admin define, per subject + academic year + class-stream + term, the curriculum
 * reference data (theme/branch, topic, competence, ordered learning outcomes) that a teacher
 * later picks from when creating an eNote topic, instead of typing this metadata by hand. Reuses
 * the existing subjects/academic_years/classes/terms tables - a `classes` row already IS one
 * class-stream (name + stream_name, e.g. "S.1" + "A" -> "S.1-A"), so no new class/stream tables.
 */
class ENoteCurriculumController extends Controller
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
     * Filter-dropdown option lists for the curriculum form/table: departments, subjects
     * (each carrying its department_id so the frontend can cascade Department -> Subject),
     * academic years, class-streams (pre-combined as "S.1-A"), and terms (each carrying its
     * academic_year_id so the frontend can cascade Academic Year -> Term).
     * GET /admin/enotes-curriculum/meta
     */
    public function meta(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $db = $this->getDb();

        $departments = $db->query("SELECT id, name FROM departments WHERE deleted_at IS NULL ORDER BY name ASC")->fetchAll();
        $subjects = $db->query("SELECT id, name, department_id FROM subjects WHERE deleted_at IS NULL ORDER BY name ASC")->fetchAll();
        $academicYears = $db->query("SELECT id, name FROM academic_years WHERE deleted_at IS NULL ORDER BY name DESC")->fetchAll();
        $classStreams = $db->query(
            "SELECT id, name, level, stream_name, CONCAT(name, '-', stream_name) AS display_name
             FROM classes WHERE deleted_at IS NULL ORDER BY name ASC, stream_name ASC"
        )->fetchAll();
        $terms = $db->query(
            "SELECT id, name, academic_year_id FROM terms WHERE deleted_at IS NULL ORDER BY academic_year_id DESC, name ASC"
        )->fetchAll();

        $this->success([
            'departments' => $departments,
            'subjects' => $subjects,
            'academic_years' => $academicYears,
            'class_streams' => $classStreams,
            'terms' => $terms
        ]);
    }

    /**
     * List curriculum topics, optionally filtered by subject/academic year/class-stream/term/
     * theme-branch, plus a free-text search across topic/theme/competence. Each row carries its
     * ordered learning_outcomes array and a pre-combined class_stream_name ("S.1-A").
     * GET /admin/enotes-curriculum
     */
    public function index(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $db = $this->getDb();
        $where = ['ct.deleted_at IS NULL'];
        $params = [];

        foreach (['subject_id', 'academic_year_id', 'class_id', 'term_id'] as $field) {
            $value = $this->query($field, '');
            if ($value !== '' && $value !== null) {
                $where[] = "ct.$field = :$field";
                $params[$field] = (int) $value;
            }
        }

        $themeBranch = $this->query('theme_branch', '');
        if ($themeBranch !== '' && $themeBranch !== null) {
            $where[] = 'ct.theme_branch = :theme_branch';
            $params['theme_branch'] = $themeBranch;
        }

        $search = $this->query('search', '');
        if ($search !== '' && $search !== null) {
            $where[] = '(ct.topic LIKE :search OR ct.theme_branch LIKE :search OR ct.competence LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT ct.id, ct.subject_id, ct.academic_year_id, ct.class_id, ct.term_id,
                       ct.theme_branch, ct.topic, ct.competence, ct.created_at, ct.updated_at,
                       s.name AS subject_name, d.name AS department_name,
                       ay.name AS academic_year_name,
                       t.name AS term_name,
                       CONCAT(c.name, '-', c.stream_name) AS class_stream_name
                FROM enote_curriculum_topics ct
                LEFT JOIN subjects s ON ct.subject_id = s.id
                LEFT JOIN departments d ON s.department_id = d.id
                LEFT JOIN academic_years ay ON ct.academic_year_id = ay.id
                LEFT JOIN terms t ON ct.term_id = t.id
                LEFT JOIN classes c ON ct.class_id = c.id
                WHERE {$whereClause}
                ORDER BY ct.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $topics = $stmt->fetchAll();

        $this->attachLearningOutcomes($topics);

        $this->success(['topics' => $topics]);
    }

    /**
     * GET /admin/enotes-curriculum/{id}
     */
    public function show($id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $topic = $this->fetchTopicWithOutcomes((int) $id);
        if (!$topic) {
            $this->notFound('Curriculum topic not found');
            return;
        }

        $this->success($topic);
    }

    /**
     * Creates one curriculum topic per selected class-stream (the admin form's Class-Stream field
     * is a checkbox multi-select) - same subject/year/term/theme/topic/competence/learning
     * outcomes, just a separate row per class-stream, mirroring how a teacher's "duplicate to
     * other class/stream" works on the eNotes side.
     * POST /admin/enotes-curriculum
     */
    public function store(): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $data = $this->input();
        $errors = $this->validateRequired(['subject_id', 'academic_year_id', 'term_id', 'theme_branch', 'topic', 'competence']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $rawClassIds = $data['class_ids'] ?? $data['class_id'] ?? null;
        $classIds = is_array($rawClassIds) ? $rawClassIds : ($rawClassIds !== null ? [$rawClassIds] : []);
        $classIds = array_values(array_unique(array_filter(array_map('intval', $classIds))));

        if (empty($classIds)) {
            $this->validationError(['class_ids' => 'Select at least one class-stream']);
            return;
        }

        $cleanedOutcomes = $this->cleanLearningOutcomes($data['learning_outcomes'] ?? null);

        $baseParams = [
            'subject_id' => (int) $data['subject_id'],
            'academic_year_id' => (int) $data['academic_year_id'],
            'term_id' => (int) $data['term_id'],
            'theme_branch' => htmlspecialchars(trim($data['theme_branch']), ENT_QUOTES, 'UTF-8'),
            'topic' => htmlspecialchars(trim($data['topic']), ENT_QUOTES, 'UTF-8'),
            'competence' => htmlspecialchars(trim($data['competence']), ENT_QUOTES, 'UTF-8')
        ];

        $db = $this->getDb();
        $createdIds = [];
        $skippedClassIds = [];

        foreach ($classIds as $classId) {
            try {
                $db->beginTransaction();

                $stmt = $db->prepare(
                    "INSERT INTO enote_curriculum_topics
                        (subject_id, academic_year_id, class_id, term_id, theme_branch, topic, competence, created_by, created_at, updated_at)
                     VALUES (:subject_id, :academic_year_id, :class_id, :term_id, :theme_branch, :topic, :competence, :created_by, NOW(), NOW())"
                );
                $stmt->execute(array_merge($baseParams, [
                    'class_id' => $classId,
                    'created_by' => $this->getCurrentUserId()
                ]));
                $topicId = (int) $db->lastInsertId();

                $this->insertLearningOutcomes($topicId, $cleanedOutcomes);

                $db->commit();
                $createdIds[] = $topicId;
            } catch (\PDOException $e) {
                $db->rollBack();
                error_log("Failed to create curriculum topic for class_id {$classId}: " . $e->getMessage());
                $skippedClassIds[] = $classId;
            }
        }

        if (empty($createdIds)) {
            $this->error('Could not create a curriculum topic for any selected class-stream', 500);
            return;
        }

        $this->success(
            [
                'created' => array_map([$this, 'fetchTopicWithOutcomes'], $createdIds),
                'skipped_class_ids' => $skippedClassIds
            ],
            count($createdIds) . ' curriculum topic(s) created successfully' . (count($skippedClassIds) ? ' (' . count($skippedClassIds) . ' failed)' : '')
        );
    }

    /**
     * PUT /admin/enotes-curriculum/{id}
     */
    public function update($id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }
        $this->saveTopic((int) $id);
    }

    /**
     * Soft delete only - the topic row is kept (deleted_at set), its learning outcomes rows are
     * left as-is (harmless orphans, unreachable once the parent topic is filtered out).
     * DELETE /admin/enotes-curriculum/{id}
     */
    public function destroy($id): void
    {
        if (!$this->requireAdmin()) {
            return;
        }

        $db = $this->getDb();
        $id = (int) $id;

        $stmt = $db->prepare("SELECT id FROM enote_curriculum_topics WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Curriculum topic not found');
            return;
        }

        try {
            $db->prepare("UPDATE enote_curriculum_topics SET deleted_at = NOW() WHERE id = :id")->execute(['id' => $id]);
            $this->success([], 'Curriculum topic deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete curriculum topic: ' . $e->getMessage());
            $this->error('Failed to delete curriculum topic', 500);
        }
    }

    /**
     * Edit-only (create goes through store() above, which handles the class-stream checkbox
     * multi-select). A topic's class-stream here still maps to one existing row, so editing keeps
     * a single class_id rather than the create form's multi-select.
     */
    private function saveTopic(int $id): void
    {
        $data = $this->input();
        $errors = $this->validateRequired(['subject_id', 'academic_year_id', 'class_id', 'term_id', 'theme_branch', 'topic', 'competence']);
        if (!empty($errors)) {
            $this->validationError($errors);
            return;
        }

        $cleanedOutcomes = $this->cleanLearningOutcomes($data['learning_outcomes'] ?? null);

        $db = $this->getDb();
        $params = [
            'subject_id' => (int) $data['subject_id'],
            'academic_year_id' => (int) $data['academic_year_id'],
            'class_id' => (int) $data['class_id'],
            'term_id' => (int) $data['term_id'],
            'theme_branch' => htmlspecialchars(trim($data['theme_branch']), ENT_QUOTES, 'UTF-8'),
            'topic' => htmlspecialchars(trim($data['topic']), ENT_QUOTES, 'UTF-8'),
            'competence' => htmlspecialchars(trim($data['competence']), ENT_QUOTES, 'UTF-8')
        ];

        try {
            $db->beginTransaction();

            $exists = $db->prepare("SELECT id FROM enote_curriculum_topics WHERE id = :id AND deleted_at IS NULL");
            $exists->execute(['id' => $id]);
            if (!$exists->fetch()) {
                $db->rollBack();
                $this->notFound('Curriculum topic not found');
                return;
            }

            $stmt = $db->prepare(
                "UPDATE enote_curriculum_topics SET
                    subject_id = :subject_id, academic_year_id = :academic_year_id, class_id = :class_id,
                    term_id = :term_id, theme_branch = :theme_branch, topic = :topic, competence = :competence,
                    updated_at = NOW()
                 WHERE id = :id"
            );
            $stmt->execute(array_merge($params, ['id' => $id]));
            $topicId = $id;

            $db->prepare("DELETE FROM enote_learning_outcomes WHERE curriculum_topic_id = :id")->execute(['id' => $topicId]);
            $this->insertLearningOutcomes($topicId, $cleanedOutcomes);

            $db->commit();

            $topic = $this->fetchTopicWithOutcomes($topicId);
            $this->success($topic, 'Curriculum topic updated successfully');
        } catch (\PDOException $e) {
            $db->rollBack();
            error_log('Failed to save curriculum topic: ' . $e->getMessage());
            $this->error('Failed to save curriculum topic', 500);
        }
    }

    /**
     * @param mixed $rawOutcomes
     * @return string[]
     */
    private function cleanLearningOutcomes($rawOutcomes): array
    {
        $outcomes = is_array($rawOutcomes) ? $rawOutcomes : [];
        $cleaned = [];
        foreach ($outcomes as $outcome) {
            $text = trim((string) $outcome);
            if ($text !== '') {
                $cleaned[] = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
            }
        }
        return $cleaned;
    }

    /**
     * @param string[] $outcomes
     */
    private function insertLearningOutcomes(int $topicId, array $outcomes): void
    {
        if (empty($outcomes)) {
            return;
        }

        $insertOutcome = $this->getDb()->prepare(
            "INSERT INTO enote_learning_outcomes (curriculum_topic_id, learning_outcome, order_number, created_at, updated_at)
             VALUES (:topic_id, :outcome, :order_number, NOW(), NOW())"
        );
        foreach ($outcomes as $index => $outcome) {
            $insertOutcome->execute([
                'topic_id' => $topicId,
                'outcome' => $outcome,
                'order_number' => $index + 1
            ]);
        }
    }

    private function fetchTopicWithOutcomes(int $id): ?array
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT ct.*, s.name AS subject_name, ay.name AS academic_year_name, t.name AS term_name,
                    CONCAT(c.name, '-', c.stream_name) AS class_stream_name
             FROM enote_curriculum_topics ct
             LEFT JOIN subjects s ON ct.subject_id = s.id
             LEFT JOIN academic_years ay ON ct.academic_year_id = ay.id
             LEFT JOIN terms t ON ct.term_id = t.id
             LEFT JOIN classes c ON ct.class_id = c.id
             WHERE ct.id = :id AND ct.deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id]);
        $topic = $stmt->fetch();
        if (!$topic) {
            return null;
        }

        $outcomesStmt = $db->prepare(
            "SELECT learning_outcome FROM enote_learning_outcomes WHERE curriculum_topic_id = :id ORDER BY order_number ASC"
        );
        $outcomesStmt->execute(['id' => $id]);
        $topic['learning_outcomes'] = array_column($outcomesStmt->fetchAll(), 'learning_outcome');

        return $topic;
    }

    /**
     * Batch-attaches each row's ordered learning_outcomes array in one extra query instead of
     * N+1 per-topic queries.
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
