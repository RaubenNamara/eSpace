<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Automatic Student Rewards & Badges Service
 *
 * Reuses existing data rather than duplicating marks - every metric is recomputed on demand from
 * assignment_submissions via PerformanceReportService (the same source ReportCardService already
 * uses), never stored redundantly here except as a snapshot of the score/average that triggered
 * a given award (so an admin reviewing an old award can still see why it was given after marks
 * later change).
 *
 * Two rule shapes, both configurable via reward_rules (Admin-editable, nothing hard-coded):
 *  - individual: every student who clears the threshold qualifies (Platinum/Gold/Silver/Bronze,
 *    Excellent Attendance, Active Learner).
 *  - class_top / subject_top: a ranking rule - only the single highest-scoring student (ties all
 *    win) in the class, or in a given subject within the class, qualifies (Best Performer in
 *    Class/Subject, Most Improved, Assignment Champion).
 *
 * evaluateAfterMarksChange() is the one entry point callers use (hooked into
 * Teacher\MarkingController::returnToStudent(), the same moment ReportCardService's
 * report-card-ready notification already fires from) - it re-evaluates this student's individual
 * rules, then re-evaluates every ranking rule for their whole class, since a new mark can change
 * who currently holds "best in class" even though their own marks didn't change.
 */
class RewardService
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function performanceService(): PerformanceReportService
    {
        return new PerformanceReportService();
    }

    private function virtualLabService(): VirtualLabService
    {
        return new VirtualLabService();
    }

    // ---------------------------------------------------------------------
    // Automatic evaluation entry point
    // ---------------------------------------------------------------------

    public function evaluateAfterMarksChange(int $studentId, int $termId): void
    {
        $this->evaluateIndividualRules($studentId, $termId);

        $classId = $this->getStudentClassId($studentId);
        if ($classId) {
            $this->evaluateRankingRules($classId, $termId);
        }
    }

    private function getStudentClassId(int $studentId): ?int
    {
        $stmt = $this->getDb()->prepare('SELECT class_id FROM students WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $studentId]);
        $row = $stmt->fetch();
        return $row && $row['class_id'] !== null ? (int) $row['class_id'] : null;
    }

    private function getActiveRules(array $scopes = []): array
    {
        $sql = 'SELECT * FROM reward_rules WHERE is_active = 1';
        $params = [];
        if (!empty($scopes)) {
            $placeholders = implode(',', array_fill(0, count($scopes), '?'));
            $sql .= " AND scope IN ({$placeholders})";
            $params = $scopes;
        }
        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }

    private function computeMetric(string $metric, int $studentId, int $termId, ?int $subjectId = null): ?float
    {
        switch ($metric) {
            case 'overall_average':
                return $this->performanceService()->studentGeneral($studentId, $termId)['overall_avg_percentage'];
            case 'subject_average':
                if (!$subjectId) {
                    return null;
                }
                return $this->performanceService()->studentSubject($studentId, $subjectId, $termId)['avg_percentage'];
            case 'assignments_completed':
                return (float) $this->performanceService()->studentGeneral($studentId, $termId)['total_assignments'];
            case 'login_count':
                return (float) $this->getLoginCount($studentId, $termId);
            case 'improvement_delta':
                return $this->getImprovementDelta($studentId, $termId);
            case 'lab_average':
                return $this->virtualLabService()->studentLabAverage($studentId, $termId);
            case 'lab_subject_average':
                return $subjectId ? $this->virtualLabService()->studentLabAverage($studentId, $termId, $subjectId) : null;
            case 'lab_experiments_completed':
                return (float) $this->virtualLabService()->studentLabExperimentsCompleted($studentId, $termId);
            default:
                return null;
        }
    }

    private function getLoginCount(int $studentId, int $termId): int
    {
        $term = $this->getTermRange($termId);
        if (!$term) {
            return 0;
        }
        $stmt = $this->getDb()->prepare(
            'SELECT COUNT(*) as c FROM student_logins
             WHERE student_id = :student_id AND logged_in_at >= :start_date AND logged_in_at < DATE_ADD(:end_date, INTERVAL 1 DAY)'
        );
        $stmt->execute(['student_id' => $studentId, 'start_date' => $term['start_date'], 'end_date' => $term['end_date']]);
        return (int) $stmt->fetch()['c'];
    }

    private function getTermRange(int $termId): ?array
    {
        $stmt = $this->getDb()->prepare('SELECT id, name, start_date, end_date, academic_year_id FROM terms WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $termId]);
        return $stmt->fetch() ?: null;
    }

    private function getPreviousTermId(int $termId): ?int
    {
        $term = $this->getTermRange($termId);
        if (!$term) {
            return null;
        }
        $stmt = $this->getDb()->prepare('SELECT id FROM terms WHERE start_date < :start_date AND deleted_at IS NULL ORDER BY start_date DESC LIMIT 1');
        $stmt->execute(['start_date' => $term['start_date']]);
        $row = $stmt->fetch();
        return $row ? (int) $row['id'] : null;
    }

    private function getImprovementDelta(int $studentId, int $termId): ?float
    {
        $previousTermId = $this->getPreviousTermId($termId);
        if (!$previousTermId) {
            return null;
        }
        $current = $this->performanceService()->studentGeneral($studentId, $termId)['overall_avg_percentage'];
        $previous = $this->performanceService()->studentGeneral($studentId, $previousTermId)['overall_avg_percentage'];
        if ($current === null || $previous === null) {
            return null;
        }
        return round($current - $previous, 1);
    }

    private function getAcademicYearLabel(int $termId): ?string
    {
        $stmt = $this->getDb()->prepare(
            'SELECT ay.name FROM terms t LEFT JOIN academic_years ay ON t.academic_year_id = ay.id WHERE t.id = :id'
        );
        $stmt->execute(['id' => $termId]);
        $row = $stmt->fetch();
        return $row ? $row['name'] : null;
    }

    // ---------------------------------------------------------------------
    // Individual threshold rules
    // ---------------------------------------------------------------------

    private function evaluateIndividualRules(int $studentId, int $termId): void
    {
        foreach ($this->getActiveRules(['individual']) as $rule) {
            $ruleSubjectId = !empty($rule['subject_id']) ? (int) $rule['subject_id'] : null;
            $value = $this->computeMetric($rule['metric'], $studentId, $termId, $ruleSubjectId);
            $qualifies = $value !== null
                && ($rule['min_value'] === null || $value >= (float) $rule['min_value'])
                && ($rule['max_value'] === null || $value <= (float) $rule['max_value']);

            if ($qualifies) {
                $this->upsertAutoAward($studentId, (int) $rule['id'], $rule, $termId, $value, $ruleSubjectId, null);
            } else {
                $this->autoRevokeIfExists($studentId, (int) $rule['id'], $termId, $ruleSubjectId ?? 0);
            }
        }
    }

    // ---------------------------------------------------------------------
    // Ranking rules (class_top / subject_top)
    // ---------------------------------------------------------------------

    private function evaluateRankingRules(int $classId, int $termId): void
    {
        $studentIds = $this->getClassStudentIds($classId);
        if (empty($studentIds)) {
            return;
        }

        foreach ($this->getActiveRules(['class_top']) as $rule) {
            $this->evaluateTopRule($rule, $classId, $studentIds, $termId, null);
        }

        $subjectRules = $this->getActiveRules(['subject_top']);
        if (!empty($subjectRules)) {
            $subjectIds = $this->getClassSubjectIds($classId, $termId);
            foreach ($subjectRules as $rule) {
                foreach ($subjectIds as $subjectId) {
                    $this->evaluateTopRule($rule, $classId, $studentIds, $termId, $subjectId);
                }
            }
        }
    }

    private function evaluateTopRule(array $rule, int $classId, array $studentIds, int $termId, ?int $subjectId): void
    {
        $scores = [];
        foreach ($studentIds as $studentId) {
            $value = $this->computeMetric($rule['metric'], $studentId, $termId, $subjectId);
            if ($value === null) {
                continue;
            }
            if ($rule['min_value'] !== null && $value < (float) $rule['min_value']) {
                continue;
            }
            $scores[$studentId] = $value;
        }

        $subjectKey = $subjectId ?? 0;

        if (empty($scores)) {
            foreach ($studentIds as $studentId) {
                $this->autoRevokeIfExists($studentId, (int) $rule['id'], $termId, $subjectKey);
            }
            return;
        }

        $max = max($scores);
        $winners = array_keys($scores, $max, true);

        foreach ($studentIds as $studentId) {
            if (in_array($studentId, $winners, true)) {
                $this->upsertAutoAward($studentId, (int) $rule['id'], $rule, $termId, $max, $subjectId, $classId);
            } else {
                $this->autoRevokeIfExists($studentId, (int) $rule['id'], $termId, $subjectKey);
            }
        }
    }

    private function getClassStudentIds(int $classId): array
    {
        $stmt = $this->getDb()->prepare(
            'SELECT DISTINCT s.id FROM students s
             INNER JOIN student_department_enrollments sde ON sde.student_id = s.id AND sde.class_id = :class_id AND sde.deleted_at IS NULL
             WHERE s.deleted_at IS NULL'
        );
        $stmt->execute(['class_id' => $classId]);
        return array_map('intval', array_column($stmt->fetchAll(), 'id'));
    }

    private function getClassSubjectIds(int $classId, int $termId): array
    {
        $term = $this->getTermRange($termId);
        $sql = 'SELECT DISTINCT subject_id FROM assignments WHERE class_id = :class_id AND deleted_at IS NULL AND subject_id IS NOT NULL';
        $params = ['class_id' => $classId];
        if ($term) {
            $sql .= ' AND due_date BETWEEN :start_date AND :end_date';
            $params['start_date'] = $term['start_date'];
            $params['end_date'] = $term['end_date'];
        }
        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);
        return array_map('intval', array_column($stmt->fetchAll(), 'subject_id'));
    }

    // ---------------------------------------------------------------------
    // Award persistence (automatic path)
    // ---------------------------------------------------------------------

    private function findExistingAward(int $studentId, int $ruleId, int $termId, int $subjectKey): ?array
    {
        $stmt = $this->getDb()->prepare(
            'SELECT * FROM student_awards WHERE student_id = :student_id AND rule_id = :rule_id AND term_id = :term_id AND subject_id = :subject_id'
        );
        $stmt->execute(['student_id' => $studentId, 'rule_id' => $ruleId, 'term_id' => $termId, 'subject_id' => $subjectKey]);
        return $stmt->fetch() ?: null;
    }

    private function upsertAutoAward(int $studentId, int $ruleId, array $rule, int $termId, float $value, ?int $subjectId, ?int $classId): void
    {
        $subjectKey = $subjectId ?? 0;
        $existing = $this->findExistingAward($studentId, $ruleId, $termId, $subjectKey);

        // An admin-overridden award is never silently touched by the automatic engine again -
        // they explicitly took ownership of it.
        if ($existing && $existing['award_source'] === 'override') {
            return;
        }

        $isSubjectMetric = $rule['metric'] === 'subject_average';
        $score = $isSubjectMetric ? $value : null;
        $average = !$isSubjectMetric ? $value : null;

        if ($existing) {
            $changed = $existing['status'] !== 'active'
                || (float) ($existing['average'] ?? -1) !== (float) ($average ?? -1)
                || (float) ($existing['score'] ?? -1) !== (float) ($score ?? -1);

            $stmt = $this->getDb()->prepare(
                'UPDATE student_awards SET score = :score, average = :average, class_id = :class_id, status = "active", updated_at = NOW() WHERE id = :id'
            );
            $stmt->execute(['score' => $score, 'average' => $average, 'class_id' => $classId, 'id' => $existing['id']]);

            if ($changed) {
                $this->logAudit((int) $existing['id'], 'auto_updated', null, null, $existing, $this->fetchAward((int) $existing['id']));
            }
            return;
        }

        $stmt = $this->getDb()->prepare(
            'INSERT INTO student_awards
                (student_id, rule_id, badge_type, award_title, category, subject_id, class_id, score, average,
                 term_id, academic_year, award_source, status, awarded_at, updated_at)
             VALUES
                (:student_id, :rule_id, :badge_type, :award_title, :category, :subject_id, :class_id, :score, :average,
                 :term_id, :academic_year, "automatic", "active", NOW(), NOW())'
        );
        $stmt->execute([
            'student_id' => $studentId,
            'rule_id' => $ruleId,
            'badge_type' => $rule['badge_type'],
            'award_title' => $rule['award_title'],
            'category' => $rule['category'],
            'subject_id' => $subjectKey,
            'class_id' => $classId,
            'score' => $score,
            'average' => $average,
            'term_id' => $termId,
            'academic_year' => $this->getAcademicYearLabel($termId),
        ]);

        $newId = (int) \eSpace\Config\Database::lastInsertId();
        $this->logAudit($newId, 'auto_created', null, null, null, $this->fetchAward($newId));
    }

    private function autoRevokeIfExists(int $studentId, int $ruleId, int $termId, int $subjectKey): void
    {
        $existing = $this->findExistingAward($studentId, $ruleId, $termId, $subjectKey);

        if (!$existing || $existing['status'] !== 'active' || $existing['award_source'] === 'override') {
            return;
        }

        $stmt = $this->getDb()->prepare('UPDATE student_awards SET status = "revoked", updated_at = NOW() WHERE id = :id');
        $stmt->execute(['id' => $existing['id']]);

        $this->logAudit(
            (int) $existing['id'],
            'auto_revoked',
            null,
            null,
            $existing,
            $this->fetchAward((int) $existing['id']),
            "No longer meets the rule's conditions after a marks update."
        );
    }

    private function fetchAward(int $id): ?array
    {
        $stmt = $this->getDb()->prepare('SELECT * FROM student_awards WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }

    private function logAudit(int $awardId, string $action, ?int $actorId, ?string $actorRole, ?array $before, ?array $after, ?string $note = null): void
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO student_award_audit (student_award_id, action, actor_id, actor_role, before_values, after_values, note, created_at)
             VALUES (:award_id, :action, :actor_id, :actor_role, :before, :after, :note, NOW())'
        );
        $stmt->execute([
            'award_id' => $awardId,
            'action' => $action,
            'actor_id' => $actorId,
            'actor_role' => $actorRole,
            'before' => $before ? json_encode($before) : null,
            'after' => $after ? json_encode($after) : null,
            'note' => $note,
        ]);
    }

    // ---------------------------------------------------------------------
    // Student-facing reads
    // ---------------------------------------------------------------------

    /**
     * @return array<int, array<string, mixed>>
     */
    public function listAwardsForStudent(int $studentId, bool $activeOnly = true, ?int $termId = null): array
    {
        $where = 'sa.student_id = :student_id';
        $params = ['student_id' => $studentId];
        if ($activeOnly) {
            $where .= " AND sa.status = 'active'";
        }
        if ($termId !== null) {
            $where .= ' AND sa.term_id = :term_id';
            $params['term_id'] = $termId;
        }

        $stmt = $this->getDb()->prepare(
            "SELECT sa.*, s.name as subject_name, t.name as term_name
             FROM student_awards sa
             LEFT JOIN subjects s ON sa.subject_id = s.id AND sa.subject_id > 0
             INNER JOIN terms t ON sa.term_id = t.id
             WHERE {$where}
             ORDER BY sa.awarded_at DESC"
        );
        $stmt->execute($params);

        return array_map([$this, 'normalizeAward'], $stmt->fetchAll());
    }

    public function summaryForStudent(int $studentId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT badge_type, COUNT(*) as cnt FROM student_awards
             WHERE student_id = :student_id AND status = 'active' GROUP BY badge_type"
        );
        $stmt->execute(['student_id' => $studentId]);

        $summary = ['platinum' => 0, 'gold' => 0, 'silver' => 0, 'bronze' => 0, 'special' => 0];
        foreach ($stmt->fetchAll() as $row) {
            $summary[$row['badge_type']] = (int) $row['cnt'];
        }
        return $summary;
    }

    private function normalizeAward(array $row): array
    {
        return [
            'id' => (int) $row['id'],
            'student_id' => (int) $row['student_id'],
            'rule_id' => $row['rule_id'] !== null ? (int) $row['rule_id'] : null,
            'badge_type' => $row['badge_type'],
            'award_title' => $row['award_title'],
            'category' => $row['category'],
            'subject_id' => (int) $row['subject_id'] > 0 ? (int) $row['subject_id'] : null,
            'subject_name' => $row['subject_name'] ?? null,
            'class_id' => $row['class_id'] !== null ? (int) $row['class_id'] : null,
            'score' => $row['score'] !== null ? (float) $row['score'] : null,
            'average' => $row['average'] !== null ? (float) $row['average'] : null,
            'term_id' => (int) $row['term_id'],
            'term_name' => $row['term_name'] ?? null,
            'academic_year' => $row['academic_year'],
            'award_source' => $row['award_source'],
            'status' => $row['status'],
            'admin_override' => (bool) $row['admin_override'],
            'admin_note' => $row['admin_note'],
            'awarded_at' => $row['awarded_at'],
            'updated_at' => $row['updated_at'],
        ];
    }

    // ---------------------------------------------------------------------
    // Admin monitoring/management
    // ---------------------------------------------------------------------

    public function listAwardsForAdmin(array $filters, int $page, int $perPage): array
    {
        $where = ['1 = 1'];
        $params = [];

        if (!empty($filters['student_id'])) {
            $where[] = 'sa.student_id = :student_id';
            $params['student_id'] = (int) $filters['student_id'];
        }
        if (!empty($filters['search'])) {
            // Non-emulated PDO can't reuse one named placeholder more than once per query, so
            // this needs three distinct names bound to the same value (same fix as
            // SearchService).
            $where[] = '(st.first_name LIKE :search1 OR st.last_name LIKE :search2 OR st.admission_number LIKE :search3)';
            $searchTerm = '%' . $filters['search'] . '%';
            $params['search1'] = $searchTerm;
            $params['search2'] = $searchTerm;
            $params['search3'] = $searchTerm;
        }
        if (!empty($filters['class_id'])) {
            $where[] = 'sa.class_id = :class_id';
            $params['class_id'] = (int) $filters['class_id'];
        }
        if (!empty($filters['subject_id'])) {
            $where[] = 'sa.subject_id = :subject_id';
            $params['subject_id'] = (int) $filters['subject_id'];
        }
        if (!empty($filters['badge_type'])) {
            $where[] = 'sa.badge_type = :badge_type';
            $params['badge_type'] = $filters['badge_type'];
        }
        if (!empty($filters['term_id'])) {
            $where[] = 'sa.term_id = :term_id';
            $params['term_id'] = (int) $filters['term_id'];
        }
        if (!empty($filters['academic_year'])) {
            $where[] = 'sa.academic_year = :academic_year';
            $params['academic_year'] = $filters['academic_year'];
        }
        if (!empty($filters['status'])) {
            $where[] = 'sa.status = :status';
            $params['status'] = $filters['status'];
        }
        if (!empty($filters['award_source'])) {
            $where[] = 'sa.award_source = :award_source';
            $params['award_source'] = $filters['award_source'];
        }

        $whereSql = implode(' AND ', $where);
        $perPage = max(1, min(100, $perPage));
        $offset = max(0, ($page - 1) * $perPage);

        $db = $this->getDb();

        $countStmt = $db->prepare(
            "SELECT COUNT(*) as cnt FROM student_awards sa INNER JOIN students st ON sa.student_id = st.id WHERE {$whereSql}"
        );
        $countStmt->execute($params);
        $total = (int) $countStmt->fetch()['cnt'];

        $stmt = $db->prepare(
            "SELECT sa.*, st.first_name, st.last_name, st.admission_number, s.name as subject_name,
                    c.name as class_name, t.name as term_name
             FROM student_awards sa
             INNER JOIN students st ON sa.student_id = st.id
             LEFT JOIN subjects s ON sa.subject_id = s.id AND sa.subject_id > 0
             LEFT JOIN classes c ON sa.class_id = c.id
             INNER JOIN terms t ON sa.term_id = t.id
             WHERE {$whereSql}
             ORDER BY sa.awarded_at DESC
             LIMIT {$perPage} OFFSET {$offset}"
        );
        $stmt->execute($params);

        $rows = array_map(function ($row) {
            $award = $this->normalizeAward($row);
            $award['student_name'] = trim($row['first_name'] . ' ' . $row['last_name']);
            $award['admission_number'] = $row['admission_number'];
            $award['class_name'] = $row['class_name'];
            return $award;
        }, $stmt->fetchAll());

        return ['awards' => $rows, 'total' => $total, 'page' => $page, 'per_page' => $perPage];
    }

    public function getAwardDetail(int $id): ?array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT sa.*, st.first_name, st.last_name, st.admission_number, s.name as subject_name,
                    c.name as class_name, t.name as term_name, rr.description as rule_description, rr.metric as rule_metric
             FROM student_awards sa
             INNER JOIN students st ON sa.student_id = st.id
             LEFT JOIN subjects s ON sa.subject_id = s.id AND sa.subject_id > 0
             LEFT JOIN classes c ON sa.class_id = c.id
             INNER JOIN terms t ON sa.term_id = t.id
             LEFT JOIN reward_rules rr ON sa.rule_id = rr.id
             WHERE sa.id = :id"
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }

        $award = $this->normalizeAward($row);
        $award['student_name'] = trim($row['first_name'] . ' ' . $row['last_name']);
        $award['admission_number'] = $row['admission_number'];
        $award['class_name'] = $row['class_name'];
        $award['rule_description'] = $row['rule_description'];
        $award['rule_metric'] = $row['rule_metric'];

        $auditStmt = $this->getDb()->prepare('SELECT * FROM student_award_audit WHERE student_award_id = :id ORDER BY created_at DESC');
        $auditStmt->execute(['id' => $id]);
        $award['audit'] = array_map(fn($a) => [
            'id' => (int) $a['id'],
            'action' => $a['action'],
            'actor_id' => $a['actor_id'] !== null ? (int) $a['actor_id'] : null,
            'actor_role' => $a['actor_role'],
            'before' => $a['before_values'] ? json_decode($a['before_values'], true) : null,
            'after' => $a['after_values'] ? json_decode($a['after_values'], true) : null,
            'note' => $a['note'],
            'created_at' => $a['created_at'],
        ], $auditStmt->fetchAll());

        return $award;
    }

    /**
     * Admin edits an award's editable fields (title/category/note) without changing who it
     * belongs to or converting its source.
     */
    public function editAward(int $id, array $changes, int $actorId, string $actorRole): bool
    {
        $before = $this->fetchAward($id);
        if (!$before) {
            return false;
        }

        $allowed = ['award_title', 'category', 'admin_note'];
        $set = [];
        $params = ['id' => $id];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $changes)) {
                $set[] = "{$field} = :{$field}";
                $params[$field] = $changes[$field];
            }
        }
        if (empty($set)) {
            return false;
        }

        $set[] = 'updated_at = NOW()';
        $stmt = $this->getDb()->prepare('UPDATE student_awards SET ' . implode(', ', $set) . ' WHERE id = :id');
        $stmt->execute($params);

        $this->logAudit($id, 'edited', $actorId, $actorRole, $before, $this->fetchAward($id));
        return true;
    }

    public function revokeAward(int $id, int $actorId, string $actorRole, ?string $note): bool
    {
        $before = $this->fetchAward($id);
        if (!$before || $before['status'] === 'revoked') {
            return false;
        }

        $stmt = $this->getDb()->prepare('UPDATE student_awards SET status = "revoked", admin_note = COALESCE(:note, admin_note), updated_at = NOW() WHERE id = :id');
        $stmt->execute(['note' => $note, 'id' => $id]);

        $this->logAudit($id, 'revoked', $actorId, $actorRole, $before, $this->fetchAward($id), $note);
        return true;
    }

    public function restoreAward(int $id, int $actorId, string $actorRole, ?string $note): bool
    {
        $before = $this->fetchAward($id);
        if (!$before || $before['status'] === 'active') {
            return false;
        }

        $stmt = $this->getDb()->prepare('UPDATE student_awards SET status = "active", updated_at = NOW() WHERE id = :id');
        $stmt->execute(['id' => $id]);

        $this->logAudit($id, 'restored', $actorId, $actorRole, $before, $this->fetchAward($id), $note);
        return true;
    }

    /**
     * Admin manually overrides an automatically-selected badge - from this point on, the
     * automatic engine leaves this (student, rule, term, subject) slot alone entirely.
     */
    public function overrideAward(int $id, array $changes, int $actorId, string $actorRole, string $note): bool
    {
        $before = $this->fetchAward($id);
        if (!$before) {
            return false;
        }

        $allowed = ['badge_type', 'award_title', 'category', 'score', 'average'];
        $set = ['award_source = "override"', 'admin_override = 1', 'admin_note = :note', 'updated_at = NOW()'];
        $params = ['id' => $id, 'note' => $note];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $changes)) {
                $set[] = "{$field} = :{$field}";
                $params[$field] = $changes[$field];
            }
        }

        $stmt = $this->getDb()->prepare('UPDATE student_awards SET ' . implode(', ', $set) . ' WHERE id = :id');
        $stmt->execute($params);

        $this->logAudit($id, 'overridden', $actorId, $actorRole, $before, $this->fetchAward($id), $note);
        return true;
    }

    /**
     * A brand-new manual award with no matching automatic rule (e.g. a one-off recognition an
     * admin wants to give that isn't covered by any configured rule).
     */
    public function createManualAward(array $data, int $actorId, string $actorRole): int
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO student_awards
                (student_id, rule_id, badge_type, award_title, category, subject_id, class_id, score, average,
                 term_id, academic_year, award_source, status, admin_note, awarded_at, updated_at)
             VALUES
                (:student_id, NULL, :badge_type, :award_title, :category, :subject_id, :class_id, :score, :average,
                 :term_id, :academic_year, "manual", "active", :note, NOW(), NOW())'
        );
        $subjectId = !empty($data['subject_id']) ? (int) $data['subject_id'] : 0;
        $stmt->execute([
            'student_id' => (int) $data['student_id'],
            'badge_type' => $data['badge_type'],
            'award_title' => $data['award_title'],
            'category' => $data['category'] ?? 'academic',
            'subject_id' => $subjectId,
            'class_id' => !empty($data['class_id']) ? (int) $data['class_id'] : null,
            'score' => $data['score'] ?? null,
            'average' => $data['average'] ?? null,
            'term_id' => (int) $data['term_id'],
            'academic_year' => $this->getAcademicYearLabel((int) $data['term_id']),
            'note' => $data['admin_note'] ?? null,
        ]);

        $newId = (int) \eSpace\Config\Database::lastInsertId();
        $this->logAudit($newId, 'manual_created', $actorId, $actorRole, null, $this->fetchAward($newId));
        return $newId;
    }

    // ---------------------------------------------------------------------
    // Reward rules (Admin settings area)
    // ---------------------------------------------------------------------

    public function listRules(): array
    {
        $stmt = $this->getDb()->query('SELECT * FROM reward_rules ORDER BY badge_type ASC, id ASC');
        return $stmt->fetchAll();
    }

    public function createRule(array $data): int
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO reward_rules
                (badge_type, award_title, category, metric, scope, subject_id, min_value, max_value, icon, is_active, description, created_at, updated_at)
             VALUES
                (:badge_type, :award_title, :category, :metric, :scope, :subject_id, :min_value, :max_value, :icon, :is_active, :description, NOW(), NOW())'
        );
        $stmt->execute([
            'badge_type' => $data['badge_type'],
            'award_title' => $data['award_title'],
            'category' => $data['category'] ?? 'academic',
            'metric' => $data['metric'],
            'scope' => $data['scope'] ?? 'individual',
            'subject_id' => $data['subject_id'] ?? null,
            'min_value' => $data['min_value'] ?? null,
            'max_value' => $data['max_value'] ?? null,
            'icon' => $data['icon'] ?? null,
            'is_active' => !empty($data['is_active']) ? 1 : 0,
            'description' => $data['description'] ?? null,
        ]);
        return (int) \eSpace\Config\Database::lastInsertId();
    }

    public function updateRule(int $id, array $data): bool
    {
        $allowed = ['badge_type', 'award_title', 'category', 'metric', 'scope', 'subject_id', 'min_value', 'max_value', 'icon', 'is_active', 'description'];
        $set = [];
        $params = ['id' => $id];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $data)) {
                $set[] = "{$field} = :{$field}";
                $params[$field] = $field === 'is_active' ? (!empty($data[$field]) ? 1 : 0) : $data[$field];
            }
        }
        if (empty($set)) {
            return false;
        }
        $set[] = 'updated_at = NOW()';
        $stmt = $this->getDb()->prepare('UPDATE reward_rules SET ' . implode(', ', $set) . ' WHERE id = :id');
        return $stmt->execute($params);
    }

    public function deleteRule(int $id): bool
    {
        $stmt = $this->getDb()->prepare('DELETE FROM reward_rules WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }
}
