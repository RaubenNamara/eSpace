<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;

/**
 * HOD ENote Controller
 *
 * Read-only oversight of eNote topics authored by teachers in the HOD's department - lists every
 * topic (any status, any teacher) with a teacher filter, and a full read-only view of one topic's
 * pages. HOD can't create/edit/delete/publish.
 */
class ENoteController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getHodDepartmentId(): ?int
    {
        $hodId = $_SESSION['user_id'] ?? null;
        if (!$hodId) {
            return null;
        }

        $stmt = $this->getDb()->prepare("SELECT department_id FROM hods WHERE id = :hod_id AND deleted_at IS NULL");
        $stmt->execute(['hod_id' => $hodId]);
        $hod = $stmt->fetch();

        return $hod ? (int) $hod['department_id'] : null;
    }

    private function decodeLearningOutcomes(array $topic): array
    {
        $topic['learning_outcomes'] = !empty($topic['learning_outcomes'])
            ? (json_decode($topic['learning_outcomes'], true) ?: [])
            : [];
        return $topic;
    }

    /**
     * GET /hod/enotes
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $status = $this->query('status', '');
        $teacherId = $this->query('teacher_id', '');
        $search = $this->query('search', '');

        $db = $this->getDb();
        $where = [
            'et.deleted_at IS NULL',
            'EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = et.teacher_id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)'
        ];
        $params = ['department_id' => $departmentId];

        if (!empty($status)) {
            $where[] = 'et.status = :status';
            $params['status'] = $status;
        }

        if (!empty($teacherId)) {
            $where[] = 'et.teacher_id = :teacher_id';
            $params['teacher_id'] = $teacherId;
        }

        if (!empty($search)) {
            $where[] = '(et.title LIKE :search OR et.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT et.id, et.title, et.status, et.updated_at,
                       s.name as subject_name, c.name as class_name,
                       CONCAT(t.first_name, ' ', t.last_name) as teacher_name, t.id as teacher_id
                FROM enote_topics et
                INNER JOIN teachers t ON et.teacher_id = t.id
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                WHERE {$whereClause}
                ORDER BY et.updated_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $topics = $stmt->fetchAll();

        // Distinct teacher list for the filter dropdown
        $stmt = $db->prepare(
            "SELECT t.id, t.first_name, t.last_name
             FROM teachers t
             WHERE t.deleted_at IS NULL
               AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)
             ORDER BY t.first_name, t.last_name"
        );
        $stmt->execute(['department_id' => $departmentId]);
        $teachers = $stmt->fetchAll();

        $this->success(['topics' => $topics, 'teachers' => $teachers]);
    }

    /**
     * Read-only single topic (with pages) authored by a teacher in this department.
     * GET /hod/enotes/{id}
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getHodDepartmentId();
        if (!$departmentId) {
            $this->error('HOD not assigned to a department', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $sql = "SELECT et.*, s.name as subject_name, s.code as subject_code, c.name as class_name,
                       CONCAT(t.first_name, ' ', t.last_name) as teacher_name
                FROM enote_topics et
                INNER JOIN teachers t ON et.teacher_id = t.id
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                WHERE et.id = :id AND et.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = et.teacher_id AND tda.department_id = :department_id AND tda.deleted_at IS NULL)";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'department_id' => $departmentId]);
        $topic = $stmt->fetch();

        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }

        $topic = $this->decodeLearningOutcomes($topic);

        $stmt = $db->prepare(
            "SELECT * FROM enote_pages WHERE topic_id = :topic_id AND deleted_at IS NULL ORDER BY order_number ASC"
        );
        $stmt->execute(['topic_id' => $id]);
        $topic['pages'] = $stmt->fetchAll();

        $this->success($topic);
    }
}
