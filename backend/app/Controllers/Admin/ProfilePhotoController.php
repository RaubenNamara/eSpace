<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * The super admin removing someone's profile photo - a wrong or unsuitable picture, or one that
 * needs changing. The account goes back to its initials until a new photo is uploaded.
 */
class ProfilePhotoController extends Controller
{
    // Whose photo, and the table it is kept in
    private const TABLES = ['student' => 'students', 'teacher' => 'teachers', 'hod' => 'hods', 'admin' => 'users'];

    /**
     * DELETE /admin/profile-photo/{type}/{id}   type: student | teacher | hod | admin
     */
    public function remove($type, $id): void
    {
        if (!$this->isAuthenticated() || $this->getCurrentUserRole() !== 'super_admin') {
            $this->forbidden('Only a super admin can remove a profile photo');
            return;
        }
        $table = self::TABLES[(string) $type] ?? null;
        if ($table === null) {
            $this->notFound('Unknown kind of account');
            return;
        }

        $db = \eSpace\Config\Database::getInstance();
        $stmt = $db->prepare("SELECT profile_photo FROM {$table} WHERE id = :id AND deleted_at IS NULL");
        $stmt->execute(['id' => (int) $id]);
        $row = $stmt->fetch();
        if (!$row) {
            $this->notFound('Account not found');
            return;
        }
        if (empty($row['profile_photo'])) {
            $this->success(['profile_photo' => null], 'There was no photo to remove');
            return;
        }

        $db->prepare("UPDATE {$table} SET profile_photo = NULL WHERE id = :id")->execute(['id' => (int) $id]);

        // Only files in the uploads folder are ours to delete
        $photo = (string) $row['profile_photo'];
        if (str_starts_with($photo, '/uploads/') && !str_contains($photo, '..')) {
            $path = __DIR__ . '/../../../public' . $photo;
            if (is_file($path)) {
                @unlink($path);
            }
        }

        // The super admin removing their own photo sees it gone straight away
        if ($table === 'users' && (int) $id === (int) $this->getCurrentUserId()) {
            $_SESSION['profile_photo'] = null;
        }

        $this->success(['profile_photo' => null], 'Profile photo removed');
    }
}
