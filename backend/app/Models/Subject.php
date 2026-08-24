<?php

declare(strict_types=1);

namespace eSpace\App\Models;

/**
 * Subject Model
 * 
 * Represents academic subjects in the system.
 */

class Subject extends Model
{
    protected string $table = 'subjects';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'name',
        'code',
        'department_id',
        'description'
    ];
    protected array $hidden = [];
    protected bool $timestamps = true;
}
