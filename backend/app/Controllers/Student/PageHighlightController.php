<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student's own private text highlights on an eNote page - each row is one highlighted span,
 * stored as plain-text character offsets into the page's rendered text (see
 * frontend's highlight.ts for how offsets are computed/re-applied). eLibrary pages are scanned
 * images with no text layer, so highlighting only exists for eNotes.
 */
class PageHighlightController extends Controller
{
    private const ALLOWED_COLORS = ['yellow', 'green', 'blue', 'pink'];
    private const MAX_SPAN_LENGTH = 5000;

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

    // Mirrors Student\ENoteController::visibilityClause().
    private function visibilityClause(): string
    {
        return "et.status = 'published' AND et.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE sde.student_id = :student_id
              AND sde.department_id = et.department_id
              AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND (
                (et.class_id IS NULL AND et.class_group_name IS NULL)
                OR sde.class_id = et.class_id
                OR (et.class_group_name IS NOT NULL AND sde_c.name = et.class_group_name)
              )
              AND et.published_at <= COALESCE(sde.end_date, NOW())
        ) AND NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te
              AND ste.teacher_id = et.teacher_id
              AND ste.department_id = et.department_id
              AND ste.status = 'withdrawn'
        )";
    }

    private function assertPageAccessible(int $pageId, int $studentId): bool
    {
        $db = $this->getDb();
        $whereClause = $this->visibilityClause();
        $stmt = $db->prepare(
            "SELECT ep.id FROM enote_pages ep
             INNER JOIN enote_topics et ON ep.topic_id = et.id
             WHERE ep.id = :page_id AND ep.is_active = 1 AND ep.deleted_at IS NULL AND {$whereClause}"
        );
        $stmt->execute(['page_id' => $pageId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        return (bool) $stmt->fetch();
    }

    /**
     * GET /student/enotes/pages/{pageId}/highlights
     */
    public function index($pageId): void
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

        $pageId = (int) $pageId;
        if (!$this->assertPageAccessible($pageId, $studentId)) {
            $this->notFound('Page not found or not accessible');
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT id, start_offset, end_offset, color FROM enote_page_highlights
             WHERE page_id = :page_id AND student_id = :student_id ORDER BY start_offset ASC"
        );
        $stmt->execute(['page_id' => $pageId, 'student_id' => $studentId]);

        $this->success(['highlights' => $stmt->fetchAll()]);
    }

    /**
     * POST /student/enotes/pages/{pageId}/highlights
     */
    public function create($pageId): void
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

        $pageId = (int) $pageId;
        if (!$this->assertPageAccessible($pageId, $studentId)) {
            $this->notFound('Page not found or not accessible');
            return;
        }

        $start = (int) ($this->input('start_offset') ?? -1);
        $end = (int) ($this->input('end_offset') ?? -1);
        $color = (string) ($this->input('color') ?? 'yellow');

        if ($start < 0 || $end <= $start || ($end - $start) > self::MAX_SPAN_LENGTH) {
            $this->error('Invalid highlight range', 422);
            return;
        }
        if (!in_array($color, self::ALLOWED_COLORS, true)) {
            $this->error('Invalid highlight color', 422);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare(
            "INSERT INTO enote_page_highlights (page_id, student_id, start_offset, end_offset, color)
             VALUES (:page_id, :student_id, :start_offset, :end_offset, :color)"
        );
        $stmt->execute([
            'page_id' => $pageId,
            'student_id' => $studentId,
            'start_offset' => $start,
            'end_offset' => $end,
            'color' => $color,
        ]);

        $this->success(['id' => (int) $db->lastInsertId()], 'Highlight saved');
    }

    /**
     * DELETE /student/enotes/highlights/{highlightId}
     */
    public function delete($highlightId): void
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

        $highlightId = (int) $highlightId;
        $db = $this->getDb();
        // Scoped to student_id in the WHERE clause itself, not just a prior SELECT check, so a
        // student can never delete another student's highlight by guessing an id.
        $stmt = $db->prepare("DELETE FROM enote_page_highlights WHERE id = :id AND student_id = :student_id");
        $stmt->execute(['id' => $highlightId, 'student_id' => $studentId]);

        $this->success([], 'Highlight removed');
    }
}
