<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * Admin Student Promotion Controller
 *
 * Advances students from one class to the next while preserving enrollment history. A student's
 * "current class" for resource/assignment access is determined entirely by their active rows in
 * student_department_enrollments (not students.class_id, which is only a display convenience) -
 * see 068_extend_student_department_enrollments.sql for why that table, not a new one, is the
 * source of truth here.
 *
 * Promoting a student closes every one of their active enrollment rows for the from-class
 * (one per department they were enrolled in) and opens a matching new row in the to-class for
 * the destination academic year, linked back via promoted_from_enrollment_id. A student with no
 * active enrollment in the from-class (never enrolled, or already promoted) is skipped, not
 * errored - the response reports counts so the admin can see what happened across the batch.
 */
class PromotionController extends Controller
{
    protected \PDO $db;

    public function __construct()
    {
        parent::__construct();
        $this->db = \eSpace\Config\Database::getInstance();
    }

    /**
     * List students with an active enrollment in the given class, plus how many active
     * department-enrollment rows each one has (what promoting them would actually move).
     * GET /admin/promotion/students?class_id=&academic_year_id=
     */
    public function students(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $classId = (int) $this->query('class_id', 0);
        $academicYearId = (int) $this->query('academic_year_id', 0);

        if (!$classId || !$academicYearId) {
            $this->validationError(['class_id' => 'class_id and academic_year_id are required']);
            return;
        }

        $academicYearName = $this->academicYearName($academicYearId);
        if ($academicYearName === null) {
            $this->validationError(['academic_year_id' => 'Academic year not found']);
            return;
        }

        $sql = "SELECT s.id, s.admission_number, s.first_name, s.last_name, s.gender,
                       COUNT(sde.id) as active_enrollment_count
                FROM students s
                INNER JOIN student_department_enrollments sde ON sde.student_id = s.id
                WHERE sde.class_id = :class_id
                  AND sde.academic_year = :academic_year
                  AND sde.status = 'active'
                  AND sde.deleted_at IS NULL
                  AND s.deleted_at IS NULL
                GROUP BY s.id, s.admission_number, s.first_name, s.last_name, s.gender
                ORDER BY s.last_name, s.first_name";

        $stmt = $this->db->prepare($sql);
        $stmt->execute(['class_id' => $classId, 'academic_year' => $academicYearName]);
        $students = $stmt->fetchAll();

        $this->success(['students' => $students]);
    }

    /**
     * Dry run: for the given students, report who's eligible to promote vs. already promoted
     * (an active enrollment already exists in the destination class/year) or has nothing to
     * move. No writes.
     * POST /admin/promotion/preview
     */
    public function preview(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        [$data, $error] = $this->validatePromotionInput();
        if ($error !== null) {
            $this->validationError($error);
            return;
        }

        ['from_class_id' => $fromClassId, 'to_class_id' => $toClassId, 'to_academic_year' => $toYearName, 'student_ids' => $studentIds] = $data;
        $fromYearName = $data['from_academic_year'];

        $eligible = [];
        $alreadyPromoted = [];
        $nothingToMove = [];

        foreach ($studentIds as $studentId) {
            $activeCount = $this->countActiveEnrollments($studentId, $fromClassId, $fromYearName);
            if ($activeCount === 0) {
                $nothingToMove[] = $studentId;
                continue;
            }

            $alreadyInDestination = $this->countActiveEnrollments($studentId, $toClassId, $toYearName);
            if ($alreadyInDestination > 0) {
                $alreadyPromoted[] = $studentId;
                continue;
            }

            $eligible[] = ['student_id' => $studentId, 'enrollments_to_migrate' => $activeCount];
        }

        $this->success([
            'eligible' => $eligible,
            'already_promoted' => $alreadyPromoted,
            'nothing_to_move' => $nothingToMove,
        ]);
    }

