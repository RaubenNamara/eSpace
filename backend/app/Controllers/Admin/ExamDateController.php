<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * Exam dates (admin): the exams students count down to - mock, end of term, UCE/UACE - for one
 * class level or every class. They drive each student's exam countdown and revision plan.
 *
 * GET    /admin/exam-dates
 * POST   /admin/exam-dates          { title, class_level?, starts_on, ends_on? }
 * DELETE /admin/exam-dates/{id}
 */
class ExamDateController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    public function index(): void
    {
        $db = $this->getDb();
        $exams = $db->query("SELECT id, title, class_level, starts_on, ends_on FROM exam_dates WHERE deleted_at IS NULL ORDER BY starts_on DESC LIMIT 100")->fetchAll();
        $levels = array_column($db->query("SELECT DISTINCT name FROM classes WHERE deleted_at IS NULL ORDER BY name")->fetchAll(), 'name');
        $this->success(['exams' => array_map(fn($e) => $e + ['id' => (int) $e['id']], $exams), 'levels' => $levels]);
    }

    public function store(): void
    {
        $title = mb_substr(trim(strip_tags((string) $this->input('title', ''))), 0, 120);
        $level = trim((string) $this->input('class_level', '')) ?: null;
        $start = (string) $this->input('starts_on', '');
        $end = (string) $this->input('ends_on', '') ?: null;
        $date = fn($d) => $d !== null && preg_match('/^\d{4}-\d{2}-\d{2}$/', $d);
        $errors = [];
        if ($title === '') $errors['title'] = 'Name the exam, e.g. S.4 Mock exams';
        if (!$date($start)) $errors['starts_on'] = 'Choose the first day';
        if ($end !== null && (!$date($end) || $end < $start)) $errors['ends_on'] = 'The last day must be on or after the first';
        if ($errors) {
            $this->validationError($errors);
            return;
        }
        $db = $this->getDb();
        $db->prepare("INSERT INTO exam_dates (title, class_level, starts_on, ends_on, created_by) VALUES (?, ?, ?, ?, ?)")
            ->execute([$title, $level, $start, $end, $this->getCurrentUserId()]);
        $this->success(['id' => (int) $db->lastInsertId()], 'Exam added');
    }

    public function destroy(): void
    {
        $this->getDb()->prepare("UPDATE exam_dates SET deleted_at = NOW() WHERE id = ?")->execute([(int) $this->routeParam('id')]);
        $this->success([], 'Removed');
    }
}
