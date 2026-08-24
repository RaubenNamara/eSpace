<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use RuntimeException;

/**
 * Global Search Service
 *
 * Searches across eNotes, eLibrary, Assignments, Item Bank, Videos, and Lessons (live classes,
 * including recordings), plus the Subjects catalog, all in one UNION ALL query per call - each
 * content type contributes one branch with a normalized column shape (type, id, title,
 * description, subject_id, subject_name, class_id, class_name, file_path, published_at), then
 * the search term/subject filter/relevance ranking are applied once against the combined result
 * set rather than repeated per branch.
 *
 * Permission is enforced here, not in the frontend: every branch bakes in the exact same
 * visibility rule the corresponding list endpoint already uses (student:
 * Student\VideoController's EXISTS-against-student_department_enrollments pattern; teacher:
 * published-in-their-department OR their own content, matching how a teacher already sees their
 * own drafts in Teacher\ENoteController::index() plus what they'd want to reference from
 * colleagues). The `topics` table (separate from enote_topics) was checked and found unused
 * (0 rows, no write path in the app) - "Topics/Subjects" search is served from the real
 * `subjects` catalog instead.
 *
 * PDO's non-emulated prepares (this app's ATTR_EMULATE_PREPARES => false) can't reuse a named
 * placeholder twice in one query string, even for the same value bound repeatedly across UNION
 * branches - bind() below generates a fresh placeholder name per occurrence and accumulates the
 * value into $params, so every branch stays fully parameterized. The same non-emulated mode also
 * rejects the opposite case - passing execute() any bound value with no matching placeholder in
 * that specific query (several separate queries here share one growing $params, so a given query
 * only uses a subset) - execute() below filters $params down to just the keys the query text
 * actually references before running.
 */
class SearchService
{
    private const VALID_TYPES = ['all', 'enote', 'library', 'assignment', 'item_bank', 'video', 'lesson'];

    private array $params = [];
    private int $counter = 0;

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function bind(string $value): string
    {
        $key = 'p' . (++$this->counter);
        $this->params[$key] = $value;
        return ':' . $key;
    }

    /**
     * Prepares and executes $sql, binding only the subset of the accumulated $params it actually
     * references - see the class docblock for why (non-emulated PDO rejects unused bound values).
     */
    private function run(string $sql): \PDOStatement
    {
        // Placeholder names are p1, p2, ... p10, p11 - a plain substring check for ":p1" would
        // also match inside ":p10"/":p11", silently re-including an unused param. Require the
        // placeholder not be followed by another digit.
        $used = [];
        foreach ($this->params as $key => $value) {
            if (preg_match('/:' . preg_quote($key, '/') . '(?!\d)/', $sql) === 1) {
                $used[$key] = $value;
            }
        }

        $stmt = $this->getDb()->prepare($sql);
        $stmt->execute($used);
        return $stmt;
    }

