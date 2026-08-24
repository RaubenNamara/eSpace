<?php

declare(strict_types=1);

namespace eSpace\App\Models;

/**
 * Academic Year Model
 * 
 * Represents academic years in the system.
 */

class AcademicYear extends Model
{
    protected string $table = 'academic_years';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'name',
        'start_date',
        'end_date',
        'is_current'
    ];
    protected array $hidden = [];
    protected bool $timestamps = true;
}
