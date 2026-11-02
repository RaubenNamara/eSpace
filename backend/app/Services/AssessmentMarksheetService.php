<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Marksheets by assessment: every marked mark already in the system, one sheet per assessment.
 *
 *  - list():  the assessments a person may see - a teacher their own, a HOD their department's,
 *             an admin every department's (optionally one) - with how many handed in / were marked
 *  - sheet(): one assessment: every learner it was set for (active in its subject's department and
 *             in its class / stream / class level, plus anyone who handed in), each question's mark,
 *             the total, percentage, grade and where the script is (not started ... returned)
 *
 * A mark counts as soon as the teacher has marked the script ('graded'), not only once returned.
 */
class AssessmentMarksheetService
{
    public function __construct(private \PDO $db)
    {
    }

    /** the department an assessment belongs to: its subject's, else its teacher's */
    private const DEPT = 'COALESCE(s.department_id, t.department_id)';

    /**
     * @param array{teacher_id?: int, department_id?: int} $scope  empty = everything (admin)
     */
    public function list(array $scope): array
    {
        $where = ['a.deleted_at IS NULL', "a.status <> 'draft'"];
        $params = [];
        if (isset($scope['teacher_id'])) {
            $where[] = 'a.teacher_id = :teacher_id';
            $params['teacher_id'] = $scope['teacher_id'];
        }
        if (isset($scope['department_id'])) {
            $where[] = self::DEPT . ' = :department_id';
            $params['department_id'] = $scope['department_id'];
        }
        $stmt = $this->db->prepare(
            "SELECT a.id, a.title, a.status, a.total_marks, a.due_date, COALESCE(a.published_at, a.created_at) AS set_at,
                    a.class_id, a.class_group_name, c.name AS class_name, c.stream_name,
                    (SELECT GROUP_CONCAT(DISTINCT x.stream_name ORDER BY x.stream_name SEPARATOR ',') FROM classes x
                      WHERE x.id = a.class_id OR x.id IN (SELECT ac.class_id FROM assignment_classes ac WHERE ac.assignment_id = a.id)) AS streams,
                    s.name AS subject_name, d.id AS department_id, d.name AS department_name,
                    TRIM(CONCAT(t.first_name, ' ', t.last_name)) AS teacher_name,
                    (SELECT COUNT(DISTINCT sb.student_id) FROM assignment_submissions sb
                      WHERE sb.assignment_id = a.id AND sb.deleted_at IS NULL AND sb.submitted_at IS NOT NULL) AS handed_in,
                    (SELECT COUNT(DISTINCT sb.student_id) FROM assignment_submissions sb
                      WHERE sb.assignment_id = a.id AND sb.deleted_at IS NULL AND sb.status IN ('graded', 'returned')) AS marked,
                    (SELECT ROUND(AVG(sb.percentage), 1) FROM assignment_submissions sb
                      WHERE sb.assignment_id = a.id AND sb.deleted_at IS NULL AND sb.status IN ('graded', 'returned')) AS average
             FROM assignments a
             INNER JOIN teachers t ON t.id = a.teacher_id
             LEFT JOIN subjects s ON s.id = a.subject_id
             LEFT JOIN departments d ON d.id = " . self::DEPT . "
             LEFT JOIN classes c ON c.id = a.class_id
             WHERE " . implode(' AND ', $where) . "
             ORDER BY set_at DESC, a.id DESC"
        );
        $stmt->execute($params);
        return array_map(fn ($r) => [
            'id' => (int) $r['id'],
            'title' => $r['title'],
            'status' => $r['status'],
            'total_marks' => (float) $r['total_marks'],
            'due_date' => $r['due_date'],
            'set_at' => $r['set_at'],
            'class_label' => $this->classLabel($r),
            'subject_name' => $r['subject_name'],
            'department_id' => $r['department_id'] !== null ? (int) $r['department_id'] : null,
            'department_name' => $r['department_name'],
            'teacher_name' => $r['teacher_name'],
            'handed_in' => (int) $r['handed_in'],
            'marked' => (int) $r['marked'],
            'average' => $r['average'] !== null ? (float) $r['average'] : null,
        ], $stmt->fetchAll(\PDO::FETCH_ASSOC));
    }

