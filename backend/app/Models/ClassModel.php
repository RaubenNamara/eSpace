<?php

declare(strict_types=1);

namespace eSpace\App\Models;

/**
 * Class Model
 * 
 * Represents academic classes in the system.
 */

class ClassModel extends Model
{
    protected string $table = 'classes';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'name',
        'level',
        'academic_year_id',
        'stream_name'
    ];
    protected array $hidden = [];
    protected bool $timestamps = true;
}
