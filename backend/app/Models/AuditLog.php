<?php

declare(strict_types=1);

namespace eSpace\App\Models;

use eSpace\App\Models\Model;

/**
 * Audit Log Model
 * 
 * Handles audit log operations for tracking user actions.
 */
class AuditLog extends Model
{
    protected string $table = 'audit_logs';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'acting_user_id',
        'acting_user_role',
        'target_user_id',
        'action',
        'entity_type',
        'entity_id',
        'before_values',
        'after_values',
        'ip_address',
        'user_agent'
    ];

    /**
     * Log an action
     */
    public function logAction(
        int $actingUserId,
        string $actingUserRole,
        string $action,
        string $entityType,
        ?int $entityId = null,
        ?int $targetUserId = null,
        ?string $beforeValues = null,
        ?string $afterValues = null
    ): bool {
        $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;

        return $this->create([
            'acting_user_id' => $actingUserId,
            'acting_user_role' => $actingUserRole,
            'target_user_id' => $targetUserId,
            'action' => $action,
            'entity_type' => $entityType,
            'entity_id' => $entityId,
            'before_values' => $beforeValues,
            'after_values' => $afterValues,
            'ip_address' => $ipAddress,
            'user_agent' => $userAgent
        ]);
    }

    /**
     * Get logs for a specific entity
     */
    public function getEntityLogs(string $entityType, int $entityId, int $limit = 50): array
    {
        $sql = "SELECT * FROM {$this->table}
                WHERE entity_type = :entity_type AND entity_id = :entity_id
                ORDER BY created_at DESC
                LIMIT {$limit}";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['entity_type' => $entityType, 'entity_id' => $entityId]);
        return $stmt->fetchAll();
    }

    /**
     * Get logs for a specific user
     */
    public function getUserLogs(int $userId, int $limit = 50): array
    {
        $sql = "SELECT * FROM {$this->table}
                WHERE acting_user_id = :user_id OR target_user_id = :user_id
                ORDER BY created_at DESC
                LIMIT {$limit}";
        
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['user_id' => $userId]);
        return $stmt->fetchAll();
    }
}
