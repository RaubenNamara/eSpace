<?php

declare(strict_types=1);

namespace eSpace\App\Models;

/**
 * Department Model
 * 
 * Represents academic departments in the system.
 */

class Department extends Model
{
    protected string $table = 'departments';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'name',
        'code',
        'description',
        'head_id'
    ];
    protected array $hidden = [];
    protected bool $timestamps = true;
}
