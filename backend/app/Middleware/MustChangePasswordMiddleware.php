<?php

declare(strict_types=1);

namespace eSpace\App\Middleware;

/**
 * Must-Change-Password Middleware
 *
 * Blocks every route in a group (used on the /teacher group in routes/api.php) when the
 * signed-in teacher is still on a temporary password (teachers.must_change_password = 1,
 * mirrored into $_SESSION['must_change_password'] at login - see AuthService::createSession()).
 * Uses HTTP 428 Precondition Required specifically so the frontend axios interceptor can
 * recognize this one condition and force a redirect to /teacher/change-password regardless of
 * which teacher endpoint was actually being called.
 *
 * The change-password endpoint itself (PUT /auth/password) lives outside the /teacher route
 * group entirely, so it's never subject to this gate - no special-casing needed here.
 */
class MustChangePasswordMiddleware extends Middleware
{
    public function handle(): bool
    {
        if (!empty($_SESSION['must_change_password'])) {
            $this->controller->error('You must change your temporary password before continuing.', 428);
            return false;
        }

        return true;
    }
}
