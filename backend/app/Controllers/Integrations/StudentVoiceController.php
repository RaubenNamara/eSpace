<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Integrations;

use eSpace\App\Controllers\Controller;
use eSpace\Config\Config;

/**
 * Read-only feed for Student Voice (the school's anonymous student feedback system), so students
 * there rate the teachers who actually teach them.
 *
 * GET /api/integrations/student-voice/teaching  with header X-Student-Voice-Key: <STUDENT_VOICE_API_KEY>
 *     optional ?school=<code> for a school other than the home school
 *
 * Off unless STUDENT_VOICE_API_KEY (32+ characters) is set in backend/.env; a wrong or missing key
 * gets a plain 404. It sends teachers' names and employee numbers, their subjects, and which
 * students take which subject with which teacher - by admission number only (Student Voice
 * already has the roster from SMIS). Nothing about marks, contacts, logins or anything else.
 */
class StudentVoiceController extends Controller
{
    public function teaching(): void
    {
        $key = (string) Config::get('STUDENT_VOICE_API_KEY', '');
        $given = (string) ($_SERVER['HTTP_X_STUDENT_VOICE_KEY'] ?? '');
        if (strlen($key) < 32 || !hash_equals($key, $given)) {
            $this->notFound('Not found');
            return;
        }
        $school = (string) $this->query('school', '');
        if ($school !== '' && !\eSpace\App\Support\Tenant::useForRequest($school)) {
            $this->notFound('Not found');
            return;
        }
        $db = \eSpace\Config\Database::getInstance();

        $teachers = $db->query(
            "SELECT id, TRIM(CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, ''))) AS name, employee_number
             FROM teachers WHERE deleted_at IS NULL AND is_active = 1 ORDER BY first_name, last_name"
        )->fetchAll(\PDO::FETCH_ASSOC);

        $subjects = $db->query("SELECT id, name FROM departments WHERE deleted_at IS NULL ORDER BY name")->fetchAll(\PDO::FETCH_ASSOC);

        // a teacher's subjects: their department assignments, and their own department
        $teacherSubjects = $db->query(
            "SELECT DISTINCT tda.teacher_id, tda.department_id
             FROM teacher_department_assignments tda JOIN teachers t ON t.id = tda.teacher_id
             WHERE tda.deleted_at IS NULL AND t.deleted_at IS NULL AND t.is_active = 1
             UNION
             SELECT id, department_id FROM teachers WHERE deleted_at IS NULL AND is_active = 1 AND department_id IS NOT NULL"
        )->fetchAll(\PDO::FETCH_NUM);

        // which subjects each active student takes
        $studentSubjects = $db->query(
            "SELECT DISTINCT s.admission_number, e.department_id
             FROM student_department_enrollments e JOIN students s ON s.id = e.student_id
             WHERE e.status = 'active' AND e.deleted_at IS NULL AND s.deleted_at IS NULL AND s.is_active = 1
               AND s.admission_number IS NOT NULL AND s.admission_number <> ''"
        )->fetchAll(\PDO::FETCH_NUM);

        // a student's own teacher for a subject, where the school recorded it
        $studentTeachers = $db->query(
            "SELECT s.admission_number, e.teacher_id, e.department_id
             FROM student_teacher_enrollments e
             JOIN students s ON s.id = e.student_id
             JOIN teachers t ON t.id = e.teacher_id
             WHERE e.status = 'active' AND s.deleted_at IS NULL AND s.is_active = 1
               AND t.deleted_at IS NULL AND t.is_active = 1
               AND s.admission_number IS NOT NULL AND s.admission_number <> ''"
        )->fetchAll(\PDO::FETCH_NUM);

        header('Cache-Control: no-store');
        $this->success([
            'generated_at' => date('c'),
            'teachers' => array_map(fn ($t) => ['id' => (int) $t['id'], 'name' => $t['name'], 'employee_number' => $t['employee_number']], $teachers),
            'subjects' => array_map(fn ($s) => ['id' => (int) $s['id'], 'name' => $s['name']], $subjects),
            'teacher_subjects' => array_map(fn ($r) => [(int) $r[0], (int) $r[1]], $teacherSubjects),
            'student_subjects' => array_map(fn ($r) => [(string) $r[0], (int) $r[1]], $studentSubjects),
            'student_teachers' => array_map(fn ($r) => [(string) $r[0], (int) $r[1], (int) $r[2]], $studentTeachers),
        ]);
    }
}
