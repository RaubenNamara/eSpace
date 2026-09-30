<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\Config\Config;
use RuntimeException;

/**
 * Google Gemini: draft Activity of Integration (AOI) scenarios for a teacher.
 *
 * A sibling to GeminiExplanationService (AI Tutor) and GeminiReportDescriptorService. Given a
 * curriculum topic - its competency and learning outcomes, the subject and class - it drafts three
 * AOIs as the lower-secondary competency-based curriculum sets them: a real-life scenario from a
 * Ugandan setting, the task(s) the learner must do in it, and a marking guide on the four AOI
 * criteria (Relevance, Accuracy, Coherence, Excellence). The teacher edits and chooses; nothing is
 * published by this service.
 */
class GeminiAoiScenarioService
{
    private const MODEL = 'gemini-3.6-flash';

    public const CRITERIA = ['Relevance', 'Accuracy', 'Coherence', 'Excellence'];

    private const SYSTEM_INSTRUCTION = 'You are an experienced Ugandan secondary-school teacher who writes '
        . 'Activities of Integration (AOIs) for the lower-secondary competency-based curriculum. An AOI is the '
        . 'assessment at the end of a topic: a real-life SCENARIO that presents a problem, and a TASK in which the '
        . 'learner integrates what the topic taught to solve it and produce something (a report, plan, letter, '
        . 'design, poster, calculation, advice...). Given a topic, its competency and learning outcomes, the '
        . 'subject and class, write THREE different AOIs. Each scenario must be set in a familiar Ugandan context '
        . '(for example a village, market, school, farm, boda-boda stage, borehole, health centre, family '
        . 'business), name realistic people and places, include the facts or figures the learner needs, and be '
        . 'solvable by a learner at that class level using this topic. Keep the language simple (80 to 150 words '
        . 'per scenario). Give 1 to 3 tasks per AOI, each with marks, totalling 10 to 20 marks; tasks start with '
        . 'an action verb and say what the learner must produce. The marking guide scores each of the four '
        . 'criteria from 0 to 3: Relevance (the response addresses the scenario and task), Accuracy (correct '
        . 'subject knowledge, facts and working), Coherence (logical, well-organised, clearly communicated), '
        . 'Excellence (creativity, extra insight, practical value). For each criterion say concretely what a '
        . 'full-score (3) answer to THIS task shows. Return JSON only.';

    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = Config::getGeminiConfig()['api_key'];
    }

    public function isConfigured(): bool
    {
        return $this->apiKey !== '';
    }

    /**
     * @param array{subject: string, class_name: string, topic: string, theme: ?string, competence: ?string, outcomes: string[]} $topic
     * @return array<int, array{title: string, scenario: string, tasks: array<int, array{text: string, marks: int}>, marking_guide: array<int, array{criterion: string, look_for: string}>}>
     */
    public function suggest(array $topic): array
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('AI suggestions are not set up yet. Set GEMINI_API_KEY in backend/.env.');
        }
        if (!function_exists('curl_init')) {
            throw new RuntimeException('The PHP curl extension is required for AI suggestions.');
        }

        $lines = [
            'Subject: ' . $topic['subject'],
            'Class: ' . $topic['class_name'],
            'Theme: ' . ($topic['theme'] ?: '-'),
            'Topic: ' . $topic['topic'],
            'Competency: ' . ($topic['competence'] ?: '-'),
            'Learning outcomes:',
        ];
        foreach ($topic['outcomes'] as $outcome) {
            $lines[] = '- ' . $outcome;
        }

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . self::MODEL
            . ':generateContent?key=' . urlencode($this->apiKey);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_TIMEOUT => 90,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_POSTFIELDS => json_encode([
                'contents' => [
                    ['role' => 'user', 'parts' => [['text' => implode("\n", $lines)]]],
                ],
                'systemInstruction' => ['parts' => [['text' => self::SYSTEM_INSTRUCTION]]],
                'generationConfig' => [
                    'temperature' => 0.9,
                    'maxOutputTokens' => 6000,
                    // "thinking" tokens share maxOutputTokens with the answer (see GeminiReportDescriptorService)
                    'thinkingConfig' => ['thinkingLevel' => 'minimal'],
                    'responseMimeType' => 'application/json',
                    'responseSchema' => [
                        'type' => 'ARRAY',
                        'items' => [
                            'type' => 'OBJECT',
                            'properties' => [
                                'title' => ['type' => 'STRING'],
                                'scenario' => ['type' => 'STRING'],
                                'tasks' => [
                                    'type' => 'ARRAY',
                                    'items' => [
                                        'type' => 'OBJECT',
                                        'properties' => [
                                            'text' => ['type' => 'STRING'],
                                            'marks' => ['type' => 'INTEGER'],
                                        ],
                                        'required' => ['text', 'marks'],
                                    ],
                                ],
                                'marking_guide' => [
                                    'type' => 'ARRAY',
                                    'items' => [
                                        'type' => 'OBJECT',
                                        'properties' => [
                                            'criterion' => ['type' => 'STRING', 'enum' => self::CRITERIA],
                                            'look_for' => ['type' => 'STRING'],
                                        ],
                                        'required' => ['criterion', 'look_for'],
                                    ],
                                ],
                            ],
                            'required' => ['title', 'scenario', 'tasks', 'marking_guide'],
                        ],
                    ],
                ],
            ]),
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($response === false) {
            throw new RuntimeException("Could not reach Gemini: {$error}");
        }
        $decoded = json_decode((string) $response, true);
        if ($httpCode !== 200) {
            throw new RuntimeException($decoded['error']['message'] ?? 'Could not draft scenarios. Please try again.');
        }

        $text = $decoded['candidates'][0]['content']['parts'][0]['text'] ?? null;
        $items = is_string($text) ? json_decode($text, true) : null;
        $clean = is_array($items) ? self::clean($items) : [];
        if (!$clean) {
            throw new RuntimeException('Could not draft scenarios. Please try again.');
        }
        return $clean;
    }

    /** Keeps only well-formed suggestions, with sane marks and one guide line per criterion */
    public static function clean(array $items): array
    {
        $out = [];
        foreach ($items as $item) {
            $scenario = trim((string) ($item['scenario'] ?? ''));
            $tasks = [];
            foreach ((array) ($item['tasks'] ?? []) as $task) {
                $text = trim((string) ($task['text'] ?? ''));
                if ($text !== '') {
                    $tasks[] = ['text' => $text, 'marks' => max(1, min(20, (int) ($task['marks'] ?? 5)))];
                }
            }
            if ($scenario === '' || !$tasks) {
                continue;
            }
            $guide = [];
            foreach ((array) ($item['marking_guide'] ?? []) as $line) {
                $criterion = trim((string) ($line['criterion'] ?? ''));
                $lookFor = trim((string) ($line['look_for'] ?? ''));
                if (in_array($criterion, self::CRITERIA, true) && $lookFor !== '' && !isset($guide[$criterion])) {
                    $guide[$criterion] = ['criterion' => $criterion, 'look_for' => $lookFor];
                }
            }
            // In the curriculum's order
            $guide = array_values(array_filter(array_map(fn($c) => $guide[$c] ?? null, self::CRITERIA)));
            $out[] = [
                'title' => trim((string) ($item['title'] ?? '')) ?: 'Activity of Integration',
                'scenario' => $scenario,
                'tasks' => array_slice($tasks, 0, 4),
                'marking_guide' => $guide,
            ];
        }
        return array_slice($out, 0, 3);
    }
}
