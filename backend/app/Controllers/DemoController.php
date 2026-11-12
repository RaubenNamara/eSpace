<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Services\AuthService;
use eSpace\App\Services\DemoSchool;
use eSpace\App\Services\ParentDigestService;
use eSpace\App\Support\Tenant;

/**
 * "Try Tusome" on the website: one tap opens the demo school (DemoSchool) as a learner, a teacher
 * or a head teacher - or a parent's weekly page. No sign-up and no password.
 *
 * GET  /api/demo         - whether the demo is open
 * POST /api/demo/enter   { as: learner | teacher | head | parent }
 */
class DemoController extends Controller
{
    public function status(): void
    {
        $this->success(['open' => DemoSchool::school() !== null]);
    }

    public function enter(): void
    {
        $as = (string) $this->input('as', '');
        $school = DemoSchool::school();
        if (!$school) {
            $this->error('The demo school is closed just now. Please try again later, or ask us for a demo.', 503);
            return;
        }

        // the parent door: the demo learner's private weekly page - no sign-in at all
        if ($as === 'parent') {
            $token = Tenant::connect($school['db_name'])->query('SELECT token FROM parent_links WHERE revoked_at IS NULL ORDER BY id LIMIT 1')->fetchColumn();
            if (!$token) {
                $this->error('The demo parent page is not ready yet.', 503);
                return;
            }
            // the page names its school; the visitor's session is left as it was
            $this->success(['parent_url' => '/parent/' . $token . '?school=' . rawurlencode($school['code'])]);
            return;
        }

        if (!isset(DemoSchool::ACCOUNTS[$as])) {
            $this->validationError(['as' => 'Choose learner, teacher, head or parent']);
            return;
        }
        $entered = Tenant::enter($school['code']);
        if (isset($entered['error'])) {
            $this->error($entered['error'], 503);
            return;
        }
        $user = (new AuthService())->startDemoSession(DemoSchool::ACCOUNTS[$as]);
        if (!$user) {
            Tenant::enter('');
            $this->error('The demo school is being set up. Please try again in a few minutes.', 503);
            return;
        }
        $this->success([
            'user' => $user,
            'csrf_token' => \eSpace\App\Middleware\CSRFMiddleware::generateToken(),
            'school' => ['code' => $school['code'], 'name' => $school['name'], 'kind' => $school['kind']],
            'demo' => true,
        ], 'Welcome to the demo school');
    }
}
