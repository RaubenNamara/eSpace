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
                (subject_id, class_id, term_id, title, max_score, exam_date, include_on_report, created_by, created_by_role, created_at, updated_at)
             VALUES (:subject_id, :class_id, :term_id, :title, :max_score, :exam_date, :include_on_report, :created_by, :created_by_role, NOW(), NOW())"
        );
        $stmt->execute([
            'subject_id' => $data['subject_id'],
            'class_id' => $data['class_id'],
            'term_id' => $data['term_id'],
            'title' => trim((string) $data['title']),
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
            "SELECT pa.*, sub.name AS subject_name, c.name AS class_name, c.stream_name
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
            'max_score' => (float) $row['max_score'],
            'exam_date' => $row['exam_date'],
            'include_on_report' => (bool) $row['include_on_report'],
            'created_by' => (int) $row['created_by'],
            'created_by_role' => $row['created_by_role'],
        ];
    }
}
