<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * My notes: every note a student wrote while reading - on eNote pages, eLibrary book pages and
 * Item Bank papers - with what it was written on (subject, topic or book, page), so they can read
 * them all in one place and download them as a PDF to keep, even after they leave the school.
 * Only the student's own words: nothing from the notes or books themselves.
 *
 * GET    /student/my-notes
 * DELETE /student/my-notes/{id}   id as listed: e12 (eNote page), b3 (book page), p4 (Item Bank page)
 */
class MyNotesController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    public function index(): void
    {
        $db = $this->getDb();
        $studentId = (int) $this->getCurrentUserId();
        $notes = [];

        // eNote pages
        $stmt = $db->prepare(
            "SELECT n.id, n.content, n.updated_at, p.order_number, p.title AS page_title, et.id AS source_id, et.title AS source_title,
                    s.name AS subject_name
             FROM enote_page_notes n
             INNER JOIN enote_pages p ON p.id = n.page_id
             INNER JOIN enote_topics et ON et.id = p.topic_id
             LEFT JOIN subjects s ON s.id = et.subject_id
             WHERE n.student_id = ? AND TRIM(n.content) <> ''"
        );
        $stmt->execute([$studentId]);
        foreach ($stmt->fetchAll() as $r) {
            $notes[] = [
                'kind' => 'enote', 'kind_label' => 'eNotes', 'id' => 'e' . $r['id'],
                'subject' => $r['subject_name'] ?: 'Other', 'source_id' => (int) $r['source_id'], 'source' => $r['source_title'],
                'page' => (int) $r['order_number'], 'page_title' => $r['page_title'], 'text' => $r['content'], 'updated_at' => $r['updated_at'],
            ];
        }

        // eLibrary books
        $stmt = $db->prepare(
            "SELECT n.id, n.content, n.updated_at, n.page_number, b.id AS source_id, b.title AS source_title, s.name AS subject_name
             FROM library_page_notes n
             INNER JOIN library_books b ON b.id = n.book_id
             LEFT JOIN subjects s ON s.id = b.subject_id
             WHERE n.student_id = ? AND TRIM(n.content) <> ''"
        );
        $stmt->execute([$studentId]);
        foreach ($stmt->fetchAll() as $r) {
            $notes[] = [
                'kind' => 'book', 'kind_label' => 'eLibrary', 'id' => 'b' . $r['id'],
                'subject' => $r['subject_name'] ?: 'Other', 'source_id' => (int) $r['source_id'], 'source' => $r['source_title'],
                'page' => (int) $r['page_number'], 'page_title' => null, 'text' => $r['content'], 'updated_at' => $r['updated_at'],
            ];
        }

        // Item Bank papers
        $stmt = $db->prepare(
            "SELECT n.id, n.content, n.updated_at, n.page_number, q.id AS source_id, q.question_text AS source_title, s.name AS subject_name
             FROM item_bank_page_notes n
             INNER JOIN item_bank_questions q ON q.id = n.question_id
             LEFT JOIN subjects s ON s.id = q.subject_id
             WHERE n.student_id = ? AND TRIM(n.content) <> ''"
        );
        $stmt->execute([$studentId]);
        foreach ($stmt->fetchAll() as $r) {
            $notes[] = [
                'kind' => 'paper', 'kind_label' => 'Item Bank', 'id' => 'p' . $r['id'],
                'subject' => $r['subject_name'] ?: 'Other', 'source_id' => (int) $r['source_id'], 'source' => mb_substr(trim(strip_tags((string) $r['source_title'])), 0, 120) ?: 'Past paper',
                'page' => (int) $r['page_number'], 'page_title' => null, 'text' => $r['content'], 'updated_at' => $r['updated_at'],
            ];
        }

        // Subject, then what it was written on, then page
        usort($notes, fn($a, $b) => strcmp($a['subject'], $b['subject']) ?: strcmp($a['kind_label'] . $a['source'], $b['kind_label'] . $b['source']) ?: $a['page'] <=> $b['page']);

        $stmt = $db->prepare(
            "SELECT st.first_name, st.last_name, st.admission_number, c.name AS class_name, c.stream_name
             FROM students st LEFT JOIN classes c ON c.id = st.class_id WHERE st.id = ?"
        );
        $stmt->execute([$studentId]);
        $me = $stmt->fetch() ?: [];
        $school = $db->query("SELECT school_name FROM school_settings ORDER BY id LIMIT 1")->fetchColumn();

        $this->success([
            'notes' => $notes,
            'student' => [
                'name' => trim(($me['first_name'] ?? '') . ' ' . ($me['last_name'] ?? '')),
                'admission_number' => $me['admission_number'] ?? null,
                'class_label' => ($me['class_name'] ?? null) ? $me['class_name'] . ($me['stream_name'] ? '-' . $me['stream_name'] : '') : null,
            ],
            'school' => $school ?: null,
        ]);
    }

    /** A student removes one of their own notes - only ever their own */
    public function delete($id): void
    {
        $tables = ['e' => 'enote_page_notes', 'b' => 'library_page_notes', 'p' => 'item_bank_page_notes'];
        if (!preg_match('/^([ebp])(\d+)$/', (string) $id, $m)) {
            $this->notFound('Note not found');
            return;
        }
        $stmt = $this->getDb()->prepare("DELETE FROM {$tables[$m[1]]} WHERE id = ? AND student_id = ?");
        $stmt->execute([(int) $m[2], (int) $this->getCurrentUserId()]);
        if (!$stmt->rowCount()) {
            $this->notFound('Note not found');
            return;
        }
        $this->success([], 'Note deleted');
    }
}
