<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\EvidenceService;

/**
 * A student's evidence of their topic competencies (competency_evidence): what they've attached,
 * adding more, and taking back evidence their teacher hasn't looked at yet.
 */
class EvidenceController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function studentId(): ?int
    {
        $stmt = $this->getDb()->prepare("SELECT id FROM students WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$_SESSION['user_id'] ?? 0]);
        return ($row = $stmt->fetch()) ? (int) $row['id'] : null;
    }

    /** The topic is one of the student's own classes' curriculum topics */
    private function topicIsTheirs($db, int $studentId, int $topicId): bool
    {
        $stmt = $db->prepare(
            "SELECT 1 FROM enote_curriculum_topics ct
             INNER JOIN student_department_enrollments sde ON sde.class_id = ct.class_id
                    AND sde.student_id = ? AND sde.deleted_at IS NULL AND sde.status = 'active'
             WHERE ct.id = ? AND ct.deleted_at IS NULL LIMIT 1"
        );
        $stmt->execute([$studentId, $topicId]);
        return (bool) $stmt->fetch();
    }

    /**
     * GET /student/evidence?topic_id=
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->studentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }
        $db = $this->getDb();
        if (!EvidenceService::available($db)) {
            $this->success(['available' => false, 'evidence' => []]);
            return;
        }
        $sql = "SELECT id, curriculum_topic_id, note, file_path, file_kind, original_name, status, teacher_comment, reviewed_at, created_at
                FROM competency_evidence WHERE student_id = ? AND deleted_at IS NULL";
        $params = [$studentId];
        if (($topicId = (int) ($_GET['topic_id'] ?? 0)) > 0) {
            $sql .= " AND curriculum_topic_id = ?";
            $params[] = $topicId;
        }
        $stmt = $db->prepare($sql . " ORDER BY created_at DESC");
        $stmt->execute($params);
        $this->success(['available' => true, 'evidence' => $stmt->fetchAll()]);
    }

    /**
     * POST /student/evidence  (multipart: topic_id, note, file?)
     */
    public function store(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->studentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }
        $db = $this->getDb();
        if (!EvidenceService::available($db)) {
            $this->error('Evidence is not set up yet - run migration 099', 409);
            return;
        }
        $topicId = (int) ($_POST['topic_id'] ?? 0);
        $note = trim(strip_tags((string) ($_POST['note'] ?? '')));
        if (!$topicId || !$this->topicIsTheirs($db, $studentId, $topicId)) {
            $this->validationError(['topic_id' => 'Choose one of your topics']);
            return;
        }
        $hasFile = isset($_FILES['file']) && ($_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE;
        if (!$hasFile && $note === '') {
            $this->validationError(['note' => 'Attach a file or describe what you did']);
            return;
        }
        $saved = null;
        if ($hasFile) {
            $saved = EvidenceService::saveUpload($_FILES['file'], $studentId);
            if (is_string($saved)) {
                $this->validationError(['file' => $saved]);
                return;
            }
        }
        $stmt = $db->prepare(
            "INSERT INTO competency_evidence (student_id, curriculum_topic_id, note, file_path, file_kind, original_name)
             VALUES (?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([$studentId, $topicId, mb_substr($note, 0, 2000) ?: null, $saved['path'] ?? null, $saved['kind'] ?? null, $saved['original_name'] ?? null]);
        $evidenceId = (int) $db->lastInsertId();
        \eSpace\App\Services\RewardService::recordLearningDay($studentId);
        $this->success(['id' => $evidenceId], 'Evidence sent to your teacher');
    }

    /**
     * DELETE /student/evidence/{id} - only while the teacher hasn't reviewed it
     */
    public function destroy($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = $this->studentId();
        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id, file_path, status FROM competency_evidence WHERE id = ? AND student_id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $id, $studentId]);
        $row = $stmt->fetch();
        if (!$row) {
            $this->notFound('Evidence not found');
            return;
        }
        if ($row['status'] === 'confirmed') {
            $this->error('Your teacher has already confirmed this evidence', 403);
            return;
        }
        $db->prepare("UPDATE competency_evidence SET deleted_at = NOW() WHERE id = ?")->execute([(int) $id]);
        EvidenceService::deleteFile($row['file_path']);
        $this->success([], 'Evidence removed');
    }
}
