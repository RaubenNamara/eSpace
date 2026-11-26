<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

/**
 * The signed-in user's own school, for the app's frame: its name, motto and crest (Admin >
 * Settings, kept in that school's own database - so a school only ever sees itself), and where the
 * school year stands (the term, the year and the week of term). Shared by every role.
 */
class SchoolIdentityController extends Controller
{
    /** GET /school/identity */
    public function show(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $db = \eSpace\Config\Database::getInstance();

        $school = null;
        try {
            $school = $db->query('SELECT school_name, motto, logo_path FROM school_settings WHERE id = 1')->fetch(\PDO::FETCH_ASSOC) ?: null;
        } catch (\Throwable $e) {
            // a school without its settings yet: the frame shows a plain crest and no name
        }

        $term = null;
        try {
            // the current term (or, between terms, the one that has just ended / is next)
            $term = $db->query(
                "SELECT t.name, t.start_date, t.end_date, ay.name AS year_name
                   FROM terms t LEFT JOIN academic_years ay ON ay.id = t.academic_year_id
                  WHERE t.deleted_at IS NULL
                  ORDER BY t.is_current DESC, (CURDATE() BETWEEN t.start_date AND t.end_date) DESC, ABS(DATEDIFF(t.start_date, CURDATE()))
                  LIMIT 1"
            )->fetch(\PDO::FETCH_ASSOC) ?: null;
        } catch (\Throwable $e) {
        }

        $week = null;
        $inTerm = false;
        if ($term) {
            $today = date('Y-m-d');
            $inTerm = $today >= $term['start_date'] && $today <= $term['end_date'];
            if ($inTerm) {
                $week = intdiv((int) ((strtotime($today) - strtotime($term['start_date'])) / 86400), 7) + 1;
            }
        }

        $name = trim((string) ($school['school_name'] ?? ''));
        $this->success([
            'name' => $name !== '' ? $name : null,
            'motto' => trim((string) ($school['motto'] ?? '')) ?: null,
            'logo' => $school['logo_path'] ?? null,
            'term' => $term ? [
                'name' => $term['name'],
                'year' => $term['year_name'],
                'week' => $week,
                'in_term' => $inTerm,
                'ends' => $term['end_date'],
            ] : null,
        ]);
    }
}
