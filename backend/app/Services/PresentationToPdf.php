<?php

declare(strict_types=1);

namespace eSpace\App\Services;

use eSpace\Config\Config;

/**
 * A PDF copy of an eLibrary PowerPoint (.ppt/.pptx), so it opens in the same book reader as a
 * PDF book instead of Microsoft's slide viewer. The copy sits next to the original with the same
 * name and ".reader.pdf" (library_ab12_1794.pptx -> library_ab12_1794.reader.pdf); the reader
 * looks for it there and falls back to the slide viewer when there is none.
 *
 * Made with LibreOffice (headless). SOFFICE_PATH in backend/.env names the program; without it
 * the usual places are tried. No LibreOffice: nothing is made, and the book still opens.
 */
final class PresentationToPdf
{
    private const TIMEOUT_SECONDS = 240;

    /** Where the PDF copy of $source goes */
    public static function readerPath(string $source): string
    {
        return preg_replace('/\.pptx?$/i', '', $source) . '.reader.pdf';
    }

    public static function isPresentation(string $path): bool
    {
        return (bool) preg_match('/\.pptx?$/i', $path);
    }

    /** The LibreOffice program, or null when this server has none */
    public static function soffice(): ?string
    {
        $candidates = array_filter([
            (string) Config::get('SOFFICE_PATH', ''),
            'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
            '/usr/bin/soffice',
            '/usr/bin/libreoffice',
            '/usr/local/bin/soffice',
            '/opt/libreoffice/program/soffice',
            (getenv('HOME') ?: '') . '/opt/libreoffice/AppRun',
        ]);
        foreach ($candidates as $path) {
            if (@is_file($path) && @is_executable($path)) {
                return $path;
            }
        }
        return null;
    }

    /**
     * Makes the PDF copy of $source (an absolute path). Returns its path, or null when it couldn't
     * be made (logged; the book is still saved and opens in the slide viewer).
     */
    public static function convert(string $source): ?string
    {
        if (!self::isPresentation($source) || !is_file($source)) {
            return null;
        }
        $soffice = self::soffice();
        if ($soffice === null) {
            error_log('[library] no LibreOffice (SOFFICE_PATH) - presentation left without a reader PDF: ' . basename($source));
            return null;
        }

        // A folder of its own for each run: LibreOffice's settings (two runs at once would fight
        // over one) and its output, which is named after the source
        $work = sys_get_temp_dir() . '/espace_pptx_' . bin2hex(random_bytes(6));
        if (!@mkdir($work . '/profile', 0700, true)) {
            error_log('[library] could not make a work folder for the PDF copy');
            return null;
        }
        $profileUrl = 'file://' . (DIRECTORY_SEPARATOR === '\\' ? '/' . str_replace('\\', '/', $work) : $work) . '/profile';

        $cmd = [
            $soffice,
            '-env:UserInstallation=' . $profileUrl,
            '--headless', '--norestore', '--nologo', '--nodefault', '--nolockcheck',
            '--convert-to', 'pdf',
            '--outdir', $work,
            $source,
        ];
        $env = getenv();
        $env['HOME'] = $work; // shared hosting PHP users often have no writable home
        $proc = @proc_open($cmd, [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes, $work, $env);
        if (!is_resource($proc)) {
            error_log('[library] LibreOffice could not be started');
            self::cleanup($work);
            return null;
        }
        fclose($pipes[0]);
        stream_set_blocking($pipes[1], false);
        stream_set_blocking($pipes[2], false);
        $output = '';
        $started = time();
        while (true) {
            $output .= (string) stream_get_contents($pipes[1]) . (string) stream_get_contents($pipes[2]);
            $status = proc_get_status($proc);
            if (!$status['running']) {
                break;
            }
            if (time() - $started > self::TIMEOUT_SECONDS) {
                proc_terminate($proc, 9);
                error_log('[library] LibreOffice took too long on ' . basename($source));
                break;
            }
            usleep(200000);
        }
        fclose($pipes[1]);
        fclose($pipes[2]);
        proc_close($proc);

        $made = $work . '/' . pathinfo($source, PATHINFO_FILENAME) . '.pdf';
        $target = self::readerPath($source);
        $ok = is_file($made) && filesize($made) > 0 && str_starts_with((string) file_get_contents($made, false, null, 0, 5), '%PDF-')
            && @rename($made, $target);
        if (!$ok && is_file($made)) {
            $ok = @copy($made, $target);
        }
        self::cleanup($work);
        if (!$ok) {
            error_log('[library] PDF copy failed for ' . basename($source) . ': ' . trim(mb_substr($output, 0, 500)));
            return null;
        }
        @chmod($target, 0644);
        return $target;
    }

    /** Removes the PDF copy of $source, if there is one */
    public static function remove(string $source): void
    {
        if (self::isPresentation($source)) {
            $pdf = self::readerPath($source);
            if (is_file($pdf)) {
                @unlink($pdf);
            }
        }
    }

    private static function cleanup(string $dir): void
    {
        if (!is_dir($dir)) {
            return;
        }
        $items = new \RecursiveIteratorIterator(
            new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS),
            \RecursiveIteratorIterator::CHILD_FIRST
        );
        foreach ($items as $item) {
            $item->isDir() ? @rmdir($item->getPathname()) : @unlink($item->getPathname());
        }
        @rmdir($dir);
    }
}
