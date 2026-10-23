<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ContentApproval;

/**
 * The HOD's approvals: teachers' eNotes, library books, Item Bank papers and videos waiting to be
 * approved before students see them (see Services/ContentApproval). Approving publishes the work;
 * returning it sends it back to the teacher as a draft with a note.
 */
class ApprovalController extends Controller
{
    private function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /** The signed-in HOD's id and department, or null (and an error already sent) */
    private function hod(): ?array
    {
        if (($_SESSION['role'] ?? '') !== 'hod') {
            $this->forbidden();
            return null;
        }
        $stmt = $this->db()->prepare('SELECT id, department_id FROM hods WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([(int) ($_SESSION['user_id'] ?? 0)]);
        $row = $stmt->fetch();
        if (!$row || !$row['department_id']) {
            $this->error('Department not found for HOD', 404);
            return null;
        }
        return ['id' => (int) $row['id'], 'department_id' => (int) $row['department_id']];
    }

    /**
     * GET /hod/approvals - everything waiting in the department, oldest first
     */
    public function index(): void
    {
        $hod = $this->hod();
        if (!$hod) {
            return;
        }
        $this->success(['items' => ContentApproval::pending($this->db(), $hod['department_id'])]);
    }

    /**
     * POST /hod/approvals/{type}/{id}/approve
     */
    public function approve($type, $id): void
    {
        $hod = $this->hod();
        if (!$hod || !$this->ownsItem((string) $type, (int) $id, $hod['department_id'])) {
            return;
        }
        if (!ContentApproval::approve($this->db(), (string) $type, (int) $id, $hod['id'])) {
            $this->error('This is no longer waiting for approval', 409);
            return;
        }
        $this->success([], 'Approved - students can see it now');
    }

    /**
     * POST /hod/approvals/{type}/{id}/return  { note }
     */
    public function returnToTeacher($type, $id): void
    {
        $hod = $this->hod();
        if (!$hod || !$this->ownsItem((string) $type, (int) $id, $hod['department_id'])) {
            return;
        }
        $note = trim((string) ($this->input('note') ?? ''));
        if ($note === '') {
            $this->validationError(['note' => 'Tell the teacher what to change']);
            return;
        }
        if (!ContentApproval::returnToTeacher($this->db(), (string) $type, (int) $id, $hod['id'], $note)) {
            $this->error('This is no longer waiting for approval', 409);
            return;
        }
        $this->success([], 'Returned to the teacher');
    }

    /** The item exists, is in this HOD's department, and is a known kind */
    private function ownsItem(string $type, int $id, int $departmentId): bool
    {
        if (!isset(ContentApproval::TYPES[$type])) {
            $this->notFound('Unknown kind of work');
            return false;
        }
        $t = ContentApproval::TYPES[$type]['table'];
        $stmt = $this->db()->prepare("SELECT 1 FROM {$t} WHERE id = ? AND department_id = ? AND deleted_at IS NULL");
        $stmt->execute([$id, $departmentId]);
        if (!$stmt->fetchColumn()) {
            $this->notFound('Not found in your department');
            return false;
        }
        return true;
    }
}
