<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Concerns\SchoolContentScope;
use eSpace\App\Controllers\Teacher\LibraryController as TeacherLibraryController;

/**
 * The eLibrary from the HOD and admin side - the teacher's shelves, upload, edit, covers, readers
 * and bulk actions over the department (HOD) or the whole school (admin). See SchoolContentScope.
 *
 * GET /hod|admin/library/options, and the teacher library routes under /hod/library and /admin/library
 */
class SchoolLibraryController extends TeacherLibraryController
{
    use SchoolContentScope;

    protected function ownerColumn(): string
    {
        return 'uploaded_by';
    }
}
