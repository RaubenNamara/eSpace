<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * This year's topics as they were in earlier years' curricula. Each year has its own copy of every
 * topic, so a learner who did an S.6 topic while in S.5 last year (a teacher working ahead) - or
 * who is repeating the class - has that result against last year's S.6 copy. The Learning Maps use
 * these matches to count it on this year's S.6 topic, labelled with where it was done.
 *
 * A topic matches an earlier year's topic of the same subject, class level (S.6) and name; its
 * learning outcomes match by their wording. Names are compared without case or surrounding spaces.
 */
class EarlierTopics
{
    private static function in(array $v): string
    {
        return implode(',', array_fill(0, count($v), '?'));
    }

    /**
     * @param int[] $topicIds this year's topics
     * @return array{topics: array<int, int[]>, outcomes: array<int, int[]>} earlier copies' ids by
     *         this year's topic id, and earlier outcomes' ids by this year's outcome id
     */
    public static function match(\PDO $db, array $topicIds): array
    {
        $out = ['topics' => [], 'outcomes' => []];
        if (!$topicIds) {
            return $out;
        }
        $stmt = $db->prepare(
            "SELECT cur.id AS cur_id, old.id AS old_id
             FROM enote_curriculum_topics cur
             INNER JOIN classes cc ON cc.id = cur.class_id
             INNER JOIN academic_years cay ON cay.id = cur.academic_year_id
             INNER JOIN enote_curriculum_topics old ON old.subject_id = cur.subject_id AND old.deleted_at IS NULL
                    AND TRIM(old.topic) = TRIM(cur.topic)
             INNER JOIN classes oc ON oc.id = old.class_id AND oc.name = cc.name
             INNER JOIN academic_years oay ON oay.id = old.academic_year_id AND oay.start_date < cay.start_date
             WHERE cur.id IN (" . self::in($topicIds) . ")"
        );
        $stmt->execute(array_values($topicIds));
        $oldTopicOf = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $out['topics'][(int) $r['cur_id']][] = (int) $r['old_id'];
            $oldTopicOf[(int) $r['old_id']][] = (int) $r['cur_id'];
        }
        if (!$oldTopicOf) {
            return $out;
        }

        $curIds = array_keys($out['topics']);
        $oldIds = array_keys($oldTopicOf);
        $stmt = $db->prepare(
            "SELECT co.id AS cur_id, co.curriculum_topic_id AS cur_topic, oo.id AS old_id, oo.curriculum_topic_id AS old_topic
             FROM enote_learning_outcomes co
             INNER JOIN enote_learning_outcomes oo ON TRIM(oo.learning_outcome) = TRIM(co.learning_outcome)
                    AND oo.curriculum_topic_id IN (" . self::in($oldIds) . ")
             WHERE co.curriculum_topic_id IN (" . self::in($curIds) . ")"
        );
        $stmt->execute(array_merge($oldIds, $curIds));
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            // only outcomes of a matched pair of topics
            if (in_array((int) $r['cur_topic'], $oldTopicOf[(int) $r['old_topic']] ?? [], true)) {
                $out['outcomes'][(int) $r['cur_id']][] = (int) $r['old_id'];
            }
        }
        return $out;
    }

    /**
     * Where each assessment was done, for the "Done in S.5 · Term 2, 2026" line.
     *
     * @param int[] $assignmentIds
     * @return array<int, string> by assignment id
     */
    public static function labels(\PDO $db, array $assignmentIds): array
    {
        if (!$assignmentIds) {
            return [];
        }
        $stmt = $db->prepare(
            "SELECT a.id, c.name AS class_name, t.name AS term_name, COALESCE(ay.name, YEAR(COALESCE(a.published_at, a.created_at))) AS year_name
             FROM assignments a
             LEFT JOIN classes c ON c.id = a.class_id
             LEFT JOIN terms t ON t.id = a.term_id
             LEFT JOIN academic_years ay ON ay.id = COALESCE(t.academic_year_id, a.academic_year_id)
             WHERE a.id IN (" . self::in($assignmentIds) . ")"
        );
        $stmt->execute(array_values($assignmentIds));
        $labels = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $when = trim(($r['term_name'] ? $r['term_name'] . ', ' : '') . $r['year_name']);
            $labels[(int) $r['id']] = trim(($r['class_name'] ?: '') . ($r['class_name'] && $when ? ' · ' : '') . $when);
        }
        return $labels;
    }
}