    /** May this scope open this assessment? */
    public function canSee(int $assignmentId, array $scope): bool
    {
        $where = ['a.id = :id', 'a.deleted_at IS NULL'];
        $params = ['id' => $assignmentId];
        if (isset($scope['teacher_id'])) {
            $where[] = 'a.teacher_id = :teacher_id';
            $params['teacher_id'] = $scope['teacher_id'];
        }
        if (isset($scope['department_id'])) {
            $where[] = self::DEPT . ' = :department_id';
            $params['department_id'] = $scope['department_id'];
        }
        $stmt = $this->db->prepare(
            'SELECT 1 FROM assignments a INNER JOIN teachers t ON t.id = a.teacher_id LEFT JOIN subjects s ON s.id = a.subject_id
             WHERE ' . implode(' AND ', $where)
        );
        $stmt->execute($params);
        return (bool) $stmt->fetchColumn();
    }

    public function sheet(int $assignmentId): ?array
    {
        $stmt = $this->db->prepare(
            "SELECT a.id, a.title, a.status, a.total_marks, a.due_date, a.class_id, a.class_group_name,
                    c.name AS class_name, c.stream_name,
                    (SELECT GROUP_CONCAT(DISTINCT x.stream_name ORDER BY x.stream_name SEPARATOR ',') FROM classes x
                      WHERE x.id = a.class_id OR x.id IN (SELECT ac.class_id FROM assignment_classes ac WHERE ac.assignment_id = a.id)) AS streams,
                    s.name AS subject_name, " . self::DEPT . " AS department_id, d.name AS department_name,
                    TRIM(CONCAT(t.first_name, ' ', t.last_name)) AS teacher_name
             FROM assignments a
             INNER JOIN teachers t ON t.id = a.teacher_id
             LEFT JOIN subjects s ON s.id = a.subject_id
             LEFT JOIN departments d ON d.id = " . self::DEPT . "
             LEFT JOIN classes c ON c.id = a.class_id
             WHERE a.id = ? AND a.deleted_at IS NULL"
        );
        $stmt->execute([$assignmentId]);
        $a = $stmt->fetch(\PDO::FETCH_ASSOC);
        if (!$a) {
            return null;
        }

        // the questions, in order (a scenario's parts are marked under the scenario)
        $stmt = $this->db->prepare(
            "SELECT q.id, q.question_type, q.marks,
                    (SELECT COALESCE(SUM(sq.marks), 0) FROM assignment_questions sq WHERE sq.parent_question_id = q.id AND sq.deleted_at IS NULL) AS sub_marks
             FROM assignment_questions q
             WHERE q.assignment_id = ? AND q.parent_question_id IS NULL AND q.deleted_at IS NULL
             ORDER BY q.display_order ASC, q.id ASC"
        );
        $stmt->execute([$assignmentId]);
        $questions = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $i => $q) {
            $max = $q['question_type'] === 'scenario' && (float) $q['sub_marks'] > 0 ? (float) $q['sub_marks'] : (float) $q['marks'];
            $questions[] = ['id' => (int) $q['id'], 'label' => 'Q' . ($i + 1), 'marks' => $max];
        }

