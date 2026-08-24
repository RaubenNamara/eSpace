<?php

declare(strict_types=1);

namespace eSpace\App\Controllers\Admin;

use eSpace\App\Controllers\Controller;

/**
 * Admin Settings Controller
 *
 * School-wide settings (name, logo, contact info) shown in the report card header and
 * elsewhere. Single-row config table (school_settings, id=1, seeded by migration 038).
 */
class SettingsController extends Controller
{
    private const ALLOWED_MIME = [
        'image/jpeg' => 'jpg',
        'image/png' => 'png',
        'image/webp' => 'webp',
    ];
    private const MAX_LOGO_SIZE = 2 * 1024 * 1024; // 2MB

    private function getDb()
    {
        return \eSpace\Config\Database::getInstance();
    }

    /**
     * GET /admin/settings
     */
    public function index(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $stmt = $this->getDb()->query('SELECT * FROM school_settings WHERE id = 1');
        $settings = $stmt->fetch();

        $this->success($settings ?: []);
    }

    /**
     * PUT /admin/settings
     */
    public function update(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        $data = $this->input();
        $fields = ['school_name', 'box_number', 'website', 'email', 'phone', 'motto', 'address'];

        $set = [];
        $params = ['id' => 1];
        foreach ($fields as $field) {
            if (array_key_exists($field, $data)) {
                $set[] = "{$field} = :{$field}";
                $params[$field] = trim((string) $data[$field]);
            }
        }

        if (array_key_exists('max_awards_on_report_card', $data)) {
            // Clamped 1-4: at least one badge should be able to show, and the report card's
            // layout is only designed with room for a handful of award pills before it crowds
            // the definitions/comments sections below it.
            $set[] = 'max_awards_on_report_card = :max_awards_on_report_card';
            $params['max_awards_on_report_card'] = max(1, min(4, (int) $data['max_awards_on_report_card']));
        }

        if (empty($set)) {
            $this->validationError(['fields' => 'No valid fields provided']);
            return;
        }

        $db = $this->getDb();
        $stmt = $db->prepare('UPDATE school_settings SET ' . implode(', ', $set) . ' WHERE id = :id');
        $stmt->execute($params);

        $stmt = $db->query('SELECT * FROM school_settings WHERE id = 1');
        $this->success($stmt->fetch(), 'Settings updated');
    }

    /**
     * POST /admin/settings/logo
     */
    public function uploadLogo(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }

        if (!isset($_FILES['logo']) || $_FILES['logo']['error'] !== UPLOAD_ERR_OK) {
            $this->error('No logo uploaded or upload error occurred', 400);
            return;
        }

        $file = $_FILES['logo'];

        if ($file['size'] > self::MAX_LOGO_SIZE) {
            $this->error('Logo exceeds maximum size of 2MB', 400);
            return;
        }

        $finfo = finfo_open(FILEINFO_MIME_TYPE);
        $mimeType = finfo_file($finfo, $file['tmp_name']);
        finfo_close($finfo);

        if (!isset(self::ALLOWED_MIME[$mimeType]) || getimagesize($file['tmp_name']) === false) {
            $this->error('Invalid file type. Only JPEG, PNG, and WebP images are allowed', 400);
            return;
        }

        $uploadDir = __DIR__ . '/../../../public/uploads/settings/';
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $db = $this->getDb();

        $stmt = $db->prepare('SELECT logo_path FROM school_settings WHERE id = 1');
        $stmt->execute();
        $existing = $stmt->fetch();

        $filename = 'logo_' . bin2hex(random_bytes(8)) . '.' . self::ALLOWED_MIME[$mimeType];
        $filepath = $uploadDir . $filename;

        if (!move_uploaded_file($file['tmp_name'], $filepath)) {
            $this->serverError('Failed to save logo');
            return;
        }

        $logoUrl = '/uploads/settings/' . $filename;

        $stmt = $db->prepare('UPDATE school_settings SET logo_path = :logo_path WHERE id = 1');
        $stmt->execute(['logo_path' => $logoUrl]);

        if ($existing && $existing['logo_path']) {
            $oldPath = __DIR__ . '/../../../public' . $existing['logo_path'];
            if (is_file($oldPath)) {
                @unlink($oldPath);
            }
        }

        $this->success(['logo_path' => $logoUrl], 'Logo updated');
    }
}
