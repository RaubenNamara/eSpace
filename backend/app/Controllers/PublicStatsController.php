<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

/**
 * Headline numbers for the public website - how much a school does on eSpace.
 *
 * Totals only (no names, no per-person data), so it is safe without sign-in. Each count is worked
 * out on its own: one missing table leaves that number out instead of failing the whole request.
 */
class PublicStatsController extends Controller
{
    protected \PDO $db;

    private const QUERIES = [
        'learners' => "SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND is_active = 1",
        'teachers' => "SELECT COUNT(*) FROM teachers WHERE deleted_at IS NULL AND is_active = 1",
        'note_pages' => "SELECT COUNT(*) FROM enote_pages WHERE deleted_at IS NULL AND is_active = 1",
        'books' => "SELECT COUNT(*) FROM library_books WHERE deleted_at IS NULL AND status = 'published'",
        'videos' => "SELECT COUNT(*) FROM videos WHERE deleted_at IS NULL AND status = 'published'",
        'marked' => "SELECT COUNT(*) FROM assignment_submissions WHERE deleted_at IS NULL AND status IN ('graded', 'returned')",
        'live_lessons' => "SELECT COUNT(*) FROM live_classes WHERE deleted_at IS NULL AND status = 'ended'",
    ];

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * GET /api/public/stats
     */
    public function index(): void
    {
        $stats = [];
        foreach (self::QUERIES as $key => $sql) {
            try {
                $stats[$key] = (int) $this->db->query($sql)->fetchColumn();
            } catch (\Throwable $e) {
                // Leave this one out
            }
        }
        header('Cache-Control: public, max-age=600');
        $this->success($stats);
    }
}
