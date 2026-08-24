<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\Config\Config;
use RuntimeException;

/**
 * Google Gemini Report-Card Descriptor Client
 *
 * A sibling to GeminiExplanationService (AI Tutor), not an extension of it - that service is
 * scoped specifically to AI Tutor's paragraph-narration use case. This one writes the
 * descriptor/remark column on a report card: one short, formal comment per subject, referencing
 * the specific assessed items (assignment titles) behind that subject's grade.
 */
class GeminiReportDescriptorService
{
    private const MODEL = 'gemini-3.6-flash';

    private const SYSTEM_INSTRUCTION = 'You are an experienced secondary-school teacher writing report-card '
        . 'comments. You will be given a numbered list of subjects a student took this term, each with their '
        . 'computed grade and the individual assessed items (title and percentage) behind it. For EACH subject, '
        . 'write ONE concise, formal report-card comment (1 to 2 sentences, about 15 to 30 words) evaluating the '
        . "student's performance, referencing specific assessed work by title where it reads naturally, in an "
        . 'encouraging but honest teacher tone suitable for a printed report. Return a JSON array of strings, one '
        . 'comment per subject, in the exact same order as the input.';

    private const SUMMARY_SYSTEM_INSTRUCTION = 'You are writing the two summary comments on a student\'s printed '
        . 'term report card, based only on their overall computed performance for the term (not any single '
        . 'subject). You will be given the student\'s first name, total points, overall average weight (1-5 '
        . 'scale), overall performance level, and the list of subjects they were graded in with their individual '
        . 'grades. Write TWO comments: (1) "class_teacher_comment" - in the voice of their class teacher who '
        . 'knows them day-to-day: warm and personal, may reference specific subjects where they did well or need '
        . 'support, 15 to 30 words. (2) "head_teacher_comment" - in the voice of the head teacher: more formal, '
        . 'focused on overall standing and effort, forward-looking and encouraging, 15 to 30 words. Return a JSON '
        . 'object with exactly those two keys.';

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
     * @param array<int, array{subject_name: string, grade: string, performance_level: string, avg_weight: float, items: array<int, array{title: string, percentage: float}>}> $subjects
     * @return string[] One descriptor per subject, same order, same length as $subjects.
     */
    public function generateDescriptors(array $subjects): array
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('Report card descriptors are not configured yet. Set GEMINI_API_KEY in backend/.env.');
        }

        if (empty($subjects)) {
            throw new RuntimeException('No graded subjects to describe.');
        }

        if (!function_exists('curl_init')) {
            throw new RuntimeException('The PHP curl extension is required for report card descriptors.');
        }

        $lines = [];
        foreach ($subjects as $i => $subject) {
            $lines[] = ($i + 1) . '. Subject: ' . $subject['subject_name']
                . ' | Grade: ' . $subject['grade'] . ' (' . $subject['performance_level']
                . ', avg ' . $subject['avg_weight'] . '/5)';
            foreach ($subject['items'] as $item) {
                $lines[] = '   - ' . $item['title'] . ': ' . round($item['percentage'], 1) . '%';
            }
        }

        $userPrompt = implode("\n", $lines);

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . self::MODEL
            . ':generateContent?key=' . urlencode($this->apiKey);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_TIMEOUT => 90,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode([
                'contents' => [
                    ['role' => 'user', 'parts' => [['text' => $userPrompt]]],
                ],
                'systemInstruction' => [
                    'parts' => [['text' => self::SYSTEM_INSTRUCTION]],
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 4000,
                    // Keep reasoning minimal - "thinking" tokens draw from the same
                    // maxOutputTokens budget as the visible answer (previously caused truncation
                    // when omitted for the similarly-shaped AI Tutor batch call).
                    'thinkingConfig' => ['thinkingLevel' => 'minimal'],
                    'responseMimeType' => 'application/json',
                    'responseSchema' => [
                        'type' => 'ARRAY',
                        'items' => ['type' => 'STRING'],
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
            $message = 'Report card descriptor generation failed';
            if (is_array($decoded) && isset($decoded['error']['message'])) {
                $message = $decoded['error']['message'];
            }
            throw new RuntimeException($message);
        }

        $text = $decoded['candidates'][0]['content']['parts'][0]['text'] ?? null;
        $descriptors = is_string($text) ? json_decode($text, true) : null;

        if (!is_array($descriptors) || count($descriptors) !== count($subjects)) {
            throw new RuntimeException('Could not generate report card descriptors. Please try again.');
        }

        return array_map(fn($d) => trim((string) $d), $descriptors);
    }

    /**
     * @param array{student_first_name: string, total_points: int, overall_avg_weight: float, performance_level: ?string, subjects: array<int, array{subject_name: string, grade: string, performance_level: string}>} $context
     * @return array{class_teacher_comment: string, head_teacher_comment: string}
     */
    public function generateSummaryComments(array $context): array
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('Report card comments are not configured yet. Set GEMINI_API_KEY in backend/.env.');
        }

        if (!function_exists('curl_init')) {
            throw new RuntimeException('The PHP curl extension is required for report card comments.');
        }

        $lines = [
            'Student: ' . $context['student_first_name'],
            'Total Points: ' . $context['total_points'],
            'Overall Average Weight: ' . $context['overall_avg_weight'] . '/5',
            'Overall Performance Level: ' . ($context['performance_level'] ?? 'N/A'),
            'Subjects:',
        ];
        foreach ($context['subjects'] as $subject) {
            $lines[] = '- ' . $subject['subject_name'] . ': Grade ' . $subject['grade'] . ' (' . $subject['performance_level'] . ')';
        }
        $userPrompt = implode("\n", $lines);

        $url = 'https://generativelanguage.googleapis.com/v1beta/models/' . self::MODEL
            . ':generateContent?key=' . urlencode($this->apiKey);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_TIMEOUT => 60,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
            ],
            CURLOPT_POSTFIELDS => json_encode([
                'contents' => [
                    ['role' => 'user', 'parts' => [['text' => $userPrompt]]],
                ],
                'systemInstruction' => [
                    'parts' => [['text' => self::SUMMARY_SYSTEM_INSTRUCTION]],
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                    'maxOutputTokens' => 1000,
                    'thinkingConfig' => ['thinkingLevel' => 'minimal'],
                    'responseMimeType' => 'application/json',
                    'responseSchema' => [
                        'type' => 'OBJECT',
                        'properties' => [
                            'class_teacher_comment' => ['type' => 'STRING'],
                            'head_teacher_comment' => ['type' => 'STRING'],
                        ],
                        'required' => ['class_teacher_comment', 'head_teacher_comment'],
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
            $message = 'Report card comment generation failed';
            if (is_array($decoded) && isset($decoded['error']['message'])) {
                $message = $decoded['error']['message'];
            }
            throw new RuntimeException($message);
        }

        $text = $decoded['candidates'][0]['content']['parts'][0]['text'] ?? null;
        $result = is_string($text) ? json_decode($text, true) : null;

        if (!is_array($result) || empty($result['class_teacher_comment']) || empty($result['head_teacher_comment'])) {
            throw new RuntimeException('Could not generate report card comments. Please try again.');
        }

        return [
            'class_teacher_comment' => trim((string) $result['class_teacher_comment']),
            'head_teacher_comment' => trim((string) $result['head_teacher_comment']),
        ];
    }
}
