<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * A topic's Learning Outcome Assessments (page-scoped) and AOI (topic-scoped) follow the topic to
 * every class/stream it was duplicated to. There is still one assessment - set on whichever copy
 * the teacher authored it from - so its questions, marking and results stay in one place, the
 * same way a copy's content mirrors the rest of its group (Teacher\ENoteController::duplicateTopic()):
 *  - reach: every published copy's streams are added to the assessment's assignment_classes, so
 *    those students get it (the assignment list, the reader, the Learning Map all use that table);
 *  - links: a copy's reader and builder find the group's assessment, a page matched to the page
 *    it was set on by order_number (pages are mirrored by order_number across a group).
 * Reach only ever grows - a stream that later loses its copy keeps the assessment, since its
 * students may already have attempted it.
 */
class ENoteAssessmentReach
{
    /**
     * The topic itself and every live copy in its content group (the topic first).
     * @return int[]
     */
    public static function groupTopicIds(\PDO $db, int $topicId): array
    {
        $stmt = $db->prepare(
            "SELECT m.id FROM enote_topics t
             INNER JOIN enote_topics m ON m.id = t.id
                 OR (t.content_group_id IS NOT NULL AND m.content_group_id = t.content_group_id AND m.teacher_id = t.teacher_id AND m.deleted_at IS NULL)
             WHERE t.id = ?
             ORDER BY m.id = t.id DESC, m.id ASC"
        );
        $stmt->execute([$topicId]);
        return array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN));
    }

    /**
     * Add every published copy's streams to every LOA/AOI set on any topic in this topic's group.
     * Safe to call any time (idempotent); a topic that was never duplicated is a no-op.
     */
    public static function sync(\PDO $db, int $topicId): void
    {
        $groupIds = self::groupTopicIds($db, $topicId);
        if (count($groupIds) < 2) {
            return;
        }
        $in = implode(',', array_fill(0, count($groupIds), '?'));

        $stmt = $db->prepare("SELECT id FROM assignments WHERE enote_topic_id IN ($in) AND deleted_at IS NULL");
        $stmt->execute($groupIds);
        $assignmentIds = array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN));
        if (!$assignmentIds) {
            return;
        }

        // The streams the published copies reach: a single stream, or every stream of an
        // "All Streams" copy's class that has students in the topic's department
        $stmt = $db->prepare(
            "SELECT et.class_id AS class_id FROM enote_topics et
             WHERE et.id IN ($in) AND et.status = 'published' AND et.class_id IS NOT NULL
             UNION
             SELECT c.id FROM enote_topics et
             INNER JOIN classes c ON c.name = et.class_group_name AND c.deleted_at IS NULL
             WHERE et.id IN ($in) AND et.status = 'published' AND et.class_id IS NULL AND et.class_group_name IS NOT NULL
               AND EXISTS (SELECT 1 FROM student_department_enrollments se
                           WHERE se.class_id = c.id AND se.department_id = et.department_id AND se.deleted_at IS NULL)"
        );
        $stmt->execute(array_merge($groupIds, $groupIds));
        $classIds = array_map('intval', $stmt->fetchAll(\PDO::FETCH_COLUMN));
        if (!$classIds) {
            return;
        }

        // An assessment that so far relied only on its own single class_id / "All Streams" class
        // keeps that audience in its list too - once it has rows here, the assessment builder's
        // "visible to" picker reads only these.
        $own = $db->prepare(
            "INSERT IGNORE INTO assignment_classes (assignment_id, class_id, created_at)
             SELECT a.id, a.class_id, NOW() FROM assignments a
             WHERE a.id = ? AND a.class_id IS NOT NULL
               AND NOT EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id)
             UNION
             SELECT a.id, c.id, NOW() FROM assignments a
             INNER JOIN classes c ON c.name = a.class_group_name AND c.deleted_at IS NULL
             INNER JOIN subjects s ON s.id = a.subject_id
             WHERE a.id = ? AND a.class_id IS NULL AND a.class_group_name IS NOT NULL
               AND NOT EXISTS (SELECT 1 FROM assignment_classes ac WHERE ac.assignment_id = a.id)
               AND EXISTS (SELECT 1 FROM student_department_enrollments se
                           WHERE se.class_id = c.id AND se.department_id = s.department_id AND se.deleted_at IS NULL)"
        );
        $add = $db->prepare('INSERT IGNORE INTO assignment_classes (assignment_id, class_id, created_at) VALUES (?, ?, NOW())');
        foreach ($assignmentIds as $assignmentId) {
            $own->execute([$assignmentId, $assignmentId]);
            foreach ($classIds as $classId) {
                $add->execute([$assignmentId, $classId]);
            }
        }
    }

    /** sync() that never fails the request it runs in - reach is re-derived on the next change anyway */
    public static function trySync(\PDO $db, int $topicId): void
    {
        try {
            self::sync($db, $topicId);
        } catch (\Throwable $e) {
            error_log('ENoteAssessmentReach sync failed for topic ' . $topicId . ': ' . $e->getMessage());
        }
    }

    /**
     * The page in the student's own copy of the topic (published, reaching one of $classIds) that
     * matches an LOA's page, else the page itself.
     * @param int[] $classIds
     * @return array{topic_id:int, page_id:int}
     */
    public static function studentPage(\PDO $db, int $topicId, int $pageId, array $classIds): array
    {
        $fallback = ['topic_id' => $topicId, 'page_id' => $pageId];
        $classIds = array_values(array_filter(array_map('intval', $classIds)));
        if (!$classIds) {
            return $fallback;
        }
        $in = implode(',', array_fill(0, count($classIds), '?'));
        $stmt = $db->prepare(
            "SELECT mt.id AS topic_id, mp.id AS page_id
             FROM enote_pages lp
             INNER JOIN enote_topics lt ON lt.id = lp.topic_id
             INNER JOIN enote_topics mt ON (mt.id = lt.id OR (lt.content_group_id IS NOT NULL AND mt.content_group_id = lt.content_group_id))
                 AND mt.status = 'published' AND mt.deleted_at IS NULL
             INNER JOIN enote_pages mp ON mp.topic_id = mt.id AND mp.order_number = lp.order_number AND mp.deleted_at IS NULL
             WHERE lp.id = ?
               AND (mt.class_id IN ($in)
                    OR mt.class_group_name IN (SELECT c.name FROM classes c WHERE c.id IN ($in)))
             ORDER BY mt.id = lt.id DESC
             LIMIT 1"
        );
        $stmt->execute(array_merge([$pageId], $classIds, $classIds));
        $row = $stmt->fetch(\PDO::FETCH_ASSOC);
        return $row ? ['topic_id' => (int) $row['topic_id'], 'page_id' => (int) $row['page_id']] : $fallback;
    }
}
