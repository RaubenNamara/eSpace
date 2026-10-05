<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Teacher;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\LiveQuizService;

/**
 * Live Quiz - the teacher's side (see LiveQuizService). The teacher's screen polls show() and
 * moves the quiz on with advance(); at the end, save() puts the scores on the Learning Map.
 *
 * GET  /teacher/live-quiz/assessments           the assessments that can be run live
 * POST /teacher/live-quizzes                    { assignment_id, seconds }
 * GET  /teacher/live-quizzes/{id}               the state of the quiz
 * POST /teacher/live-quizzes/{id}/advance       { action: start|reveal|next|end }
 * POST /teacher/live-quizzes/{id}/save          scores -> returned submissions
 */
class LiveQuizController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function teacherId(): ?int
    {
        if (($_SESSION['role'] ?? null) === 'hod') {
            return isset($_SESSION['teacher_id']) ? (int) $_SESSION['teacher_id'] : null;
        }
        return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
    }

    private function quiz(): ?array
    {
        $teacherId = $this->teacherId();
        $quiz = $teacherId ? LiveQuizService::forTeacher($this->getDb(), (int) $this->routeParam('id'), $teacherId) : null;
        if (!$quiz) {
            $this->notFound('Quiz not found');
        }
        return $quiz;
    }

    public function assessments(): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        $this->success(['assessments' => LiveQuizService::candidates($this->getDb(), $teacherId)]);
    }

    public function store(): void
    {
        $teacherId = $this->teacherId();
        if (!$teacherId) {
            $this->forbidden();
            return;
        }
        try {
            $quiz = LiveQuizService::create($this->getDb(), $teacherId, (int) $this->input('assignment_id', 0), (int) $this->input('seconds', 20));
            $this->success($quiz, 'Quiz ready');
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        }
    }

    public function show(): void
    {
        if ($quiz = $this->quiz()) {
            $this->success(LiveQuizService::hostState($this->getDb(), $quiz));
        }
    }

    public function advance(): void
    {
        $quiz = $this->quiz();
        if (!$quiz) {
            return;
        }
        $action = (string) $this->input('action', '');
        if (!in_array($action, ['start', 'reveal', 'next', 'end'], true)) {
            $this->error('Unknown action', 422);
            return;
        }
        $db = $this->getDb();
        LiveQuizService::advance($db, $quiz, $action);
        $this->success(LiveQuizService::hostState($db, LiveQuizService::forTeacher($db, (int) $quiz['id'], (int) $quiz['teacher_id'])));
    }

    public function save(): void
    {
        $quiz = $this->quiz();
        if (!$quiz) {
            return;
        }
        try {
            $saved = LiveQuizService::save($this->getDb(), $quiz);
            $this->success(['saved' => $saved], $saved === 1 ? '1 result saved' : "$saved results saved");
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        }
    }
}
