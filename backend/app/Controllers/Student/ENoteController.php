<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;

/**
 * Student eNotes Controller
 *
 * Read-only access to the topics/pages eNotes module for students - a topic is visible
 * once published if the student is enrolled in its department, and (when the topic
 * targets a specific class) the student's class in that department matches.
 */
class ENoteController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    protected function getCurrentUserId(): ?int
    {
        return $_SESSION['user_id'] ?? null;
    }

    private function getStudentId(): ?int
    {
        $userId = $this->getCurrentUserId();
        if (!$userId) {
            return null;
        }

        $db = $this->getDb();
        $stmt = $db->prepare("SELECT id FROM students WHERE id = :user_id AND deleted_at IS NULL");
        $stmt->execute(['user_id' => $userId]);
        $student = $stmt->fetch();

        return $student ? (int) $student['id'] : null;
    }

    /**
     * TEMPORARY diagnostic logging for verifying AI Tutor's shared cache actually skips
     * Gemini/ElevenLabs on a cache hit - remove once confirmed in production.
     */
    private function logTutorCacheEvent(string $line): void
    {
        $dir = __DIR__ . '/../../../storage/logs/';
        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }
        error_log('[' . date('Y-m-d H:i:s') . '] ' . $line . PHP_EOL, 3, $dir . 'ai_tutor.log');
    }

    /**
     * Decode the stored learning_outcomes JSON column back into a plain array for the API
     * response.
     */
    private function decodeLearningOutcomes(array $topic): array
    {
        $topic['learning_outcomes'] = !empty($topic['learning_outcomes'])
            ? (json_decode($topic['learning_outcomes'], true) ?: [])
            : [];
        return $topic;
    }

    /**
     * Visibility rule shared by index() and show(): the topic must be published, and the
     * student must have a department enrollment matching the topic's department where,
     * if the topic targets a specific class, that enrollment's class also matches.
     */
    private function visibilityClause(): string
    {
        return "et.status = 'published' AND et.deleted_at IS NULL AND EXISTS (
            SELECT 1 FROM student_department_enrollments sde
            LEFT JOIN classes sde_c ON sde_c.id = sde.class_id
            WHERE sde.student_id = :student_id
              AND sde.department_id = et.department_id
              AND sde.deleted_at IS NULL
              AND sde.status = 'active'
              AND (
                (et.class_id IS NULL AND et.class_group_name IS NULL)
                OR sde.class_id = et.class_id
                OR (et.class_group_name IS NOT NULL AND sde_c.name = et.class_group_name)
              )
              AND et.published_at <= COALESCE(sde.end_date, NOW())
        ) AND NOT EXISTS (
            SELECT 1 FROM student_teacher_enrollments ste
            WHERE ste.student_id = :student_id_te
              AND ste.teacher_id = et.teacher_id
              AND ste.department_id = et.department_id
              AND ste.status = 'withdrawn'
        )";
    }

    /**
     * Get all eNote topics visible to the student
     * GET /student/enotes/topics
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $search = $this->query('search', '');
        $subjectId = $this->query('subject_id', '');

        $db = $this->getDb();

        $where = [$this->visibilityClause()];
        $params = ['student_id' => $studentId, 'student_id_te' => $studentId];

        if (!empty($search)) {
            $where[] = '(et.title LIKE :search OR et.description LIKE :search)';
            $params['search'] = "%{$search}%";
        }

        if (!empty($subjectId)) {
            $where[] = 'et.subject_id = :subject_id';
            $params['subject_id'] = $subjectId;
        }

        $whereClause = implode(' AND ', $where);

        $sql = "SELECT et.id, et.title, et.description, et.learning_outcomes, et.subject_id, et.class_id, et.total_pages,
                       et.estimated_reading_time, et.published_at, et.created_at,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN teachers t ON et.teacher_id = t.id
                WHERE {$whereClause}
                ORDER BY et.published_at DESC";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $topics = array_map([$this, 'decodeLearningOutcomes'], $stmt->fetchAll());

        $this->success(['topics' => $topics]);
    }

    /**
     * Get a single topic with its pages
     * GET /student/enotes/topics/{id}
     */
    public function show($id): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $id = (int) $id;
        $db = $this->getDb();

        $whereClause = $this->visibilityClause();

        $sql = "SELECT et.id, et.title, et.description, et.learning_outcomes, et.subject_id, et.class_id, et.total_pages,
                       et.estimated_reading_time, et.published_at, et.created_at, et.narration_voice,
                       s.name as subject_name, s.code as subject_code,
                       t.first_name as teacher_first_name, t.last_name as teacher_last_name
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN teachers t ON et.teacher_id = t.id
                WHERE et.id = :id AND {$whereClause}";

        $stmt = $db->prepare($sql);
        $stmt->execute(['id' => $id, 'student_id' => $studentId, 'student_id_te' => $studentId]);
        $topic = $stmt->fetch();

        if (!$topic) {
            $this->notFound('Topic not found or not accessible');
            return;
        }

        $topic = $this->decodeLearningOutcomes($topic);

        $stmt = $db->prepare(
            "SELECT id, title, content, order_number FROM enote_pages
             WHERE topic_id = :topic_id AND is_active = 1 AND deleted_at IS NULL
             ORDER BY order_number ASC"
        );
        $stmt->execute(['topic_id' => $id]);
        $pages = $stmt->fetchAll();

        $previewService = new \eSpace\App\Services\StudentModulePreviewService();
        $topic['pages'] = $previewService->attachNarrationAudio($pages, $topic['narration_voice']);

        $this->success($topic);
    }

    /**
     * AI Tutor: generate (or reuse cached) a paragraph-by-paragraph walkthrough of a page - one
     * short spoken explanation per paragraph, in order, so the frontend can play/highlight each
     * paragraph in turn. Distinct from the word-for-word Read Aloud narration (see
     * Teacher\ENoteController::generatePageNarration). Cached per (page, paragraph, voice) with a
     * per-paragraph content-hash staleness check, so editing one paragraph only invalidates that
     * paragraph; pass force=true (the "Explain Again" control) to bypass the cache entirely.
     * POST /student/enotes/pages/{pageId}/tutor-explain
     */
    public function tutorExplain($pageId): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $studentId = $this->getStudentId();
        if (!$studentId) {
            $this->error('Student not found', 403);
            return;
        }

        $pageId = (int) $pageId;
        $force = (bool) ($this->input('force') ?? false);

        $db = $this->getDb();
        $whereClause = $this->visibilityClause();

        $stmt = $db->prepare(
            "SELECT ep.id, ep.content, et.title AS topic_title, et.narration_voice, et.department_id,
                    s.name AS subject_name
             FROM enote_pages ep
             INNER JOIN enote_topics et ON ep.topic_id = et.id
             LEFT JOIN subjects s ON et.subject_id = s.id
             WHERE ep.id = :page_id AND ep.is_active = 1 AND ep.deleted_at IS NULL AND {$whereClause}"
        );
        $stmt->execute(['page_id' => $pageId, 'student_id' => $studentId]);
        $page = $stmt->fetch();

        if (!$page) {
            $this->notFound('Page not found or not accessible');
            return;
        }

        $blocks = \eSpace\App\Utils\HtmlBlockSplitter::split($page['content']);
        if (empty($blocks)) {
            $this->error('This page has no paragraphs for the AI Tutor to walk through.', 422);
            return;
        }

        $stmt = $db->prepare(
            "SELECT c.level FROM student_department_enrollments sde
             LEFT JOIN classes c ON sde.class_id = c.id
             WHERE sde.student_id = :student_id AND sde.department_id = :department_id AND sde.deleted_at IS NULL
             LIMIT 1"
        );
        $stmt->execute(['student_id' => $studentId, 'department_id' => $page['department_id']]);
        $enrollment = $stmt->fetch();
        $classLevel = $enrollment['level'] ?? null;

        $voice = $page['narration_voice'] ?: \eSpace\App\Services\ElevenLabsTTSService::VOICES[0];
        $hashes = array_map(fn($b) => hash('sha256', $b['text']), $blocks);

        // Every paragraph must have a fresh cached row for this to count as "fully cached" -
        // otherwise even a single edited/new paragraph would silently serve stale/missing audio.
        $cacheLookup = function () use ($db, $pageId, $voice) {
            $stmt = $db->prepare(
                "SELECT paragraph_index, explanation_text, audio_path, content_hash, updated_at
                 FROM enote_page_tutor_explanations WHERE page_id = :page_id AND voice = :voice"
            );
            $stmt->execute(['page_id' => $pageId, 'voice' => $voice]);
            $byIndex = [];
            foreach ($stmt->fetchAll() as $row) {
                $byIndex[(int) $row['paragraph_index']] = $row;
            }
            return $byIndex;
        };

        $buildResponseFromCache = function (array $byIndex) use ($blocks, $hashes) {
            $result = [];
            foreach ($blocks as $i => $block) {
                $row = $byIndex[$i] ?? null;
                if (!$row || $row['content_hash'] !== $hashes[$i]) {
                    return null;
                }
                $result[] = [
                    'paragraph_index' => $i,
                    'explanation_text' => $row['explanation_text'],
                    'audio_path' => $row['audio_path'],
                    'generated_at' => $row['updated_at'],
                ];
            }
            return $result;
        };

        if (!$force) {
            $ready = $buildResponseFromCache($cacheLookup());
            if ($ready !== null) {
                $this->logTutorCacheEvent("AI TUTOR: CACHE HIT - note_id {$pageId}");
                $this->success(['voice' => $voice, 'cached' => true, 'blocks' => $ready]);
                return;
            }
        }

        // Shared cache means many students can hit an uncached (or just-edited) page at once.
        // Without a lock, all of them would call Gemini + ElevenLabs in parallel - wasteful and
        // expensive at 3,000+ students. GET_LOCK is a MySQL session-scoped advisory lock: the
        // first request to arrive generates the whole paragraph batch while everyone else blocks
        // here (up to $lockTimeout seconds) and, once released, re-checks the cache the first
        // generator just filled instead of generating themselves. MySQL auto-releases the lock if
        // this connection ever dies mid-request, so a crash here can't wedge the lock open.
        $lockName = "ai_tutor_page_{$pageId}_{$voice}";
        $lockTimeout = 45;

        $stmt = $db->prepare('SELECT GET_LOCK(:name, :timeout) AS acquired');
        $stmt->execute(['name' => $lockName, 'timeout' => $lockTimeout]);
        $lockRow = $stmt->fetch();
        $lockAcquired = $lockRow && (int) $lockRow['acquired'] === 1;

        if (!$lockAcquired) {
            $this->error('AI Tutor is preparing this walkthrough for another student right now. Please try again in a few seconds.', 503);
            return;
        }

        // Controller::success()/error() call exit() directly, so a try/finally here would never
        // run - the lock must be released explicitly before every response below, not deferred.
        $releaseLock = function () use ($db, $lockName) {
            $stmt = $db->prepare('SELECT RELEASE_LOCK(:name)');
            $stmt->execute(['name' => $lockName]);
        };

        if (!$force) {
            // Double-checked: whoever held the lock before us may have just finished generating.
            $ready = $buildResponseFromCache($cacheLookup());
            if ($ready !== null) {
                $releaseLock();
                $this->logTutorCacheEvent("AI TUTOR: CACHE HIT - note_id {$pageId} (post-lock, another request just generated it)");
                $this->success(['voice' => $voice, 'cached' => true, 'blocks' => $ready]);
                return;
            }
        }

        $this->logTutorCacheEvent("AI TUTOR: CACHE MISS - generating note_id {$pageId}");

        $gemini = new \eSpace\App\Services\GeminiExplanationService();
        $tts = new \eSpace\App\Services\ElevenLabsTTSService();

        try {
            $texts = array_column($blocks, 'text');
            $explanations = $gemini->explainParagraphs($texts, $page['topic_title'], $page['subject_name'] ?? '', $classLevel);

            $audioByIndex = [];
            foreach ($explanations as $i => $explanation) {
                // $explanation keeps its **key point** marker (the frontend highlights it in red);
                // strip it before speech so the audio never reads out literal asterisks.
                $spokenText = preg_replace('/\*\*(.+?)\*\*/s', '$1', $explanation) ?? $explanation;
                $speechText = $tts->htmlToSpeechText($spokenText);
                $audioByIndex[$i] = $tts->synthesize($speechText, $voice);
            }
        } catch (\RuntimeException $e) {
            $releaseLock();
            $this->error($e->getMessage(), 502);
            return;
        }

        $uploadDir = __DIR__ . '/../../../public/uploads/enote-tutor/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $existingByIndex = $cacheLookup();
        $result = [];

        foreach ($explanations as $i => $explanation) {
            $filename = "tutor_{$pageId}_{$i}_{$voice}_" . bin2hex(random_bytes(6)) . '.mp3';
            $filepath = $uploadDir . $filename;

            if (file_put_contents($filepath, $audioByIndex[$i]) === false) {
                $releaseLock();
                $this->serverError('Failed to save explanation audio');
                return;
            }

            $audioUrl = '/uploads/enote-tutor/' . $filename;

            // Delete the old audio file for this (page, paragraph, voice) before overwriting the
            // row, so regenerating doesn't leak orphaned mp3s on disk.
            $existing = $existingByIndex[$i] ?? null;
            if ($existing) {
                $oldPath = __DIR__ . '/../../../public' . $existing['audio_path'];
                if (is_file($oldPath)) {
                    @unlink($oldPath);
                }
            }

            $stmt = $db->prepare(
                "INSERT INTO enote_page_tutor_explanations
                    (page_id, paragraph_index, voice, explanation_text, audio_path, content_hash, created_at, updated_at)
                 VALUES (:page_id, :paragraph_index, :voice, :explanation_text, :audio_path, :content_hash, NOW(), NOW())
                 ON DUPLICATE KEY UPDATE explanation_text = :explanation_text2, audio_path = :audio_path2, content_hash = :content_hash2, updated_at = NOW()"
            );
            $stmt->execute([
                'page_id' => $pageId,
                'paragraph_index' => $i,
                'voice' => $voice,
                'explanation_text' => $explanation,
                'audio_path' => $audioUrl,
                'content_hash' => $hashes[$i],
                'explanation_text2' => $explanation,
                'audio_path2' => $audioUrl,
                'content_hash2' => $hashes[$i],
            ]);

            $result[] = [
                'paragraph_index' => $i,
                'explanation_text' => $explanation,
                'audio_path' => $audioUrl,
                'generated_at' => date('Y-m-d H:i:s'),
            ];
        }

        $releaseLock();

        $this->success(['voice' => $voice, 'cached' => false, 'blocks' => $result]);
    }
}