    /**
     * Promote the given students from one class to another, closing their old department
     * enrollments and opening matching new ones. Wrapped in a transaction - either the whole
     * batch's enrollment changes land or none do.
     * POST /admin/promotion/promote
     */
    public function promote(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        [$data, $error] = $this->validatePromotionInput();
        if ($error !== null) {
            $this->validationError($error);
            return;
        }

        $fromClassId = $data['from_class_id'];
        $toClassId = $data['to_class_id'];
        $fromYearName = $data['from_academic_year'];
        $toYearName = $data['to_academic_year'];
        $toAcademicYearId = $data['to_academic_year_id'];
        $fromAcademicYearId = $data['from_academic_year_id'];
        $studentIds = $data['student_ids'];
        $termJoinedId = !empty($data['term_id']) ? (int) $data['term_id'] : null;
        $promotedBy = $this->getCurrentUserId();

        $studentsPromoted = 0;
        $enrollmentsMigrated = 0;
        $alreadyPromoted = [];
        $nothingToMove = [];

        try {
            $this->db->beginTransaction();

            foreach ($studentIds as $studentId) {
                $activeRows = $this->activeEnrollments($studentId, $fromClassId, $fromYearName);
                if (empty($activeRows)) {
                    $nothingToMove[] = $studentId;
                    continue;
                }

                if ($this->countActiveEnrollments($studentId, $toClassId, $toYearName) > 0) {
                    $alreadyPromoted[] = $studentId;
                    continue;
                }

                $migratedForStudent = 0;
                foreach ($activeRows as $row) {
                    $closeStmt = $this->db->prepare(
                        "UPDATE student_department_enrollments
                         SET status = 'promoted', end_date = CURDATE(), updated_at = NOW()
                         WHERE id = :id"
                    );
                    $closeStmt->execute(['id' => $row['id']]);

                    $insertStmt = $this->db->prepare(
                        "INSERT INTO student_department_enrollments
                            (student_id, department_id, academic_year, class_id, start_date, status, term_joined_id, promoted_from_enrollment_id)
                         VALUES
                            (:student_id, :department_id, :academic_year, :class_id, CURDATE(), 'active', :term_joined_id, :promoted_from_enrollment_id)"
                    );
                    $insertStmt->execute([
                        'student_id' => $studentId,
                        'department_id' => $row['department_id'],
                        'academic_year' => $toYearName,
                        'class_id' => $toClassId,
                        'term_joined_id' => $termJoinedId,
                        'promoted_from_enrollment_id' => $row['id'],
                    ]);

                    $migratedForStudent++;
                }

                // Keep the student's own profile view (which reads students.class_id directly)
                // consistent with their new active enrollments.
                $updateStudent = $this->db->prepare("UPDATE students SET class_id = :class_id, updated_at = NOW() WHERE id = :id");
                $updateStudent->execute(['class_id' => $toClassId, 'id' => $studentId]);

                $auditStmt = $this->db->prepare(
                    "INSERT INTO student_promotions
                        (student_id, from_class_id, to_class_id, from_academic_year_id, to_academic_year_id, term_id, enrollments_migrated_count, promoted_by, promoted_at)
                     VALUES
                        (:student_id, :from_class_id, :to_class_id, :from_academic_year_id, :to_academic_year_id, :term_id, :enrollments_migrated_count, :promoted_by, NOW())"
                );
                $auditStmt->execute([
                    'student_id' => $studentId,
                    'from_class_id' => $fromClassId,
                    'to_class_id' => $toClassId,
                    'from_academic_year_id' => $fromAcademicYearId,
                    'to_academic_year_id' => $toAcademicYearId,
                    'term_id' => $termJoinedId,
                    'enrollments_migrated_count' => $migratedForStudent,
                    'promoted_by' => $promotedBy,
                ]);

                $studentsPromoted++;
                $enrollmentsMigrated += $migratedForStudent;
            }

            $this->db->commit();
        } catch (\PDOException $e) {
            $this->db->rollBack();
            error_log('Student promotion failed: ' . $e->getMessage());
            $this->error('Failed to promote students: ' . $e->getMessage(), 500);
            return;
        }

        $message = "Promoted {$studentsPromoted} student(s), migrating {$enrollmentsMigrated} enrollment(s)";
        if (!empty($alreadyPromoted)) {
            $message .= '; ' . count($alreadyPromoted) . ' already promoted';
        }
        if (!empty($nothingToMove)) {
            $message .= '; ' . count($nothingToMove) . ' had no active enrollment to move';
        }

        $this->success([
            'students_promoted' => $studentsPromoted,
            'enrollments_migrated' => $enrollmentsMigrated,
            'already_promoted' => $alreadyPromoted,
            'nothing_to_move' => $nothingToMove,
        ], $message);
    }

