<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Support\FileAccess;

/**
 * A link to one uploaded file that works for an hour without signing in, for Microsoft's Office
 * viewer (it fetches the file itself). Only for a file the signed-in user may open.
 * GET /api/files/link?path=/uploads/...
 */
class FileLinkController extends Controller
{
    public function link(): void
    {
        $rel = FileAccess::relativePath((string) $this->query('path', ''));
        if ($rel === null || !is_file(__DIR__ . '/../../public/uploads/' . $rel)) {
            $this->notFound('File not found');
            return;
        }
        if (!FileAccess::userMayOpen($rel, $this->getCurrentUserRole(), (int) $this->getCurrentUserId())) {
            $this->forbidden('You do not have access to this file');
            return;
        }
        $path = implode('/', array_map('rawurlencode', explode('/', $rel)));
        $this->success(['url' => '/uploads/' . $path . '?' . FileAccess::signedQuery($rel)]);
    }
}
