<?php

declare(strict_types=1);

namespace eSpace\App\Models;

/**
 * Stream Model
 * 
 * Represents streams within classes in the system.
 */

class Stream extends Model
{
    protected string $table = 'streams';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'class_id',
        'name'
    ];
    protected array $hidden = [];
    protected bool $timestamps = true;
}
