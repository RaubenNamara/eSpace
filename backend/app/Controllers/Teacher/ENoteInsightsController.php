<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Reading insights for one of the teacher's eNote topics: page by page, how many students reached
 * it, how many stopped there (it's where they are and they haven't been back for a while), how many
 * came back to it, the time spent on it and the highlights made on it - the pages students stop on
 * or keep coming back to are often the confusing ones (enote_page_views, migration 103).
 *
 * GET /teacher/enotes/topics/{id}/insights
 */
class ENoteInsightsController extends Controller
{
    // A student who hasn't read the topic for this long, and hasn't finished it, stopped where they are
    private const STOPPED_AFTER_DAYS = 3;
    // Flag a page when at least this share of its readers stopped on it, or came back to it
    private const STOP_FLAG = 0.2;
    private const REREAD_FLAG = 0.3;
    private const MIN_READERS = 3;

    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT id, title FROM enote_topics WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $id, $teacherId]);
        $topic = $stmt->fetch();
        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }
        $topicId = (int) $topic['id'];

        $stmt = $db->prepare("SELECT id, title FROM enote_pages WHERE topic_id = ? AND is_active = 1 AND deleted_at IS NULL ORDER BY order_number, id");
        $stmt->execute([$topicId]);
        $pages = $stmt->fetchAll();

        // Who has opened the topic, finished it, and where each one is
        $stmt = $db->prepare(
            "SELECT current_page_id, completed_at, last_read_at FROM enote_progress WHERE topic_id = ?"
        );
        $stmt->execute([$topicId]);
        $readers = 0;
        $completed = 0;
        $stopped = [];
        $cutoff = time() - self::STOPPED_AFTER_DAYS * 86400;
        foreach ($stmt->fetchAll() as $p) {
            $readers++;
            if ($p['completed_at']) {
                $completed++;
            } elseif ($p['current_page_id'] && $p['last_read_at'] && strtotime($p['last_read_at']) < $cutoff) {
                $stopped[(int) $p['current_page_id']] = ($stopped[(int) $p['current_page_id']] ?? 0) + 1;
            }
        }

        $views = [];
        try {
            $stmt = $db->prepare(
                "SELECT page_id, COUNT(*) AS reached, SUM(views > 1) AS reread, SUM(views) AS views,
                        SUM(seconds) AS seconds, SUM(seconds > 0) AS timed
                 FROM enote_page_views WHERE topic_id = ? GROUP BY page_id"
            );
            $stmt->execute([$topicId]);
            foreach ($stmt->fetchAll() as $v) {
                $views[(int) $v['page_id']] = $v;
            }
        } catch (\PDOException $e) {
            // migration 103 not run yet
        }

        $stmt = $db->prepare(
            "SELECT h.page_id, COUNT(DISTINCT h.student_id) AS students FROM enote_page_highlights h
             INNER JOIN enote_pages p ON p.id = h.page_id WHERE p.topic_id = ? GROUP BY h.page_id"
        );
        $stmt->execute([$topicId]);
        $highlights = array_column($stmt->fetchAll(), 'students', 'page_id');

        $out = [];
        foreach ($pages as $i => $page) {
            $pid = (int) $page['id'];
            $v = $views[$pid] ?? null;
            $reached = $v ? (int) $v['reached'] : 0;
            $reread = $v ? (int) $v['reread'] : 0;
            $stoppedHere = $stopped[$pid] ?? 0;
            $isLast = $i === count($pages) - 1;
            $flags = [];
            if ($reached >= self::MIN_READERS && !$isLast && $stoppedHere / $reached >= self::STOP_FLAG) {
                $flags[] = 'stopped';
            }
            if ($reached >= self::MIN_READERS && $reread / $reached >= self::REREAD_FLAG) {
                $flags[] = 'reread';
            }
            $out[] = [
                'id' => $pid,
                'number' => $i + 1,
                'title' => $page['title'],
                'reached' => $reached,
                'stopped' => $stoppedHere,
                'reread' => $reread,
                'views' => $v ? (int) $v['views'] : 0,
                'avg_seconds' => $v && (int) $v['timed'] > 0 ? (int) round((int) $v['seconds'] / (int) $v['timed']) : null,
                'highlighted_by' => (int) ($highlights[$pid] ?? 0),
                'flags' => $flags,
            ];
        }

        $this->success([
            'topic' => ['id' => $topicId, 'title' => $topic['title']],
            'readers' => $readers,
            'completed' => $completed,
            'stopped_after_days' => self::STOPPED_AFTER_DAYS,
            'pages' => $out,
        ]);
    }
}
