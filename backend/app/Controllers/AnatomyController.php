<?php

declare(strict_types=1);

namespace eSpace\App\Controllers;

use eSpace\Config\Config;

/**
 * Anatomy Explorer settings, shared by every role.
 *
 * BioDigital Human is a licensed, paid service. The school gets a developer key from
 * https://developer.biodigital.com and registers its domain there; BioDigital only serves the
 * viewer to registered domains. The key is a *public* client key (it ends up in the viewer URL by
 * design), but it lives in backend/.env so it is not committed and can be changed without a
 * rebuild. No BioDigital account secret is ever stored or sent here.
 *
 *   BIODIGITAL_DEVELOPER_KEY=...
 *   BIODIGITAL_MODULES=production/maleAdult/heart|The heart;production/maleAdult/...|Title
 */
class AnatomyController extends Controller
{
    /** GET /anatomy/config */
    public function config(): void
    {
        if (!$this->isAuthenticated()) {
            $this->unauthorized();
            return;
        }
        $key = trim((string) Config::get('BIODIGITAL_DEVELOPER_KEY', ''));
        $modules = [];
        foreach (explode(';', (string) Config::get('BIODIGITAL_MODULES', '')) as $entry) {
            $parts = array_map('trim', explode('|', $entry, 2));
            $id = $parts[0] ?? '';
            // module ids look like production/maleAdult/heart_anatomy - nothing else is accepted
            if ($id === '' || !preg_match('#^[A-Za-z0-9_\-]+(/[A-Za-z0-9_\-.]+)+$#', $id)) {
                continue;
            }
            $modules[] = ['id' => $id, 'title' => ($parts[1] ?? '') !== '' ? $parts[1] : $id];
        }
        $this->success([
            'biodigital' => [
                'enabled' => $key !== '',
                'developer_key' => $key !== '' ? $key : null,
                'modules' => $modules,
            ],
        ]);
    }
}
