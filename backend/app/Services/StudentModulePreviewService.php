<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * Student Module Preview Service
 *
 * Shared read queries for "Preview as Student" across eLibrary, Item Bank, and Live Classes -
 * each mirrors its Student\*Controller::index() query exactly, but filtered by a chosen
 * department/class pairing instead of a specific student's enrollment, since the caller (a
 * teacher/HOD/admin) is simulating "a student enrolled in this department/class" rather than
 * being one. Only published/visible content is ever returned - identical to what a real student
 * would see for that department/class.
 */
class StudentModulePreviewService
{
    public function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    public function getLibraryBooks(int $departmentId, int $classId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT lb.id, lb.title, lb.description, lb.subject_id, lb.class_id, lb.file_path,
                    lb.file_type, lb.file_size, lb.total_pages, lb.published_at, lb.created_at,
                    s.name as subject_name, s.code as subject_code,
                    t.first_name as teacher_first_name, t.last_name as teacher_last_name
             FROM library_books lb
             LEFT JOIN subjects s ON lb.subject_id = s.id
             LEFT JOIN teachers t ON lb.uploaded_by = t.id
             WHERE lb.status = 'published' AND lb.deleted_at IS NULL
               AND lb.department_id = :department_id AND (lb.class_id IS NULL OR lb.class_id = :class_id)
             ORDER BY lb.published_at DESC"
        );
        $stmt->execute(['department_id' => $departmentId, 'class_id' => $classId]);
        return $stmt->fetchAll();
    }

    public function getItemBankResources(int $departmentId, int $classId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT q.id, q.subject_id, q.class_id, q.question_text as title, q.explanation as description,
                    q.file_path, q.file_type, q.file_size, q.published_at, q.created_at,
                    s.name as subject_name, s.code as subject_code,
                    t.first_name as teacher_first_name, t.last_name as teacher_last_name
             FROM item_bank_questions q
             LEFT JOIN subjects s ON q.subject_id = s.id
             LEFT JOIN teachers t ON q.created_by = t.id
             WHERE q.status = 'published' AND q.deleted_at IS NULL
               AND q.department_id = :department_id AND (q.class_id IS NULL OR q.class_id = :class_id)
             ORDER BY q.published_at DESC"
        );
        $stmt->execute(['department_id' => $departmentId, 'class_id' => $classId]);
        return $stmt->fetchAll();
    }

    public function getVideos(int $departmentId, int $classId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT v.id, v.title, v.description, v.subject_id, v.class_id, v.file_path, v.status,
                    v.file_size, v.mime_type, v.duration, v.published_at, v.created_at,
                    s.name as subject_name, s.code as subject_code,
                    t.first_name as teacher_first_name, t.last_name as teacher_last_name
             FROM videos v
             LEFT JOIN subjects s ON v.subject_id = s.id
             LEFT JOIN teachers t ON v.teacher_id = t.id
             WHERE v.status = 'published' AND v.deleted_at IS NULL
               AND v.department_id = :department_id AND (v.class_id IS NULL OR v.class_id = :class_id)
             ORDER BY v.published_at DESC"
        );
        $stmt->execute(['department_id' => $departmentId, 'class_id' => $classId]);
        return $stmt->fetchAll();
    }

    public function getENoteTopics(int $departmentId, int $classId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT et.id, et.title, et.description, et.learning_outcomes, et.subject_id, et.class_id, et.total_pages,
                    et.estimated_reading_time, et.published_at, et.created_at,
                    s.name as subject_name, s.code as subject_code,
                    t.first_name as teacher_first_name, t.last_name as teacher_last_name
             FROM enote_topics et
             LEFT JOIN subjects s ON et.subject_id = s.id
             LEFT JOIN teachers t ON et.teacher_id = t.id
             WHERE et.status = 'published' AND et.deleted_at IS NULL
               AND et.department_id = :department_id AND (et.class_id IS NULL OR et.class_id = :class_id)
             ORDER BY et.published_at DESC"
        );
        $stmt->execute(['department_id' => $departmentId, 'class_id' => $classId]);

        return array_map(function ($topic) {
            $topic['learning_outcomes'] = !empty($topic['learning_outcomes'])
                ? (json_decode($topic['learning_outcomes'], true) ?: [])
                : [];
            return $topic;
        }, $stmt->fetchAll());
    }

    /**
     * A single eNote topic with its pages, scoped by department/class (published only) rather
     * than teacher ownership - for previewing a topic authored by any teacher in the department.
     */
    public function getENoteTopicForPreview(int $topicId, int $departmentId, int $classId): ?array
    {
        $db = $this->getDb();

        $stmt = $db->prepare(
            "SELECT et.*, s.name as subject_name, s.code as subject_code, c.name as class_name
             FROM enote_topics et
             LEFT JOIN subjects s ON et.subject_id = s.id
             LEFT JOIN classes c ON et.class_id = c.id
             WHERE et.id = :id AND et.status = 'published' AND et.deleted_at IS NULL
               AND et.department_id = :department_id AND (et.class_id IS NULL OR et.class_id = :class_id)"
        );
        $stmt->execute(['id' => $topicId, 'department_id' => $departmentId, 'class_id' => $classId]);
        $topic = $stmt->fetch();

        if (!$topic) {
            return null;
        }

        $topic['learning_outcomes'] = !empty($topic['learning_outcomes'])
            ? (json_decode($topic['learning_outcomes'], true) ?: [])
            : [];

        $stmt = $db->prepare("SELECT * FROM enote_pages WHERE topic_id = :topic_id AND deleted_at IS NULL ORDER BY order_number ASC");
        $stmt->execute(['topic_id' => $topicId]);
        $pages = $stmt->fetchAll();

        $topic['pages'] = $this->attachNarrationAudio($pages, $topic['narration_voice'] ?? null);

        return $topic;
    }

    /**
     * Attach the cached narration audio URL (for $voice specifically) to each page, if one has
     * been generated. Read-only consumers (student real view, staff preview) only ever need the
     * single "currently selected" voice's audio, not every cached voice like the authoring view.
     */
    public function attachNarrationAudio(array $pages, ?string $voice): array
    {
        if (empty($pages) || !$voice) {
            foreach ($pages as &$page) {
                $page['narration_audio_path'] = null;
            }
            return $pages;
        }

        $db = $this->getDb();
        $pageIds = array_column($pages, 'id');
        $placeholders = implode(',', array_fill(0, count($pageIds), '?'));

        $stmt = $db->prepare(
            "SELECT page_id, audio_path FROM enote_page_narrations WHERE voice = ? AND page_id IN ({$placeholders})"
        );
        $stmt->execute(array_merge([$voice], $pageIds));

        $audioByPage = [];
        foreach ($stmt->fetchAll() as $row) {
            $audioByPage[(int) $row['page_id']] = $row['audio_path'];
        }

        foreach ($pages as &$page) {
            $page['narration_audio_path'] = $audioByPage[(int) $page['id']] ?? null;
        }
        unset($page);

        return $pages;
    }

    public function getLiveClasses(int $departmentId, int $classId): array
    {
        $stmt = $this->getDb()->prepare(
            "SELECT lc.id, lc.subject_id, lc.class_id, lc.title, lc.description,
                    lc.scheduled_start, lc.scheduled_end, lc.actual_start, lc.actual_end,
                    lc.is_recorded, lc.recording_url, lc.status, lc.created_at,
                    s.name as subject_name, s.code as subject_code,
                    c.name as class_name, c.level as class_level, c.stream_name as class_stream_name,
                    t.first_name as teacher_first_name, t.last_name as teacher_last_name
             FROM live_classes lc
             LEFT JOIN subjects s ON lc.subject_id = s.id
             LEFT JOIN classes c ON lc.class_id = c.id
             LEFT JOIN teachers t ON lc.created_by = t.id
             WHERE lc.deleted_at IS NULL
               AND lc.department_id = :department_id AND (lc.class_id IS NULL OR lc.class_id = :class_id)
             ORDER BY lc.scheduled_start DESC"
        );
        $stmt->execute(['department_id' => $departmentId, 'class_id' => $classId]);
        return $stmt->fetchAll();
    }
}
