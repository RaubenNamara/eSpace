<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\ClassHealthService;
use eSpace\App\Services\GrowthService;

/**
 * Early warning: the learners who may be slipping, before the end-of-term report shows it. Four
 * signals, from results and activity that already exist:
 *   - low:      average on returned LOA/AOI results below 50% (as on the Class Learning Map)
 *   - falling:  recent results 10+ points below their earlier ones this term (the growth board)
 *   - quiet:    signed in before, but not for 14 days
 *   - missed:   2+ assessments past their deadline in the last 30 days and not handed in
 * Learners who have never signed in are counted (`never`) but kept apart - that is an account to
 * hand out, not a learner slipping - so the list leads with the ones who need a teacher.
 * A teacher sees the classes they teach in their department; a HOD sees the whole department.
 *
 * GET /teacher/early-warning?class_id=
 * GET /hod/early-warning?class_id=
 */
class EarlyWarningController extends Controller
{
    private const QUIET_DAYS = 14;
    private const MISSED_DAYS = 30;
    private const MISSED_FROM = 2;
    private const FALLING_BY = -10.0;
    private const MAX_STUDENTS = 2000;

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    public function index(): void
    {
        $role = $_SESSION['role'] ?? null;
        $db = \eSpace\Config\Database::getInstance();
        // A HOD: the department they head; a teacher: their active department
        if ($role === 'hod') {
            $stmt = $db->prepare("SELECT COALESCE(department_id_active, department_id) FROM hods WHERE id = ? AND deleted_at IS NULL");
            $stmt->execute([(int) ($_SESSION['user_id'] ?? 0)]);
            $departmentId = (int) $stmt->fetchColumn() ?: null;
        } else {
            $departmentId = $this->getActiveDepartmentId();
        }
        $subjectIds = ClassHealthService::departmentSubjectIds($db, $departmentId);
        if (!$departmentId || !$subjectIds) {
            $this->success(['students' => [], 'classes' => [], 'summary' => null]);
            return;
        }

        // The classes in view
        if ($role === 'hod') {
            $stmt = $db->prepare("SELECT DISTINCT class_id FROM student_department_enrollments WHERE department_id = ? AND status = 'active' AND deleted_at IS NULL AND class_id IS NOT NULL");
            $stmt->execute([$departmentId]);
            $classIds = array_map('intval', array_column($stmt->fetchAll(), 'class_id'));
        } else {
            $teacherId = (int) ($_SESSION['user_id'] ?? 0);
            $classIds = ClassHealthService::teacherClassIds($db, $teacherId);
        }
        $classes = [];
        if ($classIds) {
            $stmt = $db->prepare("SELECT id, name, stream_name FROM classes WHERE id IN (" . self::in($classIds) . ") ORDER BY name, stream_name");
            $stmt->execute($classIds);
            foreach ($stmt->fetchAll() as $c) {
                $classes[(int) $c['id']] = $c['name'] . ($c['stream_name'] ? '-' . $c['stream_name'] : '');
            }
        }
        $only = (int) $this->query('class_id', 0);
        $inView = $only && isset($classes[$only]) ? [$only] : array_keys($classes);
        if (!$inView) {
            $this->success(['students' => [], 'classes' => [], 'summary' => null]);
            return;
        }

        $stmt = $db->prepare(
            "SELECT DISTINCT st.id, st.first_name, st.last_name, st.gender, st.last_active_at, sde.class_id
             FROM student_department_enrollments sde
             INNER JOIN students st ON st.id = sde.student_id AND st.deleted_at IS NULL AND st.is_active = 1
             WHERE sde.class_id IN (" . self::in($inView) . ") AND sde.department_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL
             LIMIT " . self::MAX_STUDENTS
        );
        $stmt->execute(array_merge($inView, [$departmentId]));
        $rows = $stmt->fetchAll();
        $students = [];
        foreach ($rows as $r) {
            $students[(int) $r['id']] = $r;
        }
        $ids = array_keys($students);
        if (!$ids) {
            $this->success(['students' => [], 'classes' => $this->classList($classes), 'summary' => ['low' => 0, 'falling' => 0, 'quiet' => 0, 'missed' => 0, 'never' => 0, 'flagged' => 0, 'total' => 0]]);
            return;
        }

        $health = ClassHealthService::forStudents($db, $ids, $subjectIds)['students'];
        $growth = GrowthService::forStudents($db, $ids, GrowthService::currentTermId($db), count($subjectIds) === 1 ? $subjectIds[0] : null);

        // Missed deadlines: published assessments for the student's class, due in the last 30 days, not handed in
        $stmt = $db->prepare(
            "SELECT sde.student_id, COUNT(DISTINCT a.id) AS missed, GROUP_CONCAT(DISTINCT a.title ORDER BY a.due_date DESC SEPARATOR '||') AS titles
             FROM student_department_enrollments sde
             INNER JOIN classes c ON c.id = sde.class_id
             INNER JOIN assignments a ON a.deleted_at IS NULL AND a.status = 'published' AND a.subject_id IN (" . self::in($subjectIds) . ")
                    AND (a.class_id = sde.class_id OR a.class_group_name = c.name OR EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id AND ac.class_id = sde.class_id))
                    AND COALESCE(a.deadline_at, a.due_date) BETWEEN DATE_SUB(NOW(), INTERVAL " . self::MISSED_DAYS . " DAY) AND NOW()
                    AND COALESCE(a.published_at, a.created_at) >= sde.start_date
             WHERE sde.student_id IN (" . self::in($ids) . ") AND sde.department_id = ? AND sde.status = 'active' AND sde.deleted_at IS NULL
               AND NOT EXISTS (
                   SELECT 1 FROM assignment_submissions sb WHERE sb.assignment_id = a.id AND sb.student_id = sde.student_id
                     AND sb.deleted_at IS NULL AND sb.status <> 'in_progress'
               )
             GROUP BY sde.student_id"
        );
        $stmt->execute(array_merge($subjectIds, $ids, [$departmentId]));
        $missed = [];
        foreach ($stmt->fetchAll() as $r) {
            $missed[(int) $r['student_id']] = ['count' => (int) $r['missed'], 'titles' => array_slice(explode('||', (string) $r['titles']), 0, 3)];
        }

