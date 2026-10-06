<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Starting a term from one already taught: copy a past term's assessments into the new term as
 * drafts (questions, options, the teacher's drawings on them, classes and curriculum links all
 * come along, dates moved by the gap between the two terms), and move the scheme of work's
 * topic weeks across, unticked.
 *
 * GET  /teacher/term-copy?from_term=&to_term=   the terms, and what the source term holds
 * POST /teacher/term-copy                        {from_term, to_term, assignment_ids[], scheme}
 */
class TermCopyController extends Controller
{
    private function teacherId(): int
    {
        return ($_SESSION['role'] ?? null) === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : (int) ($_SESSION['user_id'] ?? 0);
    }

    private function db(): \PDO
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function terms(): array
    {
        return $this->db()->query(
            "SELECT t.id, t.name, t.start_date, t.end_date, t.is_current, t.academic_year_id, y.name AS year_name
               FROM terms t LEFT JOIN academic_years y ON y.id = t.academic_year_id
              WHERE t.deleted_at IS NULL ORDER BY t.start_date DESC"
        )->fetchAll(\PDO::FETCH_ASSOC);
    }

    /** The teacher's assessments belonging to a term - by term_id, or by date for older ones */
    private function termAssessments(array $term): array
    {
        $stmt = $this->db()->prepare(
            "SELECT a.id, a.title, a.status, a.assessment_category, a.due_date, a.created_at,
                    c.name AS class_name, c.stream_name, s.name AS subject_name,
                    (SELECT COUNT(*) FROM assignment_questions q WHERE q.assignment_id = a.id AND q.deleted_at IS NULL AND q.parent_question_id IS NULL) AS questions
               FROM assignments a
               LEFT JOIN classes c ON c.id = a.class_id
               LEFT JOIN subjects s ON s.id = a.subject_id
              WHERE a.teacher_id = ? AND a.deleted_at IS NULL
                AND (a.term_id = ? OR (a.term_id IS NULL AND DATE(a.created_at) BETWEEN ? AND ?))
              ORDER BY a.created_at"
        );
        $stmt->execute([$this->teacherId(), (int) $term['id'], substr((string) $term['start_date'], 0, 10), substr((string) $term['end_date'], 0, 10)]);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public function preview(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $terms = $this->terms();
        $byId = array_column($terms, null, 'id');
        $from = $byId[(int) $this->query('from_term', 0)] ?? null;

        $assessments = [];
        $scheme = 0;
        if ($from) {
            $assessments = array_map(static fn ($a) => [
                'id' => (int) $a['id'],
                'title' => $a['title'],
                'status' => $a['status'],
                'category' => $a['assessment_category'],
                'class' => trim(($a['class_name'] ?? '') . ' ' . ($a['stream_name'] ?? '')),
                'subject' => $a['subject_name'],
                'questions' => (int) $a['questions'],
                'due_date' => $a['due_date'],
            ], $this->termAssessments($from));
            $stmt = $this->db()->prepare("SELECT COUNT(*) FROM scheme_entries WHERE teacher_id = ? AND week_start BETWEEN ? AND ?");
            $stmt->execute([$this->teacherId(), substr((string) $from['start_date'], 0, 10), substr((string) $from['end_date'], 0, 10)]);
            $scheme = (int) $stmt->fetchColumn();
        }

        $this->success([
            'terms' => array_map(static fn ($t) => [
                'id' => (int) $t['id'],
                'name' => $t['name'],
                'year' => $t['year_name'],
                'start_date' => substr((string) $t['start_date'], 0, 10),
                'end_date' => substr((string) $t['end_date'], 0, 10),
                'is_current' => (int) $t['is_current'] === 1,
            ], $terms),
            'assessments' => $assessments,
            'scheme_topics' => $scheme,
        ]);
    }

    public function copy(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $teacherId = $this->teacherId();
        $terms = array_column($this->terms(), null, 'id');
        $from = $terms[(int) $this->input('from_term', 0)] ?? null;
        $to = $terms[(int) $this->input('to_term', 0)] ?? null;
        if (!$from || !$to || (int) $from['id'] === (int) $to['id']) {
            $this->validationError(['to_term' => 'Pick two different terms']);
            return;
        }

        $offset = (int) round((strtotime(substr((string) $to['start_date'], 0, 10)) - strtotime(substr((string) $from['start_date'], 0, 10))) / 86400);
        // Dates move by the gap between the terms' starts, but never past the new term's last day
        // (terms differ in length)
        $lastDay = strtotime(substr((string) $to['end_date'], 0, 10) . ' 23:59:59');
        $shift = static function (?string $dt) use ($offset, $lastDay): ?string {
            if (!$dt) {
                return null;
            }
            $moved = strtotime($dt . " {$offset} days");
            if ($moved > $lastDay) {
                $moved = strtotime(date('Y-m-d', $lastDay) . ' ' . date('H:i:s', strtotime($dt)));
            }
            return date('Y-m-d H:i:s', $moved);
        };

        $allowed = array_column($this->termAssessments($from), 'id');
        $ids = array_values(array_intersect(array_map('intval', (array) $this->input('assignment_ids', [])), array_map('intval', $allowed)));

        $db = $this->db();
        $copied = 0;
        $db->beginTransaction();
        try {
            foreach ($ids as $id) {
                $this->copyAssessment($db, $id, $to, $shift);
                $copied++;
            }

            $moved = 0;
            if ($this->input('scheme')) {
                $stmt = $db->prepare(
                    "UPDATE scheme_entries SET week_start = DATE_ADD(week_start, INTERVAL ? DAY), taught_at = NULL
                      WHERE teacher_id = ? AND week_start BETWEEN ? AND ?"
                );
                $stmt->execute([$offset, $teacherId, substr((string) $from['start_date'], 0, 10), substr((string) $from['end_date'], 0, 10)]);
                $moved = $stmt->rowCount();
            }
            $db->commit();
        } catch (\Throwable $e) {
            $db->rollBack();
            error_log('TermCopy failed: ' . $e->getMessage());
            $this->serverError('The copy could not be finished - nothing was changed.');
            return;
        }

        $this->success(['copied' => $copied, 'scheme_moved' => $moved, 'days_moved' => $offset], 'Copied');
    }

    /** Columns of a table, minus the ones a copy must not carry */
    private function columns(\PDO $db, string $table, array $skip): array
    {
        static $cache = [];
        $cache[$table] ??= array_column($db->query("SHOW COLUMNS FROM `{$table}`")->fetchAll(\PDO::FETCH_ASSOC), 'Field');
        return array_values(array_diff($cache[$table], $skip));
    }

    /** Copies one row, overriding some values; returns the new id */
    private function copyRow(\PDO $db, string $table, array $row, array $override, array $skip = ['id']): int
    {
        $cols = $this->columns($db, $table, $skip);
        $vals = [];
        foreach ($cols as $c) {
            $vals[] = array_key_exists($c, $override) ? $override[$c] : ($row[$c] ?? null);
        }
        $db->prepare("INSERT INTO `{$table}` (`" . implode('`,`', $cols) . "`) VALUES (" . implode(',', array_fill(0, count($cols), '?')) . ")")->execute($vals);
        return (int) $db->lastInsertId();
    }

    private function copyAssessment(\PDO $db, int $id, array $to, callable $shift): void
    {
        $stmt = $db->prepare("SELECT * FROM assignments WHERE id = ?");
        $stmt->execute([$id]);
        $a = $stmt->fetch(\PDO::FETCH_ASSOC);
        $now = date('Y-m-d H:i:s');
        $newId = $this->copyRow($db, 'assignments', $a, [
            'status' => 'draft',
            'is_published' => 0,
            'published_at' => null,
            'term_id' => (int) $to['id'],
            'academic_year_id' => $to['academic_year_id'],
            'academic_year' => $to['year_name'] ?? $a['academic_year'],
            'due_date' => $shift($a['due_date']),
            'open_at' => $shift($a['open_at']),
            'deadline_at' => $shift($a['deadline_at']),
            'created_at' => $now,
            'updated_at' => $now,
            'deleted_at' => null,
        ]);

        foreach (['assignment_classes', 'assignment_curriculum_topics', 'assignment_learning_outcomes'] as $table) {
            $stmt = $db->prepare("SELECT * FROM `{$table}` WHERE assignment_id = ?");
            $stmt->execute([$id]);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
                $over = ['assignment_id' => $newId];
                if (array_key_exists('created_at', $row)) { $over['created_at'] = $now; }
                if (array_key_exists('updated_at', $row)) { $over['updated_at'] = $now; }
                $this->copyRow($db, $table, $row, $over);
            }
        }

        // Questions: parents first, so each sub-question can point at its new parent
        $stmt = $db->prepare("SELECT * FROM assignment_questions WHERE assignment_id = ? AND deleted_at IS NULL ORDER BY parent_question_id IS NOT NULL, display_order, id");
        $stmt->execute([$id]);
        $map = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $q) {
            $parent = $q['parent_question_id'] !== null ? ($map[(int) $q['parent_question_id']] ?? null) : null;
            if ($q['parent_question_id'] !== null && $parent === null) {
                continue; // its parent was deleted - nothing to hang it on
            }
            $qid = $this->copyRow($db, 'assignment_questions', $q, [
                'assignment_id' => $newId, 'parent_question_id' => $parent, 'created_at' => $now, 'updated_at' => $now,
            ]);
            $map[(int) $q['id']] = $qid;

            foreach (['assignment_question_options', 'question_annotations'] as $table) {
                $s2 = $db->prepare("SELECT * FROM `{$table}` WHERE question_id = ?");
                $s2->execute([(int) $q['id']]);
                foreach ($s2->fetchAll(\PDO::FETCH_ASSOC) as $row) {
                    $over = ['question_id' => $qid];
                    if (array_key_exists('created_at', $row)) { $over['created_at'] = $now; }
                    if (array_key_exists('updated_at', $row)) { $over['updated_at'] = $now; }
                    $this->copyRow($db, $table, $row, $over);
                }
            }
        }
    }
}
