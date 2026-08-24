<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student Dashboard Controller
 *
 * Aggregates a summary of the student's world - enrollment counts, assignment progress, live
 * classes, recent library/item bank resources, and unread messages - for the dashboard landing
 * page. Mirrors the same visibility rules already enforced by each individual feature's own
 * controller (department/class enrollment scoping, published-only resources, etc.) rather than
 * introducing new ones.
 */
class DashboardController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function getStudentId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    /**
     * GET /student/dashboard
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $db = $this->getDb();

        // Enrollment: distinct (class, department) pairings, and the subjects reachable through them
        $stmt = $db->prepare(
            "SELECT DISTINCT class_id, department_id FROM student_department_enrollments
             WHERE student_id = :student_id AND deleted_at IS NULL"
        );
        $stmt->execute(['student_id' => $studentId]);
        $enrollments = $stmt->fetchAll();
        $departmentIds = array_values(array_unique(array_map(fn($e) => (int) $e['department_id'], $enrollments)));

        $subjectsCount = 0;
        if (!empty($departmentIds)) {
            $placeholders = implode(',', array_fill(0, count($departmentIds), '?'));
            $stmt = $db->prepare("SELECT COUNT(DISTINCT id) as cnt FROM subjects WHERE department_id IN ({$placeholders}) AND deleted_at IS NULL");
            $stmt->execute($departmentIds);
            $subjectsCount = (int) $stmt->fetch()['cnt'];
        }

        // Assignments - same status computation as Student\AssignmentController::index() so the
        // dashboard numbers always agree with the Assignments page.
        $stmt = $db->prepare(
            "SELECT a.id, a.title, a.due_date, s.name as subject_name,
                    sub.status as submission_status, sub.percentage
             FROM assignments a
             INNER JOIN subjects s ON a.subject_id = s.id
             LEFT JOIN (
                 SELECT * FROM assignment_submissions WHERE student_id = :student_id_sub ORDER BY attempt_number DESC
             ) sub ON a.id = sub.assignment_id
             WHERE a.status = 'published' AND a.deleted_at IS NULL
               AND a.class_id IN (SELECT class_id FROM student_department_enrollments WHERE student_id = :student_id_enroll AND deleted_at IS NULL)
             ORDER BY a.due_date ASC"
        );
        $stmt->execute(['student_id_sub' => $studentId, 'student_id_enroll' => $studentId]);
        $assignmentRows = $stmt->fetchAll();

        $statusMap = ['marking' => 'submitted', 'graded' => 'submitted', 'returned' => 'marked'];
        $now = new \DateTime();
        $pendingCount = 0;
        $completedCount = 0;
        $scores = [];
        $upcomingAssignments = [];

        foreach ($assignmentRows as $row) {
            $status = $statusMap[$row['submission_status'] ?? 'new'] ?? ($row['submission_status'] ?? 'new');

            if (in_array($status, ['new', 'in_progress'], true) && !empty($row['due_date']) && $now > new \DateTime($row['due_date'])) {
                $status = 'overdue';
            }

            if (in_array($status, ['new', 'in_progress', 'overdue'], true)) {
                $pendingCount++;
                if (count($upcomingAssignments) < 5) {
                    $upcomingAssignments[] = [
                        'id' => (int) $row['id'],
                        'title' => $row['title'],
                        'subject_name' => $row['subject_name'],
                        'due_date' => $row['due_date'],
                        'status' => $status,
                    ];
                }
            } elseif (in_array($status, ['submitted', 'marked'], true)) {
                $completedCount++;
                if ($status === 'marked' && $row['percentage'] !== null) {
                    $scores[] = (float) $row['percentage'];
                }
            }
        }
        $averageScore = !empty($scores) ? round(array_sum($scores) / count($scores), 1) : null;

        // Live classes
        $where = $departmentIds
            ? "lc.deleted_at IS NULL AND lc.department_id IN (" . implode(',', array_fill(0, count($departmentIds), '?')) . ")"
            : "1=0";
        $stmt = $db->prepare(
            "SELECT lc.id, lc.title, lc.status, lc.scheduled_start, s.name as subject_name,
                    t.first_name as teacher_first_name, t.last_name as teacher_last_name
             FROM live_classes lc
             LEFT JOIN subjects s ON lc.subject_id = s.id
             LEFT JOIN teachers t ON lc.created_by = t.id
             WHERE {$where}
             ORDER BY lc.scheduled_start ASC"
        );
        $stmt->execute($departmentIds);
        $liveClassRows = $stmt->fetchAll();

        $liveNow = array_values(array_filter($liveClassRows, fn($c) => $c['status'] === 'started'));
        $upcomingLive = array_slice(array_values(array_filter($liveClassRows, fn($c) => $c['status'] === 'scheduled')), 0, 3);

        // Recent library resources
        $stmt = $db->prepare(
            "SELECT lb.id, lb.title, lb.file_size, lb.published_at, s.name as subject_name
             FROM library_books lb
             LEFT JOIN subjects s ON lb.subject_id = s.id
             WHERE lb.status = 'published' AND lb.deleted_at IS NULL AND EXISTS (
                 SELECT 1 FROM student_department_enrollments sde
                 WHERE sde.student_id = :student_id AND sde.department_id = lb.department_id AND sde.deleted_at IS NULL
                   AND (lb.class_id IS NULL OR sde.class_id = lb.class_id)
             )
             ORDER BY lb.published_at DESC LIMIT 5"
        );
        $stmt->execute(['student_id' => $studentId]);
        $recentLibrary = $stmt->fetchAll();

        // Total counts for library/item bank (for stat tiles)
        $stmt = $db->prepare(
            "SELECT COUNT(*) as cnt FROM library_books lb
             WHERE lb.status = 'published' AND lb.deleted_at IS NULL AND EXISTS (
                 SELECT 1 FROM student_department_enrollments sde
                 WHERE sde.student_id = :student_id AND sde.department_id = lb.department_id AND sde.deleted_at IS NULL
                   AND (lb.class_id IS NULL OR sde.class_id = lb.class_id)
             )"
        );
        $stmt->execute(['student_id' => $studentId]);
        $libraryCount = (int) $stmt->fetch()['cnt'];

        $stmt = $db->prepare(
            "SELECT COUNT(*) as cnt FROM item_bank_questions q
             WHERE q.status = 'published' AND q.deleted_at IS NULL AND EXISTS (
                 SELECT 1 FROM student_department_enrollments sde
                 WHERE sde.student_id = :student_id AND sde.department_id = q.department_id AND sde.deleted_at IS NULL
                   AND (q.class_id IS NULL OR sde.class_id = q.class_id)
             )"
        );
        $stmt->execute(['student_id' => $studentId]);
        $itemBankCount = (int) $stmt->fetch()['cnt'];

        // Unread chat messages
        $stmt = $db->prepare(
            "SELECT cp.conversation_id, cp.last_read_at FROM chat_participants cp
             INNER JOIN chat_conversations c ON c.id = cp.conversation_id AND c.deleted_at IS NULL
             WHERE cp.user_id = :student_id AND cp.user_role = 'student'"
        );
        $stmt->execute(['student_id' => $studentId]);
        $participantRows = $stmt->fetchAll();

        $unreadMessages = 0;
        foreach ($participantRows as $p) {
            $where = "conversation_id = :cid AND NOT (sender_id = :student_id AND sender_role = 'student')";
            $params = ['cid' => $p['conversation_id'], 'student_id' => $studentId];
            if ($p['last_read_at']) {
                $where .= " AND created_at > :last_read_at";
                $params['last_read_at'] = $p['last_read_at'];
            }
            $stmt = $db->prepare("SELECT COUNT(*) as cnt FROM chat_messages WHERE {$where}");
            $stmt->execute($params);
            $unreadMessages += (int) $stmt->fetch()['cnt'];
        }

        $this->success([
            'stats' => [
                'classes_enrolled' => count($enrollments),
                'subjects_enrolled' => $subjectsCount,
                'assignments_pending' => $pendingCount,
                'assignments_completed' => $completedCount,
                'average_score' => $averageScore,
                'live_now' => count($liveNow),
                'unread_messages' => $unreadMessages,
                'library_resources' => $libraryCount,
                'itembank_resources' => $itemBankCount,
            ],
            'live_now' => array_map(fn($c) => $this->formatLiveClass($c), $liveNow),
            'upcoming_live_classes' => array_map(fn($c) => $this->formatLiveClass($c), $upcomingLive),
            'upcoming_assignments' => $upcomingAssignments,
            'recent_library' => $recentLibrary,
        ]);
    }

    private function formatLiveClass(array $c): array
    {
        return [
            'id' => (int) $c['id'],
            'title' => $c['title'],
            'status' => $c['status'],
            'scheduled_start' => $c['scheduled_start'],
            'subject_name' => $c['subject_name'],
            'teacher_name' => trim(($c['teacher_first_name'] ?? '') . ' ' . ($c['teacher_last_name'] ?? '')),
        ];
    }
}
