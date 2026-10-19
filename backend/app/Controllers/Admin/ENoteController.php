<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * Admin eNotes Controller
 *
 * System-wide view over every teacher's eNotes topics, for moderation - same shape as
 * Admin\LibraryController/Admin\ItemBankController, backed by enote_topics instead of a flat
 * PDF table. enote_topics.teacher_id is a NOT NULL FK to teachers, so admin can only list,
 * change status (publish/archive), and soft-delete across all teachers - never author topics.
 */
class ENoteController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * Get all topics system-wide
     * GET /admin/enotes
     */
    public function index(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $status = $this->query('status', '');
        $departmentId = $this->query('department_id', '');
        $classId = $this->query('class_id', '');
        $subjectId = $this->query('subject_id', '');
        $search = $this->query('search', '');

        $where = ['et.deleted_at IS NULL'];
        $params = [];

        if (!empty($status)) {
            $where[] = 'et.status = :status';
            $params['status'] = $status;
        }

        if (!empty($departmentId)) {
            $where[] = 'et.department_id = :department_id';
            $params['department_id'] = $departmentId;
        }

        if (!empty($classId)) {
            $where[] = 'et.class_id = :class_id';
            $params['class_id'] = $classId;
        }

        if (!empty($subjectId)) {
            $where[] = 'et.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            // Non-emulated PDO prepares can't reuse one named placeholder twice in a query.
            $where[] = '(et.title LIKE :search1 OR et.description LIKE :search2 OR t.first_name LIKE :search3 OR t.last_name LIKE :search4)';
            $searchTerm = "%{$search}%";
            $params['search1'] = $searchTerm;
            $params['search2'] = $searchTerm;
            $params['search3'] = $searchTerm;
            $params['search4'] = $searchTerm;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT et.id, et.title, et.description, et.total_pages, et.estimated_reading_time,
                       et.status, et.published_at, et.archived_at, et.created_at, et.updated_at,
                       et.subject_id, et.class_id, et.department_id, et.teacher_id,
                       et.class_group_name, et.content_group_id, et.cover_design,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       d.name as department_name, d.code as department_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name,
                       (SELECT COUNT(DISTINCT sde.student_id) FROM student_department_enrollments sde
                        LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                        WHERE sde.department_id = et.department_id AND sde.deleted_at IS NULL AND sde.status = 'active'
                          AND ((et.class_id IS NULL AND et.class_group_name IS NULL)
                               OR sde.class_id = et.class_id
                               OR (et.class_group_name IS NOT NULL AND sde_c.name = et.class_group_name))) AS audience,
                       (SELECT COUNT(*) FROM enote_progress ep WHERE ep.topic_id = et.id) AS readers
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                LEFT JOIN departments d ON et.department_id = d.id
                LEFT JOIN teachers t ON et.teacher_id = t.id
                WHERE {$whereClause}
                ORDER BY et.updated_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $topics = $stmt->fetchAll();

        $countsStmt = $this->db->prepare(
            "SELECT status, COUNT(*) as count FROM enote_topics WHERE deleted_at IS NULL GROUP BY status"
        );
        $countsStmt->execute();
        $counts = ['draft' => 0, 'published' => 0, 'archived' => 0];
        foreach ($countsStmt->fetchAll() as $row) {
            $counts[$row['status']] = (int) $row['count'];
        }

        $this->success([
            'topics' => $topics,
            'stats' => [
                'total' => array_sum($counts),
                'draft' => $counts['draft'],
                'published' => $counts['published'],
                'archived' => $counts['archived'],
            ],
        ]);
    }

    /**
     * Get a single topic with its pages, for read-only review
     * GET /admin/enotes/{id}
     */
    public function show(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        $sql = "SELECT et.id, et.title, et.description, et.total_pages, et.estimated_reading_time,
                       et.status, et.published_at, et.archived_at, et.created_at, et.updated_at,
                       et.subject_id, et.class_id, et.department_id, et.teacher_id, et.narration_voice,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       d.name as department_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                LEFT JOIN departments d ON et.department_id = d.id
                LEFT JOIN teachers t ON et.teacher_id = t.id
                WHERE et.id = :id AND et.deleted_at IS NULL";

        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id]);
        $topic = $stmt->fetch();

        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }

        $stmt = $this->db->prepare(
            "SELECT id, topic_id, order_number, title, content, is_active, created_at, updated_at
             FROM enote_pages
             WHERE topic_id = :topic_id AND deleted_at IS NULL
             ORDER BY order_number ASC"
        );
        $stmt->execute(['topic_id' => $id]);
        $pages = $stmt->fetchAll();

        // Attaches each page's already-generated narration audio for the topic's chosen voice -
        // a read-only lookup against enote_page_narrations, never triggers new TTS generation.
        $previewService = new \eSpace\App\Services\StudentModulePreviewService();
        $topic['pages'] = $previewService->attachNarrationAudio($pages, $topic['narration_voice']);

        $this->success($topic);
    }

    /**
     * Change a topic's lifecycle status (publish/archive/revert to draft)
     * PUT /admin/enotes/{id}
     */
    public function update(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        if (empty($data['status']) || !in_array($data['status'], ['draft', 'published', 'archived'], true)) {
            $this->validationError(['status' => 'status must be one of draft, published, archived']);
            return;
        }

        $stmt = $this->db->prepare("SELECT id, status, title, department_id, class_id FROM enote_topics WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        $topic = $stmt->fetch();

        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }

        $oldStatus = $topic['status'];
        $newStatus = $data['status'];

        try {
            if ($oldStatus !== 'published' && $newStatus === 'published') {
                $sql = "UPDATE enote_topics SET status = :status, published_at = NOW(), updated_at = NOW() WHERE id = :id";
            } elseif ($oldStatus === 'published' && $newStatus === 'archived') {
                $sql = "UPDATE enote_topics SET status = :status, archived_at = NOW(), updated_at = NOW() WHERE id = :id";
            } else {
                $sql = "UPDATE enote_topics SET status = :status, updated_at = NOW() WHERE id = :id";
            }

            $stmt = $this->db->prepare($sql);
            $stmt->execute(['status' => $newStatus, 'id' => $id]);

            if ($oldStatus !== 'published' && $newStatus === 'published') {
                (new NotificationService())->notifyDepartmentClass(
                    (int) $topic['department_id'],
                    $topic['class_id'] !== null ? (int) $topic['class_id'] : null,
                    'new_enote',
                    'New eNote',
                    "A new eNote topic \"{$topic['title']}\" is now available.",
                    ['topic_id' => $id]
                );
            }

            $this->success([], 'Topic status updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update eNote topic status: ' . $e->getMessage());
            $this->error('Failed to update topic status', 500);
        }
    }

    /**
     * Assign (or re-assign) which class stream a topic belongs to - moderation action, works
     * across any teacher. Pass class_id: null to unassign the topic from any class.
     * PUT /admin/enotes/{id}/class
     */
    public function assignClass(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        if (!array_key_exists('class_id', $data)) {
            $this->validationError(['class_id' => 'class_id is required (use null to unassign)']);
            return;
        }

        $stmt = $this->db->prepare("SELECT id FROM enote_topics WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        $classId = $data['class_id'] !== null && $data['class_id'] !== '' ? (int) $data['class_id'] : null;

        if ($classId !== null) {
            $stmt = $this->db->prepare("SELECT id FROM classes WHERE id = :id AND deleted_at IS NULL");
            $stmt->execute(['id' => $classId]);
            if (!$stmt->fetch()) {
                $this->validationError(['class_id' => 'Class not found']);
                return;
            }
        }

        try {
            $stmt = $this->db->prepare("UPDATE enote_topics SET class_id = :class_id, updated_at = NOW() WHERE id = :id");
            $stmt->execute(['class_id' => $classId, 'id' => $id]);

            $this->success(['class_id' => $classId], 'Topic class updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to assign eNote topic class: ' . $e->getMessage());
            $this->error('Failed to assign topic class', 500);
        }
    }

    /**
     * Delete a topic (soft delete, cascades to its pages) - moderation action, works across any
     * teacher.
     * DELETE /admin/enotes/{id}
     */
    public function delete(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $id = (int) $this->routeParam('id');

        $stmt = $this->db->prepare("SELECT id FROM enote_topics WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $id]);
        if (!$stmt->fetch()) {
            $this->notFound('Topic not found');
            return;
        }

        try {
            $stmt = $this->db->prepare("UPDATE enote_topics SET deleted_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $id]);

            $stmt = $this->db->prepare("UPDATE enote_pages SET deleted_at = NOW() WHERE topic_id = :topic_id");
            $stmt->execute(['topic_id' => $id]);

            $this->success([], 'Topic deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete eNote topic: ' . $e->getMessage());
            $this->error('Failed to delete topic', 500);
        }
    }

    /**
     * Who is reading a topic: every student it is aimed at, with how far they got
     * (the same shape as the teacher's readers list, so the same panel shows it).
     * GET /admin/enotes/{id}/readers
     */
    public function readers(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }
        $id = (int) $this->routeParam('id');
        $stmt = $this->db->prepare(
            "SELECT st.id, st.first_name, st.last_name, st.gender,
                    CONCAT(sde_c.name, IF(sde_c.stream_name IS NULL OR sde_c.stream_name = '', '', CONCAT('-', sde_c.stream_name))) AS class_label,
                    MAX(ep.percentage_completed) AS percent, MAX(ep.last_read_at) AS last_at, MAX(ep.completed_at) AS completed_at,
                    MAX(pg.order_number) AS current_page
             FROM enote_topics et
             INNER JOIN student_department_enrollments sde ON sde.department_id = et.department_id AND sde.deleted_at IS NULL AND sde.status = 'active'
             LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
             INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
             LEFT JOIN enote_progress ep ON ep.topic_id = et.id AND ep.student_id = st.id
             LEFT JOIN enote_pages pg ON pg.id = ep.current_page_id
             WHERE et.id = ? AND et.deleted_at IS NULL
               AND ((et.class_id IS NULL AND et.class_group_name IS NULL)
                    OR sde.class_id = et.class_id
                    OR (et.class_group_name IS NOT NULL AND sde_c.name = et.class_group_name))
             GROUP BY st.id
             ORDER BY st.first_name, st.last_name"
        );
        $stmt->execute([$id]);
        $students = array_map(static fn (array $row): array => [
            'id' => (int) $row['id'],
            'name' => trim($row['first_name'] . ' ' . $row['last_name']),
            'gender' => $row['gender'],
            'class_label' => $row['class_label'],
            'percent' => $row['percent'] !== null ? (int) round((float) $row['percent']) : null,
            'current_page' => $row['current_page'] !== null ? (int) $row['current_page'] : null,
            'last_at' => $row['last_at'],
            'completed' => $row['completed_at'] !== null,
        ], $stmt->fetchAll(\PDO::FETCH_ASSOC));

        $this->success(['students' => $students]);
    }

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
