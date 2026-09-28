<?php

declare(strict_types=1);

namespace eSpace\App\Utils;

/**
 * The item bank's allow_download column comes from migration 097. Until that migration has been
 * run, queries select 0 in its place (nothing downloadable - the default) and writes skip it, so
 * the Item Bank keeps working instead of failing on an unknown column.
 */
class ItemBankDownload
{
    private static ?bool $available = null;

    public static function available($db): bool
    {
        if (self::$available === null) {
            try {
                self::$available = (bool) $db->query("SHOW COLUMNS FROM item_bank_questions LIKE 'allow_download'")->fetch();
            } catch (\Throwable $e) {
                self::$available = false;
            }
        }
        return self::$available;
    }

    /** SELECT fragment for the allow_download column of `item_bank_questions q`. */
    public static function select($db): string
    {
        return self::available($db) ? 'q.allow_download' : '0 AS allow_download';
    }

    public static function toBool(mixed $value): bool
    {
        if (is_bool($value)) {
            return $value;
        }
        return in_array(strtolower((string) $value), ['1', 'true', 'on', 'yes'], true);
    }
}
