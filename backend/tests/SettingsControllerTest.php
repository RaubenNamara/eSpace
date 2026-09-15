<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class SettingsControllerTest extends TestCase
{
    public function testStudentSettingsControllerExists(): void
    {
        $this->assertTrue(class_exists(\eSpace\App\Controllers\Student\SettingsController::class));
    }

    public function testTeacherSettingsControllerExists(): void
    {
        $this->assertTrue(class_exists(\eSpace\App\Controllers\Teacher\SettingsController::class));
    }
}
