<?php

declare(strict_types=1);

namespace eSpace\App\Models;

use eSpace\Config\Database;
use PDO;
use PDOStatement;

/**
 * Base Model Class
 * 
 * Provides common database operations for all models.
 * Follows Active Record pattern with PDO.
 */

abstract class Model
{
    protected PDO $db;
    protected string $table;
    protected string $primaryKey = 'id';
    protected array $fillable = [];
    protected array $hidden = [];
    protected bool $timestamps = true;
    protected string $createdAt = 'created_at';
    protected string $updatedAt = 'updated_at';

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->db = Database::getInstance();
    }

    /**
     * Get database connection
     */
    public function getDb(): PDO
    {
        return $this->db;
    }

    /**
     * Find record by ID
     */
    public function find(int $id): ?array
    {
        $sql = "SELECT * FROM {$this->table} WHERE {$this->primaryKey} = :id LIMIT 1";
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id]);
        $result = $stmt->fetch();

        if ($result) {
            return $this->hideFields($result);
        }

        return null;
    }

    /**
     * Find all records
     */
    public function all(array $conditions = [], array $orderBy = [], int $limit = 0, int $offset = 0): array
    {
        $sql = "SELECT * FROM {$this->table}";
        $params = [];

        if (!empty($conditions)) {
            $where = [];
            foreach ($conditions as $field => $value) {
                $where[] = "{$field} = :{$field}";
                $params[$field] = $value;
            }
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        if (!empty($orderBy)) {
            $order = [];
            foreach ($orderBy as $field => $direction) {
                $order[] = "{$field} {$direction}";
            }
            $sql .= ' ORDER BY ' . implode(', ', $order);
        }

        if ($limit > 0) {
            $sql .= " LIMIT {$limit}";
            if ($offset > 0) {
                $sql .= " OFFSET {$offset}";
            }
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $results = $stmt->fetchAll();

        return array_map([$this, 'hideFields'], $results);
    }

    /**
     * Find records by conditions
     */
    public function where(array $conditions): array
    {
        return $this->all($conditions);
    }

    /**
     * Find first record by conditions
     */
    public function first(array $conditions): ?array
    {
        $results = $this->all($conditions, [], 1);
        return $results[0] ?? null;
    }

    /**
     * Create new record
     */
    public function create(array $data): int|false
    {
        $data = $this->filterFillable($data);

        if ($this->timestamps) {
            $data[$this->createdAt] = date('Y-m-d H:i:s');
            $data[$this->updatedAt] = date('Y-m-d H:i:s');
        }

        $fields = array_keys($data);
        $placeholders = array_map(fn($field) => ":{$field}", $fields);
        
        $sql = "INSERT INTO {$this->table} (" . implode(', ', $fields) . ") 
                VALUES (" . implode(', ', $placeholders) . ")";
        
        $stmt = $this->db->prepare($sql);
        
        if ($stmt->execute($data)) {
            return (int) Database::lastInsertId();
        }

        return false;
    }

    /**
     * Update record
     */
    public function update(int $id, array $data): bool
    {
        $data = $this->filterFillable($data);

        if ($this->timestamps) {
            $data[$this->updatedAt] = date('Y-m-d H:i:s');
        }

        $set = [];
        foreach (array_keys($data) as $field) {
            $set[] = "{$field} = :{$field}";
        }

        $data['id'] = $id;
        $sql = "UPDATE {$this->table} SET " . implode(', ', $set) . " 
                WHERE {$this->primaryKey} = :id";

        $stmt = $this->db->prepare($sql);
        return $stmt->execute($data);
    }

    /**
     * Delete record
     */
    public function delete(int $id): bool
    {
        $sql = "DELETE FROM {$this->table} WHERE {$this->primaryKey} = :id";
        $stmt = $this->db->prepare($sql);
        return $stmt->execute(['id' => $id]);
    }

    /**
     * Soft delete record (if soft deletes are enabled)
     */
    public function softDelete(int $id): bool
    {
        return $this->update($id, ['deleted_at' => date('Y-m-d H:i:s')]);
    }

    /**
     * Restore soft deleted record
     */
    public function restore(int $id): bool
    {
        return $this->update($id, ['deleted_at' => null]);
    }

    /**
     * Count records
     */
    public function count(array $conditions = []): int
    {
        $sql = "SELECT COUNT(*) as count FROM {$this->table}";
        $params = [];

        if (!empty($conditions)) {
            $where = [];
            foreach ($conditions as $field => $value) {
                $where[] = "{$field} = :{$field}";
                $params[$field] = $value;
            }
            $sql .= ' WHERE ' . implode(' AND ', $where);
        }

        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        $result = $stmt->fetch();

        return (int) $result['count'];
    }

    /**
     * Check if record exists
     */
    public function exists(int $id): bool
    {
        return $this->find($id) !== null;
    }

    /**
     * Paginate records
     */
    public function paginate(int $page = 1, int $limit = 20, array $filters = []): array
    {
        try {
            $offset = ($page - 1) * $limit;
            $sql = "SELECT * FROM {$this->table}";
            $params = [];

            error_log("Model::paginate - table: {$this->table}, page: $page, limit: $limit, filters: " . json_encode($filters));

            if (!empty($filters)) {
                $where = [];
                foreach ($filters as $field => $value) {
                    if ($field === 'search') {
                        if (!empty($value)) {
                            $where[] = "(username LIKE :search OR email LIKE :search)";
                            $params['search'] = "%{$value}%";
                        }
                        // Skip empty search entirely
                    } elseif ($field === 'role') {
                        $where[] = "role = :role";
                        $params['role'] = $value;
                    } else {
                        $where[] = "{$field} = :{$field}";
                        $params[$field] = $value;
                    }
                }
                if (!empty($where)) {
                    $sql .= ' WHERE ' . implode(' AND ', $where);
                }
            }

            // Add soft delete filter (only show non-deleted records)
            $hasWhere = !empty($where);
            if (!$hasWhere) {
                $sql .= ' WHERE deleted_at IS NULL';
            } else {
                $sql .= ' AND deleted_at IS NULL';
            }

            error_log("Main SQL: $sql");
            error_log("Params: " . json_encode($params));

            // Get total count
            $countSql = "SELECT COUNT(*) as total FROM {$this->table}";
            if (!empty($filters)) {
                $where = [];
                foreach ($filters as $field => $value) {
                    if ($field === 'search') {
                        if (!empty($value)) {
                            $where[] = "(username LIKE :search OR email LIKE :search)";
                        }
                        // Skip empty search entirely
                    } elseif ($field === 'role') {
                        $where[] = "role = :role";
                    } else {
                        $where[] = "{$field} = :{$field}";
                    }
                }
                if (!empty($where)) {
                    $countSql .= ' WHERE ' . implode(' AND ', $where);
                }
            }

            // Add soft delete filter to count query
            $hasWhere = !empty($where);
            if (!$hasWhere) {
                $countSql .= ' WHERE deleted_at IS NULL';
            } else {
                $countSql .= ' AND deleted_at IS NULL';
            }
            
            error_log("Count SQL: $countSql");
            
            $countStmt = $this->db->prepare($countSql);
            $countStmt->execute($params);
            $total = (int) $countStmt->fetch()['total'];

            error_log("Total count: $total");

            // Get paginated results
            $sql .= " ORDER BY created_at DESC LIMIT {$limit} OFFSET {$offset}";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $data = $stmt->fetchAll();

            error_log("Fetched " . count($data) . " records");

            return [
                'data' => array_map([$this, 'hideFields'], $data),
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => ceil($total / $limit)
                ]
            ];
        } catch (\Exception $e) {
            error_log("Error in Model::paginate: " . $e->getMessage());
            error_log("Stack trace: " . $e->getTraceAsString());
            throw $e;
        }
    }

    /**
     * Execute raw query
     */
    protected function query(string $sql, array $params = []): PDOStatement
    {
        $stmt = $this->db->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }

    /**
     * Filter data to only include fillable fields
     */
    protected function filterFillable(array $data): array
    {
        if (empty($this->fillable)) {
            return $data;
        }

        return array_intersect_key($data, array_flip($this->fillable));
    }

    /**
     * Hide sensitive fields from output
     */
    public function hideFields(array $data): array
    {
        if (empty($this->hidden)) {
            return $data;
        }

        foreach ($this->hidden as $field) {
            unset($data[$field]);
        }

        return $data;
    }

    /**
     * Begin transaction
     */
    public function beginTransaction(): bool
    {
        return Database::beginTransaction();
    }

    /**
     * Commit transaction
     */
    public function commit(): bool
    {
        return Database::commit();
    }

    /**
     * Rollback transaction
     */
    public function rollback(): bool
    {
        return Database::rollback();
    }
}
