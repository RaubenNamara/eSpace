<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * What is still missing in the school's setup - the admin dashboard's checklist. Each item says
 * how many things need attention and links straight to the page that fixes them; an item with
 * nothing outstanding comes back as done. Also the headline figures for the dashboard.
 *
 * GET /admin/setup-checklist
 */
class SetupChecklistController extends Controller
{
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        \eSpace\App\Services\TermService::syncCurrent();
        if (!$this->hasAnyRole(['admin', 'super_admin'])) {
            $this->forbidden();
            return;
        }

        $db = \eSpace\Config\Database::getInstance();
        $one = static fn (string $sql): int => (int) $db->query($sql)->fetchColumn();
        $names = static function (string $sql) use ($db): array {
            return array_values(array_filter(array_map('strval', $db->query($sql)->fetchAll(\PDO::FETCH_COLUMN))));
        };
        $items = [];
        $add = static function (string $key, string $title, int $count, string $todo, string $done, string $link, array $examples = []) use (&$items): void {
            $items[] = [
                'key' => $key,
                'title' => $title,
                'count' => $count,
                'done' => $count === 0,
                'detail' => $count === 0 ? $done : $todo,
                'link' => $link,
                'examples' => array_slice($examples, 0, 4),
            ];
        };

        // ---- The calendar: a current year, a current term, and the right one ----
        $today = date('Y-m-d');
        $termToday = $db->query(
            "SELECT id, name, is_current FROM terms
              WHERE deleted_at IS NULL AND DATE(start_date) <= '{$today}' AND DATE(end_date) >= '{$today}'
              ORDER BY start_date DESC LIMIT 1"
        )->fetch(\PDO::FETCH_ASSOC) ?: null;
        $marked = $db->query("SELECT id, name FROM terms WHERE deleted_at IS NULL AND is_current = 1 LIMIT 1")->fetch(\PDO::FETCH_ASSOC) ?: null;
        $termProblem = 0;
        $termDetail = 'The current term is set and matches today.';
        if (!$marked) {
            $termProblem = 1;
            $termDetail = 'No term is marked as current - report cards and dashboards need one.';
        } elseif ($termToday && (int) $termToday['id'] !== (int) $marked['id']) {
            $termProblem = 1;
            $termDetail = "{$marked['name']} is marked current, but today falls in {$termToday['name']}.";
        }
        $items[] = [
            'key' => 'term', 'title' => 'Current term', 'count' => $termProblem, 'done' => $termProblem === 0,
            'detail' => $termDetail, 'link' => '/admin/academic-years', 'examples' => [],
        ];

        $yearEnd = $db->query("SELECT MAX(DATE(end_date)) FROM academic_years WHERE deleted_at IS NULL")->fetchColumn();
        $needsNextYear = $yearEnd && strtotime((string) $yearEnd) < strtotime('+6 weeks') ? 1 : 0;
        $add('next_year', 'Next school year', $needsNextYear,
            'This school year ends ' . ($yearEnd ? date('j M', strtotime((string) $yearEnd)) : 'soon') . ' and the next one is not set up yet.',
            'The next school year is in place.', '/admin/academic-years');

        // ---- A new school's first week: the things that must exist at all, in the order they
        // are set up. Each counts as one thing to do until there is at least one. (The checks
        // below look for problems among what exists - with nothing there, they'd all look done.)
        // The "Tusome Library" account that owns shared content is not a real teacher.
        $realTeachers = "deleted_at IS NULL AND is_active = 1 AND (employee_number IS NULL OR employee_number <> 'TUSOME-LIBRARY')";
        $have = [
            'subjects' => $one("SELECT COUNT(*) FROM subjects WHERE deleted_at IS NULL"),
            'classes' => $one("SELECT COUNT(*) FROM classes WHERE deleted_at IS NULL"),
            'teachers' => $one("SELECT COUNT(*) FROM teachers WHERE {$realTeachers}"),
            'students' => $one("SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND is_active = 1"),
        ];
        $add('has_subjects', 'Departments and subjects', $have['subjects'] ? 0 : 1,
            'No subjects yet - add the departments, then their subjects.', "{$have['subjects']} subjects.", '/admin/departments');
        $add('has_classes', 'Classes and streams', $have['classes'] ? 0 : 1,
            'No classes yet - add S.1 to S.6 with their streams.', "{$have['classes']} class streams.", '/admin/classes');
        $add('has_teachers', 'Teachers', $have['teachers'] ? 0 : 1,
            'No teachers yet - add them (or import a list), each in their department.', "{$have['teachers']} teachers.", '/admin/teachers');
        $add('has_students', 'Learners', $have['students'] ? 0 : 1,
            'No learners yet - add them (or import a list) into their classes.', "{$have['students']} learners.", '/admin/students');

