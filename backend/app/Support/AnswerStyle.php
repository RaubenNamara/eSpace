<?php

declare(strict_types=1);

namespace eSpace\App\Support;

/**
 * Mark-sheet look (assignment_answers.answer_style): 'print' (the app's font), 'handwriting', or
 * NULL for answers from before styles existed - those keep the layout a teacher may already have
 * marked on (marks sit at fixed positions over the words).
 */
final class AnswerStyle
{
    /**
     * Typed answers with no teacher marks on the text yet (no layer on the typed-answer page,
     * 9999) are safe to show in the app's font.
     */
    public const UNMARKED_TO_PRINT_SQL = "UPDATE assignment_answers a SET a.answer_style = 'print'
        WHERE a.answer_style IS NULL AND a.answer_text IS NOT NULL AND TRIM(a.answer_text) <> ''
          AND NOT EXISTS (SELECT 1 FROM assignment_annotations aa
                          WHERE aa.submission_id = a.submission_id AND aa.question_id = a.question_id
                            AND aa.page_number = 9999 AND aa.attachment_id IS NULL)";
}
