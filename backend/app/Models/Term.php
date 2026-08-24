<?php

declare(strict_types=1);

namespace eSpace\App\Models;

/**
 * Term Model
 * 
 * Represents academic terms within academic years.
 */

class Term extends Model
{
    protected string $table = 'terms';
    protected string $primaryKey = 'id';
    protected array $fillable = [
        'academic_year_id',
        'name',
        'start_date',
        'end_date',
        'is_current'
    ];
    protected array $hidden = [];
    protected bool $timestamps = true;
}
