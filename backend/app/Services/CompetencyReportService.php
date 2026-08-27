<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * LOA/AOI/EOC Competency Reporting
 *
 * Averages a student's marked work *within one assessment category* (LOA/AOI/EOC) for a
 * subject+term+class, always at the percentage level - never averaging weights or grade letters,
 * per the reporting flow: normalize each assessment to % -> group by category -> average the
 * percentages -> derive status/weight from that one averaged percentage.
 *
 * Deliberately separate from ReportCardService's existing per-assignment "constructs" (one row
 * per graded assignment, weight-averaged) - that path stays untouched for assignments with no
 * assessment_category (the pre-LOA/AOI/EOC content already live on this system), while this
 * service only ever looks at assignments that opted into the curriculum-linked category system
 * (migration 081: assignments.assessment_category/term_id, assignment_questions.curriculum_topic_id).
 */
class CompetencyReportService
{
    /** Eligible = marked by the teacher (graded or already released) on a published assignment. */
    private const ELIGIBLE_SUBMISSION_STATUSES = "('graded', 'returned')";

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Every subject that has at least one LOA/AOI/EOC-tagged assignment for a class+term - sourced
     * from `assignments` directly rather than the `class_subjects` table, which is confirmed empty
     * in this database (same workaround PerformanceReportService already uses for entitlement).
     *
     * @return array<int, array{id: int, name: string}>
     */
    public function listSubjectsWithCompetencyData(int $classId, int $termId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT DISTINCT sub.id, sub.name
             FROM assignments a
             INNER JOIN subjects sub ON sub.id = a.subject_id
             WHERE a.class_id = :class_id AND a.term_id = :term_id
               AND a.status = 'published' AND a.deleted_at IS NULL AND a.assessment_category IS NOT NULL
             ORDER BY sub.name ASC"
        );
        $stmt->execute(['class_id' => $classId, 'term_id' => $termId]);