        // every learner it was set for: active in the subject's department, in its stream(s) or class level
        $departmentId = $a['department_id'] !== null ? (int) $a['department_id'] : null;
        $classWhere = [];
        $params = [];
        if (!empty($a['class_id'])) {
            $classWhere[] = 'sde.class_id = :class_id';
            $params['class_id'] = (int) $a['class_id'];
        }
        if (!empty($a['class_group_name'])) {
            $classWhere[] = 'sde_c.name = :class_group';
            $params['class_group'] = $a['class_group_name'];
        }
        $classWhere[] = 'sde.class_id IN (SELECT ac.class_id FROM assignment_classes ac WHERE ac.assignment_id = :aid_ac)';
        $params['aid_ac'] = $assignmentId;
        $roster = [];
        $sql = "SELECT DISTINCT st.id, st.first_name, st.last_name, st.admission_number,
                       CONCAT(sde_c.name, IF(sde_c.stream_name IS NULL OR sde_c.stream_name = '', '', CONCAT('-', sde_c.stream_name))) AS class_label
                FROM student_department_enrollments sde
                INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL
                LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
                WHERE sde.deleted_at IS NULL AND sde.status = 'active'"
            . ($departmentId !== null ? ' AND sde.department_id = :department_id' : '')
            . ' AND (' . implode(' OR ', $classWhere) . ')';
        if ($departmentId !== null) {
            $params['department_id'] = $departmentId;
        }
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $roster[(int) $r['id']] = $r;
        }

        // each learner's latest submission (anyone who handed in counts, enrolled or not)
        $stmt = $this->db->prepare(
            "SELECT sb.id, sb.student_id, sb.status, sb.total_score, sb.percentage, sb.submitted_at,
                    st.first_name, st.last_name, st.admission_number,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_label
             FROM assignment_submissions sb
             INNER JOIN students st ON st.id = sb.student_id
             LEFT JOIN classes c ON c.id = st.class_id
             WHERE sb.assignment_id = ? AND sb.deleted_at IS NULL
             ORDER BY sb.id ASC"
        );
        $stmt->execute([$assignmentId]);
        $subs = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $subs[(int) $r['student_id']] = $r; // the latest attempt wins
            if (!isset($roster[(int) $r['student_id']])) {
                $roster[(int) $r['student_id']] = $r;
            }
        }

        // each question's mark: what the teacher gave, else the automatic mark
        $marks = [];
        if ($subs) {
            $ids = array_map(fn ($s) => (int) $s['id'], array_values($subs));
            $in = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $this->db->prepare("SELECT submission_id, question_id, marks_awarded FROM question_marks WHERE submission_id IN ({$in})");
            $stmt->execute($ids);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                if ($r['marks_awarded'] !== null) {
                    $marks[(int) $r['submission_id']][(int) $r['question_id']] = (float) $r['marks_awarded'];
                }
            }
            $stmt = $this->db->prepare("SELECT submission_id, question_id, COALESCE(manual_mark, auto_mark) AS mark FROM assignment_answers WHERE submission_id IN ({$in})");
            $stmt->execute($ids);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                if ($r['mark'] !== null && !isset($marks[(int) $r['submission_id']][(int) $r['question_id']])) {
                    $marks[(int) $r['submission_id']][(int) $r['question_id']] = (float) $r['mark'];
                }
            }
        }

        $rows = [];
        foreach ($roster as $studentId => $st) {
            $sub = $subs[$studentId] ?? null;
            $isMarked = $sub && in_array($sub['status'], ['graded', 'returned'], true);
            $pct = $isMarked && $sub['percentage'] !== null ? round((float) $sub['percentage'], 1) : null;
            $rows[] = [
                'student_id' => $studentId,
                'name' => trim($st['first_name'] . ' ' . $st['last_name']),
                'admission_number' => $st['admission_number'],
                'class_label' => $st['class_label'],
                'status' => !$sub ? 'not_started' : ($sub['status'] === 'returned' ? 'returned'
                    : ($sub['status'] === 'graded' ? 'marked' : ($sub['submitted_at'] ? 'handed_in' : 'in_progress'))),
                'submitted_at' => $sub['submitted_at'] ?? null,
                'questions' => array_map(fn ($q) => $sub ? ($marks[(int) $sub['id']][$q['id']] ?? null) : null, $questions),
                'score' => $isMarked && $sub['total_score'] !== null ? (float) $sub['total_score'] : null,
                'percentage' => $pct,
                'grade' => $pct !== null ? ReportCardGradingService::weightToGrade(ReportCardGradingService::percentageToWeight($pct)) : null,
            ];
        }
        usort($rows, fn ($x, $y) => [$x['class_label'] ?? '', $x['name']] <=> [$y['class_label'] ?? '', $y['name']]);

        $marked = array_values(array_filter($rows, fn ($r) => $r['percentage'] !== null));
        $pcts = array_column($marked, 'percentage');
        return [
            'assessment' => [
                'id' => (int) $a['id'],
                'title' => $a['title'],
                'total_marks' => (float) $a['total_marks'],
                'due_date' => $a['due_date'],
                'class_label' => $this->classLabel($a),
                'subject_name' => $a['subject_name'],
                'department_name' => $a['department_name'],
                'teacher_name' => $a['teacher_name'],
            ],
            'questions' => $questions,
            'rows' => $rows,
            'stats' => [
                'learners' => count($rows),
                'handed_in' => count(array_filter($rows, fn ($r) => in_array($r['status'], ['handed_in', 'marked', 'returned'], true))),
                'marked' => count($marked),
                'average' => $pcts ? round(array_sum($pcts) / count($pcts), 1) : null,
                'highest' => $pcts ? max($pcts) : null,
                'lowest' => $pcts ? min($pcts) : null,
            ],
        ];
    }

    /** "S.1" (whole class), "S.1 A" or "S.5 B1, B2" */
    private function classLabel(array $r): string
    {
        $cls = $r['class_group_name'] ?: ($r['class_name'] ?? '');
        if ($cls === '') {
            return 'Whole department';
        }
        if (!empty($r['class_group_name'])) {
            return $cls;
        }
        $streams = array_filter(explode(',', (string) ($r['streams'] ?? $r['stream_name'] ?? '')));
        return $streams ? $cls . ' ' . implode(', ', $streams) : $cls;
    }
}
