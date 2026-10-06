<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Student\ENoteController as StudentENotes;
use eSpace\App\Controllers\Student\ItemBankController as StudentItemBank;
use eSpace\App\Utils\HtmlSanitizer;

/**
 * Question papers written in eSpace, page by page like eNotes (item_bank_questions.question_type
 * = 'paper', its questions in item_bank_pages), and Item Bank questions placed on eNote pages
 * (enote_page_items) so students practise them where the topic is taught - a page of a written
 * paper, or a page of an uploaded PDF paper. A question is set once and reused wherever it fits.
 *
 * Teacher
 *   GET    /teacher/itembank/{id}/pages             the paper's questions (with answers)
 *   POST   /teacher/itembank/{id}/pages             add a question  {after?}
 *   PUT    /teacher/itembank/pages/{pageId}         {content, answer_type, options, correct, model_answer, marks}
 *   DELETE /teacher/itembank/pages/{pageId}
 *   POST   /teacher/itembank/{id}/pages/reorder     {ids: [...]}
 *   GET    /teacher/itembank/linkable?subject_id=   papers and PDFs that can be placed on eNote pages
 *   GET    /teacher/enotes/pages/{pageId}/items     what's placed on an eNote page
 *   PUT    /teacher/enotes/pages/{pageId}/items     {items: [{item_id, item_page}]}
 * Student
 *   GET    /student/itembank/{id}/paper             the questions, without answers
 *   POST   /student/itembank/{id}/pages/{n}/answer  {answer, enote_page_id?}  -> right/wrong and the answer
 *   GET    /student/enotes/topics/{id}/practice     the questions placed on a topic's pages
 */
class ItemBankPaperController extends Controller
{
    private const TYPES = ['none', 'single', 'multiple', 'true_false', 'short', 'written'];

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function teacherId(): int
    {
        return ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
    }

    /** A paper this teacher wrote */
    private function ownPaper(int $id): ?array
    {
        $stmt = $this->db()->prepare(
            "SELECT id, question_text AS title, status, subject_id, department_id FROM item_bank_questions
              WHERE id = ? AND created_by = ? AND question_type = 'paper' AND deleted_at IS NULL"
        );
        $stmt->execute([$id, $this->teacherId()]);
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }

    private function pageOut(array $p, bool $withAnswers): array
    {
        $out = [
            'id' => (int) $p['id'],
            'page_number' => (int) $p['page_number'],
            'content' => $p['content'],
            'answer_type' => $p['answer_type'],
            'options' => $p['options'] !== null ? (json_decode((string) $p['options'], true) ?: []) : [],
            'marks' => $p['marks'] !== null ? (float) $p['marks'] : null,
        ];
        if ($withAnswers) {
            $out['correct'] = $p['correct'] !== null ? json_decode((string) $p['correct'], true) : null;
            $out['model_answer'] = $p['model_answer'];
        }
        return $out;
    }

    private function renumber(int $itemId): void
    {
        $db = $this->db();
        $stmt = $db->prepare("SELECT id FROM item_bank_pages WHERE item_id = ? AND deleted_at IS NULL ORDER BY page_number, id");
        $stmt->execute([$itemId]);
        $n = 0;
        $up = $db->prepare("UPDATE item_bank_pages SET page_number = ? WHERE id = ?");
        foreach ($stmt->fetchAll(\PDO::FETCH_COLUMN) as $pid) {
            $up->execute([++$n, (int) $pid]);
        }
        $db->prepare("UPDATE item_bank_questions SET total_pages = ?, updated_at = NOW() WHERE id = ?")->execute([$n, $itemId]);
    }

    // ------------------------------------------------------------------ teacher: writing a paper

