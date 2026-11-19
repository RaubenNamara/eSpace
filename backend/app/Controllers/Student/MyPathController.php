<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Support\CareerPaths;

/**
 * My path: which A Level combinations suit a learner, and where each leads.
 *
 * GET /student/my-path - the learner's level and class, their subjects with their average on
 * marked work (all of it, every term), every combination with how well it fits them, and for
 * S.5-S.6 learners the combination they appear to be taking. Fit is the average of their marks in
 * the O Level subjects each of the combination's subjects builds on; a combination needing a
 * subject they never took (Physics, say) is marked so rather than hidden.
 */
class MyPathController extends Controller
{
    public function index(): void
    {
        if (!$this->isAuthenticated() || $this->getCurrentUserRole() !== 'student') {
            $this->forbidden();
            return;
        }
        $sid = (int) $_SESSION['user_id'];
        $db = \eSpace\Config\Database::getInstance();

        $me = $db->prepare("SELECT s.first_name, c.name AS class_name, c.level FROM students s LEFT JOIN classes c ON c.id = s.class_id WHERE s.id = ?");
        $me->execute([$sid]);
        $me = $me->fetch(\PDO::FETCH_ASSOC) ?: ['first_name' => '', 'class_name' => null, 'level' => null];
        $form = (int) preg_replace('/\D/', '', (string) ($me['class_name'] ?? ''));
        $aLevel = ($me['level'] ?? '') === 'A Level' || $form >= 5;

        // subjects the learner takes now (active enrolments) or took before (any enrolment)
        $stmt = $db->prepare(
            "SELECT d.id, d.name, COALESCE(NULLIF(d.description, ''), d.name) AS label, MAX(e.status = 'active') AS current
               FROM student_department_enrollments e JOIN departments d ON d.id = e.department_id
              WHERE e.student_id = ? AND e.deleted_at IS NULL AND d.deleted_at IS NULL
              GROUP BY d.id, d.name, label"
        );
        $stmt->execute([$sid]);
        $taken = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        // average on marked work per department: each assessment counted once, at its best returned mark
        $stmt = $db->prepare(
            "SELECT sj.department_id, AVG(x.pct) AS avg, COUNT(*) AS n
               FROM (SELECT assignment_id, MAX(percentage) AS pct FROM assignment_submissions
                      WHERE student_id = ? AND status = 'returned' AND percentage IS NOT NULL AND deleted_at IS NULL
                      GROUP BY assignment_id) x
               JOIN assignments a ON a.id = x.assignment_id AND a.deleted_at IS NULL
               JOIN subjects sj ON sj.id = a.subject_id
              GROUP BY sj.department_id"
        );
        $stmt->execute([$sid]);
        $marks = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $marks[(int) $r['department_id']] = ['avg' => (int) round((float) $r['avg']), 'n' => (int) $r['n']];
        }

        // by subject code: taken?, average
        $bySubject = [];
        $subjects = [];
        foreach ($taken as $t) {
            $code = CareerPaths::subjectOf((string) $t['name'], (string) $t['label']);
            $m = $marks[(int) $t['id']] ?? null;
            $subjects[] = ['name' => $t['label'], 'code' => $t['name'], 'current' => (bool) $t['current'], 'average' => $m['avg'] ?? null, 'marked' => $m['n'] ?? 0];
            if (!$code) continue;
            $prev = $bySubject[$code] ?? ['taken' => true, 'avg' => null, 'n' => 0];
            if ($m && ($prev['avg'] === null || $m['n'] > $prev['n'])) {
                $prev = ['taken' => true, 'avg' => $m['avg'], 'n' => $m['n']];
            }
            $bySubject[$code] = $prev;
        }
        usort($subjects, fn ($a, $b) => ($b['average'] ?? -1) <=> ($a['average'] ?? -1) ?: strcmp($a['name'], $b['name']));

        $combos = [];
        foreach (CareerPaths::COMBINATIONS as [$code, $principals, $sub, $interests, $courses, $careers]) {
            $parts = [];
            $scores = [];
            $missing = [];
            foreach ($principals as $p) {
                [$label, $basis, $must] = CareerPaths::A_SUBJECTS[$p];
                $best = null;
                $took = false;
                foreach ($basis as $b) {
                    if (!isset($bySubject[$b])) continue;
                    $took = true;
                    if ($bySubject[$b]['avg'] !== null && ($best === null || $bySubject[$b]['avg'] > $best)) $best = $bySubject[$b]['avg'];
                }
                if ($must && !$took) $missing[] = $label;
                if ($best !== null) $scores[] = $best;
                $parts[] = ['subject' => $label, 'average' => $best, 'taken' => $took];
            }
            $fit = $scores ? (int) round(array_sum($scores) / count($scores)) : null;
            $combos[] = [
                'code' => $code,
                'subjects' => $parts,
                'subsidiary' => $sub,
                'interests' => $interests,
                'courses' => $courses,
                'careers' => $careers,
                'fit' => $fit,
                'fit_from' => count($scores),
                'missing' => $missing,
                // all three subjects (or their O Level base) taken: this learner's current combination at A Level
                'all_taken' => count(array_filter($principals, fn ($p) => isset($bySubject[$p]))) === 3,
            ];
        }
        // suited first: nothing missing, then by fit (marks in all three before fewer), then by name
        usort($combos, function ($a, $b) {
            return [(int) !empty($a['missing']), -($a['fit'] ?? -1), -$a['fit_from'], $a['code']]
                <=> [(int) !empty($b['missing']), -($b['fit'] ?? -1), -$b['fit_from'], $b['code']];
        });

        $current = null;
        if ($aLevel) {
            foreach ($combos as $c) {
                if ($c['all_taken']) { $current = $c['code']; break; }
            }
        }

        $this->success([
            'first_name' => $me['first_name'],
            'class_name' => $me['class_name'],
            'a_level' => $aLevel,
            'current_combination' => $current,
            'subjects' => $subjects,
            'combinations' => $combos,
            'interests' => CareerPaths::INTERESTS,
            'has_marks' => (bool) $marks,
        ]);
    }
}
