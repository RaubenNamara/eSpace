<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\App\Controllers\Admin\StaffActivityController;

/**
 * How teachers are using Tusome over the last 7 or 30 days, with the same figures for the period
 * just before, so the dashboard cards can show the change: sign-ins, active days, teachers active,
 * everything done (the staff activity sources), scripts marked and content made - and, for the
 * small line graphs on the cards, each of those day by day across this period.
 */
class TeachingUsage
{
    // what counts as marking, and as making something for learners (StaffActivityController types)
    private const MARKING = ['scripts_marked', 'virtual_lab_graded'];
    private const CONTENT = ['assignment_created', 'enote_created', 'video_added', 'live_class_scheduled', 'virtual_lab_set', 'questions_added'];
    // "Things done" on the cards: work on eNotes, the Item Bank and assessments (eLibrary books are counted below)
    private const ENOTES = ['enote_created', 'enote_published', 'enote_pages_edited'];
    private const ITEM_BANK = ['questions_added'];
    private const ASSESSMENTS = ['assignment_created'];

    /**
     * @param int[] $teacherIds whose work is counted
     * @param string $loginRole the role their sign-ins are logged under ('teacher' or 'hod')
     * @param int[] $loginUserIds whose sign-ins are counted (a HOD signs in as the HOD, works as the teacher)
     */
    public static function summary(array $teacherIds, string $loginRole, array $loginUserIds, int $days): array
    {
        $days = in_array($days, [7, 30], true) ? $days : 30;
        $start = (new \DateTimeImmutable('today'))->modify('-' . ($days - 1) . ' days');
        $prevStart = $start->modify("-{$days} days");
        $cut = $start->format('Y-m-d');

        $blank = fn () => ['signins' => 0, 'actions' => 0, 'marked' => 0, 'content' => 0, 'enotes' => 0, 'item_bank' => 0, 'elibrary' => 0, 'assessments' => 0, 'days' => [], 'teachers' => []];
        $periods = ['current' => $blank(), 'previous' => $blank()];
        // this period day by day (oldest first): sign-ins, things done, marking, and who was active
        $daily = [];
        for ($i = 0; $i < $days; $i++) {
            $daily[$start->modify("+{$i} days")->format('Y-m-d')] = ['signins' => 0, 'actions' => 0, 'marked' => 0, 'learning' => 0, 'who' => []];
        }
        $teacherIds = array_values(array_unique(array_filter(array_map('intval', $teacherIds))));
        $loginUserIds = array_values(array_unique(array_filter(array_map('intval', $loginUserIds))));

        if ($loginUserIds) {
            $db = \eSpace\Config\Database::getInstance();
            $in = implode(',', array_fill(0, count($loginUserIds), '?'));
            $stmt = $db->prepare("SELECT user_id, DATE(logged_in_at) AS d, COUNT(*) AS n FROM login_logs
                                  WHERE role = ? AND user_id IN ($in) AND logged_in_at >= ? GROUP BY user_id, d");
            $stmt->execute([$loginRole, ...$loginUserIds, $prevStart->format('Y-m-d 00:00:00')]);
            foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                $p = $r['d'] >= $cut ? 'current' : 'previous';
                $periods[$p]['signins'] += (int) $r['n'];
                $periods[$p]['days'][$r['d']] = true;
                $periods[$p]['teachers'][(int) $r['user_id']] = true;
                if (isset($daily[$r['d']])) {
                    $daily[$r['d']]['signins'] += (int) $r['n'];
                    $daily[$r['d']]['who'][(int) $r['user_id']] = true;
                }
            }
        }

        if ($teacherIds) {
            $byTeacher = (new StaffActivityController())->teacherActivities($teacherIds, $prevStart->format('Y-m-d 00:00:00'));
            foreach ($byTeacher as $teacherId => $activities) {
                foreach ($activities as $a) {
                    $d = substr((string) $a['at'], 0, 10);
                    $p = $d >= $cut ? 'current' : 'previous';
                    $periods[$p]['actions'] += $a['count'];
                    $periods[$p]['days'][$d] = true;
                    $periods[$p]['teachers'][(int) $teacherId] = true;
                    if (isset($daily[$d])) {
                        $daily[$d]['actions'] += $a['count'];
                        $daily[$d]['who'][(int) $teacherId] = true;
                    }
                    if (in_array($a['type'], self::MARKING, true)) {
                        $periods[$p]['marked'] += $a['count'];
                        if (isset($daily[$d])) {
                            $daily[$d]['marked'] += $a['count'];
                        }
                    }
                    if (in_array($a['type'], self::CONTENT, true)) {
                        $periods[$p]['content'] += $a['count'];
                    }
                    $part = in_array($a['type'], self::ENOTES, true) ? 'enotes'
                        : (in_array($a['type'], self::ITEM_BANK, true) ? 'item_bank'
                        : (in_array($a['type'], self::ASSESSMENTS, true) ? 'assessments' : null));
                    if ($part) {
                        $periods[$p][$part] += $a['count'];
                        if (isset($daily[$d])) {
                            $daily[$d]['learning'] += $a['count'];
                        }
                    }
                }
            }
        }

        // eLibrary books they uploaded (as teachers, or as the HOD when it is a HOD's own use)
        $db = \eSpace\Config\Database::getInstance();
        $uploaders = [];
        if ($teacherIds) {
            $uploaders['teacher'] = $teacherIds;
        }
        if ($loginRole === 'hod' && $loginUserIds) {
            $uploaders['hod'] = $loginUserIds;
        }
        foreach ($uploaders as $uploaderRole => $ids) {
            try {
                $in = implode(',', array_fill(0, count($ids), '?'));
                $stmt = $db->prepare("SELECT DATE(created_at) AS d, COUNT(*) AS n FROM library_books
                                      WHERE deleted_at IS NULL AND uploader_role = ? AND uploader_id IN ($in) AND created_at >= ?
                                      GROUP BY d");
                $stmt->execute([$uploaderRole, ...$ids, $prevStart->format('Y-m-d 00:00:00')]);
                foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $r) {
                    $p = $r['d'] >= $cut ? 'current' : 'previous';
                    $periods[$p]['elibrary'] += (int) $r['n'];
                    if (isset($daily[$r['d']])) {
                        $daily[$r['d']]['learning'] += (int) $r['n'];
                    }
                }
            } catch (\PDOException $e) {
                error_log('Teaching usage: eLibrary uploads unavailable: ' . $e->getMessage());
            }
        }

        // Scripts handed in and still waiting to be marked, now (as the To mark card counts them)
        $unmarked = 0;
        if ($teacherIds) {
            try {
                $in = implode(',', array_fill(0, count($teacherIds), '?'));
                $stmt = $db->prepare("SELECT COUNT(*) FROM assignment_submissions sb
                                      INNER JOIN assignments a ON a.id = sb.assignment_id AND a.deleted_at IS NULL
                                      WHERE sb.deleted_at IS NULL AND sb.status IN ('submitted', 'marking') AND a.teacher_id IN ($in)");
                $stmt->execute($teacherIds);
                $unmarked = (int) $stmt->fetchColumn();
            } catch (\PDOException $e) {
                error_log('Teaching usage: unmarked scripts unavailable: ' . $e->getMessage());
            }
        }

        $series = [];
        foreach ($daily as $date => $v) {
            // active: how many were active that day (for one teacher, 1 or 0)
            $series[] = ['date' => $date, 'signins' => $v['signins'], 'actions' => $v['actions'], 'marked' => $v['marked'], 'learning' => $v['learning'], 'active' => count($v['who'])];
        }
        $out = ['days' => $days, 'teachers' => count($teacherIds), 'series' => $series, 'unmarked' => $unmarked];
        foreach ($periods as $name => $p) {
            $out[$name] = [
                'signins' => $p['signins'],
                'actions' => $p['actions'],
                'marked' => $p['marked'],
                'content' => $p['content'],
                // eNotes, Item Bank, eLibrary and assessment work, and that total
                'enotes' => $p['enotes'],
                'item_bank' => $p['item_bank'],
                'elibrary' => $p['elibrary'],
                'assessments' => $p['assessments'],
                'learning' => $p['enotes'] + $p['item_bank'] + $p['elibrary'] + $p['assessments'],
                'active_days' => count($p['days']),
                'active_teachers' => count($p['teachers']),
            ];
        }
        return $out;
    }

    /**
     * Each teacher's work over the last 7, 30 or 90 days, for the HOD's chart comparing them: eNotes,
     * eLibrary books, Item Bank questions, assessments set and scripts marked, and their sign-ins.
     *
     * @param int[] $teacherIds
     * @return array<int, array{enotes: int, elibrary: int, item_bank: int, assessments: int, marked: int, signins: int}>
     */
    public static function perTeacher(array $teacherIds, int $days): array
    {
        $days = in_array($days, [7, 30, 90], true) ? $days : 30;
        $since = (new \DateTimeImmutable('today'))->modify('-' . ($days - 1) . ' days')->format('Y-m-d 00:00:00');
        $teacherIds = array_values(array_unique(array_filter(array_map('intval', $teacherIds))));
        $out = [];
        foreach ($teacherIds as $id) {
            $out[$id] = ['enotes' => 0, 'elibrary' => 0, 'item_bank' => 0, 'assessments' => 0, 'marked' => 0, 'signins' => 0];
        }
        if (!$teacherIds) {
            return $out;
        }

        foreach ((new StaffActivityController())->teacherActivities($teacherIds, $since) as $teacherId => $activities) {
            foreach ($activities as $a) {
                $kind = in_array($a['type'], self::ENOTES, true) ? 'enotes'
                    : (in_array($a['type'], self::ITEM_BANK, true) ? 'item_bank'
                    : (in_array($a['type'], self::ASSESSMENTS, true) ? 'assessments'
                    : (in_array($a['type'], self::MARKING, true) ? 'marked' : null)));
                if ($kind && isset($out[(int) $teacherId])) {
                    $out[(int) $teacherId][$kind] += $a['count'];
                }
            }
        }

        $db = \eSpace\Config\Database::getInstance();
        $in = implode(',', array_fill(0, count($teacherIds), '?'));
        foreach ([
            'elibrary' => "SELECT uploader_id, COUNT(*) FROM library_books WHERE deleted_at IS NULL AND uploader_role = 'teacher' AND uploader_id IN ($in) AND created_at >= ? GROUP BY uploader_id",
            'signins' => "SELECT user_id, COUNT(*) FROM login_logs WHERE role = 'teacher' AND user_id IN ($in) AND logged_in_at >= ? GROUP BY user_id",
        ] as $kind => $sql) {
            try {
                $stmt = $db->prepare($sql);
                $stmt->execute([...$teacherIds, $since]);
                foreach ($stmt->fetchAll(\PDO::FETCH_NUM) as [$id, $n]) {
                    if (isset($out[(int) $id])) {
                        $out[(int) $id][$kind] = (int) $n;
                    }
                }
            } catch (\PDOException $e) {
                error_log("Teaching usage per teacher: {$kind} unavailable: " . $e->getMessage());
            }
        }
        return $out;
    }
}