        $quietBefore = new \DateTime('-' . self::QUIET_DAYS . ' days');
        $out = [];
        $summary = ['low' => 0, 'falling' => 0, 'quiet' => 0, 'missed' => 0, 'never' => 0, 'flagged' => 0, 'total' => count($ids)];
        foreach ($students as $sid => $s) {
            $signals = [];
            $avg = $health[$sid]['average'] ?? null;
            if ($avg !== null && $avg < ClassHealthService::SUPPORT_BELOW) {
                $signals[] = ['key' => 'low', 'text' => 'Average ' . round($avg) . '%'];
            }
            $imp = $growth[$sid]['improvement'] ?? null;
            if ($imp !== null && $imp <= self::FALLING_BY) {
                $signals[] = ['key' => 'falling', 'text' => 'Down ' . abs((int) round($imp)) . ' points this term'];
            }
            $last = $s['last_active_at'] ? new \DateTime($s['last_active_at']) : null;
            if (!$last) {
                $signals[] = ['key' => 'never', 'text' => 'Never signed in'];
            } elseif ($last < $quietBefore) {
                $signals[] = ['key' => 'quiet', 'text' => 'Not signed in for ' . (int) $last->diff(new \DateTime())->days . ' days'];
            }
            $m = $missed[$sid]['count'] ?? 0;
            if ($m >= self::MISSED_FROM) {
                $signals[] = ['key' => 'missed', 'text' => $m . ' deadlines missed'];
            }
            foreach ($signals as $sig) {
                $summary[$sig['key']]++;
            }
            if (!$signals) {
                continue;
            }
            // Flagged = needs a teacher: anything other than only never having signed in
            $needsTeacher = count(array_filter($signals, fn($g) => $g['key'] !== 'never')) > 0;
            $summary['flagged'] += $needsTeacher ? 1 : 0;
            $out[] = [
                'id' => $sid,
                'name' => trim($s['first_name'] . ' ' . $s['last_name']),
                'gender' => $s['gender'],
                'class_id' => (int) $s['class_id'],
                'class_label' => $classes[(int) $s['class_id']] ?? '',
                'average' => $avg,
                'improvement' => $imp,
                'last_active_at' => $s['last_active_at'],
                'missed' => $missed[$sid]['titles'] ?? [],
                'signals' => $signals,
                'needs_teacher' => $needsTeacher,
            ];
        }
        // Most signals first, then the lowest average
        usort($out, fn($a, $b) => $b['needs_teacher'] <=> $a['needs_teacher'] ?: count($b['signals']) <=> count($a['signals']) ?: (($a['average'] ?? 101) <=> ($b['average'] ?? 101)) ?: strcmp($a['name'], $b['name']));

        $this->success(['students' => $out, 'classes' => $this->classList($classes), 'summary' => $summary]);
    }

    private function classList(array $classes): array
    {
        $out = [];
        foreach ($classes as $id => $label) {
            $out[] = ['id' => $id, 'label' => $label];
        }
        return $out;
    }
}