    public function search(string $role, int $userId, string $term, string $type, ?int $subjectId, int $page, int $perPage): array
    {
        $term = trim($term);
        if ($term === '') {
            throw new RuntimeException('Search term is required.');
        }
        if (!in_array($type, self::VALID_TYPES, true)) {
            $type = 'all';
        }

        $this->params = [];
        $this->counter = 0;

        $branches = $role === 'teacher' ? $this->teacherBranches($userId, $type) : $this->studentBranches($userId, $type);
        if (empty($branches)) {
            return ['results' => [], 'total' => 0, 'counts' => [], 'subject_counts' => [], 'page' => $page, 'per_page' => $perPage];
        }

        $union = implode(' UNION ALL ', $branches);

        $likeTerm = '%' . $term . '%';
        $prefixTerm = $term . '%';

        $whereLike1 = $this->bind($likeTerm);
        $whereLike2 = $this->bind($likeTerm);
        $termOnlyWhereSql = "(LOWER(title) LIKE LOWER({$whereLike1}) OR LOWER(description) LIKE LOWER({$whereLike2}))";

        $where = [$termOnlyWhereSql];
        if ($subjectId) {
            $subjParam = $this->bind((string) $subjectId);
            $where[] = "subject_id = {$subjParam}";
        }
        $whereSql = implode(' AND ', $where);

        $total = (int) $this->run("SELECT COUNT(*) as cnt FROM ({$union}) combined WHERE {$whereSql}")->fetch()['cnt'];

        $counts = [];
        foreach ($this->run("SELECT type, COUNT(*) as cnt FROM ({$union}) combined WHERE {$whereSql} GROUP BY type")->fetchAll() as $row) {
            $counts[$row['type']] = (int) $row['cnt'];
        }

        // "Related subjects" - a subject breakdown of everything matching the term (ignoring the
        // subject filter itself, so the chips stay a full picture to switch between), used by the
        // frontend both as the subject filter's option list and as a lightweight "related topics"
        // surface - built from real matched content rather than a separate, possibly-unrelated
        // subjects catalog call.
        $whereLike3 = $this->bind($likeTerm);
        $whereLike4 = $this->bind($likeTerm);
        $subjectTermWhereSql = "(LOWER(title) LIKE LOWER({$whereLike3}) OR LOWER(description) LIKE LOWER({$whereLike4})) AND subject_id IS NOT NULL";
        $subjectCountsSql = "SELECT subject_id, subject_name, COUNT(*) as cnt FROM ({$union}) combined
             WHERE {$subjectTermWhereSql} GROUP BY subject_id, subject_name ORDER BY cnt DESC LIMIT 12";
        $subjectCounts = array_map(fn($row) => [
            'subject_id' => (int) $row['subject_id'],
            'subject_name' => $row['subject_name'],
            'count' => (int) $row['cnt'],
        ], $this->run($subjectCountsSql)->fetchAll());

        $perPage = max(1, min(50, $perPage));
        $page = max(1, $page);
        $offset = ($page - 1) * $perPage;

        $relevanceExact = $this->bind($term);
        $relevancePrefix = $this->bind($prefixTerm);
        $relevanceTitleLike = $this->bind($likeTerm);

        $dataSql = "SELECT *,
                CASE
                    WHEN LOWER(title) = LOWER({$relevanceExact}) THEN 0
                    WHEN LOWER(title) LIKE LOWER({$relevancePrefix}) THEN 1
                    WHEN LOWER(title) LIKE LOWER({$relevanceTitleLike}) THEN 2
                    ELSE 3
                END AS relevance
            FROM ({$union}) combined
            WHERE {$whereSql}
            ORDER BY relevance ASC, published_at DESC
            LIMIT {$perPage} OFFSET {$offset}";

        return [
            'results' => array_map(fn($row) => $this->normalizeRow($row, $role), $this->run($dataSql)->fetchAll()),
            'total' => $total,
            'counts' => $counts,
            'subject_counts' => $subjectCounts,
            'page' => $page,
            'per_page' => $perPage,
        ];
    }

    /**
     * Small, fast variant for the autocomplete dropdown - titles only, top few matches, no
     * counts/pagination overhead.
     */
    public function suggestions(string $role, int $userId, string $term, int $limit = 8): array
    {
        $result = $this->search($role, $userId, $term, 'all', null, 1, $limit);
        return array_map(fn($r) => [
            'id' => $r['id'],
            'type' => $r['type'],
            'title' => $r['title'],
            'subject_name' => $r['subject_name'],
            'url' => $r['url'],
            'is_file' => $r['is_file'],
        ], $result['results']);
    }

    private function normalizeRow(array $row, string $role): array
    {
        $type = $row['type'];
        $id = (int) $row['id'];
        $filePath = $row['file_path'] ?: null;

        return [
            'type' => $type,
            'id' => $id,
            'title' => $row['title'],
            'description' => $row['description'],
            'subject_id' => $row['subject_id'] !== null ? (int) $row['subject_id'] : null,
            'subject_name' => $row['subject_name'],
            'class_id' => $row['class_id'] !== null ? (int) $row['class_id'] : null,
            'class_name' => $row['class_name'],
            'published_at' => $row['published_at'],
            'url' => $this->buildUrl($type, $id, $role, $filePath),
            'is_file' => $filePath !== null,
        ];
    }