    public function pages($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        // Their own paper, or (to reuse its questions, read-only) a published one from their department
        $paper = $this->ownPaper((int) $id);
        $mine = $paper !== null;
        if (!$paper) {
            $stmt = $this->db()->prepare(
                "SELECT id, question_text AS title, status, subject_id, department_id FROM item_bank_questions
                  WHERE id = :id AND question_type = 'paper' AND status = 'published' AND deleted_at IS NULL
                    AND department_id IN (SELECT department_id FROM teachers WHERE id = :t1 AND department_id IS NOT NULL
                                          UNION SELECT department_id FROM teacher_department_assignments WHERE teacher_id = :t2 AND deleted_at IS NULL)"
            );
            $stmt->execute(['id' => (int) $id, 't1' => $this->teacherId(), 't2' => $this->teacherId()]);
            $paper = $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
        }
        if (!$paper) {
            $this->notFound('Paper not found');
            return;
        }
        $stmt = $this->db()->prepare("SELECT * FROM item_bank_pages WHERE item_id = ? AND deleted_at IS NULL ORDER BY page_number");
        $stmt->execute([(int) $id]);
        $this->success([
            'paper' => ['id' => (int) $paper['id'], 'title' => html_entity_decode((string) $paper['title'], ENT_QUOTES, 'UTF-8'), 'status' => $paper['status'], 'subject_id' => (int) $paper['subject_id'], 'mine' => $mine],
            'pages' => array_map(fn ($p) => $this->pageOut($p, true), $stmt->fetchAll(\PDO::FETCH_ASSOC)),
        ]);
    }

    public function addPage($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $itemId = (int) $id;
        if (!$this->ownPaper($itemId)) {
            $this->notFound('Paper not found');
            return;
        }
        $db = $this->db();
        $after = (int) $this->input('after', 0);
        if ($after > 0) {
            // Make room straight after the given question
            $db->prepare("UPDATE item_bank_pages SET page_number = page_number + 1 WHERE item_id = ? AND page_number > ? AND deleted_at IS NULL")->execute([$itemId, $after]);
            $number = $after + 1;
        } else {
            $stmt = $db->prepare("SELECT COALESCE(MAX(page_number), 0) + 1 FROM item_bank_pages WHERE item_id = ? AND deleted_at IS NULL");
            $stmt->execute([$itemId]);
            $number = (int) $stmt->fetchColumn();
        }
        $db->prepare("INSERT INTO item_bank_pages (item_id, page_number, content, answer_type, marks) VALUES (?, ?, '', 'single', 1)")
            ->execute([$itemId, $number]);
        $pageId = (int) $db->lastInsertId();
        $this->renumber($itemId);
        $stmt = $db->prepare("SELECT * FROM item_bank_pages WHERE id = ?");
        $stmt->execute([$pageId]);
        $this->success(['page' => $this->pageOut($stmt->fetch(\PDO::FETCH_ASSOC), true)], 'Question added');
    }

    private function ownPage(int $pageId): ?array
    {
        $stmt = $this->db()->prepare(
            "SELECT p.* FROM item_bank_pages p JOIN item_bank_questions q ON q.id = p.item_id
              WHERE p.id = ? AND p.deleted_at IS NULL AND q.created_by = ? AND q.deleted_at IS NULL"
        );
        $stmt->execute([$pageId, $this->teacherId()]);
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }

    public function updatePage($pageId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $page = $this->ownPage((int) $pageId);
        if (!$page) {
            $this->notFound('Question not found');
            return;
        }
        $data = $this->input();
        $sets = [];
        $vals = [];
        if (array_key_exists('content', $data)) {
            $sets[] = 'content = ?';
            $vals[] = HtmlSanitizer::sanitize((string) $data['content']);
        }
        $type = $data['answer_type'] ?? $page['answer_type'];
        if (!in_array($type, self::TYPES, true)) {
            $this->validationError(['answer_type' => 'Unknown answer type']);
            return;
        }
        if (array_key_exists('answer_type', $data)) {
            $sets[] = 'answer_type = ?';
            $vals[] = $type;
        }
        if (array_key_exists('options', $data)) {
            $opts = array_values(array_map(static fn ($o) => mb_substr(trim(strip_tags((string) $o)), 0, 500), (array) $data['options']));
            $sets[] = 'options = ?';
            $vals[] = json_encode(array_slice($opts, 0, 10));
        }
        if (array_key_exists('correct', $data)) {
            // single: index; multiple: [indexes]; true_false: bool; short: [accepted answers]
            $c = $data['correct'];
            $clean = match ($type) {
                'single' => is_numeric($c) ? (int) $c : null,
                'multiple' => array_values(array_unique(array_map('intval', (array) $c))),
                'true_false' => $c === null ? null : (bool) $c,
                'short' => array_values(array_filter(array_map(static fn ($a) => mb_substr(trim((string) $a), 0, 200), (array) $c), static fn ($a) => $a !== '')),
                default => null,
            };
            $sets[] = 'correct = ?';
            $vals[] = $clean === null ? null : json_encode($clean);
        }
        if (array_key_exists('model_answer', $data)) {
            $sets[] = 'model_answer = ?';
            $vals[] = $data['model_answer'] !== null ? HtmlSanitizer::sanitize((string) $data['model_answer']) : null;
        }
        if (array_key_exists('marks', $data)) {
            $sets[] = 'marks = ?';
            $vals[] = $data['marks'] === null || $data['marks'] === '' ? null : max(0, min(100, (float) $data['marks']));
        }
        if (!$sets) {
            $this->success([], 'Nothing to change');
            return;
        }
        $vals[] = (int) $pageId;
        $this->db()->prepare("UPDATE item_bank_pages SET " . implode(', ', $sets) . " WHERE id = ?")->execute($vals);
        $this->db()->prepare("UPDATE item_bank_questions SET updated_at = NOW() WHERE id = ?")->execute([(int) $page['item_id']]);
        $this->success([], 'Saved');
    }

