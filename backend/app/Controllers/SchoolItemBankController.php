<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\App\Controllers\Concerns\SchoolContentScope;
use eSpace\App\Controllers\Teacher\ItemBankController as TeacherItemBankController;

/**
 * The Item Bank from the HOD and admin side - the teacher's page (upload, edit, covers, readers,
 * bulk actions) over the department (HOD) or the whole school (admin). See SchoolContentScope.
 * A paper written page by page stays a teacher's tool (its editor is the teacher's), so HODs and
 * admins upload documents.
 *
 * GET /hod|admin/itembank/options, and the teacher item bank routes under /hod/itembank and /admin/itembank
 */
class SchoolItemBankController extends TeacherItemBankController
{
    use SchoolContentScope;

    protected function ownerColumn(): string
    {
        return 'created_by';
    }

    public function create(): void
    {
        if (($this->input()['kind'] ?? '') === 'paper') {
            $this->validationError(['kind' => 'Papers are written by teachers - upload a document instead']);
            return;
        }
        parent::create();
    }
}