    /**
     * Where a click should take the user: an in-app route where one exists for this content
     * type/role, otherwise the resource's own file (library/video/item bank PDFs, lesson
     * recordings) opened directly - both eLibrary and Item Bank uploads are PDFs with no
     * dedicated per-item viewer route today, so the file itself *is* "the actual resource".
     */
    private function buildUrl(string $type, int $id, string $role, ?string $filePath): string
    {
        switch ($type) {
            case 'enote':
                return $role === 'teacher' ? "/teacher/enotes/preview/{$id}" : "/student/enotes/{$id}";
            case 'assignment':
                return $role === 'teacher' ? "/teacher/assignments/{$id}" : "/student/assignments";
            case 'library':
                return $filePath ?: "/{$role}/library";
            case 'item_bank':
                return $filePath ?: "/{$role}/itembank";
            case 'video':
                return $filePath ?: "/{$role}/videos";
            case 'lesson':
                return $filePath ?: "/{$role}/live-classes";
            case 'subject':
                return "/{$role}/enotes";
            default:
                return "/{$role}/dashboard";
        }
    }

    /**
     * @return string[] SQL branches, one per content type, already parameter-bound via bind()
     */
    private function studentBranches(int $studentId, string $type): array
    {
        $branches = [];
        $want = fn(string $t) => $type === 'all' || $type === $t;

        if ($want('enote')) {
            $p = $this->bind((string) $studentId);
            $branches[] = "SELECT 'enote' as type, et.id, et.title, et.description, et.subject_id, s.name as subject_name,
                    et.class_id, c.name as class_name, NULL as file_path, COALESCE(et.published_at, et.created_at) as published_at
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                WHERE et.status = 'published' AND et.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM student_department_enrollments sde
                              WHERE sde.student_id = {$p} AND sde.department_id = et.department_id
                                AND sde.deleted_at IS NULL AND (et.class_id IS NULL OR sde.class_id = et.class_id))";
        }

