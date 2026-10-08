<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Concerns;

/**
 * The HOD and admin side of a teacher content module (eLibrary, Videos, Item Bank): the teacher's
 * own controller - upload, edit, covers, readers, bulk actions - run over a wider set of items:
 *  - a HOD manages everything in their department (anyone's) and uploads into it
 *  - an admin (or super admin) manages everything in the school and uploads into any department
 * An item is aimed at the whole department, every stream of a class, or one stream - the same rule
 * students see it by.
 *
 * Used by a subclass of the teacher controller, which has the matching hooks (getTeacherId,
 * scopeClause, writeDepartmentId, canMoveDepartment, classTargetRequired, uploaderColumns). The
 * subclass names the teacher-owner column with ownerColumn().
 */
trait SchoolContentScope
{
    /** The table's teacher-owner column ('uploaded_by', 'teacher_id', 'created_by') */
    abstract protected function ownerColumn(): string;

    private function schoolRole(): string
    {
        $role = (string) ($_SESSION['role'] ?? '');
        return $role === 'super_admin' ? 'admin' : $role;
    }

    private function hodDepartmentId(): ?int
    {
        $stmt = \eSpace\Config\Database::getInstance()->prepare('SELECT COALESCE(department_id_active, department_id) FROM hods WHERE id = ?');
        $stmt->execute([(int) ($_SESSION['user_id'] ?? 0)]);
        $id = (int) $stmt->fetchColumn();
        return $id ?: null;
    }

    /** The scope value: the HOD's department, or 1 for an admin (who sees everything) */
    protected function getTeacherId(): ?int
    {
        return match ($this->schoolRole()) {
            'admin' => 1,
            'hod' => $this->hodDepartmentId(),
            default => null,
        };
    }

    protected function scopeClause(string $alias, string $placeholder): string
    {
        return $this->schoolRole() === 'admin' ? "({$placeholder} > 0)" : "{$alias}department_id = {$placeholder}";
    }

    protected function writeDepartmentId(array $data, ?int $current): ?int
    {
        if ($this->schoolRole() === 'hod') {
            return $this->hodDepartmentId();
        }
        $id = (int) ($data['department_id'] ?? 0) ?: (int) $current;
        if (!$id) {
            return null;
        }
        $stmt = \eSpace\Config\Database::getInstance()->prepare('SELECT id FROM departments WHERE id = ? AND deleted_at IS NULL');
        $stmt->execute([$id]);
        return $stmt->fetchColumn() ? $id : null;
    }

    /** No class at all = the whole department */
    protected function classTargetRequired(): bool
    {
        return false;
    }

    protected function canMoveDepartment(): bool
    {
        return $this->schoolRole() === 'admin';
    }

    /** A HOD's or admin's item belongs to the department, not to a teacher */
    protected function uploaderColumns(): array
    {
        return [
            $this->ownerColumn() => null,
            'uploader_role' => $this->schoolRole() === 'hod' ? 'hod' : 'admin',
            'uploader_id' => (int) ($_SESSION['user_id'] ?? 0),
        ];
    }

    /**
     * Departments (a HOD: just theirs), each with its subjects and the classes it has learners in -
     * every class level ("all streams") with its streams - and every class level the school has
     * GET /hod|admin/{module}/options
     */
    public function options(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();
        $sql = 'SELECT id, name, code FROM departments WHERE deleted_at IS NULL';
        $params = [];
        if ($this->schoolRole() === 'hod') {
            $sql .= ' AND id = ?';
            $params[] = (int) $this->hodDepartmentId();
        }
        $stmt = $db->prepare($sql . ' ORDER BY name');
        $stmt->execute($params);
        $departments = [];
        foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $d) {
            $departments[(int) $d['id']] = ['id' => (int) $d['id'], 'name' => $d['name'], 'code' => $d['code'], 'subjects' => [], 'levels' => []];
        }
        if ($departments) {
            $ids = array_keys($departments);
            $in = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $db->prepare("SELECT id, name, code, department_id FROM subjects WHERE deleted_at IS NULL AND department_id IN ($in) ORDER BY name");
            $stmt->execute($ids);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $s) {
                $departments[(int) $s['department_id']]['subjects'][] = ['id' => (int) $s['id'], 'name' => $s['name'], 'code' => $s['code']];
            }
            // The streams each department actually has learners in now
            $stmt = $db->prepare(
                "SELECT sde.department_id, c.id, c.name, c.stream_name, COUNT(DISTINCT sde.student_id) AS learners
                 FROM student_department_enrollments sde
                 INNER JOIN classes c ON c.id = sde.class_id AND c.deleted_at IS NULL
                 WHERE sde.status = 'active' AND sde.deleted_at IS NULL AND sde.department_id IN ($in)
                 GROUP BY sde.department_id, c.id, c.name, c.stream_name"
            );
            $stmt->execute($ids);
            $levels = [];
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                $dep = (int) $r['department_id'];
                $levels[$dep][$r['name']] ??= ['name' => $r['name'], 'learners' => 0, 'streams' => []];
                $levels[$dep][$r['name']]['learners'] += (int) $r['learners'];
                $levels[$dep][$r['name']]['streams'][] = ['id' => (int) $r['id'], 'name' => trim($r['name'] . ' ' . $r['stream_name']), 'learners' => (int) $r['learners']];
            }
            foreach ($levels as $dep => $byName) {
                uksort($byName, 'strnatcmp');
                foreach ($byName as &$l) {
                    usort($l['streams'], fn($a, $b) => strnatcmp($a['name'], $b['name']));
                }
                unset($l);
                $departments[$dep]['levels'] = array_values($byName);
            }
        }
        // Every class level the school has, so the form can say which ones a department has no learners in
        $allLevels = array_column($db->query('SELECT DISTINCT name FROM classes WHERE deleted_at IS NULL')->fetchAll(\PDO::FETCH_ASSOC), 'name');
        usort($allLevels, 'strnatcmp');
        $this->success(['role' => $this->schoolRole(), 'departments' => array_values($departments), 'all_levels' => $allLevels]);
    }
}
