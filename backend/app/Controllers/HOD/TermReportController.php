<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\HOD;

use eSpace\App\Controllers\Controller;

/**
 * The HOD's term in one printable report, and the streams of a class side by side.
 *
 * Streams: every class (stream) the department teaches - its learners, the assessments set for
 * it this term, how many scripts came in, the average on returned work, and the eNote topics
 * published for it - grouped by level, so "S.2 B is three assessments behind S.2 A" is plain.
 * Teachers: what each has set, written and still has to mark this term.
 *
 * GET /hod/term-report?term_id=   (defaults to the current term)
 */
class TermReportController extends Controller
{
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT COALESCE(department_id_active, department_id) FROM hods WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([(int) ($_SESSION['user_id'] ?? 0)]);
        $deptId = (int) $stmt->fetchColumn();
        if (!$deptId) {
            $this->error('HOD not found', 403);
            return;
        }
        $stmt = $db->prepare("SELECT id, name, code, description FROM departments WHERE id = ?");
        $stmt->execute([$deptId]);
        $dept = $stmt->fetch(\PDO::FETCH_ASSOC);

        $terms = $db->query(
            "SELECT t.id, t.name, t.start_date, t.end_date, t.is_current, y.name AS year_name
               FROM terms t LEFT JOIN academic_years y ON y.id = t.academic_year_id
              WHERE t.deleted_at IS NULL ORDER BY t.start_date DESC"
        )->fetchAll(\PDO::FETCH_ASSOC);
        $termId = (int) $this->query('term_id', 0);
        $term = null;
        foreach ($terms as $t) {
            if (($termId && (int) $t['id'] === $termId) || (!$termId && (int) $t['is_current'] === 1)) {
                $term = $t;
            }
        }
        $term ??= $terms[0] ?? null;
        if (!$term) {
            $this->success(['department' => $dept, 'terms' => [], 'term' => null, 'streams' => [], 'teachers' => [], 'figures' => null]);
            return;
        }
        $from = substr((string) $term['start_date'], 0, 10);
        $to = substr((string) $term['end_date'], 0, 10) . ' 23:59:59';
        // An assessment belongs to the term by term_id, or for older ones by when it was set
        $inTerm = "(a.term_id = :term_id OR (a.term_id IS NULL AND a.created_at BETWEEN :from AND :to))";
        $termParams = ['term_id' => (int) $term['id'], 'from' => $from, 'to' => $to];

