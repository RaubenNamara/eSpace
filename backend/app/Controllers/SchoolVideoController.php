<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Concerns\SchoolContentScope;
use eSpace\App\Controllers\Teacher\VideoController as TeacherVideoController;

/**
 * Videos from the HOD and admin side - the teacher's video page (upload, edit, viewers, bulk
 * actions) over the department (HOD) or the whole school (admin). See SchoolContentScope.
 *
 * GET /hod|admin/videos/options, and the teacher video routes under /hod/videos and /admin/videos
 */
class SchoolVideoController extends TeacherVideoController
{
    use SchoolContentScope;

    protected function ownerColumn(): string
    {
        return 'teacher_id';
    }
}
