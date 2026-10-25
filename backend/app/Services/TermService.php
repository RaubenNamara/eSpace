<?php

declare(strict_types=1);

namespace eSpace\App\Services;

/**
 * The current term follows the calendar: when today falls inside a term that is not the one
 * marked current, that term (and its school year) becomes current. Between terms - the holidays -
 * the last term stays current until the next one starts.
 *
 * The admin can turn this off (school_settings.term_auto_switch = 0, migration 144) and choose the
 * current term by hand. Until 144 has run, switching is on.
 *
 * It runs at most once per request, and is called where the current term matters first: signing
 * in, the admin dashboard, and the terms list.
 */
class TermService
{
    private static bool $synced = false;

    private static function db()
    {
        return \eSpace\Config\Database::getInstance();
    }

    public static function autoSwitchOn(): bool
    {
        try {
            $v = self::db()->query("SELECT term_auto_switch FROM school_settings WHERE id = 1")->fetchColumn();
            return $v === false || $v === null || (int) $v === 1;
        } catch (\Throwable $e) {
            return true; // column not there yet (before migration 144)
        }
    }

    /** Make today's term current, if switching is on. Returns the term switched to, or null. */
    public static function syncCurrent(): ?array
    {
        if (self::$synced) return null;
        self::$synced = true;
        try {
            if (!self::autoSwitchOn()) return null;
            $db = self::db();
            $today = date('Y-m-d');
            $stmt = $db->prepare(
                "SELECT id, name, academic_year_id, is_current FROM terms
                 WHERE deleted_at IS NULL AND DATE(start_date) <= ? AND DATE(end_date) >= ?
                 ORDER BY start_date DESC LIMIT 1"
            );
            $stmt->execute([$today, $today]);
            $term = $stmt->fetch();
            if (!$term) return null;
            $others = (int) $db->query("SELECT COUNT(*) FROM terms WHERE deleted_at IS NULL AND is_current = 1 AND id <> " . (int) $term['id'])->fetchColumn();
            if ((int) $term['is_current'] === 1 && $others === 0) return null;

            $db->beginTransaction();
            $db->prepare("UPDATE terms SET is_current = (id = ?) WHERE deleted_at IS NULL")->execute([(int) $term['id']]);
            if ($term['academic_year_id']) {
                $db->prepare("UPDATE academic_years SET is_current = (id = ?) WHERE deleted_at IS NULL")->execute([(int) $term['academic_year_id']]);
            }
            $db->commit();
            return ['id' => (int) $term['id'], 'name' => $term['name']];
        } catch (\Throwable $e) {
            if (self::db()->inTransaction()) self::db()->rollBack();
            error_log('TermService::syncCurrent failed: ' . $e->getMessage());
            return null;
        }
    }
}