        // ---- Streams ----
        $stmt = $db->prepare(
            "SELECT c.id, c.name, c.stream_name, COUNT(DISTINCT sde.student_id) AS learners
               FROM student_department_enrollments sde
               JOIN classes c ON c.id = sde.class_id AND c.deleted_at IS NULL
              WHERE sde.department_id = :dept AND sde.deleted_at IS NULL AND sde.status = 'active'
              GROUP BY c.id ORDER BY c.name, c.stream_name"
        );
        $stmt->execute(['dept' => $deptId]);
        $streams = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $c) {
            $streams[(int) $c['id']] = [
                'class_id' => (int) $c['id'],
                'level' => $c['name'],
                'stream' => $c['stream_name'] ?: '',
                'learners' => (int) $c['learners'],
                'assessments' => 0, 'handed_in' => 0, 'expected' => 0, 'returned' => 0, 'average' => null, 'enotes' => 0,
            ];
        }

        if ($streams) {
            $in = implode(',', array_keys($streams));
            $stmt = $db->prepare(
                "SELECT a.class_id, COUNT(DISTINCT a.id) AS assessments,
                        COUNT(sub.id) AS handed_in,
                        SUM(sub.status = 'returned') AS returned,
                        AVG(CASE WHEN sub.status = 'returned' THEN sub.percentage END) AS average
                   FROM assignments a
                   JOIN subjects s ON s.id = a.subject_id AND s.department_id = :dept
                   LEFT JOIN assignment_submissions sub ON sub.assignment_id = a.id AND sub.submitted_at IS NOT NULL
                  WHERE a.deleted_at IS NULL AND a.status <> 'draft' AND a.class_id IN ({$in}) AND {$inTerm}
                  GROUP BY a.class_id"
            );
            $stmt->execute(array_merge(['dept' => $deptId], $termParams));
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                $s = &$streams[(int) $r['class_id']];
                $s['assessments'] = (int) $r['assessments'];
                $s['handed_in'] = (int) $r['handed_in'];
                $s['returned'] = (int) $r['returned'];
                $s['average'] = $r['average'] !== null ? round((float) $r['average'], 1) : null;
                $s['expected'] = $s['assessments'] * $s['learners'];
                unset($s);
            }
            $stmt = $db->prepare(
                "SELECT class_id, COUNT(*) n FROM enote_topics
                  WHERE department_id = ? AND status = 'published' AND deleted_at IS NULL AND class_id IN ({$in}) GROUP BY class_id"
            );
            $stmt->execute([$deptId]);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                $streams[(int) $r['class_id']]['enotes'] = (int) $r['n'];
            }
        }

        // ---- Teachers ----
        $stmt = $db->prepare(
            "SELECT t.id, t.first_name, t.last_name, t.last_login_at,
                    (SELECT COUNT(*) FROM assignments a JOIN subjects s ON s.id = a.subject_id
                      WHERE a.teacher_id = t.id AND s.department_id = :dept_a AND a.deleted_at IS NULL AND a.status <> 'draft' AND {$inTerm}) AS assessments,
                    (SELECT COUNT(*) FROM enote_topics et WHERE et.teacher_id = t.id AND et.department_id = :dept_e AND et.deleted_at IS NULL AND et.status = 'published') AS enotes,
                    (SELECT COUNT(*) FROM assignment_submissions sub JOIN assignments a ON a.id = sub.assignment_id
                      WHERE a.teacher_id = t.id AND a.deleted_at IS NULL AND sub.status IN ('submitted', 'marking')) AS to_mark
               FROM teachers t
              WHERE t.deleted_at IS NULL AND (t.department_id = :dept_t OR EXISTS (
                    SELECT 1 FROM teacher_department_assignments tda WHERE tda.teacher_id = t.id AND tda.department_id = :dept_x AND tda.deleted_at IS NULL))
              ORDER BY t.first_name, t.last_name"
        );
        $stmt->execute(array_merge(['dept_a' => $deptId, 'dept_e' => $deptId, 'dept_t' => $deptId, 'dept_x' => $deptId], $termParams));
        $teachers = array_map(static fn ($r) => [
            'id' => (int) $r['id'],
            'name' => trim($r['first_name'] . ' ' . $r['last_name']),
            'assessments' => (int) $r['assessments'],
            'enotes' => (int) $r['enotes'],
            'to_mark' => (int) $r['to_mark'],
            'last_login_at' => $r['last_login_at'],
        ], $stmt->fetchAll(\PDO::FETCH_ASSOC));

        $rows = array_values($streams);
        $returnedAll = array_sum(array_column($rows, 'returned'));
        $handedAll = array_sum(array_column($rows, 'handed_in'));
        $weighted = 0.0;
        foreach ($rows as $r) {
            if ($r['average'] !== null) {
                $weighted += $r['average'] * $r['returned'];
            }
        }

        $this->success([
            'department' => $dept,
            'terms' => array_map(static fn ($t) => ['id' => (int) $t['id'], 'name' => $t['name'], 'year' => $t['year_name'], 'is_current' => (int) $t['is_current'] === 1], $terms),
            'term' => ['id' => (int) $term['id'], 'name' => $term['name'], 'year' => $term['year_name'], 'start_date' => $from, 'end_date' => substr((string) $term['end_date'], 0, 10)],
            'streams' => $rows,
            'teachers' => $teachers,
            'figures' => [
                'learners' => array_sum(array_column($rows, 'learners')),
                'teachers' => count($teachers),
                'assessments' => array_sum(array_column($teachers, 'assessments')),
                'handed_in' => $handedAll,
                'returned' => $returnedAll,
                'average' => $returnedAll ? round($weighted / $returnedAll, 1) : null,
                'to_mark' => array_sum(array_column($teachers, 'to_mark')),
                'enotes' => array_sum(array_column($teachers, 'enotes')),
            ],
        ]);
    }
}
