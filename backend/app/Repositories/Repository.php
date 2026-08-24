<?php

declare(strict_types=1);

namespace eSpace\App\Repositories;

use eSpace\App\Models\Model;

/**
 * Base Repository Class
 * 
 * Provides data access layer abstraction.
 * Repositories handle complex queries and business logic related to data retrieval.
 */

abstract class Repository
{
    protected Model $model;

    /**
     * Constructor
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * Find record by ID
     */
    public function findById(int $id): ?array
    {
        return $this->model->find($id);
    }

    /**
     * Find all records with optional filtering
     */
    public function findAll(array $filters = [], array $orderBy = [], int $limit = 0, int $offset = 0): array
    {
        return $this->model->all($filters, $orderBy, $limit, $offset);
    }

    /**
     * Find records by conditions
     */
    public function findBy(array $conditions): array
    {
        return $this->model->where($conditions);
    }

    /**
     * Find first record by conditions
     */
    public function findOneBy(array $conditions): ?array
    {
        return $this->model->first($conditions);
    }

    /**
     * Create new record
     */
    public function create(array $data): int|false
    {
        return $this->model->create($data);
    }

    /**
     * Update record
     */
    public function update(int $id, array $data): bool
    {
        return $this->model->update($id, $data);
    }

    /**
     * Delete record
     */
    public function delete(int $id): bool
    {
        return $this->model->delete($id);
    }

    /**
     * Count records
     */
    public function count(array $conditions = []): int
    {
        return $this->model->count($conditions);
    }

    /**
     * Check if record exists
     */
    public function exists(int $id): bool
    {
        return $this->model->exists($id);
    }

    /**
     * Begin transaction
     */
    public function beginTransaction(): bool
    {
        return $this->model->beginTransaction();
    }

    /**
     * Commit transaction
     */
    public function commit(): bool
    {
        return $this->model->commit();
    }

    /**
     * Rollback transaction
     */
    public function rollback(): bool
    {
        return $this->model->rollback();
    }
}
