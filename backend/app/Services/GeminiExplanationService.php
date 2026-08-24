<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\Config\Config;
use RuntimeException;

/**
 * Google Gemini Explanation Client
 *
 * Powers the eNotes "AI Tutor" feature: turns a page's raw notes into a natural, teacher-style
 * spoken explanation (as opposed to Read Aloud, which speaks the notes word-for-word via
 * ElevenLabsTTSService directly). Every public method throws \RuntimeException with a clear
 * message on failure (including when GEMINI_API_KEY hasn't been configured yet), so controllers
 * can catch it and surface a friendly error rather than crashing.
 */
class GeminiExplanationService
{
    private const MODEL = 'gemini-3.6-flash';

    /** Stay well within Gemini's context window while keeping the prompt focused. */
    private const MAX_CONTENT_CHARS = 12000;

    private const SYSTEM_INSTRUCTION = 'You are an experienced secondary-school teacher walking a student through '
        . 'a lesson one paragraph at a time. You will be given a numbered list of paragraphs from the lesson. For '
        . 'EACH paragraph, write ONE short, natural, spoken-style explanation (1 to 2 sentences, about 15 to 35 '
        . 'words) that helps the student understand that specific paragraph - do not just repeat or reread it. '
        . 'Explain any difficult term simply, and add a quick real-life example or analogy only if it truly helps '
        . 'for that paragraph. Wrap at most one key term per explanation in double asterisks, like **this**, only '
        . 'when genuinely important. Keep the tone warm and conversational, like a teacher briefly annotating as '
        . 'they go - never say "paragraph one" or similar. Return a JSON array of strings, in the exact same '
        . 'order as the input paragraphs, with exactly one explanation string per paragraph.';

    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = Config::getGeminiConfig()['api_key'];
    }

    public function isConfigured(): bool
    {
        return $this->apiKey !== '';
    }

    private function clampText(string $text): string
    {
        $text = preg_replace('/\s+/u', ' ', trim($text)) ?? trim($text);

        if (mb_strlen($text) > self::MAX_CONTENT_CHARS) {
            $text = mb_substr($text, 0, self::MAX_CONTENT_CHARS);
        }

        return $text;
    }

    /**
     * Generate one short, spoken-style explanation per paragraph (same order as $paragraphs) for
     * the AI Tutor walkthrough - a single batched Gemini call rather than one call per paragraph,
     * grounded in the page's subject, topic, and (when known) the student's class level.
     *
     * @param string[] $paragraphs Plain-text paragraphs, in order (see HtmlBlockSplitter).
     * @return string[] One explanation per paragraph, same order, same length as $paragraphs.
     */
    public function explainParagraphs(array $paragraphs, string $topicTitle, string $subjectName, ?string $classLevel): array
    {
        if (!$this->isConfigured()) {
            throw new RuntimeException('AI Tutor is not configured yet. Set GEMINI_API_KEY in backend/.env.');
        }

        $paragraphs = array_values(array_filter(array_map([$this, 'clampText'], $paragraphs), fn($p) => $p !== ''));
        if (empty($paragraphs)) {
            throw new RuntimeException('This page has no content for the AI Tutor to explain.');
        }

        if (!function_exists('curl_init')) {
            throw new RuntimeException('The PHP curl extension is required for AI Tutor.');
        }

        $numbered = [];
        foreach ($paragraphs as $i => $text) {
            $numbered[] = ($i + 1) . '. ' . $text;
        }

        $classContext = $classLevel ? "The student is at {$classLevel} level.\n" : '';
        $userPrompt = "Subject: {$subjectName}\nTopic: {$topicTitle}\n{$classContext}\nParagraphs:\n" . implode("\n", $numbered);

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
                    'maxOutputTokens' => 2000,
                    // Keep reasoning minimal - this is a straightforward rewrite task, not one that
                    // benefits from extended thinking, and "thinking" tokens draw from the same
                    // maxOutputTokens budget as the visible answer (previously caused truncation).
                    'thinkingConfig' => ['thinkingLevel' => 'minimal'],
                    // Force a strict JSON array of strings back - removes any risk of the model
                    // wrapping its answer in prose or markdown fences that would need re-parsing.
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
            $message = 'AI Tutor explanation failed';
            if (is_array($decoded) && isset($decoded['error']['message'])) {
                $message = $decoded['error']['message'];
            }
            throw new RuntimeException($message);
        }

        $text = $decoded['candidates'][0]['content']['parts'][0]['text'] ?? null;
        $explanations = is_string($text) ? json_decode($text, true) : null;

        if (!is_array($explanations) || count($explanations) !== count($paragraphs)) {
            throw new RuntimeException('AI Tutor could not generate explanations for this page. Please try again.');
        }

        return array_map(fn($e) => trim((string) $e), $explanations);
    }
}
