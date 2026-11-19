<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\GeminiNotesAnswerService;

/**
 * Ask my notes: a learner types a question ("what is osmosis?") and gets a short answer drawn only
 * from the eNotes they can read, with links to the pages it came from.
 *
 * The pages are found here first - by the question's words, among the published topics this
 * learner may read (the eNotes visibility rule) - and only those pages go to the AI. So the
 * search always works: with no AI key, in the demo, or past the day's limit of AI answers, the
 * learner still gets the best matching pages to read.
 */
class AskNotesController extends Controller
{
    /** AI answers per learner per day; asking more still finds the pages */
    private const DAILY_AI = 15;
    private const MAX_SOURCES = 4;
    private const EXTRACT_CHARS = 2400;

    private const STOP = ['what', 'which', 'when', 'where', 'who', 'whom', 'whose', 'why', 'how', 'the', 'and', 'for', 'are',
        'was', 'were', 'is', 'am', 'be', 'been', 'being', 'does', 'did', 'do', 'doing', 'has', 'have', 'had', 'with', 'from',
        'that', 'this', 'these', 'those', 'into', 'onto', 'about', 'between', 'explain', 'describe', 'define', 'meaning',
        'mean', 'means', 'state', 'give', 'list', 'name', 'tell', 'can', 'could', 'would', 'should', 'will', 'shall', 'may',
        'might', 'its', 'it', 'they', 'them', 'their', 'there', 'then', 'than', 'you', 'your', 'our', 'his', 'her', 'not',
        'any', 'all', 'some', 'more', 'most', 'also', 'such', 'very', 'please', 'example', 'examples', 'difference', 'use',
        'used', 'uses', 'using', 'make', 'makes', 'made', 'get', 'gets', 'find', 'show', 'one', 'two', 'way', 'ways', 'happens', 'happen', 'work', 'works', 'called', 'term', 'terms'];

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function studentId(): ?int
    {
        if (!$this->isAuthenticated() || $this->getCurrentUserRole() !== 'student') {
            return null;
        }
        return (int) $_SESSION['user_id'];
    }

    private function usedToday(int $studentId): int
    {
        $stmt = $this->db()->prepare("SELECT COUNT(*) FROM student_note_questions WHERE student_id = ? AND used_ai = 1 AND created_at >= CURDATE()");
        $stmt->execute([$studentId]);
        return (int) $stmt->fetchColumn();
    }

    private function aiAvailable(): bool
    {
        return empty($_SESSION['demo']) && (new GeminiNotesAnswerService())->isConfigured();
    }

    /** GET /student/ask-notes - recent questions and how many AI answers are left today */
    public function index(): void
    {
        $sid = $this->studentId();
        if (!$sid) {
            $this->forbidden();
            return;
        }
        $stmt = $this->db()->prepare(
            "SELECT id, question, answer, found, used_ai, sources, created_at FROM student_note_questions
              WHERE student_id = ? ORDER BY id DESC LIMIT 60"
        );
        $stmt->execute([$sid]);
        $recent = array_map(static function ($r) {
            return [
                'id' => (int) $r['id'],
                'question' => $r['question'],
                'answer' => $r['answer'],
                'found' => (bool) $r['found'],
                'used_ai' => (bool) $r['used_ai'],
                'sources' => json_decode((string) $r['sources'], true) ?: [],
                'asked_at' => $r['created_at'],
            ];
        }, $stmt->fetchAll(\PDO::FETCH_ASSOC));
        // each question once (its latest asking), the ten most recent
        $seen = [];
        $recent = array_slice(array_values(array_filter($recent, function ($r) use (&$seen) {
            $k = mb_strtolower(trim($r['question']));
            if (isset($seen[$k])) return false;
            return $seen[$k] = true;
        })), 0, 10);
        $ai = $this->aiAvailable();
        $this->success([
            'recent' => $recent,
            'ai_available' => $ai,
            'left_today' => $ai ? max(0, self::DAILY_AI - $this->usedToday($sid)) : 0,
            'daily_limit' => self::DAILY_AI,
        ]);
    }