    /**
     * Promotion history / audit trail.
     * GET /admin/promotion/history
     */
    public function history(): void
    {
        if (!$this->isAdmin()) {
            $this->forbidden();
            return;
        }

        $limit = min(200, max(1, (int) $this->query('limit', 50)));

        $sql = "SELECT sp.id, sp.student_id, s.first_name, s.last_name, s.admission_number,
                       fc.name as from_class_name, fc.stream_name as from_stream_name,
                       tc.name as to_class_name, tc.stream_name as to_stream_name,
                       fy.name as from_academic_year, ty.name as to_academic_year,
                       sp.enrollments_migrated_count, sp.promoted_at,
                       u.username as promoted_by_username
                FROM student_promotions sp
                INNER JOIN students s ON sp.student_id = s.id
                INNER JOIN classes fc ON sp.from_class_id = fc.id
                INNER JOIN classes tc ON sp.to_class_id = tc.id
                INNER JOIN academic_years fy ON sp.from_academic_year_id = fy.id
                INNER JOIN academic_years ty ON sp.to_academic_year_id = ty.id
                LEFT JOIN users u ON sp.promoted_by = u.id
                ORDER BY sp.promoted_at DESC
                LIMIT {$limit}";

        $stmt = $this->db->prepare($sql);
        $stmt->execute();
        $this->success(['promotions' => $stmt->fetchAll()]);
    }

    /**
     * Shared validation for preview()/promote(): resolves class/year ids, checks student_ids is
     * a non-empty array. Returns [data, null] on success or [[], errors] on failure.
     *
     * @return array{0: array, 1: array|null}
     */
    private function validatePromotionInput(): array
    {
        $data = $this->input();

        $errors = $this->validateRequired(['from_class_id', 'to_class_id', 'from_academic_year_id', 'to_academic_year_id', 'student_ids']);
        if (!empty($errors)) {
            return [[], $errors];
        }

        if (!is_array($data['student_ids']) || empty($data['student_ids'])) {
            return [[], ['student_ids' => 'At least one student must be selected']];
        }

        $fromClassId = (int) $data['from_class_id'];
        $toClassId = (int) $data['to_class_id'];
        $fromAcademicYearId = (int) $data['from_academic_year_id'];
        $toAcademicYearId = (int) $data['to_academic_year_id'];

        if (!$this->classExists($fromClassId)) {
            return [[], ['from_class_id' => 'Class not found']];
        }
        if (!$this->classExists($toClassId)) {
            return [[], ['to_class_id' => 'Class not found']];
        }

        $fromYearName = $this->academicYearName($fromAcademicYearId);
        if ($fromYearName === null) {
            return [[], ['from_academic_year_id' => 'Academic year not found']];
        }
        $toYearName = $this->academicYearName($toAcademicYearId);
        if ($toYearName === null) {
            return [[], ['to_academic_year_id' => 'Academic year not found']];
        }

        return [[
            'from_class_id' => $fromClassId,
            'to_class_id' => $toClassId,
            'from_academic_year_id' => $fromAcademicYearId,
            'to_academic_year_id' => $toAcademicYearId,
            'from_academic_year' => $fromYearName,
            'to_academic_year' => $toYearName,
            'term_id' => $data['term_id'] ?? null,
            'student_ids' => array_map('intval', $data['student_ids']),
        ], null];
    }

    private function classExists(int $classId): bool
    {
        $stmt = $this->db->prepare("SELECT id FROM classes WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$classId]);
        return (bool) $stmt->fetch();
    }

    private function academicYearName(int $academicYearId): ?string
    {
        $stmt = $this->db->prepare("SELECT name FROM academic_years WHERE id = ? AND deleted_at IS NULL");
        $stmt->execute([$academicYearId]);
        $row = $stmt->fetch();
        return $row ? $row['name'] : null;
    }

    private function countActiveEnrollments(int $studentId, int $classId, string $academicYear): int
    {
        $stmt = $this->db->prepare(
            "SELECT COUNT(*) as total FROM student_department_enrollments
             WHERE student_id = ? AND class_id = ? AND academic_year = ? AND status = 'active' AND deleted_at IS NULL"
        );
        $stmt->execute([$studentId, $classId, $academicYear]);
        return (int) $stmt->fetch()['total'];
    }

    /**
     * @return array<int, array{id: int, department_id: int}>
     */
    private function activeEnrollments(int $studentId, int $classId, string $academicYear): array
    {
        $stmt = $this->db->prepare(
            "SELECT id, department_id FROM student_department_enrollments
             WHERE student_id = ? AND class_id = ? AND academic_year = ? AND status = 'active' AND deleted_at IS NULL"
        );
        $stmt->execute([$studentId, $classId, $academicYear]);
        return $stmt->fetchAll();
    }

    private function isAdmin(): bool
    {
        $role = $this->getCurrentUserRole();
        return $role === 'admin' || $role === 'super_admin';
    }
}