        return array_map(fn($r) => ['id' => (int) $r['id'], 'name' => $r['name']], $stmt->fetchAll());
    }

    /**
     * Batched LOA/AOI/EOC summary for every student in a class+term+subject - a handful of queries
     * total (students, assignment scope, all submissions), never one query per student (spec
     * section 19). Per-student per-category state distinguishes genuinely having no work to assess
     * from having unmarked/unsubmitted work, so nothing here ever silently becomes a 0%/E.
     *
     * @return array<int, array{
     *     student_id: int, first_name: string, last_name: string, admission_number: string,
     *     categories: array<string, array{state: string, percentage: float|null, status: string|null, performance_descriptor: string|null, weight: int|null, assessment_count: int}>,
     *     report_status: string
     * }>
     */
    public function calculateClassSummary(int $classId, int $termId, int $subjectId, ?string $classLevel): array
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            'SELECT id, first_name, last_name, admission_number FROM students
             WHERE class_id = :class_id AND deleted_at IS NULL ORDER BY first_name ASC, last_name ASC'
        );
        $stmt->execute(['class_id' => $classId]);
        $students = $stmt->fetchAll();
        if (empty($students)) {
            return [];
        }
        $studentIds = array_map(fn($s) => (int) $s['id'], $students);

        // Which categories have any published, tagged assignment at all in this class/term/subject
        // - a category absent here is "Not Assessed" for every student, not just those with no
        // submission (there's nothing to have submitted to).
        $stmt = $db->prepare(
            "SELECT DISTINCT assessment_category FROM assignments
             WHERE class_id = :class_id AND term_id = :term_id AND subject_id = :subject_id
               AND status = 'published' AND deleted_at IS NULL AND assessment_category IS NOT NULL"
        );
        $stmt->execute(['class_id' => $classId, 'term_id' => $termId, 'subject_id' => $subjectId]);
        $categoriesInScope = array_column($stmt->fetchAll(), 'assessment_category');

        // Every submission (any status) against those assignments, for every student at once.
        // Scoped by student_id, not a.class_id - a student's assignment can be tied to a class
        // they've since moved out of (stream reassignment, promotion), and their submission is
        // already proof the work legitimately happened; filtering on the assignment's class_id
        // would silently hide that real work the moment students.class_id changes.
        $placeholders = implode(',', array_fill(0, count($studentIds), '?'));
        $stmt = $db->prepare(
            "SELECT s.student_id, a.assessment_category, s.status, s.percentage
             FROM assignment_submissions s
             INNER JOIN assignments a ON s.assignment_id = a.id
             WHERE s.student_id IN ({$placeholders}) AND a.term_id = ? AND a.subject_id = ?
               AND a.status = 'published' AND a.deleted_at IS NULL AND a.assessment_category IS NOT NULL"
        );
        $stmt->execute([...$studentIds, $termId, $subjectId]);

        $byStudentCategory = [];
        foreach ($stmt->fetchAll() as $row) {
            $byStudentCategory[(int) $row['student_id']][$row['assessment_category']][] = $row;
        }

        // Which students already have a generated (and therefore already visible-to-them) report
        // for this term - report generation itself is this system's "publish" event today (see
        // ReportCardService::doGenerateReport()'s student notification).
        $placeholders = implode(',', array_fill(0, count($studentIds), '?'));
        $stmt = $db->prepare("SELECT student_id FROM report_cards WHERE term_id = ? AND student_id IN ({$placeholders})");
        $stmt->execute(array_merge([$termId], $studentIds));
        $published = array_flip(array_map(fn($r) => (int) $r['student_id'], $stmt->fetchAll()));

        $summary = [];
        foreach ($students as $student) {
            $studentId = (int) $student['id'];
            $rowsByCategory = $byStudentCategory[$studentId] ?? [];

            $categories = [];
            $anyAwaitingMarking = false;
            $anyAwaitingSubmission = false;
            $anyAssessed = false;
            $allInScopeAssessed = true;

            foreach (['LOA', 'AOI', 'EOC'] as $category) {
                if (!in_array($category, $categoriesInScope, true)) {
                    $categories[$category] = $this->emptyCategoryResult('not_assessed');
                    continue;
                }

                $rows = $rowsByCategory[$category] ?? [];
                $eligible = array_values(array_filter($rows, fn($r) => in_array($r['status'], ['graded', 'returned'], true)));

                if (!empty($eligible)) {
                    $percentages = array_map(fn($r) => (float) $r['percentage'], $eligible);
                    $percentage = round(array_sum($percentages) / count($percentages), 2);
                    $level = ReportCardGradingService::getPerformanceLevel($percentage);
                    $categories[$category] = [
                        'state' => 'assessed',
                        'percentage' => $percentage,
                        'status' => $level['status'],
                        'performance_descriptor' => $level['descriptor'],
                        'weight' => ReportCardGradingService::convertToWeight($percentage, $classLevel),
                        'assessment_count' => count($eligible),
                    ];
                    $anyAssessed = true;
                    continue;
                }

                $allInScopeAssessed = false;
                $hasSubmitted = !empty(array_filter($rows, fn($r) => $r['status'] === 'submitted'));
                if ($hasSubmitted) {
                    $categories[$category] = $this->emptyCategoryResult('awaiting_marking');
                    $anyAwaitingMarking = true;
                } else {
                    $categories[$category] = $this->emptyCategoryResult('awaiting_submission');
                    $anyAwaitingSubmission = true;
                }
            }

            if (isset($published[$studentId])) {
                $reportStatus = 'published';
            } elseif (empty($categoriesInScope)) {
                $reportStatus = 'not_assessed';
            } elseif ($allInScopeAssessed) {
                $reportStatus = 'ready';
            } elseif ($anyAwaitingMarking) {
                $reportStatus = 'awaiting_marking';
            } elseif ($anyAwaitingSubmission) {
                $reportStatus = $anyAssessed ? 'awaiting_submission' : 'not_assessed';
            } else {
                $reportStatus = 'not_assessed';
            }

            $summary[] = [
                'student_id' => $studentId,
                'first_name' => $student['first_name'],
                'last_name' => $student['last_name'],
                'admission_number' => $student['admission_number'],
                'categories' => $categories,
                'report_status' => $reportStatus,
            ];
        }

        return $summary;
    }

    private function emptyCategoryResult(string $state): array
    {
        return [
            'state' => $state,
            'percentage' => null,
            'status' => null,
            'performance_descriptor' => null,
            'weight' => null,
            'assessment_count' => 0,
        ];
    }

    /**
     * All eligible assessments for one student/subject/term/class/category, each normalized to a
     * percentage, arithmetically averaged (spec section 3-4 - never summed as raw marks, since
     * different assessments can have different maximum marks).
     *
     * @return array{percentage: float|null, count: int, assignment_ids: int[]}
     */
    public function calculateAssessmentAverage(int $studentId, int $subjectId, int $termId, int $classId, string $category): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT a.id AS assignment_id, s.percentage
             FROM assignment_submissions s
             INNER JOIN assignments a ON s.assignment_id = a.id
             WHERE s.student_id = :student_id AND s.status IN " . self::ELIGIBLE_SUBMISSION_STATUSES . "
               AND a.status = 'published' AND a.deleted_at IS NULL
               AND a.subject_id = :subject_id AND a.class_id = :class_id
               AND a.term_id = :term_id AND a.assessment_category = :category
             ORDER BY a.id ASC"
        );
        $stmt->execute([
            'student_id' => $studentId,
            'subject_id' => $subjectId,
            'class_id' => $classId,
            'term_id' => $termId,
            'category' => $category,
        ]);
        $rows = $stmt->fetchAll();

        if (empty($rows)) {
            return ['percentage' => null, 'count' => 0, 'assignment_ids' => []];
        }

        $percentages = array_map(fn($r) => (float) $r['percentage'], $rows);
        $average = round(array_sum($percentages) / count($percentages), 2);

        return [
            'percentage' => $average,
            'count' => count($rows),
            'assignment_ids' => array_map(fn($r) => (int) $r['assignment_id'], $rows),
        ];
    }

    /**
     * EOC only: per-topic percentage, aggregated across every EOC assignment that assessed that
     * topic (spec section 13 - a topic appearing in 3 assessments becomes one averaged row, never
     * duplicated). A topic's percentage for one assignment = its questions' awarded marks over
     * their combined maximum, not the whole assignment's percentage (an EOC assignment can span
     * multiple topics).
     *
     * @return array<int, array{topic_id: int, topic_name: string, percentage: float, status: string, descriptor: string}>
     *     Sorted strongest-topic-first.
     */
    public function calculateTopicBreakdown(int $studentId, int $subjectId, int $termId, int $classId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT a.id AS assignment_id, ct.id AS topic_id, ct.topic AS topic_name,
                    SUM(qm.marks_awarded) AS marks_awarded, SUM(aq.marks) AS marks_total
             FROM assignment_submissions s
             INNER JOIN assignments a ON s.assignment_id = a.id
             INNER JOIN question_marks qm ON qm.submission_id = s.id
             INNER JOIN assignment_questions aq ON aq.id = qm.question_id
             INNER JOIN enote_curriculum_topics ct ON ct.id = aq.curriculum_topic_id
             WHERE s.student_id = :student_id AND s.status IN " . self::ELIGIBLE_SUBMISSION_STATUSES . "
               AND a.status = 'published' AND a.deleted_at IS NULL
               AND a.subject_id = :subject_id AND a.class_id = :class_id
               AND a.term_id = :term_id AND a.assessment_category = 'EOC'
               AND qm.marks_awarded IS NOT NULL AND aq.curriculum_topic_id IS NOT NULL
             GROUP BY a.id, ct.id, ct.topic
             ORDER BY ct.topic ASC"
        );
        $stmt->execute([
            'student_id' => $studentId,
            'subject_id' => $subjectId,
            'class_id' => $classId,
            'term_id' => $termId,
        ]);
        $rows = $stmt->fetchAll();

        // First pass: one normalized percentage per (assignment, topic) - the per-instance score.
        $byTopic = [];
        foreach ($rows as $row) {
            $topicId = (int) $row['topic_id'];
            $marksTotal = (float) $row['marks_total'];
            if ($marksTotal <= 0) {
                continue;
            }
            $pct = round(((float) $row['marks_awarded'] / $marksTotal) * 100, 2);
            $byTopic[$topicId]['topic_name'] = $row['topic_name'];
            $byTopic[$topicId]['percentages'][] = $pct;
        }

        // Second pass: average across every instance of the same topic (spec section 13).
        $result = [];
        foreach ($byTopic as $topicId => $data) {
            $avg = round(array_sum($data['percentages']) / count($data['percentages']), 2);
            $level = ReportCardGradingService::getPerformanceLevel($avg);
            $result[] = [
                'topic_id' => $topicId,
                'topic_name' => $data['topic_name'],
                'percentage' => $avg,
                'status' => $level['status'],
                'descriptor' => $level['descriptor'],
            ];
        }

        usort($result, fn($a, $b) => $b['percentage'] <=> $a['percentage']);

        return $result;
    }

    // --- Admin cross-subject reporting -------------------------------------------------------
    // The teacher-facing methods above are always scoped to one subject at a time (matching how a
    // teacher works). The admin "one student, one term, three reports" view needs the opposite
    // shape - LOA/AOI/EOC results across every subject the student is assessed in that term - so
    // these build on the same eligibility rules and grading calls but without a subject filter.

    /**
     * One student's LOA/AOI/EOC average across ALL subjects for a term - the admin category
     * summary card (count, average %, status, weight). total_marks_sum/total_score_sum are
     * informational only (never fed into the percentage/grade, which is always the normalized
     * per-assessment average - summing raw marks across different max-mark assessments would be
     * exactly the anti-pattern this whole module exists to avoid).
     *
     * Deliberately NOT filtered by class_id - students.class_id can change after an assignment was
     * given (stream reassignment, promotion, correction) and a returned/graded submission is
     * already proof the work legitimately happened, same reasoning ReportCardService's own
     * docblock uses for why it doesn't join enrollment either. An earlier version of this method
     * filtered on the *current* class_id and silently dropped real, marked work for any student
     * whose class had since changed - confirmed via a real student who had returned LOA/AOI
     * submissions on an assignment tied to their previous class.
     *
     * @return array{percentage: float|null, count: int, assignment_ids: int[], total_marks_sum: float, total_score_sum: float}
     */
    public function calculateStudentCategoryAverage(int $studentId, int $termId, string $category): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT a.id AS assignment_id, a.total_marks, s.total_score, s.percentage
             FROM assignment_submissions s
             INNER JOIN assignments a ON s.assignment_id = a.id
             WHERE s.student_id = :student_id AND s.status IN " . self::ELIGIBLE_SUBMISSION_STATUSES . "
               AND a.status = 'published' AND a.deleted_at IS NULL
               AND a.term_id = :term_id AND a.assessment_category = :category
             ORDER BY a.id ASC"
        );
        $stmt->execute(['student_id' => $studentId, 'term_id' => $termId, 'category' => $category]);
        $rows = $stmt->fetchAll();

        if (empty($rows)) {
            return ['percentage' => null, 'count' => 0, 'assignment_ids' => [], 'total_marks_sum' => 0.0, 'total_score_sum' => 0.0];
        }

        $percentages = array_map(fn($r) => (float) $r['percentage'], $rows);

        return [
            'percentage' => round(array_sum($percentages) / count($percentages), 2),
            'count' => count($rows),
            'assignment_ids' => array_map(fn($r) => (int) $r['assignment_id'], $rows),
            'total_marks_sum' => array_sum(array_map(fn($r) => (float) $r['total_marks'], $rows)),
            'total_score_sum' => array_sum(array_map(fn($r) => (float) $r['total_score'], $rows)),
        ];
    }

    /**
     * LOA/AOI detail rows for the admin report - one row per (subject, topic) across every subject
     * the student is assessed in, each carrying the topic's own Learning Outcome text (LOA) or
     * competence text (AOI). LOA/AOI are tagged at the whole-assignment level (assignment_
     * curriculum_topics/assignment_learning_outcomes), unlike EOC's per-question tagging, so an
     * assignment spanning multiple topics contributes its one percentage to each of them.
     *
     * @return array<int, array{subject_id: int, subject_name: string, topic_id: int, topic_name: string, detail_text: string, percentage: float, status: string, descriptor: string}>
     */
    public function calculateStudentTopicBreakdown(int $studentId, int $termId, string $category): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT a.id AS assignment_id, a.subject_id, sub.name AS subject_name, s.percentage,
                    ct.id AS topic_id, ct.topic AS topic_name, ct.competence
             FROM assignment_submissions s
             INNER JOIN assignments a ON s.assignment_id = a.id
             INNER JOIN subjects sub ON sub.id = a.subject_id
             INNER JOIN assignment_curriculum_topics act ON act.assignment_id = a.id
             INNER JOIN enote_curriculum_topics ct ON ct.id = act.curriculum_topic_id
             WHERE s.student_id = :student_id AND s.status IN " . self::ELIGIBLE_SUBMISSION_STATUSES . "
               AND a.status = 'published' AND a.deleted_at IS NULL
               AND a.term_id = :term_id AND a.assessment_category = :category
             ORDER BY sub.name ASC, ct.topic ASC"
        );
        $stmt->execute(['student_id' => $studentId, 'term_id' => $termId, 'category' => $category]);
        $rows = $stmt->fetchAll();

        $grouped = [];
        $assignmentIdsByGroup = [];
        foreach ($rows as $row) {
            $key = $row['subject_id'] . ':' . $row['topic_id'];
            if (!isset($grouped[$key])) {
                $grouped[$key] = [
                    'subject_id' => (int) $row['subject_id'],
                    'subject_name' => $row['subject_name'],
                    'topic_id' => (int) $row['topic_id'],
                    'topic_name' => $row['topic_name'],
                    'competence' => $row['competence'],
                    'percentages' => [],
                ];
                $assignmentIdsByGroup[$key] = [];
            }
            $grouped[$key]['percentages'][] = (float) $row['percentage'];
            $assignmentIdsByGroup[$key][] = (int) $row['assignment_id'];
        }

        $result = [];
        foreach ($grouped as $key => $g) {
            $avg = round(array_sum($g['percentages']) / count($g['percentages']), 2);
            $level = ReportCardGradingService::getPerformanceLevel($avg);

            $learningOutcomes = [];
            if ($category === 'LOA') {
                $learningOutcomes = $this->getLearningOutcomesForAssignments(array_unique($assignmentIdsByGroup[$key]));
                $detailText = implode('; ', $learningOutcomes) ?: $g['topic_name'];
            } else {
                $detailText = $g['competence'] ?: $g['topic_name'];
            }

            $result[] = [
                'subject_id' => $g['subject_id'],
                'subject_name' => $g['subject_name'],
                'topic_id' => $g['topic_id'],
                'topic_name' => $g['topic_name'],
                'detail_text' => $detailText,
                // Raw (unjoined) LO list for LOA rows - generateLOADescriptor() needs each outcome
                // as its own array element (it trims/joins them itself) so it doesn't garble an
                // already-"; "-joined multi-LO string as if it were one single outcome.
                'learning_outcomes' => $learningOutcomes,
                'percentage' => $avg,
                'status' => $level['status'],
                'descriptor' => $level['descriptor'],
            ];
        }

        return $result;
    }

    /**
     * EOC detail rows for the admin report - same per-topic aggregation as calculateTopicBreakdown()
     * (one row per topic, question-level marks summed then averaged across every EOC assignment
     * instance of that topic), but across every subject the student is assessed in, not just one.
     *
     * @return array<int, array{subject_id: int, subject_name: string, topic_id: int, topic_name: string, detail_text: string, percentage: float, status: string, descriptor: string}>
     */
    public function calculateStudentEOCBreakdown(int $studentId, int $termId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT a.id AS assignment_id, a.subject_id, sub.name AS subject_name,
                    ct.id AS topic_id, ct.topic AS topic_name,
                    SUM(qm.marks_awarded) AS marks_awarded, SUM(aq.marks) AS marks_total
             FROM assignment_submissions s
             INNER JOIN assignments a ON s.assignment_id = a.id
             INNER JOIN subjects sub ON sub.id = a.subject_id
             INNER JOIN question_marks qm ON qm.submission_id = s.id
             INNER JOIN assignment_questions aq ON aq.id = qm.question_id
             INNER JOIN enote_curriculum_topics ct ON ct.id = aq.curriculum_topic_id
             WHERE s.student_id = :student_id AND s.status IN " . self::ELIGIBLE_SUBMISSION_STATUSES . "
               AND a.status = 'published' AND a.deleted_at IS NULL
               AND a.term_id = :term_id AND a.assessment_category = 'EOC'
               AND qm.marks_awarded IS NOT NULL AND aq.curriculum_topic_id IS NOT NULL
             GROUP BY a.id, a.subject_id, sub.name, ct.id, ct.topic
             ORDER BY sub.name ASC, ct.topic ASC"
        );
        $stmt->execute(['student_id' => $studentId, 'term_id' => $termId]);
        $rows = $stmt->fetchAll();

        $grouped = [];
        foreach ($rows as $row) {
            $marksTotal = (float) $row['marks_total'];
            if ($marksTotal <= 0) {
                continue;
            }
            $key = $row['subject_id'] . ':' . $row['topic_id'];
            if (!isset($grouped[$key])) {
                $grouped[$key] = [
                    'subject_id' => (int) $row['subject_id'],
                    'subject_name' => $row['subject_name'],
                    'topic_id' => (int) $row['topic_id'],
                    'topic_name' => $row['topic_name'],
                    'percentages' => [],
                ];
            }
            $grouped[$key]['percentages'][] = round(((float) $row['marks_awarded'] / $marksTotal) * 100, 2);
        }

        $result = [];
        foreach ($grouped as $g) {
            $avg = round(array_sum($g['percentages']) / count($g['percentages']), 2);
            $level = ReportCardGradingService::getPerformanceLevel($avg);
            $result[] = [
                'subject_id' => $g['subject_id'],
                'subject_name' => $g['subject_name'],
                'topic_id' => $g['topic_id'],
                'topic_name' => $g['topic_name'],
                'detail_text' => $g['topic_name'],
                'percentage' => $avg,
                'status' => $level['status'],
                'descriptor' => $level['descriptor'],
            ];
        }

        return $result;
    }

    /**
     * Batched LOA/AOI/EOC availability + quick average for every student in a class - the admin
     * student-listing table (spec: "LOA · AOI · EOC" availability badges per row). Deliberately
     * cheap (no descriptor generation, no topic breakdown) since this runs for a whole class at
     * once; the full detail is only computed when an admin opens one student's report.
     *
     * @return array<int, array{student_id: int, first_name: string, last_name: string, admission_number: string, categories: array<string, array{available: bool, percentage: float|null, status: string|null}>}>
     */
    public function listStudentsWithReportAvailability(int $classId, int $termId, string $search = ''): array
    {
        $db = $this->getDb();

        $params = ['class_id' => $classId];
        $searchSql = '';
        if ($search !== '') {
            $searchSql = ' AND (first_name LIKE :search OR last_name LIKE :search OR admission_number LIKE :search)';
            $params['search'] = "%{$search}%";
        }
        $stmt = $db->prepare(
            "SELECT id, first_name, last_name, admission_number FROM students
             WHERE class_id = :class_id AND deleted_at IS NULL{$searchSql}
             ORDER BY first_name ASC, last_name ASC"
        );
        $stmt->execute($params);
        $students = $stmt->fetchAll();
        if (empty($students)) {
            return [];
        }

        // Scoped by student_id (the class-browsed roster from the query above), not a.class_id -
        // a student's assignment may be tied to a class they've since moved out of (stream
        // reassignment, promotion), and their returned/graded submission is already proof the work
        // legitimately happened. Filtering on the assignment's class_id here would incorrectly hide
        // that real work the moment students.class_id changes - confirmed via a real student whose
        // LOA/AOI submissions were tied to their previous class.
        $studentIds = array_map(fn($s) => (int) $s['id'], $students);
        $placeholders = implode(',', array_fill(0, count($studentIds), '?'));
        $stmt = $db->prepare(
            "SELECT s.student_id, a.assessment_category, s.percentage
             FROM assignment_submissions s
             INNER JOIN assignments a ON s.assignment_id = a.id
             WHERE s.student_id IN ({$placeholders}) AND a.term_id = ?
               AND a.status = 'published' AND a.deleted_at IS NULL AND a.assessment_category IS NOT NULL
               AND s.status IN " . self::ELIGIBLE_SUBMISSION_STATUSES
        );
        $stmt->execute([...$studentIds, $termId]);

        $byStudentCategory = [];
        foreach ($stmt->fetchAll() as $row) {
            $byStudentCategory[(int) $row['student_id']][$row['assessment_category']][] = (float) $row['percentage'];
        }

        $result = [];
        foreach ($students as $student) {
            $studentId = (int) $student['id'];
            $categories = [];
            foreach (['LOA', 'AOI', 'EOC'] as $category) {
                $percentages = $byStudentCategory[$studentId][$category] ?? [];
                if (empty($percentages)) {
                    $categories[$category] = ['available' => false, 'percentage' => null, 'status' => null];
                    continue;
                }
                $avg = round(array_sum($percentages) / count($percentages), 2);
                $categories[$category] = ['available' => true, 'percentage' => $avg, 'status' => ReportCardGradingService::getPerformanceStatus($avg)];
            }

            $result[] = [
                'student_id' => $studentId,
                'first_name' => $student['first_name'],
                'last_name' => $student['last_name'],
                'admission_number' => $student['admission_number'],
                'categories' => $categories,
            ];
        }

        return $result;
    }

    /**
     * Every Learning Outcome text attached (via assignment_learning_outcomes) to any of the given
     * LOA assignment ids - what the LOA descriptor is built from (spec section 10: "must use the
     * learning outcomes selected when the teacher created the assignment").
     *
     * @param int[] $assignmentIds
     * @return string[]
     */
    public function getLearningOutcomesForAssignments(array $assignmentIds): array
    {
        if (empty($assignmentIds)) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($assignmentIds), '?'));
        $stmt = $this->getDb()->prepare(
            "SELECT DISTINCT elo.learning_outcome
             FROM assignment_learning_outcomes alo
             INNER JOIN enote_learning_outcomes elo ON elo.id = alo.learning_outcome_id
             WHERE alo.assignment_id IN ({$placeholders})
             ORDER BY elo.order_number ASC"
        );
        $stmt->execute($assignmentIds);

        return array_column($stmt->fetchAll(), 'learning_outcome');
    }

    /**
     * The competence text attached (via assignment_curriculum_topics) to any of the given AOI
     * assignment ids - what the AOI descriptor is built from (spec section 11). An AOI assignment
     * can span multiple Topics; each carries its own competence, so all are returned.
     *
     * @param int[] $assignmentIds
     * @return string[]
     */
    public function getCompetenciesForAssignments(array $assignmentIds): array
    {
        if (empty($assignmentIds)) {
            return [];
        }

        $placeholders = implode(',', array_fill(0, count($assignmentIds), '?'));
        $stmt = $this->getDb()->prepare(
            "SELECT DISTINCT ct.competence
             FROM assignment_curriculum_topics act
             INNER JOIN enote_curriculum_topics ct ON ct.id = act.curriculum_topic_id
             WHERE act.assignment_id IN ({$placeholders}) AND ct.competence IS NOT NULL AND ct.competence <> ''"
        );
        $stmt->execute($assignmentIds);

        return array_column($stmt->fetchAll(), 'competence');
    }

    // --- Descriptor generation (spec sections 9-12) ------------------------------------------

    /** "at an exceptional level" / "at a basic level" etc, keyed by A-E status. */
    private const LEVEL_PHRASES = [
        'A' => 'at an exceptional level',
        'B' => 'at an outstanding level',
        'C' => 'at a satisfactory level',
        'D' => 'at a basic level',
        'E' => 'at an elementary level',
    ];

    /** AOI's "demonstrates {word} competence in ..." verb, keyed by A-E status. */
    private const COMPETENCE_WORD = [
        'A' => 'exceptional',
        'B' => 'outstanding',
        'C' => 'satisfactory',
        'D' => 'basic',
        'E' => 'elementary',
    ];

    /** Encouraging forward-looking clause appended for the two lower bands, never a bare negative. */
    private const GROWTH_CLAUSE = [
        'D' => 'and would benefit from additional practice',
        'E' => 'and requires further guided learning and practice to strengthen this learning outcome',
    ];

    private static function lowercaseFirst(string $text): string
    {
        return $text === '' ? $text : mb_strtolower(mb_substr($text, 0, 1)) . mb_substr($text, 1);
    }

    private static function joinWithAnd(array $items): string
    {
        if (count($items) === 1) {
            return $items[0];
        }
        $last = array_pop($items);
        return implode(', ', $items) . ' and ' . $last;
    }

    /**
     * Naive base-verb -> gerund ("apply" -> "applying", "analyze" -> "analyzing") for inserting a
     * curriculum competence/LO phrase (authored imperative-first, e.g. "apply knowledge of...")
     * naturally after "competence in ...". Good enough for the short, regular-verb phrasing
     * curriculum text actually uses; doesn't attempt CVC consonant-doubling (e.g. "plan"->"planning")
     * since none of the verbs in this app's curriculum content need it today.
     */
    private static function toGerund(string $verb): string
    {
        $lower = mb_strtolower($verb);
        if (str_ends_with($lower, 'e') && !str_ends_with($lower, 'ee') && !str_ends_with($lower, 'oe')) {
            return mb_substr($verb, 0, -1) . 'ing';
        }
        return $verb . 'ing';
    }

    /** Lowercases and converts the leading verb to its gerund form ("Apply X" -> "applying X"). */
    private static function toGerundPhrase(string $text): string
    {
        $text = self::lowercaseFirst(rtrim(trim($text), '.'));
        $words = explode(' ', $text, 2);
        $words[0] = self::toGerund($words[0]);
        return implode(' ', $words);
    }

    /**
     * @param string[] $learningOutcomes Every LO text contributing to this LOA percentage.
     */
    public function generateLOADescriptor(string $studentName, array $learningOutcomes, float $percentage): string
    {
        $status = ReportCardGradingService::getPerformanceStatus($percentage);
        $levelPhrase = self::LEVEL_PHRASES[$status];
        $growth = self::GROWTH_CLAUSE[$status] ?? null;

        if (empty($learningOutcomes)) {
            $subject = 'the assessed learning outcomes';
        } else {
            $subject = self::joinWithAnd(array_map(fn($lo) => self::lowercaseFirst(rtrim(trim($lo), '.')), $learningOutcomes));
        }

        if ($status === 'D') {
            return "{$studentName} demonstrates a basic ability to {$subject} {$growth}.";
        }
        if ($status === 'E') {
            return "{$studentName} demonstrates an elementary understanding of how to {$subject} {$growth}.";
        }

        return "{$studentName} is able to {$subject} {$levelPhrase}.";
    }

    public function generateAOIDescriptor(string $studentName, string $competenceText, float $percentage): string
    {
        $status = ReportCardGradingService::getPerformanceStatus($percentage);
        $word = self::COMPETENCE_WORD[$status];
        $growth = self::GROWTH_CLAUSE[$status] ?? null;

        $sentence = "{$studentName} demonstrates {$word} competence" . self::competenceClause($competenceText);
        return $growth !== null ? "{$sentence} {$growth}." : "{$sentence}.";
    }

    /**
     * The "...competence<clause>" tail (leading space/punctuation included), built to read
     * naturally regardless of how the competence text was authored. The documented convention is a
     * bare imperative verb phrase ("apply knowledge of...") which becomes " in applying knowledge
     * of..." via gerund conversion - but real curriculum data sometimes reads as a full declarative
     * sentence instead ("The learner understands..."), which a gerund transform mangles (naively
     * turning "The" into "Thing"). Detected by a leading article/subject and, in that case,
     * presented as its own clause after a colon instead of forcing it into "in <gerund>".
     */
    private static function competenceClause(string $competenceText): string
    {
        if (!$competenceText) {
            return ' in the assessed competence';
        }

        $lower = mb_strtolower(trim($competenceText));
        foreach (['the learner', 'the student', 'learners ', 'students '] as $start) {
            if (str_starts_with($lower, $start)) {
                return ': ' . self::lowercaseFirst(rtrim(trim($competenceText), '.'));
            }
        }

        return ' in ' . self::toGerundPhrase($competenceText);
    }

    /** Closing career/skill pathway sentence, keyed by a lowercase keyword found in the subject name. */
    private const PATHWAY_SUGGESTIONS = [
        'ict' => 'practical ICT, computer maintenance and software development skills',
        'computer' => 'practical ICT, computer maintenance and software development skills',
        'physics' => 'engineering, technical and applied sciences skills',
        'chemistry' => 'laboratory science, health sciences and industrial chemistry skills',
        'biology' => 'health sciences, agriculture and environmental science skills',
        'agriculture' => 'agricultural science, agribusiness and environmental management skills',
        'mathematics' => 'analytical, engineering and data science skills',
        'geography' => 'environmental science, urban planning and geospatial skills',
        'business' => 'entrepreneurship, accounting and business management skills',
        'commerce' => 'entrepreneurship, accounting and business management skills',
        'economics' => 'finance, economics and business analysis skills',
    ];

    private static function pathwaySentence(string $subjectName): string
    {
        $needle = strtolower($subjectName);
        foreach (self::PATHWAY_SUGGESTIONS as $keyword => $pathway) {
            if (str_contains($needle, $keyword)) {
                return "Their demonstrated strengths suggest potential for further development of {$pathway}.";
            }
        }
        return 'Their demonstrated strengths suggest potential for further development in this subject area.';
    }

    /** EOC's "demonstrates {phrase} {topic}" clause, keyed by A-E status - shared by the whole-
     *  subject synthesis (generateEOCDescriptor) and the single-topic-row sentence
     *  (generateEOCTopicDescriptor) so both phrase a topic the same way. */
    private const EOC_CLAUSE_WORD = [
        'A' => 'exceptional understanding of',
        'B' => 'outstanding performance in',
        'C' => 'satisfactory competence in',
        'D' => 'basic understanding of',
        'E' => 'elementary understanding of',
    ];

    /**
     * One row's worth of EOC descriptor - "{Name} demonstrates {level clause} {topic}." - for
     * reports that show a sentence per (subject, topic) row rather than one subject-wide
     * synthesis (see generateEOCDescriptor for that whole-subject version).
     */
    public function generateEOCTopicDescriptor(string $studentName, string $topicName, float $percentage): string
    {
        $status = ReportCardGradingService::getPerformanceStatus($percentage);
        return "{$studentName} demonstrates " . self::EOC_CLAUSE_WORD[$status] . " {$topicName}.";
    }

    /**
     * @param array<int, array{topic_name: string, percentage: float, status: string, descriptor: string}> $topicBreakdown
     *     Already averaged per-topic (calculateTopicBreakdown()'s output), strongest-first.
     */
    public function generateEOCDescriptor(string $studentName, string $subjectName, array $topicBreakdown): string
    {
        if (empty($topicBreakdown)) {
            return "{$studentName} has no topic-level EOC results recorded yet for this subject.";
        }

        $clauses = array_map(
            fn($t) => self::EOC_CLAUSE_WORD[$t['status']] . " {$t['topic_name']}",
            $topicBreakdown
        );

        // Split into two sentences once there are 3+ topics, mirroring the spec's own worked
        // example cadence - one long comma-run reads worse than two short sentences. "They" (not
        // a name-derived pronoun) since a student's pronouns aren't known here.
        if (count($clauses) >= 3) {
            $mid = (int) ceil(count($clauses) / 2);
            $first = array_slice($clauses, 0, $mid);
            $second = array_slice($clauses, $mid);
            $body = "{$studentName} demonstrates " . self::joinWithAnd($first) . '. '
                . 'They demonstrate ' . self::joinWithAnd($second) . '.';
        } else {
            $body = "{$studentName} demonstrates " . self::joinWithAnd($clauses) . '.';
        }

        return $body . ' ' . self::pathwaySentence($subjectName);
    }
}
