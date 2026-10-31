<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * Mark-sheet look (assignment_answers.answer_style). The look decides how the typed answer is laid
 * out on the page a teacher marks on, and a teacher's marks sit at fixed places over the words -
 * so an answer that has marks must always keep the layout it was marked on.
 *
 *   print_wide / handwriting_wide  the wide page (1000px), the look for every answer now
 *   print / handwriting            the first 800px page (Oct 2026), kept for answers marked on it
 *   NULL                           the original layout, kept for answers marked on it
 */
final class AnswerStyle
{
    public const PRINT = 'print_wide';
    public const HANDWRITING = 'handwriting_wide';

    /** answers with no teacher marks on the typed text yet (the typed-answer page is 9999) */
    private const UNMARKED = "NOT EXISTS (SELECT 1 FROM assignment_annotations aa
                          WHERE aa.submission_id = a.submission_id AND aa.question_id = a.question_id
                            AND aa.page_number = 9999 AND aa.attachment_id IS NULL)";

    /** Used when the column is first created: every unmarked typed answer moves to the wide page */
    public const UNMARKED_TO_PRINT_SQL = "UPDATE assignment_answers a SET a.answer_style = 'print_wide'
        WHERE a.answer_style IS NULL AND a.answer_text IS NOT NULL AND TRIM(a.answer_text) <> ''
          AND " . self::UNMARKED;

    /**
     * Once per install: answers on an older layout that nobody has marked on yet move to the wide
     * page. A marker file in backend/storage records that it ran.
     */
    public static function upgradeOnce(): void
    {
        static $checked = false;
        if ($checked) {
            return;
        }
        $checked = true;
        $marker = dirname(__DIR__, 2) . '/storage/flags/answer_style_wide_v1';
        if (is_file($marker)) {
            return;
        }
        try {
            $db = \eSpace\Config\Database::getInstance();
            if (!$db->query("SHOW COLUMNS FROM assignment_answers LIKE 'answer_style'")->fetch()) {
                return; // created (and filled) the first time a learner saves a typed answer
            }
            $moved = $db->exec("UPDATE assignment_answers a SET a.answer_style = CASE WHEN a.answer_style = 'handwriting' THEN 'handwriting_wide' ELSE 'print_wide' END
                WHERE (a.answer_style IS NULL OR a.answer_style IN ('print', 'handwriting'))
                  AND a.answer_text IS NOT NULL AND TRIM(a.answer_text) <> '' AND " . self::UNMARKED);
            if (!is_dir(dirname($marker))) {
                @mkdir(dirname($marker), 0775, true);
            }
            @file_put_contents($marker, date('c') . " {$moved} answer(s) moved to the wide page\n");
        } catch (\Throwable $e) {
            error_log('AnswerStyle upgrade failed: ' . $e->getMessage());
        }
    }
}
