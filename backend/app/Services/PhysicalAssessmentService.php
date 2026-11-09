<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use RuntimeException;

/**
 * Physical (offline) exam marks - a teacher/HOD/admin records a whole class's marks for an exam
 * that happened on paper. Shared CRUD + marksheet logic behind three thin, role-scoped
 * controllers (Teacher/HOD/Admin), the same shape as ReportCardService.
 */
class PhysicalAssessmentService
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    public function create(array $data, int $actorId, string $actorRole): array
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "INSERT INTO physical_assessments
                (subject_id, class_id, term_id, title, assessment_category, max_score, exam_date, include_on_report, created_by, created_by_role, created_at, updated_at)
             VALUES (:subject_id, :class_id, :term_id, :title, :assessment_category, :max_score, :exam_date, :include_on_report, :created_by, :created_by_role, NOW(), NOW())"
        );
        $stmt->execute([
            'subject_id' => $data['subject_id'],
            'class_id' => $data['class_id'],
            'term_id' => $data['term_id'],
            'title' => trim((string) $data['title']),
            'assessment_category' => self::category($data['assessment_category'] ?? null),
            'max_score' => $data['max_score'],
            'exam_date' => $data['exam_date'],
            'include_on_report' => !empty($data['include_on_report']) ? 1 : 0,
            'created_by' => $actorId,
            'created_by_role' => $actorRole,
        ]);

        return $this->get((int) $db->lastInsertId());
    }

    public function update(int $id, array $data): array
    {
        $db = $this->getDb();
        $fields = [];
        $params = ['id' => $id];

        foreach (['title', 'max_score', 'exam_date'] as $field) {
            if (isset($data[$field])) {
                $fields[] = "{$field} = :{$field}";
                $params[$field] = $field === 'title' ? trim((string) $data[$field]) : $data[$field];
            }
        }
        if (array_key_exists('assessment_category', $data)) {
            $fields[] = 'assessment_category = :assessment_category';
            $params['assessment_category'] = self::category($data['assessment_category']);
        }
        if (array_key_exists('include_on_report', $data)) {
            $fields[] = 'include_on_report = :include_on_report';
            $params['include_on_report'] = !empty($data['include_on_report']) ? 1 : 0;
        }

        if (!empty($fields)) {
            $fields[] = 'updated_at = NOW()';
            $stmt = $db->prepare('UPDATE physical_assessments SET ' . implode(', ', $fields) . ' WHERE id = :id');
            $stmt->execute($params);
        }

        return $this->get($id);
    }

    public function delete(int $id): void
    {
        $stmt = $this->getDb()->prepare('UPDATE physical_assessments SET deleted_at = NOW() WHERE id = :id');
        $stmt->execute(['id' => $id]);
    }

    public function get(int $id): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT pa.*, sub.name AS subject_name, c.name AS class_name, c.stream_name
             FROM physical_assessments pa
             INNER JOIN subjects sub ON sub.id = pa.subject_id
             INNER JOIN classes c ON c.id = pa.class_id
             WHERE pa.id = :id AND pa.deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();

        if (!$row) {
            throw new RuntimeException('Physical exam not found.');
        }

        return $this->formatExam($row);
    }

    /**
     * GET list for a class+subject+term (the picker screen).
     */
    public function listForClassSubject(int $classId, int $subjectId, int $termId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT pa.*, sub.name AS subject_name, c.name AS class_name, c.stream_name,
                    -- How far the marking has got: marks entered, their average, and the class size
                    (SELECT COUNT(*) FROM physical_assessment_scores pas WHERE pas.physical_assessment_id = pa.id AND pas.score IS NOT NULL) AS marked_count,
                    (SELECT AVG(pas.score) FROM physical_assessment_scores pas WHERE pas.physical_assessment_id = pa.id AND pas.score IS NOT NULL) AS avg_score,
                    (SELECT COUNT(*) FROM students st WHERE st.class_id = pa.class_id AND st.deleted_at IS NULL) AS class_size
             FROM physical_assessments pa
             INNER JOIN subjects sub ON sub.id = pa.subject_id
             INNER JOIN classes c ON c.id = pa.class_id
             WHERE pa.class_id = :class_id AND pa.subject_id = :subject_id AND pa.term_id = :term_id AND pa.deleted_at IS NULL
             ORDER BY pa.exam_date DESC"
        );
        $stmt->execute(['class_id' => $classId, 'subject_id' => $subjectId, 'term_id' => $termId]);

        return array_map([$this, 'formatExam'], $stmt->fetchAll());
    }

    /**
     * Exam meta + every actively-enrolled student in its class with their current score (or
     * null if not entered yet) - the marksheet entry screen's data source.
     */
    public function getMarksheet(int $examId): array
    {
        $exam = $this->get($examId);

        $stmt = $this->getDb()->prepare(
            "SELECT s.id AS student_id, s.first_name, s.last_name, s.admission_number, s.profile_photo,
                    pas.score
             FROM students s
             LEFT JOIN physical_assessment_scores pas ON pas.student_id = s.id AND pas.physical_assessment_id = :exam_id
             WHERE s.class_id = :class_id AND s.deleted_at IS NULL
             ORDER BY s.first_name, s.last_name"
        );
        $stmt->execute(['exam_id' => $examId, 'class_id' => $exam['class_id']]);

        $students = array_map(function ($row) {
            return [
                'student_id' => (int) $row['student_id'],
                'first_name' => $row['first_name'],
                'last_name' => $row['last_name'],
                'admission_number' => $row['admission_number'],
                'profile_photo' => $row['profile_photo'],
                'score' => $row['score'] !== null ? (float) $row['score'] : null,
            ];
        }, $stmt->fetchAll());

        return ['exam' => $exam, 'students' => $students];
    }

    /**
     * Bulk upsert the whole marksheet in one call.
     *
     * @param array<int, array{student_id: int, score: float|null}> $scores
     */
    public function saveScores(int $examId, array $scores): void
    {
        $exam = $this->get($examId);
        $maxScore = (float) $exam['max_score'];

        $db = $this->getDb();
        $stmt = $db->prepare(
            "INSERT INTO physical_assessment_scores (physical_assessment_id, student_id, score, created_at, updated_at)
             VALUES (:exam_id, :student_id, :score, NOW(), NOW())
             ON DUPLICATE KEY UPDATE score = :score2, updated_at = NOW()"
        );

        foreach ($scores as $entry) {
            $score = $entry['score'];
            if ($score !== null) {
                $score = (float) $score;
                if ($score < 0 || $score > $maxScore) {
                    throw new RuntimeException("Score for student {$entry['student_id']} must be between 0 and {$maxScore}.");
                }
            }
            $stmt->execute([
                'exam_id' => $examId,
                'student_id' => (int) $entry['student_id'],
                'score' => $score,
                'score2' => $score,
            ]);
        }
    }

    /**
     * One class's marks in a subject for a term, physical and online together - the combined and
     * average mark sheets. Columns are the term's physical exams and the online assessments set
     * for this class (its stream, or the whole class level) that are due or were set in the term,
     * oldest first; a learner's online mark counts once the teacher has marked the script.
     */
    public function combined(int $classId, int $subjectId, int $termId): array
    {
        $db = $this->getDb();

        $stmt = $db->prepare('SELECT start_date, end_date FROM terms WHERE id = ?');
        $stmt->execute([$termId]);
        $term = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$term) {
            throw new RuntimeException('Term not found.');
        }

        $stmt = $db->prepare("SELECT c.name, c.stream_name, sub.name AS subject_name FROM classes c, subjects sub WHERE c.id = ? AND sub.id = ?");
        $stmt->execute([$classId, $subjectId]);
        $meta = $stmt->fetch(\PDO::FETCH_ASSOC) ?: ['name' => '', 'stream_name' => null, 'subject_name' => ''];

        // the class: same roster the physical marksheet uses
        $stmt = $db->prepare(
            "SELECT id, first_name, last_name, admission_number FROM students
             WHERE class_id = ? AND deleted_at IS NULL ORDER BY first_name, last_name"
        );
        $stmt->execute([$classId]);
        $students = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $students[(int) $r['id']] = [
                'student_id' => (int) $r['id'],
                'name' => trim($r['first_name'] . ' ' . $r['last_name']),
                'admission_number' => $r['admission_number'],
                'marks' => [],
            ];
        }

        $columns = [];

        // physical exams of the term
        $stmt = $db->prepare(
            "SELECT id, title, max_score, exam_date FROM physical_assessments
             WHERE class_id = ? AND subject_id = ? AND term_id = ? AND deleted_at IS NULL ORDER BY exam_date, id"
        );
        $stmt->execute([$classId, $subjectId, $termId]);
        $physical = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($physical as $p) {
            $columns[] = ['key' => 'p' . $p['id'], 'kind' => 'physical', 'title' => $p['title'], 'date' => $p['exam_date'], 'max' => (float) $p['max_score']];
        }
        if ($physical) {
            $ids = array_map(fn ($p) => (int) $p['id'], $physical);
            $stmt = $db->prepare('SELECT physical_assessment_id, student_id, score FROM physical_assessment_scores WHERE score IS NOT NULL AND physical_assessment_id IN (' . implode(',', $ids) . ')');
            $stmt->execute();
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                if (isset($students[(int) $r['student_id']])) {
                    $students[(int) $r['student_id']]['marks']['p' . $r['physical_assessment_id']] = (float) $r['score'];
                }
            }
        }

        // online assessments set for this class in the subject, due (or set) within the term
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.total_marks, DATE(COALESCE(a.due_date, a.published_at, a.created_at)) AS on_date
             FROM assignments a
             LEFT JOIN classes c ON c.id = ?
             WHERE a.subject_id = ? AND a.deleted_at IS NULL AND a.status <> 'draft'
               AND (a.class_id = ? OR a.id IN (SELECT ac.assignment_id FROM assignment_classes ac WHERE ac.class_id = ?)
                    OR (a.class_group_name IS NOT NULL AND a.class_group_name = c.name))
               AND DATE(COALESCE(a.due_date, a.published_at, a.created_at)) BETWEEN ? AND ?
             ORDER BY on_date, a.id"
        );
        $stmt->execute([$classId, $subjectId, $classId, $classId, $term['start_date'], $term['end_date']]);
        $online = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($online as $a) {
            $columns[] = ['key' => 'o' . $a['id'], 'kind' => 'online', 'title' => $a['title'], 'date' => $a['on_date'], 'max' => (float) $a['total_marks']];
        }
        if ($online) {
            $ids = array_map(fn ($a) => (int) $a['id'], $online);
            // the latest marked attempt wins
            $stmt = $db->prepare(
                "SELECT assignment_id, student_id, total_score FROM assignment_submissions
                 WHERE deleted_at IS NULL AND status IN ('graded', 'returned') AND total_score IS NOT NULL
                   AND assignment_id IN (" . implode(',', $ids) . ") ORDER BY id"
            );
            $stmt->execute();
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                if (isset($students[(int) $r['student_id']])) {
                    $students[(int) $r['student_id']]['marks']['o' . $r['assignment_id']] = (float) $r['total_score'];
                }
            }
        }

        usort($columns, fn ($x, $y) => [$x['date'], $x['key']] <=> [$y['date'], $y['key']]);
        foreach ($students as &$st) {
            $st['marks'] = (object) $st['marks'];
        }
        unset($st);

        return [
            'class_label' => trim($meta['name'] . ($meta['stream_name'] ? ' ' . $meta['stream_name'] : '')),
            'subject_name' => $meta['subject_name'],
            'columns' => $columns,
            'students' => array_values($students),
        ];
    }

    /** A paper Activity of Integration or project work counts towards UNEB continuous assessment */
    private static function category(mixed $value): ?string
    {
        $value = strtoupper(trim((string) $value));
        return in_array($value, ['AOI', 'PROJECT'], true) ? $value : null;
    }

    private function formatExam(array $row): array
    {
        return [
            'id' => (int) $row['id'],
            'subject_id' => (int) $row['subject_id'],
            'subject_name' => $row['subject_name'],
            'class_id' => (int) $row['class_id'],
            'class_name' => $row['class_name'],
            'stream_name' => $row['stream_name'],
            'term_id' => (int) $row['term_id'],
            'title' => $row['title'],
            'assessment_category' => $row['assessment_category'] ?? null,
            'max_score' => (float) $row['max_score'],
            'exam_date' => $row['exam_date'],
            'include_on_report' => (bool) $row['include_on_report'],
            'created_by' => (int) $row['created_by'],
            'created_by_role' => $row['created_by_role'],
            // Only on the list (listForClassSubject)
            'marked_count' => isset($row['marked_count']) ? (int) $row['marked_count'] : null,
            'avg_score' => isset($row['avg_score']) ? round((float) $row['avg_score'], 1) : null,
            'class_size' => isset($row['class_size']) ? (int) $row['class_size'] : null,
        ];
    }
}