    public function deletePage($pageId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $page = $this->ownPage((int) $pageId);
        if (!$page) {
            $this->notFound('Question not found');
            return;
        }
        $this->db()->prepare("UPDATE item_bank_pages SET deleted_at = NOW() WHERE id = ?")->execute([(int) $pageId]);
        // eNote pages pointing at a question after this one keep pointing at the same question
        $this->db()->prepare("UPDATE enote_page_items SET item_page = item_page - 1 WHERE item_id = ? AND item_page > ?")
            ->execute([(int) $page['item_id'], (int) $page['page_number']]);
        $this->db()->prepare("DELETE FROM enote_page_items WHERE item_id = ? AND item_page = ?")
            ->execute([(int) $page['item_id'], (int) $page['page_number']]);
        $this->renumber((int) $page['item_id']);
        $this->success([], 'Question removed');
    }

    public function reorder($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $itemId = (int) $id;
        if (!$this->ownPaper($itemId)) {
            $this->notFound('Paper not found');
            return;
        }
        $db = $this->db();
        $stmt = $db->prepare("SELECT id, page_number FROM item_bank_pages WHERE item_id = ? AND deleted_at IS NULL");
        $stmt->execute([$itemId]);
        $oldNumber = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $oldNumber[(int) $r['id']] = (int) $r['page_number'];
        }
        $ids = array_values(array_filter(array_map('intval', (array) $this->input('ids', [])), static fn ($i) => isset($oldNumber[$i])));
        if (count($ids) !== count($oldNumber)) {
            $this->validationError(['ids' => 'Send every question once']);
            return;
        }
        $db->beginTransaction();
        try {
            $up = $db->prepare("UPDATE item_bank_pages SET page_number = ? WHERE id = ?");
            $moveLink = $db->prepare("UPDATE enote_page_items SET item_page = ? WHERE id = ?");
            $links = $db->prepare("SELECT id, item_page FROM enote_page_items WHERE item_id = ?");
            $links->execute([$itemId]);
            $linkRows = $links->fetchAll(\PDO::FETCH_ASSOC);
            $newFor = [];
            foreach ($ids as $i => $pid) {
                $up->execute([$i + 1, $pid]);
                $newFor[$oldNumber[$pid]] = $i + 1;
            }
            // eNote pages keep pointing at the same question, wherever it moved to
            foreach ($linkRows as $l) {
                if (isset($newFor[(int) $l['item_page']])) {
                    $moveLink->execute([$newFor[(int) $l['item_page']], (int) $l['id']]);
                }
            }
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            $this->serverError('Could not reorder');
            return;
        }
        $this->success([], 'Reordered');
    }

    /** Papers (written or uploaded) from the teacher's department that can go on an eNote page */
    public function linkable(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = $this->db();
        $where = "q.deleted_at IS NULL AND q.question_type IN ('paper', 'pdf')
                  AND q.department_id IN (
                      SELECT department_id FROM teachers WHERE id = :t1 AND department_id IS NOT NULL
                      UNION SELECT department_id FROM teacher_department_assignments WHERE teacher_id = :t2 AND deleted_at IS NULL)
                  AND (q.status = 'published' OR q.created_by = :t3)";
        $params = ['t1' => $this->teacherId(), 't2' => $this->teacherId(), 't3' => $this->teacherId()];
        $subject = (int) $this->query('subject_id', 0);
        if ($subject) {
            $where .= ' AND q.subject_id = :subject';
            $params['subject'] = $subject;
        }
        $stmt = $db->prepare(
            "SELECT q.id, q.question_text AS title, q.question_type, q.status, q.total_pages, q.file_path, q.subject_id, s.name AS subject_name,
                    t.first_name, t.last_name
               FROM item_bank_questions q
               LEFT JOIN subjects s ON s.id = q.subject_id
               LEFT JOIN teachers t ON t.id = q.created_by
              WHERE {$where} ORDER BY q.subject_id = :subject_first DESC, q.updated_at DESC LIMIT 200"
        );
        $stmt->execute(array_merge($params, ['subject_first' => $subject]));
        $items = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // For written papers, a one-line glimpse of each question to pick from
        $ids = array_map(static fn ($i) => (int) $i['id'], array_filter($items, static fn ($i) => $i['question_type'] === 'paper'));
        $glimpses = [];
        if ($ids) {
            $rows = $db->query("SELECT item_id, page_number, content, answer_type FROM item_bank_pages WHERE deleted_at IS NULL AND item_id IN (" . implode(',', $ids) . ") ORDER BY page_number")->fetchAll(\PDO::FETCH_ASSOC);
            foreach ($rows as $r) {
                $text = trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags((string) $r['content']), ENT_QUOTES, 'UTF-8')) ?? '');
                $glimpses[(int) $r['item_id']][] = ['page' => (int) $r['page_number'], 'text' => mb_strimwidth($text, 0, 110, '…'), 'answer_type' => $r['answer_type']];
            }
        }
        $this->success(['items' => array_map(static fn ($i) => [
            'id' => (int) $i['id'],
            'title' => html_entity_decode((string) $i['title'], ENT_QUOTES, 'UTF-8'),
            'kind' => $i['question_type'],
            'status' => $i['status'],
            'pages' => $i['total_pages'] !== null ? (int) $i['total_pages'] : null,
            'file_path' => $i['file_path'],
            'subject_id' => (int) $i['subject_id'],
            'subject' => $i['subject_name'],
            'teacher' => trim(($i['first_name'] ?? '') . ' ' . ($i['last_name'] ?? '')),
            'questions' => $glimpses[(int) $i['id']] ?? [],
        ], $items)]);
    }

    private function ownEnotePage(int $pageId): ?array
    {
        $stmt = $this->db()->prepare(
            "SELECT ep.id, ep.topic_id FROM enote_pages ep JOIN enote_topics et ON et.id = ep.topic_id
              WHERE ep.id = ? AND et.teacher_id = ? AND ep.deleted_at IS NULL AND et.deleted_at IS NULL"
        );
        $stmt->execute([$pageId, $this->teacherId()]);
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }

    private function linkedItems(array $pageIds, bool $forStudent, int $studentId = 0): array
    {
        if (!$pageIds) {
            return [];
        }
        $db = $this->db();
        $sql = "SELECT l.enote_page_id, l.item_id, l.item_page, q.question_text AS title, q.question_type, q.status, q.file_path, q.total_pages
                  FROM enote_page_items l JOIN item_bank_questions q ON q.id = l.item_id
                 WHERE l.enote_page_id IN (" . implode(',', array_map('intval', $pageIds)) . ") AND q.deleted_at IS NULL";
        $params = [];
        if ($forStudent) {
            $sql .= ' AND ' . StudentItemBank::visibilityClause();
            $params = ['student_id' => $studentId, 'student_id_te' => $studentId];
        }
        $stmt = $db->prepare(str_replace('q.status = \'published\'', 'q.status = \'published\'', $sql) . ' ORDER BY l.display_order, l.id');
        $stmt->execute($params);
        $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        $pageStmt = $db->prepare("SELECT * FROM item_bank_pages WHERE item_id = ? AND page_number = ? AND deleted_at IS NULL");
        $out = [];
        foreach ($rows as $r) {
            $item = [
                'item_id' => (int) $r['item_id'],
                'item_page' => (int) $r['item_page'],
                'title' => html_entity_decode((string) $r['title'], ENT_QUOTES, 'UTF-8'),
                'kind' => $r['question_type'],
                'status' => $r['status'],
                'file_path' => $r['question_type'] === 'pdf' ? $r['file_path'] : null,
                'question' => null,
            ];
            if ($r['question_type'] === 'paper') {
                $pageStmt->execute([(int) $r['item_id'], (int) $r['item_page']]);
                $p = $pageStmt->fetch(\PDO::FETCH_ASSOC);
                if (!$p) {
                    continue;
                }
                $item['question'] = $this->pageOut($p, !$forStudent);
            }
            $out[(int) $r['enote_page_id']][] = $item;
        }
        return $out;
    }

    public function enotePageItems($pageId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        if (!$this->ownEnotePage((int) $pageId)) {
            $this->notFound('Page not found');
            return;
        }
        $this->success(['items' => $this->linkedItems([(int) $pageId], false)[(int) $pageId] ?? []]);
    }

    public function saveEnotePageItems($pageId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $pageId = (int) $pageId;
        if (!$this->ownEnotePage($pageId)) {
            $this->notFound('Page not found');
            return;
        }
        $db = $this->db();
        $items = array_slice((array) $this->input('items', []), 0, 6);
        $check = $db->prepare(
            "SELECT question_type, total_pages FROM item_bank_questions WHERE id = ? AND deleted_at IS NULL AND question_type IN ('paper', 'pdf')
               AND department_id IN (SELECT department_id FROM teachers WHERE id = ? AND department_id IS NOT NULL
                                     UNION SELECT department_id FROM teacher_department_assignments WHERE teacher_id = ? AND deleted_at IS NULL)"
        );
        $clean = [];
        foreach ($items as $i => $it) {
            $itemId = (int) ($it['item_id'] ?? 0);
            $itemPage = max(1, (int) ($it['item_page'] ?? 1));
            $check->execute([$itemId, $this->teacherId(), $this->teacherId()]);
            $row = $check->fetch(\PDO::FETCH_ASSOC);
            if (!$row) {
                continue;
            }
            if ($row['total_pages'] !== null && $itemPage > (int) $row['total_pages']) {
                $this->validationError(['items' => "That paper has only {$row['total_pages']} pages"]);
                return;
            }
            $clean["{$itemId}:{$itemPage}"] = [$itemId, $itemPage, $i];
        }
        $db->beginTransaction();
        $db->prepare("DELETE FROM enote_page_items WHERE enote_page_id = ?")->execute([$pageId]);
        $ins = $db->prepare("INSERT INTO enote_page_items (enote_page_id, item_id, item_page, display_order) VALUES (?, ?, ?, ?)");
        foreach ($clean as [$itemId, $itemPage, $order]) {
            $ins->execute([$pageId, $itemId, $itemPage, $order]);
        }
        $db->commit();
        $this->success(['items' => $this->linkedItems([$pageId], false)[$pageId] ?? []], 'Saved');
    }

    // ------------------------------------------------------------------------------- student

    private function visiblePaper(int $id, int $studentId): ?array
    {
        $stmt = $this->db()->prepare(
            "SELECT q.id, q.question_text AS title, q.question_type, q.total_pages, q.explanation, s.name AS subject_name
               FROM item_bank_questions q LEFT JOIN subjects s ON s.id = q.subject_id
              WHERE q.id = :id AND " . StudentItemBank::visibilityClause()
        );
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }

    public function studentPaper($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = (int) ($_SESSION['user_id'] ?? 0);
        $paper = $this->visiblePaper((int) $id, $studentId);
        if (!$paper || $paper['question_type'] !== 'paper') {
            $this->notFound('Paper not found');
            return;
        }
        $db = $this->db();
        $stmt = $db->prepare("SELECT * FROM item_bank_pages WHERE item_id = ? AND deleted_at IS NULL ORDER BY page_number");
        $stmt->execute([(int) $id]);
        // What the student got right last time, per question
        $done = $db->prepare("SELECT page_number, MAX(is_correct) AS ok FROM item_bank_attempts WHERE question_id = ? AND student_id = ? AND page_number IS NOT NULL GROUP BY page_number");
        $done->execute([(int) $id, $studentId]);
        $tried = [];
        foreach ($done->fetchAll(\PDO::FETCH_ASSOC) as $d) {
            $tried[(int) $d['page_number']] = $d['ok'] === null ? null : (bool) $d['ok'];
        }
        $this->success([
            'paper' => ['id' => (int) $paper['id'], 'title' => html_entity_decode((string) $paper['title'], ENT_QUOTES, 'UTF-8'), 'subject' => $paper['subject_name'], 'description' => $paper['explanation']],
            'pages' => array_map(fn ($p) => $this->pageOut($p, false) + ['tried' => array_key_exists((int) $p['page_number'], $tried), 'was_right' => $tried[(int) $p['page_number']] ?? null], $stmt->fetchAll(\PDO::FETCH_ASSOC)),
        ]);
    }

    /** Normalise a short answer for comparison: case, spaces and trailing full stops don't count */
    private static function norm(string $s): string
    {
        return rtrim(mb_strtolower(trim(preg_replace('/\s+/u', ' ', $s) ?? '')), '.');
    }

    public function answer($id, $n): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = (int) ($_SESSION['user_id'] ?? 0);
        $paper = $this->visiblePaper((int) $id, $studentId);
        if (!$paper || $paper['question_type'] !== 'paper') {
            $this->notFound('Paper not found');
            return;
        }
        $stmt = $this->db()->prepare("SELECT * FROM item_bank_pages WHERE item_id = ? AND page_number = ? AND deleted_at IS NULL");
        $stmt->execute([(int) $id, (int) $n]);
        $page = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$page) {
            $this->notFound('Question not found');
            return;
        }
        $answer = $this->input('answer');
        $correct = $page['correct'] !== null ? json_decode((string) $page['correct'], true) : null;
        $right = null; // null = not auto-checked (written answers, or no answer key)
        switch ($page['answer_type']) {
            case 'single':
                $right = $correct !== null ? ((int) $answer === (int) $correct) : null;
                break;
            case 'multiple':
                $given = array_map('intval', (array) $answer);
                sort($given);
                $want = array_map('intval', (array) $correct);
                sort($want);
                $right = $correct !== null ? ($given === $want) : null;
                break;
            case 'true_false':
                $right = $correct !== null ? ((bool) $answer === (bool) $correct) : null;
                break;
            case 'short':
                $accepted = array_map([self::class, 'norm'], (array) $correct);
                $right = $accepted ? in_array(self::norm((string) $answer), $accepted, true) : null;
                break;
        }

        $enotePage = (int) $this->input('enote_page_id', 0) ?: null;
        $this->db()->prepare(
            "INSERT INTO item_bank_attempts (question_id, page_number, enote_page_id, student_id, mode, answer, is_correct, time_spent_seconds, attempted_at)
             VALUES (?, ?, ?, ?, 'practice', ?, ?, 0, NOW())"
        )->execute([(int) $id, (int) $n, $enotePage, $studentId, mb_substr(is_array($answer) ? json_encode($answer) : (string) $answer, 0, 2000), $right === null ? null : (int) $right]);
        \eSpace\App\Services\RewardService::recordLearningDay($studentId);

        $this->success([
            'right' => $right,
            'correct' => $correct,
            'model_answer' => $page['model_answer'],
        ]);
    }

    public function enotePractice($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $studentId = (int) ($_SESSION['user_id'] ?? 0);
        $topicId = (int) $id;
        $db = $this->db();
        $stmt = $db->prepare("SELECT 1 FROM enote_topics et WHERE et.id = :id AND " . StudentENotes::visibilityClause());
        $stmt->execute(['id' => $topicId, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        if (!$stmt->fetchColumn()) {
            $this->notFound('Topic not found');
            return;
        }
        $stmt = $db->prepare("SELECT id FROM enote_pages WHERE topic_id = ? AND deleted_at IS NULL");
        $stmt->execute([$topicId]);
        $pageIds = array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN));
        $this->success(['by_page' => (object) $this->linkedItems($pageIds, true, $studentId)]);
    }
}
