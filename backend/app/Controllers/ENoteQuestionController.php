<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Student\ENoteController as StudentENotes;
use eSpace\App\Services\NotificationService;

/**
 * Questions and answers under an eNote topic. A student asks (optionally about one page);
 * classmates who can read the topic and the teacher answer; the teacher marks the best answer and
 * can remove anything. Students see only topics they can read (the same rule as the reader);
 * teachers see topics in their department and moderate their own.
 *
 * Student:  GET    /student/enotes/{id}/questions
 *           POST   /student/enotes/{id}/questions          { body, page_id? }
 *           POST   /student/enote-questions/{id}/answers   { body }
 *           DELETE /student/enote-questions/{id}           (own)
 *           DELETE /student/enote-answers/{id}             (own)
 * Teacher:  GET    /teacher/enotes/{id}/questions
 *           GET    /teacher/enote-questions                questions on my topics still waiting for an answer
 *           POST   /teacher/enote-questions/{id}/answers   { body }
 *           POST   /teacher/enote-answers/{id}/endorse
 *           DELETE /teacher/enote-questions/{id}
 *           DELETE /teacher/enote-answers/{id}
 */
class ENoteQuestionController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function role(): string
    {
        return (string) ($_SESSION['role'] ?? '');
    }

    private function me(): int
    {
        return (int) ($_SESSION['user_id'] ?? 0);
    }

    private function teacherId(): int
    {
        return $this->role() === 'hod' ? (int) ($_SESSION['teacher_id'] ?? 0) : $this->me();
    }

    /** The topic, if the current user may see its questions */
    private function topic($db, int $topicId): ?array
    {
        if ($this->role() === 'student') {
            $stmt = $db->prepare("SELECT et.id, et.title, et.teacher_id FROM enote_topics et WHERE et.id = :id AND " . StudentENotes::visibilityClause());
            $stmt->execute(['id' => $topicId, 'student_id' => $this->me(), 'student_id_te' => $this->me()]);
            return $stmt->fetch() ?: null;
        }
        $stmt = $db->prepare(
            "SELECT et.id, et.title, et.teacher_id FROM enote_topics et
             WHERE et.id = ? AND et.deleted_at IS NULL AND (et.teacher_id = ? OR et.department_id = ?)"
        );
        $stmt->execute([$topicId, $this->teacherId(), (int) $this->getActiveDepartmentId()]);
        return $stmt->fetch() ?: null;
    }

    private function questionTopic($db, int $questionId): ?array
    {
        $stmt = $db->prepare("SELECT q.*, et.teacher_id, et.title AS topic_title FROM enote_questions q INNER JOIN enote_topics et ON et.id = q.topic_id WHERE q.id = ? AND q.deleted_at IS NULL");
        $stmt->execute([$questionId]);
        $q = $stmt->fetch();
        return $q && $this->topic($db, (int) $q['topic_id']) ? $q : null;
    }

    private function shortName(?string $first, ?string $last): string
    {
        $first = trim((string) $first);
        $last = trim((string) $last);
        $f = $first !== '' ? mb_strtoupper(mb_substr($first, 0, 1)) . mb_strtolower(mb_substr($first, 1)) : '';
        return trim($f . ($last !== '' ? ' ' . mb_strtoupper(mb_substr($last, 0, 1)) . '.' : ''));
    }

    private function body(): string
    {
        return mb_substr(trim(strip_tags((string) $this->input('body', ''))), 0, 2000);
    }

    // ------------------------------------------------------------------------------------------

    public function index(): void
    {
        $db = $this->getDb();
        $topic = $this->topic($db, (int) $this->routeParam('id'));
        if (!$topic) {
            $this->notFound('Topic not found');
            return;
        }
        $isOwner = $this->role() !== 'student' && (int) $topic['teacher_id'] === $this->teacherId();

        $stmt = $db->prepare(
            "SELECT q.id, q.page_id, q.student_id, q.body, q.created_at, st.first_name, st.last_name, p.order_number AS page_number
             FROM enote_questions q
             INNER JOIN students st ON st.id = q.student_id
             LEFT JOIN enote_pages p ON p.id = q.page_id
             WHERE q.topic_id = ? AND q.deleted_at IS NULL ORDER BY q.created_at DESC LIMIT 200"
        );
        $stmt->execute([(int) $topic['id']]);
        $questions = $stmt->fetchAll();
        $ids = array_map(fn($q) => (int) $q['id'], $questions);
        $answers = [];
        if ($ids) {
            $stmt = $db->prepare(
                "SELECT a.*, st.first_name AS s_first, st.last_name AS s_last, t.first_name AS t_first, t.last_name AS t_last
                 FROM enote_answers a
                 LEFT JOIN students st ON a.author_role = 'student' AND st.id = a.author_id
                 LEFT JOIN teachers t ON a.author_role IN ('teacher','hod') AND t.id = a.author_id
                 WHERE a.question_id IN (" . implode(',', array_fill(0, count($ids), '?')) . ") AND a.deleted_at IS NULL
                 ORDER BY a.endorsed DESC, a.created_at"
            );
            $stmt->execute($ids);
            foreach ($stmt->fetchAll() as $a) {
                $isTeacher = $a['author_role'] !== 'student';
                $answers[(int) $a['question_id']][] = [
                    'id' => (int) $a['id'],
                    'body' => $a['body'],
                    'author' => $isTeacher ? trim(($a['t_first'] ?? '') . ' ' . ($a['t_last'] ?? '')) : $this->shortName($a['s_first'], $a['s_last']),
                    'is_teacher' => $isTeacher,
                    'endorsed' => (bool) $a['endorsed'],
                    'created_at' => $a['created_at'],
                    'mine' => $a['author_role'] === $this->role() && (int) $a['author_id'] === $this->me(),
                ];
            }
        }
        $me = $this->me();
        $isStudent = $this->role() === 'student';
        $out = array_map(fn($q) => [
            'id' => (int) $q['id'],
            'body' => $q['body'],
            'page_number' => $q['page_number'] !== null ? (int) $q['page_number'] : null,
            'author' => $this->shortName($q['first_name'], $q['last_name']),
            'created_at' => $q['created_at'],
            'mine' => $isStudent && (int) $q['student_id'] === $me,
            'answers' => $answers[(int) $q['id']] ?? [],
            'answered_by_teacher' => (bool) array_filter($answers[(int) $q['id']] ?? [], fn($a) => $a['is_teacher'] || $a['endorsed']),
        ], $questions);

        $this->success(['topic' => ['id' => (int) $topic['id'], 'title' => $topic['title']], 'questions' => $out, 'can_moderate' => $isOwner]);
    }

    public function ask(): void
    {
        $db = $this->getDb();
        $topic = $this->topic($db, (int) $this->routeParam('id'));
        if (!$topic || $this->role() !== 'student') {
            $this->notFound('Topic not found');
            return;
        }
        $body = $this->body();
        if (mb_strlen($body) < 5) {
            $this->error('Write your question', 422);
            return;
        }
        $pageId = (int) $this->input('page_id', 0) ?: null;
        if ($pageId) {
            $stmt = $db->prepare("SELECT 1 FROM enote_pages WHERE id = ? AND topic_id = ?");
            $stmt->execute([$pageId, (int) $topic['id']]);
            $pageId = $stmt->fetchColumn() ? $pageId : null;
        }
        $db->prepare("INSERT INTO enote_questions (topic_id, page_id, student_id, body) VALUES (?, ?, ?, ?)")
            ->execute([(int) $topic['id'], $pageId, $this->me(), $body]);
        try {
            (new NotificationService())->notify((int) $topic['teacher_id'], 'teacher', 'enote_question', 'New question on ' . $topic['title'], mb_substr($body, 0, 140), ['topic_id' => (int) $topic['id']]);
        } catch (\Throwable $e) {
            // The question is saved either way
        }
        $this->success([], 'Question posted');
    }

    public function answer(): void
    {
        $db = $this->getDb();
        $q = $this->questionTopic($db, (int) $this->routeParam('id'));
        if (!$q) {
            $this->notFound('Question not found');
            return;
        }
        $body = $this->body();
        if (mb_strlen($body) < 2) {
            $this->error('Write your answer', 422);
            return;
        }
        $role = $this->role() === 'student' ? 'student' : 'teacher';
        $authorId = $role === 'student' ? $this->me() : $this->teacherId();
        $db->prepare("INSERT INTO enote_answers (question_id, author_role, author_id, body) VALUES (?, ?, ?, ?)")
            ->execute([(int) $q['id'], $role, $authorId, $body]);
        // Tell the student who asked
        if (!($role === 'student' && $authorId === (int) $q['student_id'])) {
            try {
                (new NotificationService())->notify((int) $q['student_id'], 'student', 'enote_answer', ($role === 'student' ? 'A classmate' : 'Your teacher') . ' answered your question', mb_substr($body, 0, 140), ['topic_id' => (int) $q['topic_id']]);
            } catch (\Throwable $e) {
                // The answer is saved either way
            }
        }
        $this->success([], 'Answer posted');
    }

    public function endorse(): void
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT a.id, a.endorsed, q.id AS question_id, et.teacher_id FROM enote_answers a
             INNER JOIN enote_questions q ON q.id = a.question_id INNER JOIN enote_topics et ON et.id = q.topic_id
             WHERE a.id = ? AND a.deleted_at IS NULL"
        );
        $stmt->execute([(int) $this->routeParam('id')]);
        $a = $stmt->fetch();
        if (!$a || (int) $a['teacher_id'] !== $this->teacherId()) {
            $this->notFound('Answer not found');
            return;
        }
        $db->prepare("UPDATE enote_answers SET endorsed = ? WHERE id = ?")->execute([(int) $a['endorsed'] ? 0 : 1, (int) $a['id']]);
        $this->success(['endorsed' => !(int) $a['endorsed']]);
    }

    public function deleteQuestion(): void
    {
        $db = $this->getDb();
        $q = $this->questionTopic($db, (int) $this->routeParam('id'));
        $ok = $q && ($this->role() === 'student' ? (int) $q['student_id'] === $this->me() : (int) $q['teacher_id'] === $this->teacherId());
        if (!$ok) {
            $this->notFound('Question not found');
            return;
        }
        $db->prepare("UPDATE enote_questions SET deleted_at = NOW() WHERE id = ?")->execute([(int) $q['id']]);
        $this->success([], 'Removed');
    }

    public function deleteAnswer(): void
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT a.id, a.author_role, a.author_id, et.teacher_id FROM enote_answers a
             INNER JOIN enote_questions q ON q.id = a.question_id INNER JOIN enote_topics et ON et.id = q.topic_id
             WHERE a.id = ? AND a.deleted_at IS NULL"
        );
        $stmt->execute([(int) $this->routeParam('id')]);
        $a = $stmt->fetch();
        $ok = $a && ($this->role() === 'student'
            ? ($a['author_role'] === 'student' && (int) $a['author_id'] === $this->me())
            : (int) $a['teacher_id'] === $this->teacherId());
        if (!$ok) {
            $this->notFound('Answer not found');
            return;
        }
        $db->prepare("UPDATE enote_answers SET deleted_at = NOW() WHERE id = ?")->execute([(int) $a['id']]);
        $this->success([], 'Removed');
    }

    /** Questions on my topics that no teacher has answered yet */
    public function waiting(): void
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT q.id, q.body, q.created_at, et.id AS topic_id, et.title AS topic_title, et.class_id, st.first_name, st.last_name
             FROM enote_questions q
             INNER JOIN enote_topics et ON et.id = q.topic_id AND et.teacher_id = ? AND et.deleted_at IS NULL
             INNER JOIN students st ON st.id = q.student_id
             WHERE q.deleted_at IS NULL
               AND NOT EXISTS (SELECT 1 FROM enote_answers a WHERE a.question_id = q.id AND a.deleted_at IS NULL AND (a.author_role <> 'student' OR a.endorsed = 1))
             ORDER BY q.created_at DESC LIMIT 50"
        );
        $stmt->execute([$this->teacherId()]);
        $this->success(['questions' => array_map(fn($r) => [
            'id' => (int) $r['id'],
            'body' => $r['body'],
            'created_at' => $r['created_at'],
            'topic_id' => (int) $r['topic_id'],
            'topic_title' => $r['topic_title'],
            'class_id' => $r['class_id'] !== null ? (int) $r['class_id'] : null,
            'author' => $this->shortName($r['first_name'], $r['last_name']),
        ], $stmt->fetchAll())]);
    }
}
