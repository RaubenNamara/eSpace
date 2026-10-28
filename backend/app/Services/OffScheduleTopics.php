<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Topics learners were assessed on this year from outside their own class's curriculum - a
 * teacher catching up on an S.5 topic in S.6, working ahead into next term's or next year's
 * topics, or going back to an earlier year's. The Learning Maps list these after the class's own
 * topics, labelled with where they come from ("S.5 · 2025"), so the results show somewhere.
 *
 * "Assessed this year" means a published assessment counted in the current school year that one
 * of these learners has handed in.
 */
class OffScheduleTopics
{
    /**
     * @param int[] $studentIds
     * @param int[] $subjectIds
     * @param int[] $ownClassIds the class-streams whose current-year topics are already listed
     * @return array<int, array<string, mixed>> rows like the maps' own topic rows, plus from_label and
     *         the (latest) term it was assessed in, assessed_term_id/assessed_term_name
     */
    public static function find(\PDO $db, array $studentIds, array $subjectIds, array $ownClassIds): array
    {
        if (!$studentIds || !$subjectIds) {
            return [];
        }
        $in = fn(array $a) => implode(',', array_fill(0, count($a), '?'));
        $own = $ownClassIds ?: [0];

        $stmt = $db->prepare(
            "SELECT ct.id, ct.subject_id, ct.term_id, t.name AS term_name, ct.theme_branch, ct.topic, ct.competence,
                    CONCAT(c.name, ' · ', ay.name) AS from_label,
                    x.term_id AS assessed_term_id, att.name AS assessed_term_name
             FROM (
                   SELECT act.curriculum_topic_id AS topic_id, MAX(a.term_id) AS term_id
                   FROM assignment_curriculum_topics act
                   INNER JOIN assignments a ON a.id = act.assignment_id AND a.deleted_at IS NULL AND a.status = 'published'
                   INNER JOIN academic_years cy ON cy.id = a.academic_year_id AND cy.is_current = 1
                   INNER JOIN assignment_submissions sb ON sb.assignment_id = a.id AND sb.deleted_at IS NULL
                          AND sb.student_id IN (" . $in($studentIds) . ")
                   GROUP BY act.curriculum_topic_id
             ) x
             INNER JOIN enote_curriculum_topics ct ON ct.id = x.topic_id
             INNER JOIN academic_years ay ON ay.id = ct.academic_year_id
             INNER JOIN classes c ON c.id = ct.class_id
             LEFT JOIN terms t ON t.id = ct.term_id
             LEFT JOIN terms att ON att.id = x.term_id
             WHERE ct.deleted_at IS NULL
               AND ct.subject_id IN (" . $in($subjectIds) . ")
               AND NOT (ay.is_current = 1 AND ct.class_id IN (" . $in($own) . "))
             ORDER BY ay.name, c.name, ct.term_id, ct.id"
        );
        $stmt->execute(array_merge($studentIds, $subjectIds, $own));
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}
