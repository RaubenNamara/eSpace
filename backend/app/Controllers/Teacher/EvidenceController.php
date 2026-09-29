<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\EvidenceService;

/**
 * Students' competency evidence for the subjects in the teacher's department(s): the queue to
 * review, and confirming or returning each piece with a comment.
 */
class EvidenceController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function teacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    /** @return int[] */
    private function departmentIds($db, int $teacherId): array
    {
        $stmt = $db->prepare(
            "SELECT department_id FROM teacher_department_assignments WHERE teacher_id = ? AND deleted_at IS NULL
             UNION SELECT department_id FROM teachers WHERE id = ? AND department_id IS NOT NULL"
        );
        $stmt->execute([$teacherId, $teacherId]);
        return array_values(array_unique(array_map('intval', array_column($stmt->fetchAll(), 'department_id'))));
    }

    /**
     * GET /teacher/evidence?status=pending|confirmed|returned|all
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->teacherId();
        $db = $this->getDb();
        if (!$teacherId) {
            $this->error('Teacher not found', 403);
            return;
        }
        if (!EvidenceService::available($db)) {
            $this->success(['available' => false, 'evidence' => [], 'counts' => ['pending' => 0, 'confirmed' => 0, 'returned' => 0]]);
            return;
        }
        $departments = $this->departmentIds($db, $teacherId);
        if (!$departments) {
            $this->success(['available' => true, 'evidence' => [], 'counts' => ['pending' => 0, 'confirmed' => 0, 'returned' => 0]]);
            return;
        }
        $in = implode(',', array_fill(0, count($departments), '?'));
        $scope = "FROM competency_evidence ev
                  INNER JOIN enote_curriculum_topics ct ON ct.id = ev.curriculum_topic_id
                  INNER JOIN subjects s ON s.id = ct.subject_id AND s.department_id IN ($in)
                  INNER JOIN students st ON st.id = ev.student_id
                  LEFT JOIN classes c ON c.id = ct.class_id
                  WHERE ev.deleted_at IS NULL";

        $stmt = $db->prepare("SELECT ev.status, COUNT(*) AS n $scope GROUP BY ev.status");
        $stmt->execute($departments);
        $counts = ['pending' => 0, 'confirmed' => 0, 'returned' => 0];
        foreach ($stmt->fetchAll() as $row) {
            $counts[$row['status']] = (int) $row['n'];
        }

        $status = (string) ($_GET['status'] ?? 'pending');
        $params = $departments;
        $filter = '';
        if (in_array($status, ['pending', 'confirmed', 'returned'], true)) {
            $filter = ' AND ev.status = ?';
            $params[] = $status;
        }
        $stmt = $db->prepare(
            "SELECT ev.id, ev.note, ev.file_path, ev.file_kind, ev.original_name, ev.status, ev.teacher_comment,
                    ev.created_at, ev.reviewed_at,
                    st.id AS student_id, st.first_name, st.last_name, st.admission_number,
                    ct.id AS topic_id, ct.topic, ct.competence, ct.theme_branch,
                    s.name AS subject_name, CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name
             $scope $filter
             ORDER BY ev.status = 'pending' DESC, ev.created_at " . ($status === 'pending' ? 'ASC' : 'DESC') . "
             LIMIT 200"
        );
        $stmt->execute($params);
        $this->success(['available' => true, 'evidence' => $stmt->fetchAll(), 'counts' => $counts]);
    }

    /**
     * PUT /teacher/evidence/{id}  { status: confirmed|returned, comment }
     */
    public function review($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->teacherId();
        $db = $this->getDb();
        $status = (string) $this->input('status', '');
        if (!in_array($status, ['confirmed', 'returned'], true)) {
            $this->validationError(['status' => 'Confirm or return the evidence']);
            return;
        }
        $comment = trim(strip_tags((string) $this->input('comment', '')));
        if ($status === 'returned' && $comment === '') {
            $this->validationError(['comment' => 'Tell the student what to improve']);
            return;
        }
        $departments = $teacherId ? $this->departmentIds($db, $teacherId) : [];
        if (!$departments) {
            $this->error('Teacher not found', 403);
            return;
        }
        $in = implode(',', array_fill(0, count($departments), '?'));
        $stmt = $db->prepare(
            "SELECT ev.id FROM competency_evidence ev
             INNER JOIN enote_curriculum_topics ct ON ct.id = ev.curriculum_topic_id
             INNER JOIN subjects s ON s.id = ct.subject_id AND s.department_id IN ($in)
             WHERE ev.id = ? AND ev.deleted_at IS NULL"
        );
        $stmt->execute(array_merge($departments, [(int) $id]));
        if (!$stmt->fetch()) {
            $this->notFound('Evidence not found');
            return;
        }
        $db->prepare(
            "UPDATE competency_evidence SET status = ?, teacher_comment = ?, reviewed_by = ?, reviewed_at = NOW() WHERE id = ?"
        )->execute([$status, $comment !== '' ? mb_substr($comment, 0, 2000) : null, $teacherId, (int) $id]);
        // Confirmed evidence can earn the student an award
        try {
            $owner = $db->prepare("SELECT student_id FROM competency_evidence WHERE id = ?");
            $owner->execute([(int) $id]);
            $term = $db->query("SELECT id FROM terms WHERE is_current = 1 ORDER BY id DESC LIMIT 1")->fetch();
            if (($studentId = $owner->fetchColumn()) && $term) {
                (new \eSpace\App\Services\RewardService())->evaluateLearningRules((int) $studentId, (int) $term['id']);
            }
        } catch (\Throwable $e) {
            error_log('Evidence review: awards not updated: ' . $e->getMessage());
        }
        $this->success([], $status === 'confirmed' ? 'Evidence confirmed' : 'Evidence returned to the student');
    }
}
