<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\NotificationService;

/**
 * HOD Video Controller
 *
 * Moderation view over video uploads within the HOD's own department only. HODs have no row
 * in the teachers table (videos.teacher_id is the real uploader FK), so like the Library/Item
 * Bank HOD controllers this never creates videos - only lists, changes status
 * (draft/published/archived), and soft-deletes, scoped strictly to their department.
 */
class VideoController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    private function isHOD(): bool
    {
        return $this->getCurrentUserRole() === 'hod';
    }

    private function getHODDepartmentId(): ?int
    {
        $userId = $this->getCurrentUserId();
        if (!$userId || !$this->isHOD()) {
            return null;
        }

        $stmt = $this->db->prepare("SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => $userId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    /**
     * Get all videos in the HOD's department
     * GET /hod/videos
     */
    public function index(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $status = $this->query('status', '');
        $subjectId = $this->query('subject_id', '');
        $search = $this->query('search', '');

        $where = ['v.deleted_at IS NULL', 'v.department_id = :department_id'];
        $params = ['department_id' => $departmentId];

        if (!empty($status)) {
            $where[] = 'v.status = :status';
            $params['status'] = $status;
        }

        if (!empty($subjectId)) {
            $where[] = 'v.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        if (!empty($search)) {
            $where[] = '(v.title LIKE :search1 OR v.description LIKE :search2 OR t.first_name LIKE :search3 OR t.last_name LIKE :search4)';
            $searchTerm = "%{$search}%";
            $params['search1'] = $searchTerm;
            $params['search2'] = $searchTerm;
            $params['search3'] = $searchTerm;
            $params['search4'] = $searchTerm;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT v.id, v.title, v.description, v.file_path, v.file_size, v.duration,
                       v.status, v.published_at, v.created_at, v.updated_at,
                       v.subject_id, v.class_id, v.department_id, v.teacher_id,
                       s.name as subject_name, s.code as subject_code,
                       c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                       d.name as department_name,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM videos v
                LEFT JOIN subjects s ON v.subject_id = s.id
                LEFT JOIN classes c ON v.class_id = c.id
                LEFT JOIN departments d ON v.department_id = d.id
                LEFT JOIN teachers t ON v.teacher_id = t.id
                WHERE {$whereClause}
                ORDER BY v.updated_at DESC";

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $videos = $stmt->fetchAll();

        $countsStmt = $this->db->prepare(
            "SELECT status, COUNT(*) as count FROM videos WHERE deleted_at IS NULL AND department_id = :department_id GROUP BY status"
        );
        $countsStmt->execute(['department_id' => $departmentId]);
        $counts = ['draft' => 0, 'published' => 0, 'archived' => 0];
        foreach ($countsStmt->fetchAll() as $row) {
            $counts[$row['status']] = (int) $row['count'];
        }

        $this->success([
            'videos' => $videos,
            'stats' => [
                'total' => array_sum($counts),
                'draft' => $counts['draft'],
                'published' => $counts['published'],
                'archived' => $counts['archived'],
            ],
        ]);
    }

    /**
     * Change a video's lifecycle status (publish/archive/revert to draft) - department-scoped
     * PUT /hod/videos/{id}
     */
    public function update(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $id = (int) $this->routeParam('id');
        $data = $this->input();

        if (empty($data['status']) || !in_array($data['status'], ['draft', 'published', 'archived'], true)) {
            $this->validationError(['status' => 'status must be one of draft, published, archived']);
            return;
        }

        $stmt = $this->db->prepare(
            "SELECT id, status, title, department_id, class_id FROM videos
             WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $video = $stmt->fetch();

        if (!$video) {
            $this->notFound('Video not found in your department');
            return;
        }

        $oldStatus = $video['status'];
        $newStatus = $data['status'];

        try {
            $sql = $newStatus === 'published' && $oldStatus !== 'published'
                ? "UPDATE videos SET status = :status, published_at = NOW(), updated_at = NOW() WHERE id = :id"
                : "UPDATE videos SET status = :status, updated_at = NOW() WHERE id = :id";

            $stmt = $this->db->prepare($sql);
            $stmt->execute(['status' => $newStatus, 'id' => $id]);

            if ($oldStatus !== 'published' && $newStatus === 'published' && $video['department_id'] && $video['class_id']) {
                (new NotificationService())->notifyDepartmentClass(
                    (int) $video['department_id'],
                    (int) $video['class_id'],
                    'new_video_resource',
                    'New video resource',
                    "A new video \"{$video['title']}\" is now available.",
                    ['video_id' => $id]
                );
            }

            $this->success([], 'Video status updated successfully');
        } catch (\PDOException $e) {
            error_log('Failed to update video status: ' . $e->getMessage());
            $this->error('Failed to update video status', 500);
        }
    }

    /**
     * Delete a video (soft delete) - department-scoped moderation action
     * DELETE /hod/videos/{id}
     */
    public function delete(): void
    {
        if (!$this->isHOD()) {
            $this->forbidden();
            return;
        }

        $departmentId = $this->getHODDepartmentId();
        if (!$departmentId) {
            $this->error('Department not found for HOD', 404);
            return;
        }

        $id = (int) $this->routeParam('id');

        $stmt = $this->db->prepare(
            "SELECT id FROM videos WHERE id = :id AND department_id = :department_id AND deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        if (!$stmt->fetch()) {
            $this->notFound('Video not found in your department');
            return;
        }

        try {
            $stmt = $this->db->prepare("UPDATE videos SET deleted_at = NOW() WHERE id = :id");
            $stmt->execute(['id' => $id]);

            $this->success([], 'Video deleted successfully');
        } catch (\PDOException $e) {
            error_log('Failed to delete video: ' . $e->getMessage());
            $this->error('Failed to delete video', 500);
        }
    }
}
