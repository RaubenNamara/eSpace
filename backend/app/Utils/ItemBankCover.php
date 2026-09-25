<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * The item bank's cover_image/total_pages columns come from migration 095. Until that migration
 * has been run, queries select NULLs in their place so the Item Bank keeps working (the shelves
 * just show printed covers) instead of failing on an unknown column.
 */
class ItemBankCover
{
    private static ?bool $available = null;

    public static function available($db): bool
    {
        if (self::$available === null) {
            try {
                self::$available = (bool) $db->query("SHOW COLUMNS FROM item_bank_questions LIKE 'cover_image'")->fetch();
            } catch (\Throwable $e) {
                self::$available = false;
            }
        }
        return self::$available;
    }

    /** SELECT fragment for the cover columns of `item_bank_questions q`. */
    public static function select($db): string
    {
        return self::available($db)
            ? 'q.cover_image, q.total_pages'
            : 'NULL AS cover_image, NULL AS total_pages';
    }
}