        // ---- People and structure ----
        $add('dept_heads', 'Departments with a head',
            $one("SELECT COUNT(*) FROM departments d WHERE d.deleted_at IS NULL AND NOT EXISTS (
                    SELECT 1 FROM hods h WHERE h.deleted_at IS NULL AND COALESCE(h.department_id_active, h.department_id) = d.id)"),
            'departments have no head of department.', 'Every department has a head.', '/admin/hods',
            $names("SELECT COALESCE(NULLIF(d.description, ''), d.name) FROM departments d WHERE d.deleted_at IS NULL AND NOT EXISTS (
                    SELECT 1 FROM hods h WHERE h.deleted_at IS NULL AND COALESCE(h.department_id_active, h.department_id) = d.id) ORDER BY d.name"));

        $add('class_teachers', 'Class teachers',
            $one("SELECT COUNT(*) FROM classes c WHERE c.deleted_at IS NULL AND c.class_teacher_id IS NULL
                    AND EXISTS (SELECT 1 FROM students s WHERE s.class_id = c.id AND s.deleted_at IS NULL)"),
            'classes with learners have no class teacher (they write the report cards).', 'Every class with learners has a class teacher.', '/admin/classes',
            $names("SELECT CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT(' ', c.stream_name))) FROM classes c
                    WHERE c.deleted_at IS NULL AND c.class_teacher_id IS NULL
                      AND EXISTS (SELECT 1 FROM students s WHERE s.class_id = c.id AND s.deleted_at IS NULL) ORDER BY c.name, c.stream_name"));

        $add('teaching', 'Who teaches what',
            $one("SELECT COUNT(*) FROM subjects s WHERE s.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM class_subjects cs WHERE cs.subject_id = s.id AND cs.teacher_id IS NOT NULL)"),
            'subjects have no teacher assigned to any class.', 'Every subject has a teacher for its classes.', '/admin/assign-teachers',
            $names("SELECT s.name FROM subjects s WHERE s.deleted_at IS NULL AND NOT EXISTS (SELECT 1 FROM class_subjects cs WHERE cs.subject_id = s.id AND cs.teacher_id IS NOT NULL) ORDER BY s.name"));

        $add('teacher_depts', 'Teachers in a department',
            $one("SELECT COUNT(*) FROM teachers t WHERE t.deleted_at IS NULL AND t.department_id IS NULL
                    AND (t.employee_number IS NULL OR t.employee_number <> 'TUSOME-LIBRARY')
                    AND NOT EXISTS (SELECT 1 FROM teacher_department_assignments a WHERE a.teacher_id = t.id AND a.deleted_at IS NULL)"),
            'teachers are not in any department, so they cannot see its classes.', 'Every teacher belongs to a department.', '/admin/teachers');

        $add('student_classes', 'Learners in a class',
            $one("SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND is_active = 1 AND class_id IS NULL"),
            'active learners have no class.', 'Every active learner is in a class.', '/admin/students');

        // ---- This term ----
        $examCount = $one("SELECT COUNT(*) FROM exam_dates WHERE deleted_at IS NULL AND DATE(ends_on) >= '{$today}'");
        $add('exam_dates', 'Exam dates', $examCount > 0 ? 0 : 1,
            'No upcoming exams are set - students\' exam countdown and revision planner stay empty.',
            "{$examCount} upcoming exam period" . ($examCount === 1 ? '' : 's') . ' set.', '/admin/exam-dates');

        $neverTeachers = $one("SELECT COUNT(*) FROM teachers WHERE {$realTeachers} AND last_login_at IS NULL");
        $add('teacher_logins', 'Teachers signed in', $neverTeachers,
            'active teachers have never signed in - they may need their login details.', 'Every active teacher has signed in.', '/admin/teachers');

        // Learners who have never logged in most likely don't have their login yet: print their
        // class's login slips (Students: choose the class, then Print login slips)
        $neverStudents = $one("SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND is_active = 1 AND last_login_at IS NULL");
        $add('student_logins', 'Learners logged in', $neverStudents,
            'learners have never logged in - print their class\'s login slips (Students: choose the class, then Print login slips).',
            'Every learner has logged in at least once.', '/admin/students',
            $names("SELECT CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT(' ', c.stream_name)), ' (', COUNT(*), ')')
                    FROM students s JOIN classes c ON c.id = s.class_id
                    WHERE s.deleted_at IS NULL AND s.is_active = 1 AND s.last_login_at IS NULL
                    GROUP BY c.id, c.name, c.stream_name ORDER BY COUNT(*) DESC"));

        // ---- Headline figures ----
        $week = date('Y-m-d H:i:s', strtotime('-7 days'));
        $figures = [
            'students' => $one("SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND is_active = 1"),
            'teachers' => $one("SELECT COUNT(*) FROM teachers WHERE deleted_at IS NULL AND is_active = 1"),
            'classes' => $one("SELECT COUNT(*) FROM classes WHERE deleted_at IS NULL"),
            'students_active_week' => $one("SELECT COUNT(*) FROM students WHERE deleted_at IS NULL AND COALESCE(last_active_at, last_login_at) >= '{$week}'"),
            'teachers_active_week' => $one("SELECT COUNT(*) FROM teachers WHERE deleted_at IS NULL AND COALESCE(last_active_at, last_login_at) >= '{$week}'"),
        ];

        $this->success([
            'items' => $items,
            'done' => count(array_filter($items, static fn ($i) => $i['done'])),
            'total' => count($items),
            'figures' => $figures,
            'current_term' => $marked['name'] ?? null,
        ]);
    }
}
