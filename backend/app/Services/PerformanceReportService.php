<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Performance Report Service
 *
 * Two related views, both sourced from the same graded work already used by ReportCardService
 * (assignment_submissions.status = 'returned' - existence of a returned submission is itself
 * proof of legitimate visibility):
 *  - Student performance: general (every subject, averaged) or one subject in detail (per
 *    assignment, trend over time).
 *  - Class marksheet: a Student x Assignment grid for one class/stream + subject, downloadable
 *    as CSV.
 *
 * Authorization is centralized here rather than duplicated per controller - teacher/HOD/admin
 * each get a can-access check before any query runs, mirroring the two-tier model established
 * for report cards (class_teacher_id, class_subjects, or - confirmed live, class_subjects has
 * zero rows anywhere in this database, so it's effectively decorative - having actually created
 * an assignment for that class+subject, which is how teaching relationships are really
 * established in this app; department membership for HODs; unrestricted for admin).
 */
class PerformanceReportService
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    // ---------------------------------------------------------------------
    // Authorization
    // ---------------------------------------------------------------------

    public function teacherCanAccessClass(int $teacherId, int $classId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM classes WHERE id = :class_id AND class_teacher_id = :teacher_id AND deleted_at IS NULL
             UNION
             SELECT 1 FROM class_subjects WHERE class_id = :class_id2 AND teacher_id = :teacher_id2
             UNION
             SELECT 1 FROM assignments WHERE class_id = :class_id3 AND teacher_id = :teacher_id3 AND deleted_at IS NULL LIMIT 1'
        );
        $stmt->execute([
            'class_id' => $classId, 'teacher_id' => $teacherId,
            'class_id2' => $classId, 'teacher_id2' => $teacherId,
            'class_id3' => $classId, 'teacher_id3' => $teacherId,
        ]);
        return (bool) $stmt->fetch();
    }

    public function teacherCanAccessClassSubject(int $teacherId, int $classId, int $subjectId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM classes WHERE id = :class_id AND class_teacher_id = :teacher_id AND deleted_at IS NULL
             UNION
             SELECT 1 FROM class_subjects WHERE class_id = :class_id2 AND subject_id = :subject_id AND teacher_id = :teacher_id2
             UNION
             SELECT 1 FROM assignments WHERE class_id = :class_id3 AND subject_id = :subject_id2 AND teacher_id = :teacher_id3 AND deleted_at IS NULL LIMIT 1'
        );
        $stmt->execute([
            'class_id' => $classId, 'teacher_id' => $teacherId,
            'class_id2' => $classId, 'subject_id' => $subjectId, 'teacher_id2' => $teacherId,
            'class_id3' => $classId, 'subject_id2' => $subjectId, 'teacher_id3' => $teacherId,
        ]);
        return (bool) $stmt->fetch();
    }

    /**
     * Checked directly against student_department_enrollments rather than resolving
     * students.class_id first - that single denormalized column can disagree with a student's
     * actual enrollment(s) (confirmed live: a student's students.class_id pointed at a
     * different class than several of their own student_department_enrollments rows), so
     * resolve-then-check silently rejected teachers who genuinely do teach the student.
     */
    public function teacherCanAccessStudent(int $teacherId, int $studentId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM student_department_enrollments sde
             WHERE sde.student_id = :student_id AND sde.deleted_at IS NULL
               AND (
                 EXISTS (SELECT 1 FROM classes c WHERE c.id = sde.class_id AND c.class_teacher_id = :teacher_id AND c.deleted_at IS NULL)
                 OR EXISTS (SELECT 1 FROM class_subjects cs WHERE cs.class_id = sde.class_id AND cs.teacher_id = :teacher_id2)
                 OR EXISTS (SELECT 1 FROM assignments a WHERE a.class_id = sde.class_id AND a.teacher_id = :teacher_id3 AND a.deleted_at IS NULL)
               )
             LIMIT 1'
        );
        $stmt->execute(['student_id' => $studentId, 'teacher_id' => $teacherId, 'teacher_id2' => $teacherId, 'teacher_id3' => $teacherId]);
        return (bool) $stmt->fetch();
    }

    /**
     * Same reasoning as teacherCanAccessStudent() - checked against enrollments directly, not a
     * resolved students.class_id.
     */
    public function teacherCanAccessStudentSubject(int $teacherId, int $studentId, int $subjectId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM student_department_enrollments sde
             WHERE sde.student_id = :student_id AND sde.deleted_at IS NULL
               AND (
                 EXISTS (SELECT 1 FROM classes c WHERE c.id = sde.class_id AND c.class_teacher_id = :teacher_id AND c.deleted_at IS NULL)
                 OR EXISTS (SELECT 1 FROM class_subjects cs WHERE cs.class_id = sde.class_id AND cs.subject_id = :subject_id AND cs.teacher_id = :teacher_id2)
                 OR EXISTS (SELECT 1 FROM assignments a WHERE a.class_id = sde.class_id AND a.subject_id = :subject_id2 AND a.teacher_id = :teacher_id3 AND a.deleted_at IS NULL)
               )
             LIMIT 1'
        );
        $stmt->execute([
            'student_id' => $studentId, 'subject_id' => $subjectId, 'teacher_id' => $teacherId,
            'subject_id2' => $subjectId, 'teacher_id2' => $teacherId, 'teacher_id3' => $teacherId,
        ]);
        return (bool) $stmt->fetch();
    }

    public function getHodDepartmentId(int $hodId): ?int
    {
        $stmt = $this->getDb()->prepare('SELECT department_id FROM hods WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $hodId]);
        $row = $stmt->fetch();
        return $row ? (int) $row['department_id'] : null;
    }

    public function hodCanAccessClass(int $departmentId, int $classId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM student_department_enrollments WHERE department_id = :department_id AND class_id = :class_id AND deleted_at IS NULL LIMIT 1'
        );
        $stmt->execute(['department_id' => $departmentId, 'class_id' => $classId]);
        return (bool) $stmt->fetch();
    }

    public function hodCanAccessStudent(int $departmentId, int $studentId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM student_department_enrollments WHERE department_id = :department_id AND student_id = :student_id AND deleted_at IS NULL LIMIT 1'
        );
        $stmt->execute(['department_id' => $departmentId, 'student_id' => $studentId]);
        return (bool) $stmt->fetch();
    }

    public function getStudentClassId(int $studentId): ?int
    {
        $stmt = $this->getDb()->prepare('SELECT class_id FROM students WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $studentId]);
        $row = $stmt->fetch();
        return $row && $row['class_id'] !== null ? (int) $row['class_id'] : null;
    }

    // ---------------------------------------------------------------------
    // Student performance
    // ---------------------------------------------------------------------

    /**
     * Every subject a student has returned, graded work in, averaged - plus an overall figure.
     */
    public function studentGeneral(int $studentId, ?int $termId = null): array
    {
        $db = $this->getDb();
        $term = $termId ? $this->getTermRange($termId) : null;

        $where = ['sub.student_id = :student_id', "sub.status = 'returned'", 'a.deleted_at IS NULL'];
        $params = ['student_id' => $studentId];
        if ($term) {
            $where[] = 'a.due_date BETWEEN :start_date AND :end_date';
            $params['start_date'] = $term['start_date'];
            $params['end_date'] = $term['end_date'];
        }
        $whereSql = implode(' AND ', $where);

        $stmt = $db->prepare(
            "SELECT a.subject_id, s.name as subject_name, s.code as subject_code,
                    COUNT(*) as assignments_count, AVG(sub.percentage) as avg_percentage
             FROM assignment_submissions sub
             INNER JOIN assignments a ON sub.assignment_id = a.id
             LEFT JOIN subjects s ON a.subject_id = s.id
             WHERE {$whereSql}
             GROUP BY a.subject_id, s.name, s.code
             ORDER BY s.name ASC"
        );
        $stmt->execute($params);
        $subjectRows = $stmt->fetchAll();

        $subjects = array_map(function ($row) {
            $avg = round((float) $row['avg_percentage'], 1);
            $weight = ReportCardGradingService::percentageToWeight($avg);
            return [
                'subject_id' => (int) $row['subject_id'],
                'subject_name' => $row['subject_name'],
                'subject_code' => $row['subject_code'],
                'assignments_count' => (int) $row['assignments_count'],
                'avg_percentage' => $avg,
                'grade' => ReportCardGradingService::weightToGrade($weight),
            ];
        }, $subjectRows);

        $stmt = $db->prepare(
            "SELECT COUNT(*) as total_count, AVG(sub.percentage) as overall_avg
             FROM assignment_submissions sub
             INNER JOIN assignments a ON sub.assignment_id = a.id
             WHERE {$whereSql}"
        );
        $stmt->execute($params);
        $overall = $stmt->fetch();
        $overallAvg = $overall && $overall['overall_avg'] !== null ? round((float) $overall['overall_avg'], 1) : null;

        return [
            'student_id' => $studentId,
            'total_assignments' => $overall ? (int) $overall['total_count'] : 0,
            'overall_avg_percentage' => $overallAvg,
            'overall_grade' => $overallAvg !== null ? ReportCardGradingService::weightToGrade(ReportCardGradingService::percentageToWeight($overallAvg)) : null,
            'subjects' => $subjects,
        ];
    }

    /**
     * One subject in detail - every assignment, in order, plus summary stats.
     */
    public function studentSubject(int $studentId, int $subjectId, ?int $termId = null): array
    {
        $db = $this->getDb();
        $term = $termId ? $this->getTermRange($termId) : null;

        $where = ['sub.student_id = :student_id', 'a.subject_id = :subject_id', "sub.status = 'returned'", 'a.deleted_at IS NULL'];
        $params = ['student_id' => $studentId, 'subject_id' => $subjectId];
        if ($term) {
            $where[] = 'a.due_date BETWEEN :start_date AND :end_date';
            $params['start_date'] = $term['start_date'];
            $params['end_date'] = $term['end_date'];
        }
        $whereSql = implode(' AND ', $where);

        $stmt = $db->prepare(
            "SELECT a.id as assignment_id, a.title, a.due_date, a.total_marks,
                    sub.total_score, sub.percentage, sub.released_at
             FROM assignment_submissions sub
             INNER JOIN assignments a ON sub.assignment_id = a.id
             WHERE {$whereSql}
             ORDER BY a.due_date ASC"
        );
        $stmt->execute($params);
        $rows = $stmt->fetchAll();

        $percentages = array_map(fn($r) => (float) $r['percentage'], $rows);
        $avg = count($percentages) > 0 ? round(array_sum($percentages) / count($percentages), 1) : null;

        $stmt = $db->prepare('SELECT name, code FROM subjects WHERE id = :id');
        $stmt->execute(['id' => $subjectId]);
        $subject = $stmt->fetch();

        return [
            'student_id' => $studentId,
            'subject_id' => $subjectId,
            'subject_name' => $subject['name'] ?? null,
            'subject_code' => $subject['code'] ?? null,
            'avg_percentage' => $avg,
            'grade' => $avg !== null ? ReportCardGradingService::weightToGrade(ReportCardGradingService::percentageToWeight($avg)) : null,
            'highest_percentage' => count($percentages) > 0 ? round(max($percentages), 1) : null,
            'lowest_percentage' => count($percentages) > 0 ? round(min($percentages), 1) : null,
            'assignments' => array_map(fn($r) => [
                'assignment_id' => (int) $r['assignment_id'],
                'title' => $r['title'],
                'due_date' => $r['due_date'],
                'total_marks' => (float) $r['total_marks'],
                'score' => (float) $r['total_score'],
                'percentage' => round((float) $r['percentage'], 1),
                'released_at' => $r['released_at'],
            ], $rows),
        ];
    }

    // ---------------------------------------------------------------------
    // Class marksheet
    // ---------------------------------------------------------------------

    /**
     * A student x assignment grid for one class/stream + subject - every student currently
     * enrolled in the class down the rows, every published assignment in that class/subject
     * across the columns, sourced as three simple queries assembled in PHP rather than one
     * fragile multi-way join (a LEFT JOIN chain here would either drop students with no
     * submissions yet or leak other subjects' submissions depending on where the subject filter
     * lands).
     */
    public function classMarksheet(int $classId, int $subjectId, ?int $termId = null): array
    {
        $db = $this->getDb();
        $term = $termId ? $this->getTermRange($termId) : null;

        $assignmentWhere = ['a.class_id = :class_id', 'a.subject_id = :subject_id', 'a.deleted_at IS NULL'];
        $assignmentParams = ['class_id' => $classId, 'subject_id' => $subjectId];
        if ($term) {
            $assignmentWhere[] = 'a.due_date BETWEEN :start_date AND :end_date';
            $assignmentParams['start_date'] = $term['start_date'];
            $assignmentParams['end_date'] = $term['end_date'];
        }
        $stmt = $db->prepare(
            'SELECT id, title, total_marks, due_date FROM assignments a
             WHERE ' . implode(' AND ', $assignmentWhere) . ' ORDER BY a.due_date ASC'
        );
        $stmt->execute($assignmentParams);
        $assignments = $stmt->fetchAll();

        $stmt = $db->prepare(
            'SELECT DISTINCT s.id, s.first_name, s.last_name, s.admission_number
             FROM students s
             INNER JOIN student_department_enrollments sde ON sde.student_id = s.id AND sde.class_id = :class_id AND sde.deleted_at IS NULL
             WHERE s.deleted_at IS NULL
             ORDER BY s.first_name ASC, s.last_name ASC'
        );
        $stmt->execute(['class_id' => $classId]);
        $students = $stmt->fetchAll();

        $scoresByStudent = [];
        if (!empty($assignments) && !empty($students)) {
            $assignmentIds = array_column($assignments, 'id');
            $placeholders = implode(',', array_fill(0, count($assignmentIds), '?'));
            $stmt = $db->prepare(
                "SELECT student_id, assignment_id, total_score, percentage
                 FROM assignment_submissions
                 WHERE status = 'returned' AND assignment_id IN ({$placeholders})"
            );
            $stmt->execute($assignmentIds);
            foreach ($stmt->fetchAll() as $row) {
                $scoresByStudent[(int) $row['student_id']][(int) $row['assignment_id']] = [
                    'score' => (float) $row['total_score'],
                    'percentage' => (float) $row['percentage'],
                ];
            }
        }

        $rows = array_map(function ($student) use ($assignments, $scoresByStudent) {
            $studentId = (int) $student['id'];
            $scores = $scoresByStudent[$studentId] ?? [];
            $percentages = array_map(fn($s) => $s['percentage'], $scores);

            $cells = array_map(function ($assignment) use ($scores) {
                $entry = $scores[(int) $assignment['id']] ?? null;
                return [
                    'assignment_id' => (int) $assignment['id'],
                    'score' => $entry ? $entry['score'] : null,
                    'percentage' => $entry ? round($entry['percentage'], 1) : null,
                ];
            }, $assignments);

            $avg = count($percentages) > 0 ? round(array_sum($percentages) / count($percentages), 1) : null;

            return [
                'student_id' => $studentId,
                'first_name' => $student['first_name'],
                'last_name' => $student['last_name'],
                'admission_number' => $student['admission_number'],
                'cells' => $cells,
                'avg_percentage' => $avg,
                'grade' => $avg !== null ? ReportCardGradingService::weightToGrade(ReportCardGradingService::percentageToWeight($avg)) : null,
            ];
        }, $students);

        return [
            'class_id' => $classId,
            'subject_id' => $subjectId,
            'assignments' => array_map(fn($a) => [
                'id' => (int) $a['id'],
                'title' => $a['title'],
                'total_marks' => (float) $a['total_marks'],
            ], $assignments),
            'rows' => $rows,
        ];
    }

    private function getTermRange(int $termId): ?array
    {
        $stmt = $this->getDb()->prepare('SELECT id, name, start_date, end_date FROM terms WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $termId]);
        return $stmt->fetch() ?: null;
    }
}
