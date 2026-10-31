<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * The shared content - copied from the master school (St Mark's) into another school's database
 * (developer portal: Copy content). What comes across, published only:
 *
 *   - the frame it hangs on: this year and its terms, departments and subjects (matched by code),
 *     and the classes S.1-S.6 with the streams the school names
 *   - the curriculum: topics with their learning outcomes, into every stream; constructs
 *   - eNotes (with their pages and narration), eLibrary books, Item Bank papers, videos
 *
 * Never people, marks, messages or anything a teacher hasn't published. Virtual Lab is left out.
 * Files (book PDFs, images, narration) are not copied - both schools point at the same stored file.
 *
 * Every row copied is remembered in the school's content_copies (master row -> its own row), so
 * copying again only adds what is new. Copied items belong to a "Tusome Library" teacher account
 * that can't sign in, and are shown to every stream of their class level.
 */
final class ContentLibrary
{
    private const OWNER_EMPLOYEE_NUMBER = 'TUSOME-LIBRARY';

    /** @var array<string, array<int, int[]>> table => master id => this school's ids */
    private array $copies = [];
    /** @var array<string, int> what was added, by kind */
    private array $added = [];
    private array $deptByMaster = [];
    private array $subjectByMaster = [];
    private array $termByMaster = [];
    /** @var array<string, int[]> class name (S.1) => this school's stream ids */
    private array $streamsByLevel = [];
    private array $masterClassName = [];
    private int $masterYearId = 0;
    private int $yearId = 0;
    private int $ownerId = 0;
    private int $adminId = 0;

    public function __construct(private \PDO $master, private \PDO $school)
    {
    }

    /**
     * @param string[] $streams the school's stream names for every class, e.g. ['A', 'B']
     * @return array<string, int> how many of each kind were added
     */
    public function copy(array $streams): array
    {
        $streams = array_values(array_unique(array_filter(array_map(fn($s) => mb_substr(trim((string) $s), 0, 20), $streams), 'strlen'))) ?: ['A'];
        $this->loadCopies();
        $this->school->beginTransaction();
        try {
            $this->frame($streams);
            $this->owner();
            $this->curriculum();
            $this->constructs();
            $this->enotes();
            $this->shareNotes();
            $this->library();
            $this->itemBank();
            $this->videos();
            $this->school->commit();
        } catch (\Throwable $e) {
            if ($this->school->inTransaction()) {
                $this->school->rollBack();
            }
            throw $e;
        }
        return $this->added;
    }

    // ------------------------------------------------------------------ helpers

    private function loadCopies(): void
    {
        foreach ($this->school->query('SELECT source_table, source_id, local_id FROM content_copies ORDER BY id')->fetchAll(\PDO::FETCH_ASSOC) as $r) {
            $this->copies[$r['source_table']][(int) $r['source_id']][] = (int) $r['local_id'];
        }
    }

    private function copied(string $table, int $masterId): array
    {
        return $this->copies[$table][$masterId] ?? [];
    }

    private function remember(string $table, int $masterId, int $localId): void
    {
        $this->school->prepare('INSERT IGNORE INTO content_copies (source_table, source_id, local_id) VALUES (?, ?, ?)')
            ->execute([$table, $masterId, $localId]);
        $this->copies[$table][$masterId][] = $localId;
    }

    private function count(string $kind, int $n = 1): void
    {
        $this->added[$kind] = ($this->added[$kind] ?? 0) + $n;
    }

    /** Insert a master row into this school, with some columns replaced. Returns the new id. */
    private function insert(string $table, array $row, array $set): int
    {
        unset($row['id']);
        $row = array_merge($row, $set);
        $cols = array_keys($row);
        $this->school->prepare(
            "INSERT INTO `{$table}` (`" . implode('`, `', $cols) . '`) VALUES (' . implode(', ', array_fill(0, count($cols), '?')) . ')'
        )->execute(array_values($row));
        return (int) $this->school->lastInsertId();
    }

    private function rows(string $sql, array $params = []): array
    {
        $stmt = $this->master->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    private function one(string $sql, array $params = []): mixed
    {
        $stmt = $this->school->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchColumn();
    }

    /** The class level a master item is for ("S.1"), or null for every class */
    private function levelOf(array $row): ?string
    {
        if (!empty($row['class_group_name'])) {
            return $row['class_group_name'];
        }
        return !empty($row['class_id']) ? ($this->masterClassName[(int) $row['class_id']] ?? null) : null;
    }

    // ------------------------------------------------------------------ the frame

    private function frame(array $streams): void
    {
        $year = $this->rows('SELECT * FROM academic_years WHERE is_current = 1 AND deleted_at IS NULL ORDER BY id DESC LIMIT 1')[0] ?? null;
        if (!$year) {
            throw new \RuntimeException('The master school has no current academic year.');
        }
        $this->masterYearId = (int) $year['id'];
        $this->yearId = (int) ($this->one('SELECT id FROM academic_years WHERE name = ? AND deleted_at IS NULL', [$year['name']]) ?: 0);
        if (!$this->yearId) {
            $hasCurrent = (int) $this->one('SELECT COUNT(*) FROM academic_years WHERE is_current = 1 AND deleted_at IS NULL') > 0;
            $this->yearId = $this->insert('academic_years', $year, ['is_current' => $hasCurrent ? 0 : 1]);
            $this->count('years');
        }
        foreach ($this->rows('SELECT * FROM terms WHERE academic_year_id = ? AND deleted_at IS NULL', [$this->masterYearId]) as $t) {
            $id = (int) ($this->one('SELECT id FROM terms WHERE academic_year_id = ? AND name = ? AND deleted_at IS NULL', [$this->yearId, $t['name']]) ?: 0);
            if (!$id) {
                $id = $this->insert('terms', $t, ['academic_year_id' => $this->yearId]);
                $this->count('terms');
            }
            $this->termByMaster[(int) $t['id']] = $id;
        }

        foreach ($this->rows('SELECT * FROM departments WHERE deleted_at IS NULL') as $d) {
            $id = (int) ($this->one('SELECT id FROM departments WHERE code = ? AND deleted_at IS NULL', [$d['code']]) ?: 0);
            if (!$id) {
                $id = $this->insert('departments', $d, ['head_id' => null]);
                $this->count('departments');
            }
            $this->deptByMaster[(int) $d['id']] = $id;
        }
        foreach ($this->rows('SELECT * FROM subjects WHERE deleted_at IS NULL') as $s) {
            $id = (int) ($this->one('SELECT id FROM subjects WHERE code = ? AND deleted_at IS NULL', [$s['code']]) ?: 0);
            if (!$id) {
                $id = $this->insert('subjects', $s, ['department_id' => $this->deptByMaster[(int) $s['department_id']] ?? null]);
                $this->count('subjects');
            }
            $this->subjectByMaster[(int) $s['id']] = $id;
        }

        // S.1-S.6 with the school's streams; the master's own streams only tell us the levels
        foreach ($this->rows('SELECT id, name FROM classes') as $c) {
            $this->masterClassName[(int) $c['id']] = $c['name'];
        }
        $levels = $this->rows('SELECT name, MIN(level) AS level FROM classes WHERE academic_year_id = ? AND deleted_at IS NULL GROUP BY name ORDER BY name', [$this->masterYearId]);
        foreach ($levels as $l) {
            foreach ($streams as $stream) {
                $id = (int) ($this->one('SELECT id FROM classes WHERE name = ? AND stream_name = ? AND academic_year_id = ? AND deleted_at IS NULL', [$l['name'], $stream, $this->yearId]) ?: 0);
                if (!$id) {
                    $this->school->prepare('INSERT INTO classes (name, level, stream_name, academic_year_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())')
                        ->execute([$l['name'], $l['level'], $stream, $this->yearId]);
                    $id = (int) $this->school->lastInsertId();
                    $this->count('classes');
                }
                $this->streamsByLevel[$l['name']][] = $id;
            }
        }
    }

    /** The "Tusome Library" teacher that copied content belongs to - it can't sign in */
    private function owner(): void
    {
        $this->ownerId = (int) ($this->one('SELECT id FROM teachers WHERE employee_number = ?', [self::OWNER_EMPLOYEE_NUMBER]) ?: 0);
        if (!$this->ownerId) {
            $this->school->prepare(
                "INSERT INTO teachers (username, password, employee_number, first_name, last_name, date_of_birth, gender, hire_date, is_active, created_at, updated_at)
                 VALUES (NULL, NULL, ?, 'Tusome', 'Library', '2000-01-01', 'other', CURDATE(), 0, NOW(), NOW())"
            )->execute([self::OWNER_EMPLOYEE_NUMBER]);
            $this->ownerId = (int) $this->school->lastInsertId();
        }
        $this->adminId = (int) ($this->one('SELECT MIN(id) FROM users') ?: 0);
    }

    // ------------------------------------------------------------------ curriculum

    /** Topic copies into every stream of its level. A master topic repeated across its streams is one topic. */
    private function curriculum(): void
    {
        $topics = $this->rows(
            'SELECT ct.*, c.name AS level_name FROM enote_curriculum_topics ct INNER JOIN classes c ON c.id = ct.class_id
             WHERE ct.deleted_at IS NULL AND ct.academic_year_id = ? ORDER BY ct.id',
            [$this->masterYearId]
        );
        $groups = [];
        foreach ($topics as $t) {
            $key = implode('|', [$t['level_name'], $t['subject_id'], $t['term_id'], mb_strtolower(trim($t['theme_branch'])), mb_strtolower(trim($t['topic']))]);
            $groups[$key][] = $t;
        }
        $outcomes = $this->master->prepare('SELECT * FROM enote_learning_outcomes WHERE curriculum_topic_id = ? ORDER BY order_number, id');
        foreach ($groups as $members) {
            $rep = $members[0];
            $locals = $this->copied('enote_curriculum_topics', (int) $rep['id']);
            $subject = $this->subjectByMaster[(int) $rep['subject_id']] ?? null;
            $term = $this->termByMaster[(int) $rep['term_id']] ?? null;
            // the streams that don't have this topic yet - all of them the first time, a stream
            // added since then on a later copy
            $have = $locals
                ? array_map('intval', $this->school->query('SELECT class_id FROM enote_curriculum_topics WHERE id IN (' . implode(',', array_map('intval', $locals)) . ')')->fetchAll(\PDO::FETCH_COLUMN))
                : [];
            $missing = array_diff($this->streamsByLevel[$rep['level_name']] ?? [], $have);
            if ($missing && $subject && $term) {
                $outcomes->execute([$rep['id']]);
                $outs = $outcomes->fetchAll(\PDO::FETCH_ASSOC);
                foreach ($missing as $classId) {
                    $row = $rep;
                    unset($row['level_name']);
                    $local = $this->insert('enote_curriculum_topics', $row, [
                        'subject_id' => $subject, 'academic_year_id' => $this->yearId, 'class_id' => $classId, 'term_id' => $term, 'created_by' => null,
                    ]);
                    $this->remember('enote_curriculum_topics', (int) $rep['id'], $local);
                    foreach ($outs as $o) {
                        $this->insert('enote_learning_outcomes', $o, ['curriculum_topic_id' => $local]);
                    }
                    $this->count('curriculum topics');
                    $this->count('learning outcomes', count($outs));
                }
                $locals = $this->copied('enote_curriculum_topics', (int) $rep['id']);
            }
            // every stream's copy at the master stands for the same topic here
            foreach ($members as $m) {
                $this->copies['topic_by_member'][(int) $m['id']] = $locals;
            }
        }
    }

    /** This school's topics standing for a master topic: every stream, or the first */
    private function topicsFor(?int $masterTopicId): array
    {
        return $masterTopicId ? ($this->copies['topic_by_member'][$masterTopicId] ?? []) : [];
    }

    private function constructs(): void
    {
        $links = $this->master->prepare('SELECT curriculum_topic_id FROM construct_topics WHERE construct_id = ?');
        foreach ($this->rows('SELECT * FROM constructs WHERE deleted_at IS NULL ORDER BY id') as $c) {
            $subject = $this->subjectByMaster[(int) $c['subject_id']] ?? null;
            $dept = $this->deptByMaster[(int) $c['department_id']] ?? null;
            if (!$subject || !$dept) {
                continue;
            }
            $local = $this->copied('constructs', (int) $c['id'])[0] ?? null;
            if (!$local) {
                $local = $this->insert('constructs', $c, ['subject_id' => $subject, 'department_id' => $dept, 'created_by' => $this->adminId ?: 1]);
                $this->remember('constructs', (int) $c['id'], $local);
                $this->count('constructs');
            }
            // its topics in every stream - a stream added since the last copy too
            $links->execute([$c['id']]);
            $add = $this->school->prepare('INSERT IGNORE INTO construct_topics (construct_id, curriculum_topic_id, created_at) VALUES (?, ?, NOW())');
            foreach ($links->fetchAll(\PDO::FETCH_COLUMN) as $topicId) {
                foreach ($this->topicsFor((int) $topicId) as $t) {
                    $add->execute([$local, $t]);
                }
            }
        }
    }

    // ------------------------------------------------------------------ teaching content

    /** Published eNote topics, one per content group, with their pages and narration */
    private function enotes(): void
    {
        $pages = $this->master->prepare('SELECT * FROM enote_pages WHERE topic_id = ? AND deleted_at IS NULL ORDER BY order_number, id');
        $narrations = $this->master->prepare('SELECT * FROM enote_page_narrations WHERE page_id = ?');
        $seenGroups = [];
        foreach ($this->rows("SELECT * FROM enote_topics WHERE status = 'published' AND deleted_at IS NULL ORDER BY id") as $t) {
            if ($t['content_group_id'] !== null) {
                if (isset($seenGroups[$t['content_group_id']])) {
                    continue;
                }
                $seenGroups[$t['content_group_id']] = true;
            }
            $subject = $this->subjectByMaster[(int) $t['subject_id']] ?? null;
            $dept = $this->deptByMaster[(int) $t['department_id']] ?? null;
            if ($this->copied('enote_topics', (int) $t['id']) || !$subject || !$dept) {
                continue;
            }
            $local = $this->insert('enote_topics', $t, [
                'teacher_id' => $this->ownerId, 'content_group_id' => null, 'shared_from_id' => null, 'shared_at' => null,
                'curriculum_topic_id' => $this->topicsFor($t['curriculum_topic_id'] ? (int) $t['curriculum_topic_id'] : null)[0] ?? null,
                'class_id' => null, 'class_group_name' => $this->levelOf($t), 'subject_id' => $subject, 'department_id' => $dept,
            ]);
            $this->remember('enote_topics', (int) $t['id'], $local);
            $this->count('eNote topics');
            $pages->execute([$t['id']]);
            foreach ($pages->fetchAll(\PDO::FETCH_ASSOC) as $p) {
                $page = $this->insert('enote_pages', $p, ['topic_id' => $local]);
                $narrations->execute([$p['id']]);
                foreach ($narrations->fetchAll(\PDO::FETCH_ASSOC) as $n) {
                    $this->insert('enote_page_narrations', $n, ['page_id' => $page]);
                }
                $this->count('eNote pages');
            }
        }
    }

    /**
     * The Tusome Library's eNotes are shared with their department, so a teacher finds them under
     * the department's shared notes and copies one into their own classes to adapt it (the copy
     * is theirs to edit - see Teacher\ENoteController shared copy). Also shares notes copied
     * before this existed.
     */
    private function shareNotes(): void
    {
        $this->school->prepare('UPDATE enote_topics SET shared_at = COALESCE(shared_at, NOW()) WHERE teacher_id = ? AND deleted_at IS NULL')
            ->execute([$this->ownerId]);
    }

    private function library(): void
    {
        foreach ($this->rows("SELECT * FROM library_books WHERE status = 'published' AND is_approved = 1 AND deleted_at IS NULL ORDER BY id") as $b) {
            if ($this->copied('library_books', (int) $b['id'])) {
                continue;
            }
            $local = $this->insert('library_books', $b, [
                'subject_id' => $b['subject_id'] ? ($this->subjectByMaster[(int) $b['subject_id']] ?? null) : null,
                'department_id' => $b['department_id'] ? ($this->deptByMaster[(int) $b['department_id']] ?? null) : null,
                'class_id' => null, 'class_group_name' => $this->levelOf($b),
                'uploaded_by' => $this->ownerId, 'uploader_role' => 'teacher', 'uploader_id' => $this->ownerId,
                'approved_by' => null, 'assigned_to' => null, 'assigned_id' => null,
            ]);
            $this->remember('library_books', (int) $b['id'], $local);
            $this->count('books');
        }
    }

    private function itemBank(): void
    {
        $pages = $this->master->prepare('SELECT * FROM item_bank_pages WHERE item_id = ? AND deleted_at IS NULL ORDER BY page_number');
        $links = $this->master->prepare('SELECT curriculum_topic_id FROM item_bank_curriculum_topics WHERE question_id = ?');
        foreach ($this->rows("SELECT * FROM item_bank_questions WHERE status = 'published' AND deleted_at IS NULL ORDER BY id") as $q) {
            $subject = $this->subjectByMaster[(int) $q['subject_id']] ?? null;
            if (!$subject) {
                continue;
            }
            $local = $this->copied('item_bank_questions', (int) $q['id'])[0] ?? null;
            if (!$local) {
                $local = $this->insert('item_bank_questions', $q, [
                    'subject_id' => $subject, 'topic_id' => null,
                    'department_id' => $q['department_id'] ? ($this->deptByMaster[(int) $q['department_id']] ?? null) : null,
                    'class_id' => null, 'class_group_name' => $this->levelOf($q),
                    'created_by' => $this->ownerId, 'uploader_role' => 'teacher', 'uploader_id' => $this->ownerId, 'approved_by' => null,
                ]);
                $this->remember('item_bank_questions', (int) $q['id'], $local);
                $this->count('Item Bank papers');
                $pages->execute([$q['id']]);
                foreach ($pages->fetchAll(\PDO::FETCH_ASSOC) as $p) {
                    $this->insert('item_bank_pages', $p, ['item_id' => $local]);
                }
            }
            // its topics in every stream - a stream added since the last copy too
            $links->execute([$q['id']]);
            $add = $this->school->prepare('INSERT IGNORE INTO item_bank_curriculum_topics (question_id, curriculum_topic_id, created_at) VALUES (?, ?, NOW())');
            foreach ($links->fetchAll(\PDO::FETCH_COLUMN) as $topicId) {
                foreach ($this->topicsFor((int) $topicId) as $t) {
                    $add->execute([$local, $t]);
                }
            }
        }
    }

    private function videos(): void
    {
        foreach ($this->rows("SELECT * FROM videos WHERE status = 'published' AND deleted_at IS NULL ORDER BY id") as $v) {
            if ($this->copied('videos', (int) $v['id'])) {
                continue;
            }
            $local = $this->insert('videos', $v, [
                'subject_id' => $v['subject_id'] ? ($this->subjectByMaster[(int) $v['subject_id']] ?? null) : null,
                'department_id' => $v['department_id'] ? ($this->deptByMaster[(int) $v['department_id']] ?? null) : null,
                'class_id' => null, 'class_group_name' => $this->levelOf($v),
                'teacher_id' => $this->ownerId, 'created_by' => null, 'uploader_role' => 'teacher', 'uploader_id' => $this->ownerId,
            ]);
            $this->remember('videos', (int) $v['id'], $local);
            $this->count('videos');
        }
    }
}
