<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Student\ENoteController as StudentENotes;

/**
 * "Explain it back": after an eNote page, a student puts it in one sentence of their own. Unlike
 * their private page summary, the teacher sees these - all of a class's sentences page by page,
 * which shows at a glance where a page was misunderstood.
 *
 * GET /student/enotes/topics/{id}/explanations    this student's sentences for the topic
 * PUT /student/enotes/pages/{pageId}/explanation   {body}  (empty removes it)
 * GET /teacher/enotes/topics/{id}/explanations    every student's, by page (the topic's teacher)
 */
class ENoteExplanationController extends Controller
{
    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function visibleTopic(int $topicId, int $studentId): bool
    {
        $stmt = $this->db()->prepare("SELECT 1 FROM enote_topics et WHERE et.id = :id AND " . StudentENotes::visibilityClause());
        $stmt->execute(['id' => $topicId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        return (bool) $stmt->fetchColumn();
    }

    public function mine(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = (int) ($_SESSION['user_id'] ?? 0);
        $topicId = (int) $this->routeParam('id');
        if (!$this->visibleTopic($topicId, $studentId)) {
            $this->notFound('Topic not found');
            return;
        }
        $stmt = $this->db()->prepare("SELECT page_id, body FROM enote_explanations WHERE topic_id = ? AND student_id = ?");
        $stmt->execute([$topicId, $studentId]);
        $out = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $out[(string) $r['page_id']] = $r['body'];
        }
        $this->success(['explanations' => (object) $out]);
    }

    public function save(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = (int) ($_SESSION['user_id'] ?? 0);
        $pageId = (int) $this->routeParam('pageId');
        $stmt = $this->db()->prepare("SELECT topic_id FROM enote_pages WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$pageId]);
        $topicId = (int) $stmt->fetchColumn();
        if (!$topicId || !$this->visibleTopic($topicId, $studentId)) {
            $this->notFound('Page not found');
            return;
        }
        $body = trim(preg_replace('/\s+/u', ' ', mb_substr((string) $this->input('body', ''), 0, 400)) ?? '');
        if ($body === '') {
            $this->db()->prepare("DELETE FROM enote_explanations WHERE page_id = ? AND student_id = ?")->execute([$pageId, $studentId]);
            $this->success([], 'Removed');
            return;
        }
        $this->db()->prepare(
            "INSERT INTO enote_explanations (topic_id, page_id, student_id, body) VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE body = VALUES(body)"
        )->execute([$topicId, $pageId, $studentId, $body]);
        \eSpace\App\Services\RewardService::recordLearningDay($studentId);
        $this->success([], 'Saved');
    }

    public function forTeacher(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
        $topicId = (int) $this->routeParam('id');
        $db = $this->db();
        $stmt = $db->prepare("SELECT id, title FROM enote_topics WHERE id = ? AND teacher_id = ? AND deleted_at IS NULL");
        $stmt->execute([$topicId, $teacherId]);
        $topic = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }
        $stmt = $db->prepare("SELECT id, title, order_number FROM enote_pages WHERE topic_id = ? AND deleted_at IS NULL ORDER BY order_number");
        $stmt->execute([$topicId]);
        $pages = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $p) {
            $pages[(int) $p['id']] = ['id' => (int) $p['id'], 'number' => (int) $p['order_number'], 'title' => html_entity_decode((string) $p['title'], ENT_QUOTES, 'UTF-8'), 'explanations' => []];
        }
        $stmt = $db->prepare(
            "SELECT e.page_id, e.body, e.updated_at, s.first_name, s.last_name, c.name AS class_name, c.stream_name
               FROM enote_explanations e
               JOIN students s ON s.id = e.student_id
               LEFT JOIN classes c ON c.id = s.class_id
              WHERE e.topic_id = ? ORDER BY e.updated_at DESC"
        );
        $stmt->execute([$topicId]);
        $total = 0;
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            if (!isset($pages[(int) $r['page_id']])) {
                continue;
            }
            $pages[(int) $r['page_id']]['explanations'][] = [
                'student' => trim($r['first_name'] . ' ' . $r['last_name']),
                'class' => trim(($r['class_name'] ?? '') . ' ' . ($r['stream_name'] ?? '')),
                'body' => $r['body'],
                'at' => $r['updated_at'],
            ];
            $total++;
        }
        $this->success(['topic' => ['id' => (int) $topic['id'], 'title' => $topic['title']], 'pages' => array_values($pages), 'total' => $total]);
    }
}
