<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Student;

use eSpace\App\Controllers\Controller;
use eSpace\App\Services\LiveQuizService;

/**
 * Live Quiz - the student's side (see LiveQuizService): join with the code on the teacher's
 * screen, then the phone polls show() and sends answer().
 *
 * GET  /student/live-quiz/available      quizzes running now for my classes (tap to join)
 * POST /student/live-quiz/join           { code }
 * GET  /student/live-quiz/{id}
 * POST /student/live-quiz/{id}/answer    { option_ids: [] }
 */
class LiveQuizController extends Controller
{
    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    private function quiz(): ?array
    {
        $quiz = LiveQuizService::forPlayer($this->getDb(), (int) $this->routeParam('id'), (int) $this->getCurrentUserId());
        if (!$quiz) {
            $this->notFound('Join the quiz with its code first');
        }
        return $quiz;
    }

    public function available(): void
    {
        $this->success(['quizzes' => LiveQuizService::availableFor($this->getDb(), (int) $this->getCurrentUserId())]);
    }

    public function join(): void
    {
        $code = preg_replace('/\D/', '', (string) $this->input('code', ''));
        if (strlen($code) !== 6) {
            $this->error('The code is 6 numbers.', 422);
            return;
        }
        try {
            $this->success(LiveQuizService::join($this->getDb(), (int) $this->getCurrentUserId(), $code), 'You\'re in');
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        }
    }

    public function show(): void
    {
        if ($quiz = $this->quiz()) {
            $this->success(LiveQuizService::playerState($this->getDb(), $quiz, (int) $this->getCurrentUserId()));
        }
    }

    public function answer(): void
    {
        $quiz = $this->quiz();
        if (!$quiz) {
            return;
        }
        try {
            $ids = $this->input('option_ids', []);
            $result = LiveQuizService::answer($this->getDb(), $quiz, (int) $this->getCurrentUserId(), is_array($ids) ? $ids : []);
            // Playing a live quiz counts as a learning day
            \eSpace\App\Services\RewardService::recordLearningDay((int) $this->getCurrentUserId());
            $this->success($result);
        } catch (\InvalidArgumentException $e) {
            $this->error($e->getMessage(), 422);
        }
    }
}
