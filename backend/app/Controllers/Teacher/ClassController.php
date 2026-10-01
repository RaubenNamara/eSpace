<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;

/**
 * Teacher Class Controller
 * 
 * Handles class-related operations for teachers including viewing enrolled students by class.
 */
class ClassController extends Controller
{
    /**
     * Get database instance
     */
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Get current user ID from session
     */
    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * Get current teacher's active department ID (session-scoped - see
     * Controller::getActiveDepartmentId(); a teacher in more than one department can switch
     * this via PUT /teacher/departments/active without changing their admin-set primary)
     */
    private function getTeacherDepartmentId(): ?int
    {
        return $this->getActiveDepartmentId();
    }

    /**
     * The class IDs this teacher has been explicitly assigned to teach (Admin > Assign
     * Teachers, class_subjects) for the current term. Empty means "not yet assigned" -
     * callers should fall back to the old department-wide view rather than show nothing,
     * so a teacher's dashboard isn't emptied out the moment this feature shipped.
     */
    private function getAssignedClassIds(): array
    {
        $teacherId = $this->resolveActiveTeacherId();
        if (!$teacherId) {
            return [];
        }

        $stmt = $this->getDb()->prepare(
            "SELECT DISTINCT cs.class_id
             FROM class_subjects cs
             INNER JOIN terms t ON t.id = cs.term_id AND t.is_current = 1 AND t.deleted_at IS NULL
             WHERE cs.teacher_id = :teacher_id"
        );
        $stmt->execute(['teacher_id' => $teacherId]);

        return array_map('intval', array_column($stmt->fetchAll(\PDO::FETCH_ASSOC), 'class_id'));
    }

    /**
     * Get list of classes in teacher's department - narrowed to their explicitly assigned
     * class streams once they have any (see getAssignedClassIds()).
     * GET /teacher/classes
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();

        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $academicYear = $this->query('academic_year');
        $assignedClassIds = $this->getAssignedClassIds();

        try {
            $sql = "SELECT DISTINCT c.id, c.name, c.level, c.stream_name, COUNT(se.id) as student_count
                    FROM classes c
                    INNER JOIN student_department_enrollments se ON c.id = se.class_id
                    WHERE se.department_id = :department_id
                    AND se.deleted_at IS NULL
                    AND c.deleted_at IS NULL";

            $params = ['department_id' => $departmentId];

            if ($academicYear) {
                $sql .= " AND se.academic_year = :academic_year";
                $params['academic_year'] = $academicYear;
            }

            if (!empty($assignedClassIds)) {
                $placeholders = [];
                foreach ($assignedClassIds as $i => $classId) {
                    $key = "assigned_class_{$i}";
                    $placeholders[] = ":{$key}";
                    $params[$key] = $classId;
                }
                $sql .= " AND c.id IN (" . implode(',', $placeholders) . ")";
            }

            $sql .= " GROUP BY c.id, c.name, c.level, c.stream_name ORDER BY c.level, c.name";

            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute($params);
            $classes = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($classes, 'Classes retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch classes: " . $e->getMessage());
            $this->error('Failed to fetch classes: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get available academic years in teacher's department
     * GET /teacher/classes/academic-years
     */
    public function academicYears(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        try {
            $sql = "SELECT DISTINCT academic_year
                    FROM student_department_enrollments
                    WHERE department_id = :department_id
                    AND deleted_at IS NULL
                    ORDER BY academic_year DESC";
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute(['department_id' => $departmentId]);
            $years = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($years, 'Academic years retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch academic years: " . $e->getMessage());
            $this->error('Failed to fetch academic years: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get students enrolled in a specific class
     * GET /teacher/classes/{id}/students
     */
    public function students(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $classId = $this->routeParam('id');

        if (!$classId) {
            $this->error('Class ID is required', 400);
            return;
        }

        // Once a teacher has explicit class-stream assignments, they may only view students
        // of a class in that set - otherwise (not assigned to any yet) keep the old
        // department-wide access.
        $assignedClassIds = $this->getAssignedClassIds();
        if (!empty($assignedClassIds) && !in_array((int) $classId, $assignedClassIds, true)) {
            $this->forbidden('You are not assigned to this class');
            return;
        }

        $academicYear = $this->query('academic_year');

        try {
            $sql = "SELECT se.id as enrollment_id, s.id as student_id, s.admission_number, s.first_name, s.last_name, s.gender,
                           se.department_id, se.academic_year, se.class_id,
                           d.name as department_name, c.name as class_name, c.level, c.stream_name
                    FROM student_department_enrollments se
                    INNER JOIN students s ON se.student_id = s.id
                    LEFT JOIN departments d ON se.department_id = d.id
                    LEFT JOIN classes c ON se.class_id = c.id
                    WHERE se.department_id = :department_id
                    AND se.class_id = :class_id
                    AND se.deleted_at IS NULL";
            
            $params = ['department_id' => $departmentId, 'class_id' => $classId];

            if ($academicYear) {
                $sql .= " AND se.academic_year = :academic_year";
                $params['academic_year'] = $academicYear;
            }

            $sql .= " ORDER BY s.last_name, s.first_name";
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute($params);
            $students = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            $this->success($students, 'Students retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch students: " . $e->getMessage());
            $this->error('Failed to fetch students: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Get class details
     * GET /teacher/classes/{id}
     */
    public function show(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $departmentId = $this->getTeacherDepartmentId();
        
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $classId = $this->routeParam('id');
        
        if (!$classId) {
            $this->error('Class ID is required', 400);
            return;
        }

        try {
            $sql = "SELECT c.id, c.name, c.level, c.stream_name, c.capacity, c.class_teacher_id,
                           COUNT(se.id) as student_count
                    FROM classes c
                    LEFT JOIN student_department_enrollments se ON c.id = se.class_id AND se.deleted_at IS NULL
                    WHERE c.id = :class_id
                    AND c.deleted_at IS NULL
                    GROUP BY c.id, c.name, c.level, c.stream_name, c.capacity, c.class_teacher_id";
            
            $stmt = $this->getDb()->prepare($sql);
            $stmt->execute(['class_id' => $classId]);
            $class = $stmt->fetch(\PDO::FETCH_ASSOC);

            if (!$class) {
                $this->notFound('Class not found');
                return;
            }

            $this->success($class, 'Class retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch class: " . $e->getMessage());
            $this->error('Failed to fetch class: ' . $e->getMessage(), 500);
        }
    }

    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    /** The teacher's id for this session (a HOD teaches through their linked teacher record) */
    private function teacherIdForSession(): int
    {
        return (int) ($this->resolveActiveTeacherId() ?? 0);
    }

    /**
     * Every class stream in the teacher's department with its students, how it is doing and
     * whether the teacher teaches it - for My Classes.
     * GET /teacher/classes/overview?academic_year=
     */
    public function overview(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }

        $teacherId = $this->teacherIdForSession();
        $academicYear = $this->query('academic_year');
        $db = $this->getDb();

        try {
            $sql = "SELECT c.id, c.name, c.level, c.stream_name,
                           COUNT(DISTINCT se.student_id) AS students,
                           COUNT(DISTINCT CASE WHEN s.gender = 'male' THEN s.id END) AS boys,
                           COUNT(DISTINCT CASE WHEN s.gender = 'female' THEN s.id END) AS girls
                    FROM classes c
                    INNER JOIN student_department_enrollments se ON se.class_id = c.id
                        AND se.department_id = :department_id AND se.deleted_at IS NULL AND se.status = 'active'
                    INNER JOIN students s ON s.id = se.student_id AND s.deleted_at IS NULL
                    WHERE c.deleted_at IS NULL";
            $params = ['department_id' => $departmentId];
            if ($academicYear) {
                $sql .= " AND se.academic_year = :academic_year";
                $params['academic_year'] = $academicYear;
            }
            $sql .= " GROUP BY c.id, c.name, c.level, c.stream_name ORDER BY c.name, c.stream_name";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $rows = $stmt->fetchAll(\PDO::FETCH_ASSOC);

            // The streams this teacher teaches: assigned by the admin, or set work for
            $mine = array_unique(array_merge(
                $this->getAssignedClassIds(),
                $teacherId ? \eSpace\App\Services\ClassHealthService::teacherClassIds($db, $teacherId) : []
            ));

            // Submissions waiting to be marked, per stream (directly, or as "all streams" of a level)
            $waitingById = [];
            $waitingByLevel = [];
            if ($teacherId) {
                $stmt = $db->prepare(
                    "SELECT a.class_id, a.class_group_name, COUNT(*) AS n
                     FROM assignment_submissions sb
                     INNER JOIN assignments a ON a.id = sb.assignment_id AND a.deleted_at IS NULL AND a.teacher_id = ?
                     WHERE sb.deleted_at IS NULL AND sb.status IN ('submitted', 'marking')
                     GROUP BY a.class_id, a.class_group_name"
                );
                $stmt->execute([$teacherId]);
                foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                    if ($r['class_id']) {
                        $waitingById[(int) $r['class_id']] = ($waitingById[(int) $r['class_id']] ?? 0) + (int) $r['n'];
                    } elseif ($r['class_group_name']) {
                        $waitingByLevel[$r['class_group_name']] = ($waitingByLevel[$r['class_group_name']] ?? 0) + (int) $r['n'];
                    }
                }
            }

            $subjectIds = \eSpace\App\Services\ClassHealthService::departmentSubjectIds($db, $departmentId);
            $streams = [];
            foreach ($rows as $r) {
                $id = (int) $r['id'];
                $isMine = in_array($id, $mine, true);
                $achieved = null;
                $needSupport = 0;
                if ($isMine && $subjectIds) {
                    $ids = $this->rosterStudentIds($db, $id, $departmentId, $academicYear ?: null, $teacherId);
                    if ($ids) {
                        $h = \eSpace\App\Services\ClassHealthService::forStudents($db, $ids, $subjectIds);
                        $achieved = $h['achieved_percent'];
                        $needSupport = $h['need_support'];
                    }
                }
                $streams[] = [
                    'id' => $id,
                    'name' => $r['name'],
                    'level' => $r['level'],
                    'stream_name' => $r['stream_name'] !== '' ? $r['stream_name'] : null,
                    'students' => (int) $r['students'],
                    'boys' => (int) $r['boys'],
                    'girls' => (int) $r['girls'],
                    'mine' => $isMine,
                    'achieved_percent' => $achieved,
                    'need_support' => $needSupport,
                    'to_mark' => $isMine ? ($waitingById[$id] ?? 0) + ($waitingByLevel[$r['name']] ?? 0) : 0,
                ];
            }

            $this->success(['streams' => $streams], 'Classes retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch classes overview: " . $e->getMessage());
            $this->error('Failed to fetch classes: ' . $e->getMessage(), 500);
        }
    }

    /** Student ids on a stream's roster for the department (not withdrawn from this teacher) */
    private function rosterStudentIds($db, int $classId, int $departmentId, ?string $academicYear, int $teacherId): array
    {
        $sql = "SELECT DISTINCT se.student_id FROM student_department_enrollments se
                INNER JOIN students s ON s.id = se.student_id AND s.deleted_at IS NULL
                WHERE se.class_id = ? AND se.department_id = ? AND se.deleted_at IS NULL AND se.status = 'active'";
        $params = [$classId, $departmentId];
        if ($academicYear) {
            $sql .= " AND se.academic_year = ?";
            $params[] = $academicYear;
        }
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        return array_map('intval', array_column($stmt->fetchAll(\PDO::FETCH_ASSOC), 'student_id'));
    }

    /**
     * One class stream's page: students and their results, the teacher's assessments and eNotes.
     * GET /teacher/classes/{id}/detail?academic_year=
     */
    public function detail(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $departmentId = $this->getTeacherDepartmentId();
        if (!$departmentId) {
            $this->error('Teacher not assigned to a department', 403);
            return;
        }
        $classId = (int) $this->routeParam('id');
        if (!$classId) {
            $this->error('Class ID is required', 400);
            return;
        }

        $teacherId = $this->teacherIdForSession();
        $academicYear = $this->query('academic_year') ?: null;
        $db = $this->getDb();

        try {
            $stmt = $db->prepare("SELECT id, name, level, stream_name FROM classes WHERE id = ? AND deleted_at IS NULL");
            $stmt->execute([$classId]);
            $class = $stmt->fetch(\PDO::FETCH_ASSOC);
            if (!$class) {
                $this->notFound('Class not found');
                return;
            }
            $class['id'] = (int) $class['id'];
            $class['stream_name'] = $class['stream_name'] !== '' ? $class['stream_name'] : null;

            // Roster: one row per enrolled student, newest enrolment of the department
            $sql = "SELECT MAX(se.id) AS enrollment_id, s.id AS student_id, s.first_name, s.last_name,
                           s.admission_number, s.gender, s.last_active_at, s.last_login_at
                    FROM student_department_enrollments se
                    INNER JOIN students s ON s.id = se.student_id AND s.deleted_at IS NULL
                    WHERE se.class_id = :class_id AND se.department_id = :department_id
                      AND se.deleted_at IS NULL AND se.status = 'active'
                      AND NOT EXISTS (
                          SELECT 1 FROM student_teacher_enrollments ste
                          WHERE ste.student_id = se.student_id AND ste.teacher_id = :teacher_id
                            AND ste.department_id = se.department_id AND ste.status = 'withdrawn'
                      )";
            $params = ['class_id' => $classId, 'department_id' => $departmentId, 'teacher_id' => $teacherId];
            if ($academicYear) {
                $sql .= " AND se.academic_year = :academic_year";
                $params['academic_year'] = $academicYear;
            }
            $sql .= " GROUP BY s.id, s.first_name, s.last_name, s.admission_number, s.gender, s.last_active_at, s.last_login_at
                      ORDER BY s.last_name, s.first_name";
            $stmt = $db->prepare($sql);
            $stmt->execute($params);
            $roster = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            $studentIds = array_map(fn($r) => (int) $r['student_id'], $roster);

            $subjectIds = \eSpace\App\Services\ClassHealthService::departmentSubjectIds($db, $departmentId);
            $health = \eSpace\App\Services\ClassHealthService::forStudents($db, $studentIds, $subjectIds);
            $termId = \eSpace\App\Services\GrowthService::currentTermId($db);
            $growth = $studentIds
                ? \eSpace\App\Services\GrowthService::forStudents($db, $studentIds, $termId, count($subjectIds) === 1 ? $subjectIds[0] : null)
                : [];

            // The teacher's work for this stream: set directly, or for all streams of the level
            $forClass = "(x.class_id = ? OR (x.class_id IS NULL AND x.class_group_name = ?))";

            // Submissions per student on this teacher's assessments for the stream
            $subCount = [];
            if ($studentIds && $teacherId) {
                $stmt = $db->prepare(
                    "SELECT sb.student_id, COUNT(*) AS n FROM assignment_submissions sb
                     INNER JOIN assignments x ON x.id = sb.assignment_id AND x.deleted_at IS NULL AND x.teacher_id = ? AND $forClass
                     WHERE sb.deleted_at IS NULL AND sb.status IN ('submitted', 'marking', 'returned')
                       AND sb.student_id IN (" . self::in($studentIds) . ")
                     GROUP BY sb.student_id"
                );
                $stmt->execute(array_merge([$teacherId, $classId, $class['name']], $studentIds));
                foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                    $subCount[(int) $r['student_id']] = (int) $r['n'];
                }
            }

            $students = [];
            foreach ($roster as $r) {
                $sid = (int) $r['student_id'];
                $h = $health['students'][$sid] ?? ['average' => null, 'outcomes_achieved' => 0, 'outcomes_assessed' => 0];
                $students[] = [
                    'enrollment_id' => (int) $r['enrollment_id'],
                    'student_id' => $sid,
                    'name' => trim($r['first_name'] . ' ' . $r['last_name']),
                    'admission_number' => $r['admission_number'],
                    'gender' => $r['gender'],
                    'average' => $h['average'],
                    'outcomes_achieved' => $h['outcomes_achieved'],
                    'outcomes_assessed' => $h['outcomes_assessed'],
                    'submissions' => $subCount[$sid] ?? 0,
                    'improvement' => $growth[$sid]['improvement'] ?? null,
                    'last_active' => $r['last_active_at'] ?: $r['last_login_at'],
                ];
            }

            // Assessments
            $assessments = [];
            $toMark = 0;
            if ($teacherId) {
                $stmt = $db->prepare(
                    "SELECT x.id, x.title, x.assessment_category, x.status, x.due_date
                     FROM assignments x
                     WHERE x.deleted_at IS NULL AND x.teacher_id = ? AND $forClass
                     ORDER BY x.due_date IS NULL, x.due_date DESC, x.id DESC"
                );
                $stmt->execute([$teacherId, $classId, $class['name']]);
                $list = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                $byAssignment = [];
                if ($list && $studentIds) {
                    $aIds = array_map(fn($a) => (int) $a['id'], $list);
                    $stmt = $db->prepare(
                        "SELECT sb.assignment_id,
                                SUM(sb.status IN ('submitted', 'marking', 'returned')) AS submitted,
                                SUM(sb.status = 'returned') AS marked,
                                SUM(sb.status IN ('submitted', 'marking')) AS waiting
                         FROM assignment_submissions sb
                         WHERE sb.deleted_at IS NULL AND sb.assignment_id IN (" . self::in($aIds) . ")
                           AND sb.student_id IN (" . self::in($studentIds) . ")
                         GROUP BY sb.assignment_id"
                    );
                    $stmt->execute(array_merge($aIds, $studentIds));
                    foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                        $byAssignment[(int) $r['assignment_id']] = $r;
                    }
                }
                foreach ($list as $a) {
                    $c = $byAssignment[(int) $a['id']] ?? ['submitted' => 0, 'marked' => 0, 'waiting' => 0];
                    $toMark += (int) $c['waiting'];
                    $assessments[] = [
                        'id' => (int) $a['id'],
                        'title' => $a['title'],
                        'category' => $a['assessment_category'],
                        'status' => $a['status'],
                        'due_date' => $a['due_date'],
                        'submitted' => (int) $c['submitted'],
                        'marked' => (int) $c['marked'],
                        'waiting' => (int) $c['waiting'],
                    ];
                }
            }

            // eNotes
            $enotes = [];
            if ($teacherId) {
                $stmt = $db->prepare(
                    "SELECT x.id, x.title, x.status,
                            (SELECT COUNT(*) FROM enote_pages p WHERE p.topic_id = x.id AND p.deleted_at IS NULL) AS pages
                     FROM enote_topics x
                     WHERE x.deleted_at IS NULL AND x.status <> 'archived' AND x.teacher_id = ? AND $forClass
                     ORDER BY x.id DESC"
                );
                $stmt->execute([$teacherId, $classId, $class['name']]);
                $topics = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                $progress = [];
                if ($topics && $studentIds) {
                    $tIds = array_map(fn($t) => (int) $t['id'], $topics);
                    $stmt = $db->prepare(
                        "SELECT topic_id, COUNT(*) AS opened, SUM(completed_at IS NOT NULL) AS finished
                         FROM enote_progress
                         WHERE topic_id IN (" . self::in($tIds) . ") AND student_id IN (" . self::in($studentIds) . ")
                         GROUP BY topic_id"
                    );
                    $stmt->execute(array_merge($tIds, $studentIds));
                    foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                        $progress[(int) $r['topic_id']] = $r;
                    }
                }
                foreach ($topics as $t) {
                    $p = $progress[(int) $t['id']] ?? ['opened' => 0, 'finished' => 0];
                    $enotes[] = [
                        'id' => (int) $t['id'],
                        'title' => $t['title'],
                        'status' => $t['status'],
                        'pages' => (int) $t['pages'],
                        'opened' => (int) $p['opened'],
                        'finished' => (int) $p['finished'],
                    ];
                }
            }

            // The subject, for the Class Learning Map link: the one the admin assigned this teacher
            // to this stream, else the department's only subject
            $subjectId = null;
            if ($teacherId) {
                $stmt = $db->prepare(
                    "SELECT cs.subject_id FROM class_subjects cs
                     INNER JOIN terms t ON t.id = cs.term_id AND t.is_current = 1 AND t.deleted_at IS NULL
                     WHERE cs.class_id = ? AND cs.teacher_id = ? LIMIT 1"
                );
                $stmt->execute([$classId, $teacherId]);
                $subjectId = $stmt->fetchColumn() ?: null;
            }
            if (!$subjectId && count($subjectIds) === 1) {
                $subjectId = $subjectIds[0];
            }

            $this->success([
                'class' => $class,
                'subject_id' => $subjectId ? (int) $subjectId : null,
                'summary' => [
                    'students' => count($students),
                    'achieved_percent' => $health['achieved_percent'],
                    'need_support' => $health['need_support'],
                    'assessed_students' => $health['assessed_students'],
                    'to_mark' => $toMark,
                ],
                'students' => $students,
                'assessments' => $assessments,
                'enotes' => $enotes,
            ], 'Class retrieved successfully');
        } catch (\PDOException $e) {
            error_log("Failed to fetch class detail: " . $e->getMessage());
            $this->error('Failed to fetch class: ' . $e->getMessage(), 500);
        }
    }
}
