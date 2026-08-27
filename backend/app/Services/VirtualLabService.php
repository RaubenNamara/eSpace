<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Virtual Lab Service
 *
 * Reuses existing data rather than duplicating it: subjects/classes/teachers/students/terms all
 * come from their existing tables (see database/migrations/043_create_virtual_lab_system.sql),
 * and class/subject authorization reuses PerformanceReportService's already-established checks
 * (which themselves learned, earlier in this project, that class_subjects is empty in practice and
 * students.class_id can disagree with student_department_enrollments - so both are checked via
 * assignments/enrollments rather than trusting the single denormalized column).
 *
 * An experiment is a reusable definition (steps + questions + a 3D scene layout); publishing it to
 * a class/term creates a virtual_lab_assignment; a student then gets one virtual_lab_attempt that
 * tracks their live progress through the steps, action by action, until they submit; a teacher
 * grades the attempt, which snapshots a virtual_lab_results row - the stable surface
 * ReportCardService and RewardService read from, so neither has to know about in-progress state.
 */
class VirtualLabService
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    // ---------------------------------------------------------------------
    // Object catalog (Admin: Manage available 3D laboratory objects)
    // ---------------------------------------------------------------------

    public function listObjects(bool $activeOnly = false): array
    {
        $sql = 'SELECT * FROM virtual_lab_objects';
        if ($activeOnly) {
            $sql .= ' WHERE is_active = 1';
        }
        $sql .= ' ORDER BY category ASC, display_name ASC';
        $rows = $this->getDb()->query($sql)->fetchAll();
        return array_map([$this, 'normalizeObject'], $rows);
    }

    private function normalizeObject(array $row): array
    {
        return [
            'id' => (int) $row['id'],
            'object_type' => $row['object_type'],
            'display_name' => $row['display_name'],
            'category' => $row['category'],
            'description' => $row['description'],
            'default_props' => $row['default_props'] ? json_decode($row['default_props'], true) : [],
            'supported_actions' => $row['supported_actions'] ? json_decode($row['supported_actions'], true) : [],
            'icon' => $row['icon'],
            'is_active' => (bool) $row['is_active'],
        ];
    }

    public function createObject(array $data): int
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO virtual_lab_objects (object_type, display_name, category, description, default_props, supported_actions, icon, is_active, created_at, updated_at)
             VALUES (:object_type, :display_name, :category, :description, :default_props, :supported_actions, :icon, :is_active, NOW(), NOW())'
        );
        $stmt->execute([
            'object_type' => $data['object_type'],
            'display_name' => $data['display_name'],
            'category' => $data['category'] ?? 'general',
            'description' => $data['description'] ?? null,
            'default_props' => json_encode($data['default_props'] ?? []),
            'supported_actions' => json_encode($data['supported_actions'] ?? []),
            'icon' => $data['icon'] ?? null,
            'is_active' => !empty($data['is_active']) ? 1 : 0,
        ]);
        return (int) \eSpace\Config\Database::lastInsertId();
    }

    public function updateObject(int $id, array $data): bool
    {
        $allowed = ['display_name', 'category', 'description', 'icon', 'is_active'];
        $set = [];
        $params = ['id' => $id];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $data)) {
                $set[] = "{$field} = :{$field}";
                $params[$field] = $field === 'is_active' ? (!empty($data[$field]) ? 1 : 0) : $data[$field];
            }
        }
        if (array_key_exists('default_props', $data)) {
            $set[] = 'default_props = :default_props';
            $params['default_props'] = json_encode($data['default_props']);
        }
        if (array_key_exists('supported_actions', $data)) {
            $set[] = 'supported_actions = :supported_actions';
            $params['supported_actions'] = json_encode($data['supported_actions']);
        }
        if (empty($set)) {
            return false;
        }
        $set[] = 'updated_at = NOW()';
        $stmt = $this->getDb()->prepare('UPDATE virtual_lab_objects SET ' . implode(', ', $set) . ' WHERE id = :id');
        return $stmt->execute($params);
    }

    // ---------------------------------------------------------------------
    // Experiment authoring (Teacher; Admin can also edit/moderate)
    // ---------------------------------------------------------------------

    public function listExperiments(array $filters = []): array
    {
        $where = ['e.deleted_at IS NULL'];
        $params = [];

        if (!empty($filters['created_by'])) {
            $where[] = 'e.created_by = :created_by';
            $params['created_by'] = (int) $filters['created_by'];
        }
        if (!empty($filters['subject_id'])) {
            $where[] = 'e.subject_id = :subject_id';
            $params['subject_id'] = (int) $filters['subject_id'];
        }
        if (!empty($filters['category'])) {
            $where[] = 'e.category = :category';
            $params['category'] = $filters['category'];
        }
        if (!empty($filters['status'])) {
            $where[] = 'e.status = :status';
            $params['status'] = $filters['status'];
        }
        if (array_key_exists('is_template', $filters)) {
            $where[] = 'e.is_template = :is_template';
            $params['is_template'] = $filters['is_template'] ? 1 : 0;
        }
        if (!empty($filters['search'])) {
            $where[] = '(e.title LIKE :search1 OR e.topic LIKE :search2)';
            $term = '%' . $filters['search'] . '%';
            $params['search1'] = $term;
            $params['search2'] = $term;
        }

        $sql = "SELECT e.*, s.name AS subject_name,
                    CONCAT(t.first_name, ' ', t.last_name) AS creator_name,
                    (SELECT COUNT(*) FROM virtual_lab_assignments a WHERE a.experiment_id = e.id AND a.deleted_at IS NULL) AS assignment_count,
                    (SELECT COUNT(*) FROM virtual_lab_attempts att
                        INNER JOIN virtual_lab_assignments a2 ON att.assignment_id = a2.id
                        WHERE a2.experiment_id = e.id) AS attempt_count
                FROM virtual_lab_experiments e
                LEFT JOIN subjects s ON e.subject_id = s.id
                LEFT JOIN teachers t ON e.created_by = t.id
                WHERE " . implode(' AND ', $where) . '
                ORDER BY e.created_at DESC';
        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);

        return array_map(function ($row) {
            return [
                'id' => (int) $row['id'],
                'title' => $row['title'],
                'subject_id' => $row['subject_id'] !== null ? (int) $row['subject_id'] : null,
                'subject_name' => $row['subject_name'],
                'topic' => $row['topic'],
                'category' => $row['category'],
                'difficulty' => $row['difficulty'],
                'render_mode' => $row['render_mode'],
                'render_component' => $row['render_component'],
                'template_key' => $row['template_key'],
                'template_version' => $row['template_version'] !== null ? (int) $row['template_version'] : null,
                'is_deprecated' => (bool) $row['is_deprecated'],
                'estimated_duration_minutes' => $row['estimated_duration_minutes'] !== null ? (int) $row['estimated_duration_minutes'] : null,
                'practical_skills' => $row['practical_skills'] ? json_decode($row['practical_skills'], true) : [],
                'created_by' => $row['created_by'] !== null ? (int) $row['created_by'] : null,
                'creator_name' => $row['creator_name'],
                'marks' => (float) $row['marks'],
                'is_template' => (bool) $row['is_template'],
                'status' => $row['status'],
                'assignment_count' => (int) $row['assignment_count'],
                'attempt_count' => (int) $row['attempt_count'],
                'created_at' => $row['created_at'],
            ];
        }, $stmt->fetchAll());
    }

    public function getExperimentDetail(int $id): ?array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT e.*, s.name AS subject_name FROM virtual_lab_experiments e
             LEFT JOIN subjects s ON e.subject_id = s.id
             WHERE e.id = :id AND e.deleted_at IS NULL"
        );
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }

        $steps = $this->getDb()->prepare('SELECT * FROM virtual_lab_steps WHERE experiment_id = :id ORDER BY step_number ASC');
        $steps->execute(['id' => $id]);

        $questions = $this->getDb()->prepare('SELECT * FROM virtual_lab_questions WHERE experiment_id = :id ORDER BY question_number ASC');
        $questions->execute(['id' => $id]);

        $graphStmt = $this->getDb()->prepare('SELECT * FROM virtual_lab_graph_configs WHERE experiment_id = :id');
        $graphStmt->execute(['id' => $id]);
        $graphRow = $graphStmt->fetch();

        return [
            'id' => (int) $row['id'],
            'title' => $row['title'],
            'subject_id' => $row['subject_id'] !== null ? (int) $row['subject_id'] : null,
            'subject_name' => $row['subject_name'],
            'topic' => $row['topic'],
            'category' => $row['category'],
            'difficulty' => $row['difficulty'],
            'render_mode' => $row['render_mode'],
            'render_component' => $row['render_component'],
            'template_key' => $row['template_key'],
            'template_version' => $row['template_version'] !== null ? (int) $row['template_version'] : null,
            'engine_version' => $row['engine_version'],
            'is_deprecated' => (bool) $row['is_deprecated'],
            'estimated_duration_minutes' => $row['estimated_duration_minutes'] !== null ? (int) $row['estimated_duration_minutes'] : null,
            'competency' => $row['competency'],
            'learning_outcomes' => $row['learning_outcomes'],
            'prerequisite_knowledge' => $row['prerequisite_knowledge'],
            'practical_skills' => $row['practical_skills'] ? json_decode($row['practical_skills'], true) : [],
            'created_by' => $row['created_by'] !== null ? (int) $row['created_by'] : null,
            'objective' => $row['objective'],
            'introduction' => $row['introduction'],
            'apparatus' => $row['apparatus'],
            'materials' => $row['materials'],
            'safety_precautions' => $row['safety_precautions'],
            'scene_objects' => json_decode($row['scene_objects'], true) ?: [],
            'conclusion_prompt' => $row['conclusion_prompt'],
            'marks' => (float) $row['marks'],
            'is_template' => (bool) $row['is_template'],
            'status' => $row['status'],
            'steps' => array_map(fn($s) => [
                'id' => (int) $s['id'],
                'step_number' => (int) $s['step_number'],
                'instruction' => $s['instruction'],
                'target_object_key' => $s['target_object_key'],
                'required_action' => $s['required_action'],
                'expected_value' => $s['expected_value'],
                'tolerance' => $s['tolerance'] !== null ? (float) $s['tolerance'] : null,
                'hint' => $s['hint'],
                'feedback_correct' => $s['feedback_correct'],
                'feedback_incorrect' => $s['feedback_incorrect'],
                'is_safety_check' => (bool) $s['is_safety_check'],
            ], $steps->fetchAll()),
            'questions' => array_map(fn($q) => [
                'id' => (int) $q['id'],
                'question_number' => (int) $q['question_number'],
                'question_text' => $q['question_text'],
                'question_type' => $q['question_type'],
                'stage' => $q['stage'],
                'stage_step_number' => $q['stage_step_number'] !== null ? (int) $q['stage_step_number'] : null,
                'requirement' => $q['requirement'],
                'linked_to_graph' => (bool) $q['linked_to_graph'],
                'marks' => (float) $q['marks'],
            ], $questions->fetchAll()),
            'graph' => $graphRow ? [
                'enabled' => (bool) $graphRow['enabled'],
                'title' => $graphRow['title'],
                'x_column' => $graphRow['x_column'],
                'y_column' => $graphRow['y_column'],
                'x_label' => $graphRow['x_label'],
                'y_label' => $graphRow['y_label'],
                'graph_type' => $graphRow['graph_type'],
                'allow_axis_change' => (bool) $graphRow['allow_axis_change'],
                'min_points' => (int) $graphRow['min_points'],
                'show_best_fit' => (bool) $graphRow['show_best_fit'],
            ] : null,
        ];
    }

    /**
     * The duplicate-prevention safeguard: before seeding/inserting an official template, look it
     * up by its stable key first. A hit means "this template already exists" - the caller should
     * update it (bumping template_version) instead of inserting a second copy. Only ever matches
     * is_template=1 rows; teacher drafts never have a template_key.
     */
    public function findTemplateByKey(string $templateKey): ?array
    {
        $stmt = $this->getDb()->prepare('SELECT id FROM virtual_lab_experiments WHERE template_key = :key AND is_template = 1 AND deleted_at IS NULL');
        $stmt->execute(['key' => $templateKey]);
        $row = $stmt->fetch();
        return $row ? $this->getExperimentDetail((int) $row['id']) : null;
    }

    public function createExperiment(array $data, ?int $teacherId): int
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            'INSERT INTO virtual_lab_experiments
                (title, subject_id, topic, category, difficulty, render_mode, render_component, template_key, template_version, engine_version, is_deprecated, estimated_duration_minutes, competency, learning_outcomes, prerequisite_knowledge, practical_skills, created_by, objective, introduction, apparatus, materials, safety_precautions, scene_objects, conclusion_prompt, marks, is_template, status, created_at, updated_at)
             VALUES
                (:title, :subject_id, :topic, :category, :difficulty, :render_mode, :render_component, :template_key, :template_version, :engine_version, :is_deprecated, :estimated_duration_minutes, :competency, :learning_outcomes, :prerequisite_knowledge, :practical_skills, :created_by, :objective, :introduction, :apparatus, :materials, :safety_precautions, :scene_objects, :conclusion_prompt, :marks, :is_template, :status, NOW(), NOW())'
        );
        $stmt->execute([
            'title' => $data['title'],
            'subject_id' => $data['subject_id'] ?? null,
            'topic' => $data['topic'] ?? null,
            'category' => $data['category'],
            'difficulty' => $data['difficulty'] ?? 'intermediate',
            'render_mode' => $data['render_mode'] ?? '3d',
            'render_component' => $data['render_component'] ?? null,
            'template_key' => $data['template_key'] ?? null,
            'template_version' => $data['template_version'] ?? ($data['template_key'] ?? null ? 1 : null),
            'engine_version' => $data['engine_version'] ?? null,
            'is_deprecated' => !empty($data['is_deprecated']) ? 1 : 0,
            'estimated_duration_minutes' => $data['estimated_duration_minutes'] ?? null,
            'competency' => $data['competency'] ?? null,
            'learning_outcomes' => $data['learning_outcomes'] ?? null,
            'prerequisite_knowledge' => $data['prerequisite_knowledge'] ?? null,
            'practical_skills' => isset($data['practical_skills']) ? json_encode($data['practical_skills']) : null,
            'created_by' => $teacherId,
            'objective' => $data['objective'] ?? null,
            'introduction' => $data['introduction'] ?? null,
            'apparatus' => $data['apparatus'] ?? null,
            'materials' => $data['materials'] ?? null,
            'safety_precautions' => $data['safety_precautions'] ?? null,
            'scene_objects' => json_encode($data['scene_objects'] ?? []),
            'conclusion_prompt' => $data['conclusion_prompt'] ?? null,
            'marks' => $data['marks'] ?? 20,
            'is_template' => !empty($data['is_template']) ? 1 : 0,
            'status' => $data['status'] ?? 'draft',
        ]);
        $experimentId = (int) \eSpace\Config\Database::lastInsertId();

        $this->replaceSteps($experimentId, $data['steps'] ?? []);
        $this->replaceQuestions($experimentId, $data['questions'] ?? []);
        if (array_key_exists('graph', $data)) {
            $this->upsertGraphConfig($experimentId, $data['graph']);
        }

        return $experimentId;
    }

    public function updateExperiment(int $id, array $data): bool
    {
        $allowed = ['title', 'subject_id', 'topic', 'category', 'difficulty', 'render_mode', 'render_component', 'template_key', 'template_version', 'engine_version', 'is_deprecated', 'estimated_duration_minutes', 'competency', 'learning_outcomes', 'prerequisite_knowledge', 'objective', 'introduction', 'apparatus', 'materials', 'safety_precautions', 'conclusion_prompt', 'marks', 'status'];
        $set = [];
        $params = ['id' => $id];
        foreach ($allowed as $field) {
            if (array_key_exists($field, $data)) {
                $set[] = "{$field} = :{$field}";
                $params[$field] = $field === 'is_deprecated' ? (!empty($data[$field]) ? 1 : 0) : $data[$field];
            }
        }
        if (array_key_exists('scene_objects', $data)) {
            $set[] = 'scene_objects = :scene_objects';
            $params['scene_objects'] = json_encode($data['scene_objects']);
        }
        if (array_key_exists('practical_skills', $data)) {
            $set[] = 'practical_skills = :practical_skills';
            $params['practical_skills'] = json_encode($data['practical_skills']);
        }
        if (!empty($set)) {
            $set[] = 'updated_at = NOW()';
            $stmt = $this->getDb()->prepare('UPDATE virtual_lab_experiments SET ' . implode(', ', $set) . ' WHERE id = :id');
            $stmt->execute($params);
        }

        if (array_key_exists('steps', $data)) {
            $this->replaceSteps($id, $data['steps']);
        }
        if (array_key_exists('questions', $data)) {
            $this->replaceQuestions($id, $data['questions']);
        }
        if (array_key_exists('graph', $data)) {
            $this->upsertGraphConfig($id, $data['graph']);
        }

        return true;
    }

    public function deleteExperiment(int $id): bool
    {
        $stmt = $this->getDb()->prepare('UPDATE virtual_lab_experiments SET deleted_at = NOW() WHERE id = :id');
        return $stmt->execute(['id' => $id]);
    }

    public function setExperimentStatus(int $id, string $status): bool
    {
        $stmt = $this->getDb()->prepare('UPDATE virtual_lab_experiments SET status = :status, updated_at = NOW() WHERE id = :id');
        return $stmt->execute(['id' => $id, 'status' => $status]);
    }

    /**
     * Copies a template's full definition (scene, steps, questions) into a new experiment owned
     * by this teacher, so they can start from a working example rather than a blank scene.
     */
    public function createExperimentFromTemplate(int $templateId, int $teacherId, array $overrides = []): ?int
    {
        $template = $this->getExperimentDetail($templateId);
        if (!$template) {
            return null;
        }

        // template_key is a stable identity for the OFFICIAL template only (unique-constrained) -
        // a teacher's copy must never carry it, or copying the same template twice would collide.
        $data = array_merge($template, $overrides, [
            'is_template' => false, 'status' => 'draft',
            'template_key' => null, 'template_version' => null, 'engine_version' => $template['engine_version'] ?? null,
        ]);
        return $this->createExperiment($data, $teacherId);
    }

    private function replaceSteps(int $experimentId, array $steps): void
    {
        $db = $this->getDb();
        $db->prepare('DELETE FROM virtual_lab_steps WHERE experiment_id = :id')->execute(['id' => $experimentId]);
        if (empty($steps)) {
            return;
        }
        $stmt = $db->prepare(
            'INSERT INTO virtual_lab_steps (experiment_id, step_number, instruction, target_object_key, required_action, expected_value, tolerance, hint, feedback_correct, feedback_incorrect, is_safety_check, created_at, updated_at)
             VALUES (:experiment_id, :step_number, :instruction, :target_object_key, :required_action, :expected_value, :tolerance, :hint, :feedback_correct, :feedback_incorrect, :is_safety_check, NOW(), NOW())'
        );
        foreach (array_values($steps) as $i => $step) {
            $stmt->execute([
                'experiment_id' => $experimentId,
                'step_number' => $i + 1,
                'instruction' => $step['instruction'],
                'target_object_key' => $step['target_object_key'] ?? null,
                'required_action' => $step['required_action'],
                'expected_value' => $step['expected_value'] ?? null,
                'tolerance' => ($step['tolerance'] ?? '') !== '' ? $step['tolerance'] : null,
                'hint' => $step['hint'] ?? null,
                'feedback_correct' => $step['feedback_correct'] ?? null,
                'feedback_incorrect' => $step['feedback_incorrect'] ?? null,
                'is_safety_check' => !empty($step['is_safety_check']) ? 1 : 0,
            ]);
        }

        // Keeps virtual_lab_step_skills current with whatever step list was just saved - the
        // same inference a teacher's own edits benefit from, not just the seeded templates.
        (new PracticalSkillService())->syncStepSkills($experimentId);
    }

    private function replaceQuestions(int $experimentId, array $questions): void
    {
        $db = $this->getDb();
        $db->prepare('DELETE FROM virtual_lab_questions WHERE experiment_id = :id')->execute(['id' => $experimentId]);
        if (empty($questions)) {
            return;
        }
        $stmt = $db->prepare(
            'INSERT INTO virtual_lab_questions (experiment_id, question_number, question_text, question_type, stage, stage_step_number, requirement, linked_to_graph, expected_answer, marks, created_at, updated_at)
             VALUES (:experiment_id, :question_number, :question_text, :question_type, :stage, :stage_step_number, :requirement, :linked_to_graph, :expected_answer, :marks, NOW(), NOW())'
        );
        foreach (array_values($questions) as $i => $q) {
            $stmt->execute([
                'experiment_id' => $experimentId,
                'question_number' => $i + 1,
                'question_text' => $q['question_text'],
                'question_type' => $q['question_type'] ?? 'short_answer',
                'stage' => $q['stage'] ?? 'after_experiment',
                'stage_step_number' => ($q['stage_step_number'] ?? '') !== '' ? $q['stage_step_number'] : null,
                'requirement' => $q['requirement'] ?? 'notebook_only',
                'linked_to_graph' => !empty($q['linked_to_graph']) ? 1 : 0,
                'expected_answer' => $q['expected_answer'] ?? null,
                'marks' => $q['marks'] ?? 1,
            ]);
        }
    }

    /**
     * One graph config row per experiment (insert-or-update-on-duplicate-key, since experiment_id is
     * unique-constrained on virtual_lab_graph_configs). Passing null clears/disables the config
     * rather than deleting the row outright, so re-enabling later doesn't lose previously entered
     * labels.
     */
    private function upsertGraphConfig(int $experimentId, ?array $graph): void
    {
        if ($graph === null) {
            $this->getDb()->prepare('UPDATE virtual_lab_graph_configs SET enabled = 0 WHERE experiment_id = :id')
                ->execute(['id' => $experimentId]);
            return;
        }
        $stmt = $this->getDb()->prepare(
            'INSERT INTO virtual_lab_graph_configs (experiment_id, enabled, title, x_column, y_column, x_label, y_label, graph_type, allow_axis_change, min_points, show_best_fit, created_at, updated_at)
             VALUES (:experiment_id, :enabled, :title, :x_column, :y_column, :x_label, :y_label, :graph_type, :allow_axis_change, :min_points, :show_best_fit, NOW(), NOW())
             ON DUPLICATE KEY UPDATE
                enabled = VALUES(enabled), title = VALUES(title), x_column = VALUES(x_column), y_column = VALUES(y_column),
                x_label = VALUES(x_label), y_label = VALUES(y_label), graph_type = VALUES(graph_type),
                allow_axis_change = VALUES(allow_axis_change), min_points = VALUES(min_points), show_best_fit = VALUES(show_best_fit),
                updated_at = NOW()'
        );
        $stmt->execute([
            'experiment_id' => $experimentId,
            'enabled' => !empty($graph['enabled']) ? 1 : 0,
            'title' => $graph['title'] ?? null,
            'x_column' => $graph['x_column'] ?? null,
            'y_column' => $graph['y_column'] ?? null,
            'x_label' => $graph['x_label'] ?? null,
            'y_label' => $graph['y_label'] ?? null,
            'graph_type' => $graph['graph_type'] ?? 'scatter',
            'allow_axis_change' => !empty($graph['allow_axis_change']) ? 1 : 0,
            'min_points' => $graph['min_points'] ?? 2,
            'show_best_fit' => !empty($graph['show_best_fit']) ? 1 : 0,
        ]);
    }

    // ---------------------------------------------------------------------
    // Publishing (Teacher: publish an experiment to a class/term)
    // ---------------------------------------------------------------------

    /**
     * Deliberately more permissive than PerformanceReportService's class_subjects/assignments
     * entitlement check (which exists to gate grading of marks that already exist). Publishing a
     * brand-new Virtual Lab experiment has no prior assignment to check against, and the class
     * picker in the publish form is already scoped to the teacher's own department
     * (Teacher\ClassController::index()) - so the authorization here just mirrors that same
     * scope, rather than rejecting a class the teacher can see and select in this exact form.
     */
    public function teacherCanAccessClassSubject(int $teacherId, int $classId, ?int $subjectId): bool
    {
        $stmt = $this->getDb()->prepare(
            'SELECT 1 FROM teachers t
             INNER JOIN student_department_enrollments sde ON sde.department_id = t.department_id AND sde.class_id = :class_id AND sde.deleted_at IS NULL
             WHERE t.id = :teacher_id AND t.deleted_at IS NULL LIMIT 1'
        );
        $stmt->execute(['class_id' => $classId, 'teacher_id' => $teacherId]);
        return (bool) $stmt->fetch();
    }

    public function publishExperiment(int $experimentId, ?int $classId, ?string $classGroupName, int $teacherId, int $termId, ?string $dueDate, ?float $marksOverride): int
    {
        $experiment = $this->getExperimentDetail($experimentId);
        if (!$experiment) {
            throw new \RuntimeException('Experiment not found.');
        }

        $term = $this->getDb()->prepare('SELECT ay.name AS academic_year FROM terms t LEFT JOIN academic_years ay ON t.academic_year_id = ay.id WHERE t.id = :id');
        $term->execute(['id' => $termId]);
        $academicYear = $term->fetch()['academic_year'] ?? null;

        $params = [
            'experiment_id' => $experimentId,
            'class_id' => $classId,
            'class_group_name' => $classGroupName,
            'subject_id' => $experiment['subject_id'],
            'teacher_id' => $teacherId,
            'term_id' => $termId,
            'academic_year' => $academicYear,
            'due_date' => $dueDate,
            'marks' => $marksOverride ?? $experiment['marks'],
            'status' => 'active',
        ];

        if ($classId !== null) {
            // unique_lab_assignment (experiment_id, class_id, term_id) covers this case natively.
            $stmt = $this->getDb()->prepare(
                'INSERT INTO virtual_lab_assignments (experiment_id, class_id, class_group_name, subject_id, teacher_id, term_id, academic_year, due_date, marks, status, created_at, updated_at)
                 VALUES (:experiment_id, :class_id, :class_group_name, :subject_id, :teacher_id, :term_id, :academic_year, :due_date, :marks, :status, NOW(), NOW())
                 ON DUPLICATE KEY UPDATE due_date = VALUES(due_date), marks = VALUES(marks), status = VALUES(status), updated_at = NOW()'
            );
            $stmt->execute($params);

            if (\eSpace\Config\Database::lastInsertId() > 0) {
                return (int) \eSpace\Config\Database::lastInsertId();
            }

            $stmt = $this->getDb()->prepare('SELECT id FROM virtual_lab_assignments WHERE experiment_id = :e AND class_id = :c AND term_id = :t');
            $stmt->execute(['e' => $experimentId, 'c' => $classId, 't' => $termId]);
            return (int) $stmt->fetch()['id'];
        }

        // "All Streams": class_id is NULL, so the unique key can't de-duplicate re-publishing to
        // the same class level (InnoDB treats every NULL as distinct) - look up any existing row
        // for this (experiment, class_group_name, term) by hand and update it instead of blindly
        // inserting a second row.
        $stmt = $this->getDb()->prepare(
            'SELECT id FROM virtual_lab_assignments WHERE experiment_id = :e AND class_id IS NULL AND class_group_name = :g AND term_id = :t'
        );
        $stmt->execute(['e' => $experimentId, 'g' => $classGroupName, 't' => $termId]);
        $existing = $stmt->fetch();

        if ($existing) {
            $stmt = $this->getDb()->prepare(
                'UPDATE virtual_lab_assignments SET due_date = :due_date, marks = :marks, status = :status, updated_at = NOW() WHERE id = :id'
            );
            $stmt->execute(['due_date' => $dueDate, 'marks' => $params['marks'], 'status' => 'active', 'id' => $existing['id']]);
            return (int) $existing['id'];
        }

        $stmt = $this->getDb()->prepare(
            'INSERT INTO virtual_lab_assignments (experiment_id, class_id, class_group_name, subject_id, teacher_id, term_id, academic_year, due_date, marks, status, created_at, updated_at)
             VALUES (:experiment_id, NULL, :class_group_name, :subject_id, :teacher_id, :term_id, :academic_year, :due_date, :marks, :status, NOW(), NOW())'
        );
        $stmt->execute($params);
        return (int) \eSpace\Config\Database::lastInsertId();
    }

    public function listAssignmentsForTeacher(int $teacherId, array $filters = []): array
    {
        $where = ['a.teacher_id = :teacher_id', 'a.deleted_at IS NULL'];
        $params = ['teacher_id' => $teacherId];
        if (!empty($filters['term_id'])) {
            $where[] = 'a.term_id = :term_id';
            $params['term_id'] = (int) $filters['term_id'];
        }
        if (!empty($filters['class_id'])) {
            $where[] = 'a.class_id = :class_id';
            $params['class_id'] = (int) $filters['class_id'];
        }

        $sql = "SELECT a.*, e.title AS experiment_title, e.category, c.name AS class_name, c.stream_name,
                    (SELECT COUNT(*) FROM virtual_lab_attempts att WHERE att.assignment_id = a.id) AS attempt_count,
                    (SELECT COUNT(*) FROM virtual_lab_attempts att WHERE att.assignment_id = a.id AND att.status IN ('submitted','graded')) AS submitted_count,
                    (SELECT COUNT(*) FROM virtual_lab_attempts att WHERE att.assignment_id = a.id AND att.status = 'graded') AS graded_count
                FROM virtual_lab_assignments a
                INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
                LEFT JOIN classes c ON a.class_id = c.id
                WHERE " . implode(' AND ', $where) . '
                ORDER BY a.created_at DESC';
        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);

        return array_map(function ($row) {
            return [
                'id' => (int) $row['id'],
                'experiment_id' => (int) $row['experiment_id'],
                'experiment_title' => $row['experiment_title'],
                'category' => $row['category'],
                'class_id' => (int) $row['class_id'],
                'class_name' => $row['class_name'] . ($row['stream_name'] ? ' - ' . $row['stream_name'] : ''),
                'term_id' => (int) $row['term_id'],
                'due_date' => $row['due_date'],
                'marks' => (float) $row['marks'],
                'status' => $row['status'],
                'attempt_count' => (int) $row['attempt_count'],
                'submitted_count' => (int) $row['submitted_count'],
                'graded_count' => (int) $row['graded_count'],
            ];
        }, $stmt->fetchAll());
    }

    public function listAttemptsForAssignment(int $assignmentId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT att.*, s.first_name, s.last_name, s.admission_number
             FROM virtual_lab_attempts att
             INNER JOIN students s ON att.student_id = s.id
             WHERE att.assignment_id = :id
             ORDER BY att.status DESC, s.first_name ASC"
        );
        $stmt->execute(['id' => $assignmentId]);

        return array_map(function ($row) {
            return [
                'id' => (int) $row['id'],
                'student_id' => (int) $row['student_id'],
                'student_name' => trim($row['first_name'] . ' ' . $row['last_name']),
                'admission_number' => $row['admission_number'],
                'status' => $row['status'],
                'started_at' => $row['started_at'],
                'submitted_at' => $row['submitted_at'],
                'time_spent_seconds' => (int) $row['time_spent_seconds'],
                'steps_completed' => (int) $row['steps_completed'],
                'correct_actions' => (int) $row['correct_actions'],
                'wrong_actions' => (int) $row['wrong_actions'],
                'score' => $row['score'] !== null ? (float) $row['score'] : null,
            ];
        }, $stmt->fetchAll());
    }

    // ---------------------------------------------------------------------
    // Student attempt lifecycle
    // ---------------------------------------------------------------------

    public function listAssignmentsForStudent(int $studentId, ?int $termId = null): array
    {
        $where = ['a.deleted_at IS NULL', "a.status = 'active'"];
        $params = ['student_id' => $studentId, 'student_id2' => $studentId];
        if ($termId) {
            $where[] = 'a.term_id = :term_id';
            $params['term_id'] = $termId;
        }

        // A student can carry several enrollment rows in the same class (re-enrollment history) -
        // EXISTS just checks membership rather than joining, so it can never multiply a row per
        // matching enrollment the way an INNER JOIN would. Virtual Lab assignments have no
        // separate publish step - creating one *is* publishing it, so a.created_at stands in for
        // published_at here. Bounded both sides (unlike the resource-type visibility rule): an
        // assignment must have existed while this specific enrollment was active, so a promoted
        // student doesn't suddenly see an assignment a teacher created for the class before they
        // joined it - matches how the assignments module itself behaves.
        $where[] = "EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE (
                sde.class_id = a.class_id
                OR (a.class_group_name IS NOT NULL AND sde_c.name = a.class_group_name)
              )
              AND sde.student_id = :student_id AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND sde.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
              AND a.created_at BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
        )";
        $where[] = "NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te AND ste.teacher_id = a.teacher_id
              AND ste.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
              AND ste.status = 'withdrawn'
        )";
        $params['student_id_te'] = $studentId;

        $sql = "SELECT a.*, e.title AS experiment_title, e.category, e.topic, e.objective, e.difficulty, e.estimated_duration_minutes,
                    s.name AS subject_name,
                    att.id AS attempt_id, att.status AS attempt_status, att.score AS attempt_score
                FROM virtual_lab_assignments a
                INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
                LEFT JOIN subjects s ON e.subject_id = s.id
                LEFT JOIN virtual_lab_attempts att ON att.assignment_id = a.id AND att.student_id = :student_id2
                WHERE " . implode(' AND ', $where) . '
                ORDER BY a.due_date IS NULL, a.due_date ASC, a.created_at DESC';
        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);

        return array_map(function ($row) {
            return [
                'assignment_id' => (int) $row['id'],
                'experiment_id' => (int) $row['experiment_id'],
                'experiment_title' => $row['experiment_title'],
                'category' => $row['category'],
                'subject_name' => $row['subject_name'],
                'topic' => $row['topic'],
                'objective' => $row['objective'],
                'difficulty' => $row['difficulty'],
                'estimated_duration_minutes' => $row['estimated_duration_minutes'] !== null ? (int) $row['estimated_duration_minutes'] : null,
                'due_date' => $row['due_date'],
                'marks' => (float) $row['marks'],
                'attempt_id' => $row['attempt_id'] !== null ? (int) $row['attempt_id'] : null,
                'attempt_status' => $row['attempt_status'] ?? 'not_started',
                'attempt_score' => $row['attempt_score'] !== null ? (float) $row['attempt_score'] : null,
            ];
        }, $stmt->fetchAll());
    }

    /**
     * The full experiment detail behind one of a student's assignments - for the pre-simulation
     * preview. Authorized the same way starting an attempt is (studentCanAccessAssignment), not by
     * exposing the raw experiment id directly, so a student can't preview an experiment that
     * hasn't actually been published to their class.
     */
    public function getAssignmentExperimentDetail(int $studentId, int $assignmentId): ?array
    {
        if (!$this->studentCanAccessAssignment($studentId, $assignmentId)) {
            return null;
        }
        $stmt = $this->getDb()->prepare('SELECT experiment_id FROM virtual_lab_assignments WHERE id = :id');
        $stmt->execute(['id' => $assignmentId]);
        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }
        return $this->getExperimentDetail((int) $row['experiment_id']);
    }

    /**
     * Same shape as getAssignmentExperimentDetail(), for a teacher previewing their own
     * assignment ("preview as student") instead of a student accessing theirs - authorized by
     * ownership (the assignment's teacher_id) rather than class enrollment.
     */
    public function getAssignmentExperimentDetailForTeacher(int $teacherId, int $assignmentId): ?array
    {
        $stmt = $this->getDb()->prepare('SELECT experiment_id FROM virtual_lab_assignments WHERE id = :id AND teacher_id = :teacher_id');
        $stmt->execute(['id' => $assignmentId, 'teacher_id' => $teacherId]);
        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }
        return $this->getExperimentDetail((int) $row['experiment_id']);
    }

    public function studentCanAccessAssignment(int $studentId, int $assignmentId): bool
    {
        $stmt = $this->getDb()->prepare(
            "SELECT 1 FROM virtual_lab_assignments a
             INNER JOIN student_department_enrollments sde ON (
                    sde.class_id = a.class_id
                    OR (a.class_group_name IS NOT NULL AND EXISTS (SELECT 1 FROM classes sde_c WHERE sde_c.id = sde.class_id AND sde_c.name = a.class_group_name))
                 ) AND sde.student_id = :student_id AND sde.deleted_at IS NULL
                AND sde.status = 'active'
                AND sde.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
                AND a.created_at BETWEEN sde.start_date AND COALESCE(sde.end_date, NOW())
             WHERE a.id = :assignment_id AND a.deleted_at IS NULL
               AND NOT EXISTS (
                   SELECT 1 FROM student_teacher_enrollments ste
                   WHERE ste.student_id = :student_id_te AND ste.teacher_id = a.teacher_id
                     AND ste.department_id = (SELECT department_id FROM subjects WHERE id = a.subject_id)
                     AND ste.status = 'withdrawn'
               )
             LIMIT 1"
        );
        $stmt->execute(['student_id' => $studentId, 'assignment_id' => $assignmentId, 'student_id_te' => $studentId]);
        return (bool) $stmt->fetch();
    }

    public function startAttempt(int $assignmentId, int $studentId): array
    {
        $db = $this->getDb();
        $stmt = $db->prepare('SELECT * FROM virtual_lab_attempts WHERE assignment_id = :a AND student_id = :s');
        $stmt->execute(['a' => $assignmentId, 's' => $studentId]);
        $existing = $stmt->fetch();

        if (!$existing) {
            $insert = $db->prepare(
                "INSERT INTO virtual_lab_attempts (assignment_id, student_id, status, started_at, current_step, created_at, updated_at)
                 VALUES (:a, :s, 'in_progress', NOW(), 1, NOW(), NOW())"
            );
            $insert->execute(['a' => $assignmentId, 's' => $studentId]);
            $attemptId = (int) \eSpace\Config\Database::lastInsertId();
        } else {
            $attemptId = (int) $existing['id'];
        }

        return $this->getAttemptState($attemptId);
    }

    public function getAttemptState(int $attemptId): array
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT att.*, a.experiment_id, a.due_date, a.marks AS assignment_marks
             FROM virtual_lab_attempts att
             INNER JOIN virtual_lab_assignments a ON att.assignment_id = a.id
             WHERE att.id = :id"
        );
        $stmt->execute(['id' => $attemptId]);
        $attempt = $stmt->fetch();
        if (!$attempt) {
            throw new \RuntimeException('Attempt not found.');
        }

        $experiment = $this->getExperimentDetail((int) $attempt['experiment_id']);

        $obsStmt = $db->prepare('SELECT step_id, observation_text FROM virtual_lab_observations WHERE attempt_id = :id');
        $obsStmt->execute(['id' => $attemptId]);
        $observations = [];
        foreach ($obsStmt->fetchAll() as $row) {
            $observations[$row['step_id'] === null ? 'general' : (int) $row['step_id']] = $row['observation_text'];
        }

        $ansStmt = $db->prepare('SELECT question_id, answer_text FROM virtual_lab_answers WHERE attempt_id = :id');
        $ansStmt->execute(['id' => $attemptId]);
        $answers = [];
        foreach ($ansStmt->fetchAll() as $row) {
            $answers[(int) $row['question_id']] = $row['answer_text'];
        }

        return [
            'attempt_id' => (int) $attempt['id'],
            'assignment_id' => (int) $attempt['assignment_id'],
            'status' => $attempt['status'],
            'current_step' => (int) $attempt['current_step'],
            'steps_completed' => (int) $attempt['steps_completed'],
            'correct_actions' => (int) $attempt['correct_actions'],
            'wrong_actions' => (int) $attempt['wrong_actions'],
            'hints_used' => (int) $attempt['hints_used'],
            'safety_mistakes' => (int) $attempt['safety_mistakes'],
            'conclusion_text' => $attempt['conclusion_text'],
            'score' => $attempt['score'] !== null ? (float) $attempt['score'] : null,
            'teacher_feedback' => $attempt['teacher_feedback'],
            'due_date' => $attempt['due_date'],
            'marks' => (float) $attempt['assignment_marks'],
            'experiment' => $experiment,
            'observations' => $observations,
            'answers' => $answers,
            'notebook' => $this->listNotebookEntries($attemptId),
        ];
    }

    // ---------------------------------------------------------------------
    // Practical Notebook (structured measurements/calculations/results, distinct from the
    // free-text observations/conclusion the attempt already carries)
    // ---------------------------------------------------------------------

    public function listNotebookEntries(int $attemptId): array
    {
        $stmt = $this->getDb()->prepare('SELECT * FROM virtual_lab_notebook_entries WHERE attempt_id = :id ORDER BY created_at ASC');
        $stmt->execute(['id' => $attemptId]);
        return array_map(fn($r) => [
            'id' => (int) $r['id'],
            'entry_type' => $r['entry_type'],
            'label' => $r['label'],
            'value' => $r['value'],
            'unit' => $r['unit'],
            'extra' => $r['extra'] ? json_decode($r['extra'], true) : null,
            'created_at' => $r['created_at'],
        ], $stmt->fetchAll());
    }

    /**
     * Graph data (requirement: "must only come from locked simulation-derived Results Table
     * values") has to be closed off server-side, not just hidden by the frontend once an attempt
     * stops being in_progress - mirrors the same guard logAction()/submitAttempt() already enforce.
     */
    public function addNotebookEntry(int $attemptId, string $entryType, string $label, string $value, ?string $unit, ?array $extra): int
    {
        $status = $this->getDb()->prepare('SELECT status FROM virtual_lab_attempts WHERE id = :id');
        $status->execute(['id' => $attemptId]);
        $row = $status->fetch();
        if (!$row || $row['status'] !== 'in_progress') {
            throw new \RuntimeException('This attempt is not in progress.');
        }

        $stmt = $this->getDb()->prepare(
            'INSERT INTO virtual_lab_notebook_entries (attempt_id, entry_type, label, value, unit, extra, created_at)
             VALUES (:attempt_id, :entry_type, :label, :value, :unit, :extra, NOW())'
        );
        $stmt->execute([
            'attempt_id' => $attemptId,
            'entry_type' => $entryType,
            'label' => $label,
            'value' => $value,
            'unit' => $unit,
            'extra' => $extra !== null ? json_encode($extra) : null,
        ]);
        return (int) \eSpace\Config\Database::lastInsertId();
    }

    public function removeNotebookEntry(int $attemptId, int $entryId): bool
    {
        $stmt = $this->getDb()->prepare('DELETE FROM virtual_lab_notebook_entries WHERE id = :id AND attempt_id = :attempt_id');
        return $stmt->execute(['id' => $entryId, 'attempt_id' => $attemptId]) && $stmt->rowCount() > 0;
    }

    public function recordHintUsed(int $attemptId): void
    {
        $this->getDb()->prepare('UPDATE virtual_lab_attempts SET hints_used = hints_used + 1, updated_at = NOW() WHERE id = :id')
            ->execute(['id' => $attemptId]);
    }

    /**
     * A safety mistake the simulation itself catches (e.g. a short circuit) rather than a failed
     * step - reported directly by the frontend engine, separate from logAction()'s own step-based
     * safety tracking below, so both surface as the same counter regardless of source.
     */
    public function recordSafetyMistake(int $attemptId): void
    {
        $this->getDb()->prepare('UPDATE virtual_lab_attempts SET safety_mistakes = safety_mistakes + 1, updated_at = NOW() WHERE id = :id')
            ->execute(['id' => $attemptId]);
    }

    /**
     * A step with no expected_value accepts any value for that action (e.g. "take a reading" -
     * any measurement completes it). A step with a numeric expected_value AND a tolerance accepts
     * anything within +/- that range (e.g. "50ml, tolerance 2" accepts 48-52), matching real lab
     * grading where an exact figure is never realistic. Without a tolerance, or for non-numeric
     * expected values (an object key for connect/switch steps), falls back to an exact string
     * match - unchanged from before tolerance existed.
     */
    private function valueWithinExpectedRange(?string $expected, $tolerance, ?string $actual): bool
    {
        if ($expected === null) {
            return true;
        }
        if ($tolerance !== null && is_numeric($expected) && is_numeric($actual)) {
            return abs((float) $actual - (float) $expected) <= (float) $tolerance;
        }
        return trim($expected) === trim((string) $actual);
    }

    /**
     * A wire connection is scientifically undirected - "connect the battery to the switch" and
     * "connect the switch to the battery" describe the exact same physical wire, so a connect
     * step's (target_object_key, expected_value) pair should match a student's click in either
     * order, not just the order the step happens to be authored in. Scoped to the 'connect'
     * action only (see logAction()) - move/measure/switch_on/etc. keep their existing directional
     * semantics unchanged, and any future polarity-specific wiring (e.g. distinct positive/
     * negative terminals) must use a different action rather than this one, since that kind of
     * connection genuinely is direction-sensitive.
     */
    private function connectionMatches(?string $stepTarget, ?string $stepExpected, $tolerance, ?string $objectKey, ?string $value): bool
    {
        if ($stepTarget === null) {
            if ($stepExpected === null) {
                return true;
            }
            return $this->valueWithinExpectedRange($stepExpected, $tolerance, $value)
                || $this->valueWithinExpectedRange($stepExpected, $tolerance, $objectKey);
        }
        $forward = $stepTarget === $objectKey && $this->valueWithinExpectedRange($stepExpected, $tolerance, $value);
        $reverse = $stepTarget === $value && $this->valueWithinExpectedRange($stepExpected, $tolerance, $objectKey);
        return $forward || $reverse;
    }

    /**
     * Validates a student's action against the step the attempt is currently on. Matching action
     * type + target object (and expected value, when the step specifies one) advances the attempt
     * to the next step; anything else is logged as a wrong action so the teacher can later see
     * exactly where a student struggled, without blocking them from retrying immediately.
     */
    public function logAction(int $attemptId, ?int $stepId, ?string $objectKey, string $action, ?string $value): array
    {
        $db = $this->getDb();
        $stmt = $db->prepare('SELECT * FROM virtual_lab_attempts WHERE id = :id');
        $stmt->execute(['id' => $attemptId]);
        $attempt = $stmt->fetch();
        if (!$attempt || $attempt['status'] !== 'in_progress') {
            throw new \RuntimeException('This attempt is not in progress.');
        }

        $stepStmt = $db->prepare('SELECT * FROM virtual_lab_steps WHERE experiment_id = (SELECT experiment_id FROM virtual_lab_assignments WHERE id = :aid) AND step_number = :step');
        $stepStmt->execute(['aid' => $attempt['assignment_id'], 'step' => (int) $attempt['current_step']]);
        $currentStep = $stepStmt->fetch();

        $isCorrect = false;
        $feedback = null;
        $advanced = false;
        $neutral = false;

        // Inspect/zoom are free exploration, not an attempt at the current step - a student
        // should be able to look at any piece of apparatus at any time without it being logged
        // as a mistake or shown a "wrong step" warning, the way pressing a wrong button on the
        // actual required action (connect/pour/heat/...) should be.
        // Coarse/fine focus nudges are continuous exploratory adjustments (like inspect/zoom) -
        // a student fine-tuning focus while on an unrelated step shouldn't be flagged wrong.
        $isFreeLookAction = in_array($action, ['inspect', 'zoom', 'focus_coarse', 'focus_fine'], true);

        if ($currentStep) {
            $actionMatches = $currentStep['required_action'] === $action;

            if ($actionMatches && $action === 'connect') {
                // A wire is undirected - normalize order so "connect A to B" grades the same as
                // "connect B to A" (see connectionMatches()).
                $targetMatches = $this->connectionMatches($currentStep['target_object_key'], $currentStep['expected_value'], $currentStep['tolerance'] ?? null, $objectKey, $value);
                $valueMatches = $targetMatches;
            } else {
                $targetMatches = $currentStep['target_object_key'] === null || $currentStep['target_object_key'] === $objectKey;
                $valueMatches = $this->valueWithinExpectedRange($currentStep['expected_value'], $currentStep['tolerance'] ?? null, $value);
            }

            if ($actionMatches && $targetMatches && $valueMatches) {
                $isCorrect = true;
                $feedback = $currentStep['feedback_correct'];

                $totalSteps = (int) $db->query('SELECT COUNT(*) c FROM virtual_lab_steps WHERE experiment_id = (SELECT experiment_id FROM virtual_lab_assignments WHERE id = ' . (int) $attempt['assignment_id'] . ')')->fetch()['c'];
                $nextStep = min((int) $attempt['current_step'] + 1, $totalSteps);

                $db->prepare(
                    'UPDATE virtual_lab_attempts SET current_step = :next, steps_completed = steps_completed + 1, correct_actions = correct_actions + 1, updated_at = NOW() WHERE id = :id'
                )->execute(['next' => $nextStep, 'id' => $attemptId]);
                $advanced = true;
            } elseif ($isFreeLookAction) {
                $neutral = true;
            } else {
                $feedback = $currentStep['feedback_incorrect'];
                if (!empty($currentStep['is_safety_check'])) {
                    // Skipping past a safety instruction is itself a safety concern, tracked
                    // separately from an ordinary wrong click on a non-safety step.
                    $db->prepare('UPDATE virtual_lab_attempts SET wrong_actions = wrong_actions + 1, safety_mistakes = safety_mistakes + 1, updated_at = NOW() WHERE id = :id')->execute(['id' => $attemptId]);
                } else {
                    $db->prepare('UPDATE virtual_lab_attempts SET wrong_actions = wrong_actions + 1, updated_at = NOW() WHERE id = :id')->execute(['id' => $attemptId]);
                }
            }
        }

        $db->prepare(
            'INSERT INTO virtual_lab_action_log (attempt_id, step_id, object_key, action, value, is_correct, created_at)
             VALUES (:attempt_id, :step_id, :object_key, :action, :value, :is_correct, NOW())'
        )->execute([
            'attempt_id' => $attemptId,
            'step_id' => $currentStep ? (int) $currentStep['id'] : $stepId,
            'object_key' => $objectKey,
            'action' => $action,
            'value' => $value,
            'is_correct' => $isCorrect ? 1 : 0,
        ]);

        return ['is_correct' => $isCorrect, 'advanced' => $advanced, 'feedback' => $feedback, 'neutral' => $neutral];
    }

    public function saveObservation(int $attemptId, ?int $stepId, string $text): void
    {
        $db = $this->getDb();
        $existing = $db->prepare('SELECT id FROM virtual_lab_observations WHERE attempt_id = :a AND ' . ($stepId ? 'step_id = :s' : 'step_id IS NULL'));
        $params = ['a' => $attemptId];
        if ($stepId) {
            $params['s'] = $stepId;
        }
        $existing->execute($params);
        $row = $existing->fetch();

        if ($row) {
            $db->prepare('UPDATE virtual_lab_observations SET observation_text = :text, updated_at = NOW() WHERE id = :id')
                ->execute(['text' => $text, 'id' => $row['id']]);
        } else {
            $db->prepare('INSERT INTO virtual_lab_observations (attempt_id, step_id, observation_text, created_at, updated_at) VALUES (:a, :s, :text, NOW(), NOW())')
                ->execute(['a' => $attemptId, 's' => $stepId, 'text' => $text]);
        }
    }

    public function saveAnswer(int $attemptId, int $questionId, string $text): void
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO virtual_lab_answers (attempt_id, question_id, answer_text, created_at, updated_at)
             VALUES (:attempt_id, :question_id, :answer_text, NOW(), NOW())
             ON DUPLICATE KEY UPDATE answer_text = VALUES(answer_text), updated_at = NOW()'
        );
        $stmt->execute(['attempt_id' => $attemptId, 'question_id' => $questionId, 'answer_text' => $text]);
    }

    public function submitAttempt(int $attemptId, ?string $conclusionText, ?string $graphXKey = null, ?string $graphYKey = null): bool
    {
        $stmt = $this->getDb()->prepare(
            "UPDATE virtual_lab_attempts
             SET status = 'submitted', submitted_at = NOW(),
                 time_spent_seconds = TIMESTAMPDIFF(SECOND, started_at, NOW()),
                 conclusion_text = :conclusion, updated_at = NOW()
             WHERE id = :id AND status = 'in_progress'"
        );
        $ok = $stmt->execute(['id' => $attemptId, 'conclusion' => $conclusionText]) && $stmt->rowCount() > 0;
        if ($ok) {
            $this->recordAttemptGraphSnapshot($attemptId, $graphXKey, $graphYKey);
        }
        return $ok;
    }

    /**
     * Freezes the graph exactly as the student saw it at submission time - title/labels/axes/type
     * from the experiment's current graph config, plus a best-fit line computed from the student's
     * own real Results Table rows (never touched again afterward, so a teacher editing the template's
     * graph config later can't retroactively change what a historical review shows). No-op if the
     * experiment has no graph config or it's disabled. $graphXKey/$graphYKey are what the student was
     * actually viewing when they submitted (only meaningful when allow_axis_change is on); falls back
     * to the config's own columns otherwise.
     */
    private function recordAttemptGraphSnapshot(int $attemptId, ?string $graphXKey, ?string $graphYKey): void
    {
        $db = $this->getDb();
        $expStmt = $db->prepare(
            'SELECT e.id FROM virtual_lab_attempts att
             INNER JOIN virtual_lab_assignments a ON att.assignment_id = a.id
             INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
             WHERE att.id = :id'
        );
        $expStmt->execute(['id' => $attemptId]);
        $expRow = $expStmt->fetch();
        if (!$expRow) {
            return;
        }

        $graphStmt = $db->prepare('SELECT * FROM virtual_lab_graph_configs WHERE experiment_id = :id AND enabled = 1');
        $graphStmt->execute(['id' => (int) $expRow['id']]);
        $config = $graphStmt->fetch();
        if (!$config) {
            return;
        }

        $xKey = ($config['allow_axis_change'] && $graphXKey) ? $graphXKey : $config['x_column'];
        $yKey = ($config['allow_axis_change'] && $graphYKey) ? $graphYKey : $config['y_column'];

        $points = [];
        foreach ($this->listNotebookEntries($attemptId) as $entry) {
            if ($entry['entry_type'] !== 'result_row' || !$entry['extra']) {
                continue;
            }
            if (isset($entry['extra'][$xKey]) && isset($entry['extra'][$yKey]) && is_numeric($entry['extra'][$xKey]) && is_numeric($entry['extra'][$yKey])) {
                $points[] = ['x' => (float) $entry['extra'][$xKey], 'y' => (float) $entry['extra'][$yKey]];
            }
        }

        $fit = $config['show_best_fit'] ? \eSpace\App\Utils\GraphMath::linearRegression($points) : null;

        $db->prepare(
            'INSERT INTO virtual_lab_attempt_graphs (attempt_id, title, x_column, y_column, x_label, y_label, graph_type, point_count, gradient, intercept, r_squared, created_at)
             VALUES (:attempt_id, :title, :x_column, :y_column, :x_label, :y_label, :graph_type, :point_count, :gradient, :intercept, :r_squared, NOW())
             ON DUPLICATE KEY UPDATE title = VALUES(title), x_column = VALUES(x_column), y_column = VALUES(y_column),
                x_label = VALUES(x_label), y_label = VALUES(y_label), graph_type = VALUES(graph_type),
                point_count = VALUES(point_count), gradient = VALUES(gradient), intercept = VALUES(intercept), r_squared = VALUES(r_squared)'
        )->execute([
            'attempt_id' => $attemptId,
            'title' => $config['title'],
            'x_column' => $xKey,
            'y_column' => $yKey,
            'x_label' => $config['x_label'],
            'y_label' => $config['y_label'],
            'graph_type' => $config['graph_type'],
            'point_count' => count($points),
            'gradient' => $fit['slope'] ?? null,
            'intercept' => $fit['intercept'] ?? null,
            'r_squared' => $fit['r_squared'] ?? null,
        ]);
    }

    // ---------------------------------------------------------------------
    // Teacher grading
    // ---------------------------------------------------------------------

    public function getAttemptDetail(int $attemptId): ?array
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT att.*, a.experiment_id, a.marks AS assignment_marks, a.term_id, a.subject_id, a.class_id, a.academic_year,
                    s.first_name, s.last_name, s.admission_number, e.title AS experiment_title, e.category
             FROM virtual_lab_attempts att
             INNER JOIN virtual_lab_assignments a ON att.assignment_id = a.id
             INNER JOIN students s ON att.student_id = s.id
             INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
             WHERE att.id = :id"
        );
        $stmt->execute(['id' => $attemptId]);
        $row = $stmt->fetch();
        if (!$row) {
            return null;
        }

        $experiment = $this->getExperimentDetail((int) $row['experiment_id']);

        $logStmt = $db->prepare('SELECT * FROM virtual_lab_action_log WHERE attempt_id = :id ORDER BY created_at ASC');
        $logStmt->execute(['id' => $attemptId]);

        $obsStmt = $db->prepare('SELECT step_id, observation_text FROM virtual_lab_observations WHERE attempt_id = :id');
        $obsStmt->execute(['id' => $attemptId]);

        $ansStmt = $db->prepare(
            'SELECT vq.id AS question_id, vq.question_text, vq.question_type, vq.stage, vq.requirement, vq.linked_to_graph,
                    vq.marks AS question_marks, va.answer_text, va.marks_awarded, va.feedback
             FROM virtual_lab_answers va INNER JOIN virtual_lab_questions vq ON va.question_id = vq.id
             WHERE va.attempt_id = :id ORDER BY vq.question_number ASC'
        );
        $ansStmt->execute(['id' => $attemptId]);

        $graphSnapshotStmt = $db->prepare('SELECT * FROM virtual_lab_attempt_graphs WHERE attempt_id = :id');
        $graphSnapshotStmt->execute(['id' => $attemptId]);
        $graphSnapshot = $graphSnapshotStmt->fetch();

        return [
            'id' => (int) $row['id'],
            'student_id' => (int) $row['student_id'],
            'student_name' => trim($row['first_name'] . ' ' . $row['last_name']),
            'admission_number' => $row['admission_number'],
            'experiment_title' => $row['experiment_title'],
            'category' => $row['category'],
            'status' => $row['status'],
            'started_at' => $row['started_at'],
            'submitted_at' => $row['submitted_at'],
            'time_spent_seconds' => (int) $row['time_spent_seconds'],
            'steps_completed' => (int) $row['steps_completed'],
            'total_steps' => count($experiment['steps'] ?? []),
            'correct_actions' => (int) $row['correct_actions'],
            'wrong_actions' => (int) $row['wrong_actions'],
            'hints_used' => (int) $row['hints_used'],
            'safety_mistakes' => (int) $row['safety_mistakes'],
            'conclusion_text' => $row['conclusion_text'],
            'score' => $row['score'] !== null ? (float) $row['score'] : null,
            'max_marks' => (float) $row['assignment_marks'],
            'teacher_feedback' => $row['teacher_feedback'],
            'observations' => array_map(fn($o) => ['step_id' => $o['step_id'] !== null ? (int) $o['step_id'] : null, 'text' => $o['observation_text']], $obsStmt->fetchAll()),
            'answers' => array_map(fn($a) => [
                'question_id' => (int) $a['question_id'],
                'question_text' => $a['question_text'],
                'question_type' => $a['question_type'],
                'stage' => $a['stage'],
                'requirement' => $a['requirement'],
                'linked_to_graph' => (bool) $a['linked_to_graph'],
                'question_marks' => (float) $a['question_marks'],
                'answer_text' => $a['answer_text'],
                'marks_awarded' => $a['marks_awarded'] !== null ? (float) $a['marks_awarded'] : null,
                'feedback' => $a['feedback'],
            ], $ansStmt->fetchAll()),
            'notebook' => $this->listNotebookEntries($attemptId),
            'graph_snapshot' => $graphSnapshot ? [
                'title' => $graphSnapshot['title'],
                'x_column' => $graphSnapshot['x_column'],
                'y_column' => $graphSnapshot['y_column'],
                'x_label' => $graphSnapshot['x_label'],
                'y_label' => $graphSnapshot['y_label'],
                'graph_type' => $graphSnapshot['graph_type'],
                'point_count' => (int) $graphSnapshot['point_count'],
                'gradient' => $graphSnapshot['gradient'] !== null ? (float) $graphSnapshot['gradient'] : null,
                'intercept' => $graphSnapshot['intercept'] !== null ? (float) $graphSnapshot['intercept'] : null,
                'r_squared' => $graphSnapshot['r_squared'] !== null ? (float) $graphSnapshot['r_squared'] : null,
            ] : null,
            'action_log' => array_map(fn($l) => [
                'step_id' => $l['step_id'] !== null ? (int) $l['step_id'] : null,
                'object_key' => $l['object_key'],
                'action' => $l['action'],
                'value' => $l['value'],
                'is_correct' => (bool) $l['is_correct'],
                'created_at' => $l['created_at'],
            ], $logStmt->fetchAll()),
        ];
    }

    public function gradeAttempt(int $attemptId, float $score, ?string $feedback, int $teacherId): bool
    {
        $db = $this->getDb();
        $stmt = $db->prepare(
            "SELECT att.student_id, a.term_id, a.subject_id, a.class_id, a.academic_year, a.marks, e.title AS experiment_title, e.category
             FROM virtual_lab_attempts att
             INNER JOIN virtual_lab_assignments a ON att.assignment_id = a.id
             INNER JOIN virtual_lab_experiments e ON a.experiment_id = e.id
             WHERE att.id = :id"
        );
        $stmt->execute(['id' => $attemptId]);
        $row = $stmt->fetch();
        if (!$row) {
            return false;
        }

        $db->prepare(
            "UPDATE virtual_lab_attempts SET status = 'graded', score = :score, teacher_feedback = :feedback, graded_by = :teacher_id, graded_at = NOW(), updated_at = NOW() WHERE id = :id"
        )->execute(['score' => $score, 'feedback' => $feedback, 'teacher_id' => $teacherId, 'id' => $attemptId]);

        $maxMarks = (float) $row['marks'];
        $percentage = $maxMarks > 0 ? round(($score / $maxMarks) * 100, 2) : 0;

        $db->prepare(
            'INSERT INTO virtual_lab_results (attempt_id, student_id, subject_id, class_id, term_id, academic_year, experiment_title, category, score, max_marks, percentage, teacher_comment, completed_at)
             VALUES (:attempt_id, :student_id, :subject_id, :class_id, :term_id, :academic_year, :experiment_title, :category, :score, :max_marks, :percentage, :teacher_comment, NOW())
             ON DUPLICATE KEY UPDATE score = VALUES(score), max_marks = VALUES(max_marks), percentage = VALUES(percentage), teacher_comment = VALUES(teacher_comment), completed_at = NOW()'
        )->execute([
            'attempt_id' => $attemptId,
            'student_id' => $row['student_id'],
            'subject_id' => $row['subject_id'],
            'class_id' => $row['class_id'],
            'term_id' => $row['term_id'],
            'academic_year' => $row['academic_year'],
            'experiment_title' => $row['experiment_title'],
            'category' => $row['category'],
            'score' => $score,
            'max_marks' => $maxMarks,
            'percentage' => $percentage,
            'teacher_comment' => $feedback,
        ]);

        (new RewardService())->evaluateAfterMarksChange((int) $row['student_id'], (int) $row['term_id']);

        return true;
    }

    /**
     * Per-question marks + feedback, separate from and in addition to gradeAttempt()'s single
     * overall score - purely teacher-entered (there is no auto-marking anywhere in this class), so
     * an answer existing is never itself treated as correct. Upserts because a teacher may grade
     * before or after the row already exists from saveAnswer() (or the student left it blank).
     */
    public function gradeQuestionAnswer(int $attemptId, int $questionId, float $marksAwarded, ?string $feedback): bool
    {
        $stmt = $this->getDb()->prepare(
            'INSERT INTO virtual_lab_answers (attempt_id, question_id, marks_awarded, feedback, created_at, updated_at)
             VALUES (:attempt_id, :question_id, :marks_awarded, :feedback, NOW(), NOW())
             ON DUPLICATE KEY UPDATE marks_awarded = VALUES(marks_awarded), feedback = VALUES(feedback), updated_at = NOW()'
        );
        return $stmt->execute(['attempt_id' => $attemptId, 'question_id' => $questionId, 'marks_awarded' => $marksAwarded, 'feedback' => $feedback]);
    }

    // ---------------------------------------------------------------------
    // Student results (Reports integration + dashboard)
    // ---------------------------------------------------------------------

    public function listResultsForStudent(int $studentId, ?int $termId = null): array
    {
        $where = ['student_id = :student_id'];
        $params = ['student_id' => $studentId];
        if ($termId) {
            $where[] = 'term_id = :term_id';
            $params['term_id'] = $termId;
        }
        $stmt = $this->getDb()->prepare(
            'SELECT r.*, s.name AS subject_name FROM virtual_lab_results r
             LEFT JOIN subjects s ON r.subject_id = s.id
             WHERE ' . implode(' AND ', $where) . ' ORDER BY r.completed_at DESC'
        );
        $stmt->execute($params);

        return array_map(function ($row) {
            return [
                'id' => (int) $row['id'],
                'experiment_title' => $row['experiment_title'],
                'subject_name' => $row['subject_name'],
                'category' => $row['category'],
                'score' => (float) $row['score'],
                'max_marks' => (float) $row['max_marks'],
                'percentage' => (float) $row['percentage'],
                'teacher_comment' => $row['teacher_comment'],
                'completed_at' => $row['completed_at'],
            ];
        }, $stmt->fetchAll());
    }

    public function summaryForStudent(int $studentId, ?int $termId = null): array
    {
        $results = $this->listResultsForStudent($studentId, $termId);
        $count = count($results);
        $avg = $count > 0 ? round(array_sum(array_column($results, 'percentage')) / $count, 1) : null;

        return [
            'experiments_completed' => $count,
            'average_percentage' => $avg,
            'recent' => array_slice($results, 0, 5),
        ];
    }

    // ---------------------------------------------------------------------
    // Rewards & Badges integration (read by RewardService::computeMetric)
    // ---------------------------------------------------------------------

    public function studentLabAverage(int $studentId, int $termId, ?int $subjectId = null): ?float
    {
        $sql = 'SELECT AVG(percentage) AS avg_pct FROM virtual_lab_results WHERE student_id = :student_id AND term_id = :term_id';
        $params = ['student_id' => $studentId, 'term_id' => $termId];
        if ($subjectId) {
            $sql .= ' AND subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }
        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($params);
        $row = $stmt->fetch();
        return $row && $row['avg_pct'] !== null ? round((float) $row['avg_pct'], 2) : null;
    }

    public function studentLabExperimentsCompleted(int $studentId, int $termId): int
    {
        $stmt = $this->getDb()->prepare('SELECT COUNT(*) AS c FROM virtual_lab_results WHERE student_id = :student_id AND term_id = :term_id');
        $stmt->execute(['student_id' => $studentId, 'term_id' => $termId]);
        return (int) $stmt->fetch()['c'];
    }

    // ---------------------------------------------------------------------
    // Admin oversight & analytics
    // ---------------------------------------------------------------------

    public function analytics(): array
    {
        $db = $this->getDb();
        $totals = $db->query(
            "SELECT
                (SELECT COUNT(*) FROM virtual_lab_experiments WHERE deleted_at IS NULL) AS total_experiments,
                (SELECT COUNT(*) FROM virtual_lab_experiments WHERE deleted_at IS NULL AND status = 'published') AS published_experiments,
                (SELECT COUNT(*) FROM virtual_lab_assignments WHERE deleted_at IS NULL) AS total_assignments,
                (SELECT COUNT(*) FROM virtual_lab_attempts) AS total_attempts,
                (SELECT COUNT(*) FROM virtual_lab_attempts WHERE status = 'graded') AS graded_attempts,
                (SELECT AVG(percentage) FROM virtual_lab_results) AS average_percentage"
        )->fetch();

        $byCategory = $db->query(
            "SELECT e.category, COUNT(DISTINCT e.id) AS experiment_count, COUNT(att.id) AS attempt_count, AVG(r.percentage) AS average_percentage
             FROM virtual_lab_experiments e
             LEFT JOIN virtual_lab_assignments a ON a.experiment_id = e.id AND a.deleted_at IS NULL
             LEFT JOIN virtual_lab_attempts att ON att.assignment_id = a.id
             LEFT JOIN virtual_lab_results r ON r.attempt_id = att.id
             WHERE e.deleted_at IS NULL
             GROUP BY e.category"
        )->fetchAll();

        return [
            'total_experiments' => (int) $totals['total_experiments'],
            'published_experiments' => (int) $totals['published_experiments'],
            'total_assignments' => (int) $totals['total_assignments'],
            'total_attempts' => (int) $totals['total_attempts'],
            'graded_attempts' => (int) $totals['graded_attempts'],
            'average_percentage' => $totals['average_percentage'] !== null ? round((float) $totals['average_percentage'], 1) : null,
            'by_category' => array_map(fn($r) => [
                'category' => $r['category'],
                'experiment_count' => (int) $r['experiment_count'],
                'attempt_count' => (int) $r['attempt_count'],
                'average_percentage' => $r['average_percentage'] !== null ? round((float) $r['average_percentage'], 1) : null,
            ], $byCategory),
        ];
    }
}