    /** the question's searchable words: lower case, no small or question words, roughly singular */
    private static function terms(string $q): array
    {
        $words = preg_split('/[^\p{L}\p{N}]+/u', mb_strtolower($q)) ?: [];
        $out = [];
        foreach ($words as $w) {
            if (mb_strlen($w) < 3 || in_array($w, self::STOP, true) || ctype_digit($w)) continue;
            // "cells" finds "cell", "reactions" finds "reaction"; short words stay whole
            if (mb_strlen($w) > 4 && str_ends_with($w, 'ies')) $w = mb_substr($w, 0, -3) . 'y';
            elseif (mb_strlen($w) > 4 && preg_match('/(ss|us|is)$/u', $w) !== 1 && str_ends_with($w, 's')) $w = mb_substr($w, 0, -1);
            $out[$w] = true;
        }
        return array_slice(array_keys($out), 0, 8);
    }

    private static function plain(string $html): string
    {
        $t = preg_replace('#<(script|style)[^>]*>.*?</\1>#is', ' ', $html) ?? $html;
        $t = preg_replace('#<(br|/p|/li|/h[1-6]|/div|/tr)[^>]*>#i', "\n", $t) ?? $t;
        $t = html_entity_decode(strip_tags($t), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $t = preg_replace("/[ \t\x{00A0}]+/u", ' ', $t) ?? $t;
        return trim(preg_replace("/\n\s*\n+/", "\n", $t) ?? $t);
    }

    /** a short piece of the page around the first word that matched */
    private static function snippet(string $text, array $terms): string
    {
        $lower = mb_strtolower($text);
        $at = null;
        foreach ($terms as $t) {
            $p = mb_strpos($lower, $t);
            if ($p !== false && ($at === null || $p < $at)) $at = $p;
        }
        $start = max(0, ($at ?? 0) - 70);
        $s = trim(mb_substr(str_replace("\n", ' ', $text), $start, 230));
        return ($start > 0 ? '…' : '') . $s . (mb_strlen($text) > $start + 230 ? '…' : '');
    }

    /** POST /student/ask-notes  { question } */
    public function ask(): void
    {
        $sid = $this->studentId();
        if (!$sid) {
            $this->forbidden();
            return;
        }
        $question = trim(preg_replace('/\s+/u', ' ', (string) $this->input('question', '')) ?? '');
        if (mb_strlen($question) < 3) {
            $this->validationError(['question' => 'Type a question first.']);
            return;
        }
        $question = mb_substr($question, 0, 300);
        $terms = self::terms($question);
        if (!$terms) {
            $this->validationError(['question' => 'Add the key word - for example "What is osmosis?"']);
            return;
        }

        $db = $this->db();
        $like = [];
        $params = ['student_id' => $sid, 'student_id_te' => $sid];
        foreach ($terms as $i => $t) {
            $like[] = "ep.content LIKE :c{$i} OR ep.title LIKE :p{$i} OR et.title LIKE :t{$i}";
            $params["c{$i}"] = $params["p{$i}"] = $params["t{$i}"] = '%' . $t . '%';
        }
        $stmt = $db->prepare(
            "SELECT ep.id, ep.title, ep.content, ep.topic_id, et.title AS topic, COALESCE(s.name, '') AS subject,
                    (SELECT COUNT(*) FROM enote_pages p2 WHERE p2.topic_id = ep.topic_id AND p2.is_active = 1 AND p2.deleted_at IS NULL
                        AND (p2.order_number < ep.order_number OR (p2.order_number = ep.order_number AND p2.id <= ep.id))) AS page_number
               FROM enote_pages ep
               JOIN enote_topics et ON et.id = ep.topic_id
               LEFT JOIN subjects s ON s.id = et.subject_id
              WHERE ep.is_active = 1 AND ep.deleted_at IS NULL
                AND " . ENoteController::visibilityClause() . "
                AND (" . implode(' OR ', $like) . ")
              LIMIT 400"
        );
        $stmt->execute($params);

        // score: how many of the question's words a page has (most of all), how often, and in its titles
        $scored = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $text = self::plain((string) $r['content']);
            $lower = mb_strtolower($text);
            $title = mb_strtolower((string) $r['title']);
            $topic = mb_strtolower((string) $r['topic']);
            $hits = 0;
            $score = 0.0;
            foreach ($terms as $t) {
                $n = mb_substr_count($lower, $t);
                $inTitle = str_contains($title, $t);
                $inTopic = str_contains($topic, $t);
                if ($n || $inTitle || $inTopic) $hits++;
                $score += min($n, 6) + ($inTitle ? 4 : 0) + ($inTopic ? 3 : 0);
            }
            $score += $hits * $hits * 6;
            if (mb_strlen($text) < 40) $score -= 5;
            $r['text'] = $text;
            $r['hits'] = $hits;
            $r['score'] = $score;
            $scored[] = $r;
        }
        usort($scored, fn ($a, $b) => $b['score'] <=> $a['score']);
        // the same lesson published twice reads the same: keep one page per topic title and page title
        $sources = [];
        $seen = [];
        foreach ($scored as $r) {
            $k = mb_strtolower($r['subject'] . '|' . $r['topic'] . '|' . $r['page_number'] . '|' . $r['title']);
            if (isset($seen[$k])) continue;
            $seen[$k] = true;
            $sources[] = $r;
            if (count($sources) >= self::MAX_SOURCES) break;
        }
        // with several words asked, pages matching only one of them are a poor fit when better ones exist
        if ($sources && count($terms) > 1 && $sources[0]['hits'] > 1) {
            $sources = array_values(array_filter($sources, fn ($r) => $r['hits'] > 1));
        }

        // a near miss: of several words asked, the best page has half or fewer ("plants" in "power plants")
        $close = !$sources || count($terms) < 2 || $sources[0]['hits'] * 2 > count($terms);

        $out = array_map(fn ($r) => [
            'page_id' => (int) $r['id'],
            'topic_id' => (int) $r['topic_id'],
            'subject' => $r['subject'],
            'topic' => $r['topic'],
            'page_title' => $r['title'],
            'page_number' => (int) $r['page_number'],
            'snippet' => self::snippet($r['text'], $terms),
        ], $sources);

        $answer = null;
        $found = false;
        $usedAi = false;
        $note = null;
        $ai = $this->aiAvailable();
        $left = $ai ? max(0, self::DAILY_AI - $this->usedToday($sid)) : 0;

        if (!$sources) {
            $note = 'Nothing in your eNotes matches that yet. Try other words, or ask your teacher.';
        } elseif (!$close) {
            $note = 'Nothing in your eNotes answers that closely. These pages share some of its words - or ask your teacher.';
        } elseif (!$ai) {
            $note = 'Here are the pages in your eNotes that match.';
        } elseif ($left <= 0) {
            $note = "You've used today's " . self::DAILY_AI . ' answers - here are the pages that match. More answers tomorrow.';
        } else {
            $level = $db->prepare("SELECT CONCAT(c.name, ' (', c.level, ')') FROM students st JOIN classes c ON c.id = st.class_id WHERE st.id = ?");
            $level->execute([$sid]);
            $extracts = [];
            foreach ($sources as $i => $r) {
                $extracts[$i + 1] = ['subject' => $r['subject'], 'topic' => $r['topic'] . ($r['title'] ? ' - ' . $r['title'] : ''), 'text' => mb_substr($r['text'], 0, self::EXTRACT_CHARS)];
            }
            try {
                $res = (new GeminiNotesAnswerService())->answer($question, $extracts, $level->fetchColumn() ?: null);
                $usedAi = true;
                $found = $res['found'];
                $answer = $res['answer'];
                $left--;
                // put the pages the answer used first, marked
                if ($found && $res['sources']) {
                    $used = array_flip(array_map(fn ($n) => $n - 1, $res['sources']));
                    foreach ($out as $i => &$o) $o['used'] = isset($used[$i]);
                    unset($o);
                    usort($out, fn ($a, $b) => (int) !empty($b['used']) <=> (int) !empty($a['used']));
                }
            } catch (\Throwable $e) {
                error_log('Ask my notes AI failed: ' . $e->getMessage());
                $note = 'The answer could not be written just now - here are the pages that match.';
            }
        }

        $db->prepare("INSERT INTO student_note_questions (student_id, question, answer, found, used_ai, sources) VALUES (?, ?, ?, ?, ?, ?)")
            ->execute([$sid, $question, $answer, $found ? 1 : 0, $usedAi ? 1 : 0, json_encode(array_slice($out, 0, self::MAX_SOURCES))]);

        $this->success([
            'question' => $question,
            'answer' => $answer,
            'found' => $found,
            'used_ai' => $usedAi,
            'note' => $note,
            'close' => $close,
            'sources' => $out,
            'ai_available' => $ai,
            'left_today' => $ai ? max(0, $left) : 0,
        ]);
    }
}