        if ($want('library')) {
            $p = $this->bind((string) $studentId);
            $branches[] = "SELECT 'library' as type, lb.id, lb.title, lb.description, lb.subject_id, s.name as subject_name,
                    lb.class_id, c.name as class_name, lb.file_path, COALESCE(lb.published_at, lb.created_at) as published_at
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN classes c ON lb.class_id = c.id
                WHERE lb.status = 'published' AND lb.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM student_department_enrollments sde
                              WHERE sde.student_id = {$p} AND sde.department_id = lb.department_id
                                AND sde.deleted_at IS NULL AND (lb.class_id IS NULL OR sde.class_id = lb.class_id))";
        }

        if ($want('assignment')) {
            $p = $this->bind((string) $studentId);
            $branches[] = "SELECT 'assignment' as type, a.id, a.title, a.description, a.subject_id, s.name as subject_name,
                    a.class_id, c.name as class_name, NULL as file_path, COALESCE(a.published_at, a.created_at) as published_at
                FROM assignments a
                LEFT JOIN subjects s ON a.subject_id = s.id
                LEFT JOIN classes c ON a.class_id = c.id
                WHERE a.status = 'published' AND a.deleted_at IS NULL
                  AND a.class_id IN (SELECT class_id FROM student_department_enrollments WHERE student_id = {$p} AND deleted_at IS NULL)";
        }

        if ($want('item_bank')) {
            $p = $this->bind((string) $studentId);
            $branches[] = "SELECT 'item_bank' as type, ibq.id, ibq.question_text as title, ibq.explanation as description,
                    ibq.subject_id, s.name as subject_name, ibq.class_id, c.name as class_name, ibq.file_path,
                    COALESCE(ibq.published_at, ibq.created_at) as published_at
                FROM item_bank_questions ibq
                LEFT JOIN subjects s ON ibq.subject_id = s.id
                LEFT JOIN classes c ON ibq.class_id = c.id
                WHERE ibq.status = 'published' AND ibq.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM student_department_enrollments sde
                              WHERE sde.student_id = {$p} AND sde.department_id = ibq.department_id
                                AND sde.deleted_at IS NULL AND (ibq.class_id IS NULL OR sde.class_id = ibq.class_id))";
        }

        if ($want('video')) {
            $p = $this->bind((string) $studentId);
            $branches[] = "SELECT 'video' as type, v.id, v.title, v.description, v.subject_id, s.name as subject_name,
                    v.class_id, c.name as class_name, v.file_path, COALESCE(v.published_at, v.created_at) as published_at
                FROM videos v
                LEFT JOIN subjects s ON v.subject_id = s.id
                LEFT JOIN classes c ON v.class_id = c.id
                WHERE v.status = 'published' AND v.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM student_department_enrollments sde
                              WHERE sde.student_id = {$p} AND sde.department_id = v.department_id
                                AND sde.deleted_at IS NULL AND (v.class_id IS NULL OR sde.class_id = v.class_id))";
        }

        if ($want('lesson')) {
            $p = $this->bind((string) $studentId);
            $branches[] = "SELECT 'lesson' as type, lc.id, lc.title, lc.description, lc.subject_id, s.name as subject_name,
                    lc.class_id, c.name as class_name, lc.recording_url as file_path, COALESCE(lc.scheduled_start, lc.created_at) as published_at
                FROM live_classes lc
                LEFT JOIN subjects s ON lc.subject_id = s.id
                LEFT JOIN classes c ON lc.class_id = c.id
                WHERE lc.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM student_department_enrollments sde
                              WHERE sde.student_id = {$p} AND sde.department_id = lc.department_id
                                AND sde.deleted_at IS NULL AND (lc.class_id IS NULL OR sde.class_id = lc.class_id))";
        }

        if ($type === 'all') {
            $p = $this->bind((string) $studentId);
            $branches[] = "SELECT 'subject' as type, subj.id, subj.name as title, subj.description, subj.id as subject_id,
                    subj.name as subject_name, NULL as class_id, NULL as class_name, NULL as file_path, subj.created_at as published_at
                FROM subjects subj
                WHERE subj.deleted_at IS NULL
                  AND EXISTS (SELECT 1 FROM student_department_enrollments sde
                              WHERE sde.student_id = {$p} AND sde.department_id = subj.department_id AND sde.deleted_at IS NULL)";
        }

        return $branches;
    }

    private function getTeacherDepartmentId(int $teacherId): ?int
    {
        $stmt = $this->getDb()->prepare('SELECT department_id FROM teachers WHERE id = :id AND deleted_at IS NULL');
        $stmt->execute(['id' => $teacherId]);
        $row = $stmt->fetch();
        return $row && $row['department_id'] !== null ? (int) $row['department_id'] : null;
    }

    /**
     * @return string[] SQL branches, one per content type, already parameter-bound via bind()
     */
    private function teacherBranches(int $teacherId, string $type): array
    {
        $departmentId = $this->getTeacherDepartmentId($teacherId);
        $branches = [];
        $want = fn(string $t) => $type === 'all' || $type === $t;

        // Published anywhere in the teacher's own department (so they can find and reference
        // colleagues' material), plus their own content regardless of status (so drafts they're
        // still working on are still searchable).
        $scopeClause = function (string $alias, string $ownerColumn = 'teacher_id') use ($departmentId, $teacherId) {
            $deptParam = $departmentId !== null ? $this->bind((string) $departmentId) : null;
            $ownerParam = $this->bind((string) $teacherId);
            $deptCheck = $deptParam !== null ? "({$alias}.status = 'published' AND {$alias}.department_id = {$deptParam})" : '0';
            return "({$deptCheck} OR {$alias}.{$ownerColumn} = {$ownerParam})";
        };

        if ($want('enote')) {
            $branches[] = "SELECT 'enote' as type, et.id, et.title, et.description, et.subject_id, s.name as subject_name,
                    et.class_id, c.name as class_name, NULL as file_path, COALESCE(et.published_at, et.created_at) as published_at
                FROM enote_topics et
                LEFT JOIN subjects s ON et.subject_id = s.id
                LEFT JOIN classes c ON et.class_id = c.id
                WHERE et.deleted_at IS NULL AND " . $scopeClause('et');
        }

        if ($want('library')) {
            $branches[] = "SELECT 'library' as type, lb.id, lb.title, lb.description, lb.subject_id, s.name as subject_name,
                    lb.class_id, c.name as class_name, lb.file_path, COALESCE(lb.published_at, lb.created_at) as published_at
                FROM library_books lb
                LEFT JOIN subjects s ON lb.subject_id = s.id
                LEFT JOIN classes c ON lb.class_id = c.id
                WHERE lb.deleted_at IS NULL AND " . $scopeClause('lb', 'uploaded_by');
        }

        if ($want('assignment')) {
            $p = $this->bind((string) $teacherId);
            $branches[] = "SELECT 'assignment' as type, a.id, a.title, a.description, a.subject_id, s.name as subject_name,
                    a.class_id, c.name as class_name, NULL as file_path, COALESCE(a.published_at, a.created_at) as published_at
                FROM assignments a
                LEFT JOIN subjects s ON a.subject_id = s.id
                LEFT JOIN classes c ON a.class_id = c.id
                WHERE a.deleted_at IS NULL AND a.teacher_id = {$p}";
        }

        if ($want('item_bank')) {
            $branches[] = "SELECT 'item_bank' as type, ibq.id, ibq.question_text as title, ibq.explanation as description,
                    ibq.subject_id, s.name as subject_name, ibq.class_id, c.name as class_name, ibq.file_path,
                    COALESCE(ibq.published_at, ibq.created_at) as published_at
                FROM item_bank_questions ibq
                LEFT JOIN subjects s ON ibq.subject_id = s.id
                LEFT JOIN classes c ON ibq.class_id = c.id
                WHERE ibq.deleted_at IS NULL AND " . $scopeClause('ibq', 'created_by');
        }

        if ($want('video')) {
            $branches[] = "SELECT 'video' as type, v.id, v.title, v.description, v.subject_id, s.name as subject_name,
                    v.class_id, c.name as class_name, v.file_path, COALESCE(v.published_at, v.created_at) as published_at
                FROM videos v
                LEFT JOIN subjects s ON v.subject_id = s.id
                LEFT JOIN classes c ON v.class_id = c.id
                WHERE v.deleted_at IS NULL AND " . $scopeClause('v', 'teacher_id');
        }

        if ($want('lesson')) {
            $branches[] = "SELECT 'lesson' as type, lc.id, lc.title, lc.description, lc.subject_id, s.name as subject_name,
                    lc.class_id, c.name as class_name, lc.recording_url as file_path, COALESCE(lc.scheduled_start, lc.created_at) as published_at
                FROM live_classes lc
                LEFT JOIN subjects s ON lc.subject_id = s.id
                LEFT JOIN classes c ON lc.class_id = c.id
                WHERE lc.deleted_at IS NULL AND " . $scopeClause('lc', 'created_by');
        }

        if ($type === 'all' && $departmentId !== null) {
            $p = $this->bind((string) $departmentId);
            $branches[] = "SELECT 'subject' as type, subj.id, subj.name as title, subj.description, subj.id as subject_id,
                    subj.name as subject_name, NULL as class_id, NULL as class_name, NULL as file_path, subj.created_at as published_at
                FROM subjects subj
                WHERE subj.deleted_at IS NULL AND subj.department_id = {$p}";
        }

        return $branches;
    }
}
