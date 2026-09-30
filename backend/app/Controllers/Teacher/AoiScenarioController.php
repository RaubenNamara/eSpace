<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\GeminiAoiScenarioService;

/**
 * Suggested Activity of Integration scenarios for the topic(s) an AOI assesses - drafted from the
 * topics' competency and learning outcomes (see GeminiAoiScenarioService). The teacher picks one
 * in the Assignment Builder, where it fills the scenario question and the marking guide.
 *
 * POST /teacher/aoi-scenarios  { curriculum_topic_ids: number[], count?: 1-3, avoid?: string[] (titles already shown) }
 */
class AoiScenarioController extends Controller
{
    private function teacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    public function suggest(): void
    {
        if (!$this->isAuthenticated() || !($teacherId = $this->teacherId())) {
            $this->unauthorized();
            return;
        }
        $ids = array_values(array_unique(array_filter(array_map('intval', (array) $this->input('curriculum_topic_ids', [])), fn($id) => $id > 0)));
        if (!$ids) {
            $this->error('Choose the topic this Activity of Integration assesses first', 422);
            return;
        }
        $ids = array_slice($ids, 0, 5);
        $db = \eSpace\Config\Database::getInstance();

        // The topics, in the teacher's departments
        $stmt = $db->prepare(
            "SELECT ct.id, ct.topic, ct.theme_branch, ct.competence, s.name AS subject_name,
                    CONCAT(c.name, IF(c.stream_name IS NULL OR c.stream_name = '', '', CONCAT('-', c.stream_name))) AS class_name
             FROM enote_curriculum_topics ct
             INNER JOIN subjects s ON s.id = ct.subject_id
             LEFT JOIN classes c ON c.id = ct.class_id
             WHERE ct.id IN (" . implode(',', array_fill(0, count($ids), '?')) . ") AND ct.deleted_at IS NULL
               AND s.department_id IN (
                   SELECT department_id FROM teacher_department_assignments WHERE teacher_id = ? AND deleted_at IS NULL
                   UNION SELECT department_id FROM teachers WHERE id = ? AND department_id IS NOT NULL
               )
             ORDER BY ct.id"
        );
        $stmt->execute(array_merge($ids, [$teacherId, $teacherId]));
        $topics = $stmt->fetchAll();
        if (!$topics) {
            $this->notFound('Topic not found');
            return;
        }
        $topicIds = array_map(fn($t) => (int) $t['id'], $topics);
        $stmt = $db->prepare(
            "SELECT learning_outcome FROM enote_learning_outcomes
             WHERE curriculum_topic_id IN (" . implode(',', array_fill(0, count($topicIds), '?')) . ")
             ORDER BY curriculum_topic_id, order_number, id"
        );
        $stmt->execute($topicIds);
        $outcomes = array_values(array_unique(array_map('trim', array_column($stmt->fetchAll(), 'learning_outcome'))));

        $first = $topics[0];
        $context = [
            'subject' => $first['subject_name'],
            // "S.1-A" -> "S.1": the class level is what matters to the scenario
            'class_name' => preg_replace('/-.*$/', '', (string) $first['class_name']),
            'topic' => implode('; ', array_unique(array_map(fn($t) => trim($t['topic']), $topics))),
            'theme' => $first['theme_branch'],
            'competence' => implode(' ', array_unique(array_filter(array_map(fn($t) => trim((string) $t['competence']), $topics)))),
            'outcomes' => array_slice($outcomes, 0, 25),
        ];

        try {
            $avoid = array_values(array_filter(array_map(fn($t) => trim(strip_tags((string) $t)), (array) $this->input('avoid', []))));
            $suggestions = (new GeminiAoiScenarioService())->suggest($context, (int) ($this->input('count') ?? 3), $avoid);
        } catch (\RuntimeException $e) {
            $this->error($e->getMessage(), 503);
            return;
        }
        $this->success(['suggestions' => $suggestions, 'criteria' => GeminiAoiScenarioService::CRITERIA]);
    }
}
