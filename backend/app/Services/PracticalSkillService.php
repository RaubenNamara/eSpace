<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Practical-skill tracking for Virtual Lab. Deliberately simple and traceable rather than a
 * black-box score: a skill's percentage is always (correct step attempts / total step attempts)
 * over real, already-graded action_log rows - a teacher can always trace a skill number back to
 * the exact steps and attempts that produced it via listSkillEvidence().
 *
 * The skill catalog is a small fixed list (not a DB table) matching the lightweight JSON-tag
 * convention `virtual_lab_experiments.practical_skills` already uses - there's no need for a
 * normalized catalog table at this volume, and it keeps the skill vocabulary visible in one place.
 */
class PracticalSkillService
{
    public const SKILLS = [
        'circuit_construction' => 'Circuit Construction',
        'using_ammeter' => 'Using an Ammeter',
        'using_voltmeter' => 'Using a Voltmeter',
        'measuring_length' => 'Measuring Length',
        'measuring_volume' => 'Measuring Volume',
        'measuring_mass' => 'Measuring Mass',
        'measuring_time' => 'Measuring Time',
        'reading_scales' => 'Reading Scales',
        'using_protractor' => 'Using a Protractor',
        'microscope_focusing' => 'Microscope Focusing',
        'titration_technique' => 'Titration Technique',
        'recording_observations' => 'Recording Observations',
        'lab_safety' => 'Lab Safety',
        'plotting_graphs' => 'Plotting Graphs',
        'interpreting_graphs' => 'Interpreting Graphs',
        'calculating_gradient' => 'Calculating Gradient',
        'experimental_analysis' => 'Experimental Analysis',
    ];

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * Reuses the existing, already-authorized "does this teacher teach this student" check
     * (PerformanceReportService::teacherCanAccessStudent - class_teacher_id, class_subjects, or
     * having set an assignment for their class) and additionally allows a teacher who has
     * published a Virtual Lab assignment to a class the student is enrolled in, since Virtual Lab
     * assignments live in their own table and wouldn't be seen by the general check otherwise.
     */
    public function teacherCanViewStudentSkills(int $teacherId, int $studentId): bool
    {
        if ((new PerformanceReportService())->teacherCanAccessStudent($teacherId, $studentId)) {
            return true;
        }
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM student_department_enrollments sde
             INNER JOIN virtual_lab_assignments vla ON vla.class_id = sde.class_id AND vla.deleted_at IS NULL
             WHERE sde.student_id = :student_id AND sde.deleted_at IS NULL AND vla.teacher_id = :teacher_id
             LIMIT 1'
        );
        $stmt->execute(['student_id' => $studentId, 'teacher_id' => $teacherId]);
        return (bool) $stmt->fetch();
    }

    /**
     * Derives skill tags for one step from its action, its target's apparatus type, and whether
     * it's a safety check - the same heuristic used both to backfill existing templates and to
     * tag any new step a teacher writes going forward (called from replaceSteps()).
     */
    public function inferSkillsForStep(string $requiredAction, ?string $targetObjectType, bool $isSafetyCheck, string $experimentTitle): array
    {
        $skills = [];
        if ($isSafetyCheck) {
            $skills[] = 'lab_safety';
        }

        if ($requiredAction === 'connect') {
            $skills[] = 'circuit_construction';
        }

        if ($requiredAction === 'measure') {
            $skills[] = 'reading_scales';
            $bySkill = [
                'ammeter' => 'using_ammeter',
                'voltmeter' => 'using_voltmeter',
                'ruler' => 'measuring_length',
                'burette' => 'measuring_volume',
                'pipette' => 'measuring_volume',
                'measuring_cylinder' => 'measuring_volume',
                'beaker' => 'measuring_volume',
                'water_container' => 'measuring_volume',
                'protractor' => 'using_protractor',
                'balance' => 'measuring_mass',
                'stopwatch' => 'measuring_time',
            ];
            if ($targetObjectType !== null && isset($bySkill[$targetObjectType])) {
                $skills[] = $bySkill[$targetObjectType];
            }
            if ($targetObjectType === 'burette' && stripos($experimentTitle, 'titration') !== false) {
                $skills[] = 'titration_technique';
            }
        }

        if (in_array($requiredAction, ['focus_coarse', 'focus_fine', 'select_objective'], true)) {
            $skills[] = 'microscope_focusing';
        }

        if ($requiredAction === 'inspect') {
            $skills[] = 'recording_observations';
        }

        return array_values(array_unique(array_filter($skills)));
    }

    /**
     * Rebuilds the skill mapping for one experiment's current steps. Safe to call repeatedly
     * (e.g. every time a teacher saves their step list via replaceSteps()) - only ever touches
     * virtual_lab_step_skills rows for this experiment's own step IDs, never attempts or scores.
     */
    public function syncStepSkills(int $experimentId): void
    {
        $db = $this->getDb();
        $exp = $db->prepare('SELECT title, scene_objects FROM virtual_lab_experiments WHERE id = :id');
        $exp->execute(['id' => $experimentId]);
        $expRow = $exp->fetch();
        if (!$expRow) {
            return;
        }
        $typeByKey = [];
        foreach (json_decode($expRow['scene_objects'], true) ?: [] as $o) {
            $typeByKey[$o['key']] = $o['object_type'];
        }

        $steps = $db->prepare('SELECT id, required_action, target_object_key, is_safety_check FROM virtual_lab_steps WHERE experiment_id = :id');
        $steps->execute(['id' => $experimentId]);
        $stepRows = $steps->fetchAll();

        $stepIds = array_column($stepRows, 'id');
        if (!empty($stepIds)) {
            $placeholders = implode(',', array_fill(0, count($stepIds), '?'));
            $db->prepare("DELETE FROM virtual_lab_step_skills WHERE step_id IN ($placeholders)")->execute($stepIds);
        }

        $insert = $db->prepare('INSERT IGNORE INTO virtual_lab_step_skills (step_id, skill_key) VALUES (:step_id, :skill_key)');
        $experimentSkills = [];
        foreach ($stepRows as $step) {
            $targetType = $step['target_object_key'] ? ($typeByKey[$step['target_object_key']] ?? null) : null;
            $skills = $this->inferSkillsForStep($step['required_action'], $targetType, (bool) $step['is_safety_check'], $expRow['title']);
            foreach ($skills as $skill) {
                $insert->execute(['step_id' => (int) $step['id'], 'skill_key' => $skill]);
                $experimentSkills[$skill] = true;
            }
        }

        // Keeps the experiment-level practical_skills tag list (used for catalogue browsing and
        // recommendations) automatically consistent with the fine-grained step mapping, instead of
        // requiring it to be hand-authored and drifting out of sync.
        $db->prepare('UPDATE virtual_lab_experiments SET practical_skills = :skills WHERE id = :id')
            ->execute(['skills' => json_encode(array_keys($experimentSkills)), 'id' => $experimentId]);
    }

    /**
     * A student's own words for what to practice, per skill - deterministic and skill-keyed, not
     * AI-generated. Deliberately generic per skill (not tuned to one experiment) so it stays true
     * regardless of which experiments actually produced the low score.
     */
    private const IMPROVEMENT_MESSAGES = [
        'circuit_construction' => 'Practice constructing complete circuits and connecting measuring instruments correctly.',
        'using_ammeter' => 'Practice connecting the ammeter in series and taking a reading only once the circuit is complete and switched on.',
        'using_voltmeter' => 'Practice connecting the voltmeter in parallel across the component you are measuring.',
        'measuring_length' => "Practice aligning a ruler's zero mark precisely with the start of what you are measuring.",
        'measuring_volume' => 'Practice reading a burette, pipette or measuring cylinder at eye level, from the bottom of the meniscus.',
        'measuring_mass' => 'Practice placing objects centrally on the balance and waiting for the reading to settle.',
        'measuring_time' => 'Practice starting and stopping the stopwatch at the exact right moments.',
        'reading_scales' => 'Practice reading instrument scales carefully before recording a value.',
        'using_protractor' => 'Practice centring the protractor exactly on the point of incidence and aligning its baseline with the normal.',
        'microscope_focusing' => 'Practice using coarse focus first, then fine focus, especially after changing magnification.',
        'titration_technique' => 'Practice controlling the burette tap and slowing to drop-by-drop as you approach the endpoint.',
        'recording_observations' => 'Practice inspecting apparatus and specimens carefully before moving on to the next step.',
        'lab_safety' => 'Review safety precautions before starting an experiment and follow acknowledgement steps carefully.',
        'plotting_graphs' => 'Practice recording enough repeat readings to build a full Results Table before expecting a graph to appear.',
        'interpreting_graphs' => 'Practice describing the relationship a graph shows in your own words - is it linear, does it pass through the origin, is there an anomalous point?',
        'calculating_gradient' => 'Practice calculating a gradient from two points on your best-fit line, including its units.',
        'experimental_analysis' => 'Practice relating your graph and calculations back to the underlying scientific law or relationship being tested.',
    ];

    public function improvementMessage(string $skillKey): ?string
    {
        return self::IMPROVEMENT_MESSAGES[$skillKey] ?? null;
    }

    /**
     * 5-tier scheme, defined once here rather than duplicated across components: 0-49 Developing,
     * 50-69 Improving, 70-84 Good, 85-94 Very Good, 95-100 Excellent. A skill with zero assessed
     * actions is never given a percentage at all - "Not Assessed Yet" is a distinct state from a
     * real, evidenced 0%.
     */
    public function scoreLabel(?float $pct): string
    {
        if ($pct === null) {
            return 'Not Assessed Yet';
        }
        if ($pct >= 95) {
            return 'Excellent';
        }
        if ($pct >= 85) {
            return 'Very Good';
        }
        if ($pct >= 70) {
            return 'Good';
        }
        if ($pct >= 50) {
            return 'Improving';
        }
        return 'Developing';
    }

    /**
     * Skill score = correct step attempts / total step attempts, over every action this student
     * has ever logged against a skill-mapped step (across all their attempts, any experiment).
     * Repeated wrong attempts before eventually succeeding lower the score naturally - no separate
     * "retries" penalty is needed on top of this. Always returns every catalog skill, even ones
     * with zero evidence (score_percent null, label "Not Assessed Yet") so a caller never has to
     * guess whether a missing skill means "not assessed" or "the query didn't run".
     */
    /**
     * Skill evidence comes from two independent sources, unioned here rather than merged into one
     * SQL query: apparatus/step actions (virtual_lab_action_log, unchanged - this is the only source
     * for every pre-existing skill), and graph-related evidence, which questions never contributed
     * to before this. Recording a Results Table row is inherently "correct" (there's no wrong way to
     * add one, it only exists because a real reading was taken); a graph-analysis answer is only
     * evidence once a teacher has actually graded it (marks_awarded IS NOT NULL) - an ungraded answer
     * isn't assumed correct, matching "do not automatically award full marks" from question grading.
     * A single answer counts toward both its specific skill and the broader 'experimental_analysis'
     * umbrella.
     *
     * @return array<int, array{skill_key: string, experiment_title: string, is_correct: int, created_at: string}>
     */
    private function fetchEvidenceRows(int $studentId, ?string $skillKeyFilter = null): array
    {
        $db = $this->getDb();
        $rows = [];

        $stepSql = 'SELECT vss.skill_key, e.title AS experiment_title, l.is_correct, l.created_at
             FROM virtual_lab_action_log l
             INNER JOIN virtual_lab_attempts att ON l.attempt_id = att.id
             INNER JOIN virtual_lab_step_skills vss ON vss.step_id = l.step_id
             INNER JOIN virtual_lab_assignments a ON att.assignment_id = a.id
             INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
             WHERE att.student_id = :student_id' . ($skillKeyFilter !== null ? ' AND vss.skill_key = :skill_key' : '');
        $stepParams = ['student_id' => $studentId];
        if ($skillKeyFilter !== null) {
            $stepParams['skill_key'] = $skillKeyFilter;
        }
        $stmt = $db->prepare($stepSql);
        $stmt->execute($stepParams);
        foreach ($stmt->fetchAll() as $r) {
            $rows[] = $r;
        }

        if ($skillKeyFilter === null || $skillKeyFilter === 'plotting_graphs') {
            $stmt = $db->prepare(
                "SELECT e.title AS experiment_title, n.created_at
                 FROM virtual_lab_notebook_entries n
                 INNER JOIN virtual_lab_attempts att ON n.attempt_id = att.id
                 INNER JOIN virtual_lab_assignments a ON att.assignment_id = a.id
                 INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
                 WHERE att.student_id = :student_id AND n.entry_type = 'result_row'"
            );
            $stmt->execute(['student_id' => $studentId]);
            foreach ($stmt->fetchAll() as $r) {
                $rows[] = ['skill_key' => 'plotting_graphs', 'experiment_title' => $r['experiment_title'], 'is_correct' => 1, 'created_at' => $r['created_at']];
            }
        }

        $graphSkills = ['calculating_gradient', 'interpreting_graphs', 'experimental_analysis'];
        if ($skillKeyFilter === null || in_array($skillKeyFilter, $graphSkills, true)) {
            $stmt = $db->prepare(
                "SELECT e.title AS experiment_title, q.question_type, q.marks AS question_marks, va.marks_awarded, va.updated_at AS created_at
                 FROM virtual_lab_answers va
                 INNER JOIN virtual_lab_questions q ON va.question_id = q.id
                 INNER JOIN virtual_lab_attempts att ON va.attempt_id = att.id
                 INNER JOIN virtual_lab_assignments a ON att.assignment_id = a.id
                 INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
                 WHERE att.student_id = :student_id AND q.linked_to_graph = 1 AND va.marks_awarded IS NOT NULL"
            );
            $stmt->execute(['student_id' => $studentId]);
            foreach ($stmt->fetchAll() as $r) {
                $isCorrect = (float) $r['question_marks'] > 0 && (float) $r['marks_awarded'] >= (float) $r['question_marks'] * 0.5 ? 1 : 0;
                $specific = $r['question_type'] === 'calculation' ? 'calculating_gradient' : 'interpreting_graphs';
                foreach ([$specific, 'experimental_analysis'] as $key) {
                    if ($skillKeyFilter !== null && $skillKeyFilter !== $key) {
                        continue;
                    }
                    $rows[] = ['skill_key' => $key, 'experiment_title' => $r['experiment_title'], 'is_correct' => $isCorrect, 'created_at' => $r['created_at']];
                }
            }
        }

        return $rows;
    }

    public function skillScoresForStudent(int $studentId): array
    {
        $tally = [];
        foreach ($this->fetchEvidenceRows($studentId) as $r) {
            $key = $r['skill_key'];
            if (!isset($tally[$key])) {
                $tally[$key] = ['correct' => 0, 'total' => 0];
            }
            $tally[$key]['total']++;
            if ($r['is_correct']) {
                $tally[$key]['correct']++;
            }
        }

        $result = [];
        foreach (self::SKILLS as $key => $name) {
            $t = $tally[$key] ?? ['correct' => 0, 'total' => 0];
            $pct = $t['total'] > 0 ? round(($t['correct'] / $t['total']) * 100, 1) : null;
            $result[] = [
                'skill_key' => $key,
                'skill_name' => $name,
                'correct_steps' => $t['correct'],
                'total_steps' => $t['total'],
                'score_percent' => $pct,
                'label' => $this->scoreLabel($pct),
                'improvement_message' => $t['total'] > 0 ? $this->improvementMessage($key) : null,
            ];
        }
        usort($result, fn($a, $b) => strcmp($a['skill_name'], $b['skill_name']));
        return $result;
    }

    /**
     * The evidence behind one student's one skill score, grouped by experiment (not a raw
     * per-action dump with confusing database IDs) - what lets a learner or teacher see exactly
     * which practicals produced the percentage, e.g. "Ohm's Law - 7/10".
     */
    public function skillEvidenceSummaryForStudent(int $studentId, string $skillKey): array
    {
        $rows = $this->fetchEvidenceRows($studentId, $skillKey);
        usort($rows, fn($a, $b) => strcmp($a['created_at'], $b['created_at']));

        $byExperiment = [];
        $latest = null;
        foreach ($rows as $r) {
            $title = $r['experiment_title'];
            if (!isset($byExperiment[$title])) {
                $byExperiment[$title] = ['experiment_title' => $title, 'correct' => 0, 'total' => 0, 'latest_activity' => null];
            }
            $byExperiment[$title]['total']++;
            if ($r['is_correct']) {
                $byExperiment[$title]['correct']++;
            }
            $byExperiment[$title]['latest_activity'] = $r['created_at'];
            $latest = $r['created_at'];
        }

        return [
            'skill_key' => $skillKey,
            'skill_name' => self::SKILLS[$skillKey] ?? $skillKey,
            'experiments' => array_values($byExperiment),
            'latest_activity' => $latest,
        ];
    }

    /**
     * Templates a student (or teacher, when recommending practice) could use to work on a given
     * skill - reuses each template's own `practical_skills` tag list rather than inventing a
     * second mapping. Never assigns anything automatically, just surfaces candidates.
     */
    public function recommendedTemplatesForSkill(string $skillKey): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT id, title, category, difficulty FROM virtual_lab_experiments
             WHERE is_template = 1 AND is_deprecated = 0 AND status = 'published' AND deleted_at IS NULL
               AND JSON_CONTAINS(practical_skills, :skill_json)
             ORDER BY difficulty, title"
        );
        $stmt->execute(['skill_json' => json_encode($skillKey)]);
        return $stmt->fetchAll();
    }

    /**
     * Only counts a skill as "strongest"/"weakest" once it has enough evidence to be meaningful -
     * a skill assessed only once or twice shouldn't dominate the headline summary.
     */
    private const MIN_EVIDENCE_FOR_SUMMARY = 3;

    public function skillsOverviewForStudent(int $studentId): array
    {
        $skills = $this->skillScoresForStudent($studentId);
        $evidenced = array_values(array_filter($skills, fn($s) => $s['total_steps'] >= self::MIN_EVIDENCE_FOR_SUMMARY));

        $strongest = null;
        $weakest = null;
        foreach ($evidenced as $s) {
            if ($strongest === null || $s['score_percent'] > $strongest['score_percent']) {
                $strongest = $s;
            }
            if ($weakest === null || $s['score_percent'] < $weakest['score_percent']) {
                $weakest = $s;
            }
        }

        $withEvidence = array_filter($skills, fn($s) => $s['total_steps'] > 0);
        $overallAverage = count($withEvidence) > 0
            ? round(array_sum(array_column($withEvidence, 'score_percent')) / count($withEvidence), 1)
            : null;

        return [
            'strongest_skill' => $strongest,
            'weakest_skill' => $weakest,
            'overall_skill_average' => $overallAverage,
            'skills_with_evidence' => count($withEvidence),
            'skills_total' => count($skills),
        ];
    }
}
