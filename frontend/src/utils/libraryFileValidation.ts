// eLibrary upload gate shared by the initial-upload and replace-file flows. This is a
// convenience check only, exactly mirroring the real gate the backend enforces (MIME type +
// %PDF- content check in Teacher/LibraryController.php) - never rely on this alone, a user can
// always bypass client-side JS. PDF only, so every book opens in the book reader.
export const ALLOWED_LIBRARY_MIME_TYPES = ['application/pdf']

export const ALLOWED_LIBRARY_EXTENSIONS = ['pdf']

export const LIBRARY_FILE_ACCEPT = '.pdf,application/pdf'

export const LIBRARY_FILE_ERROR = 'Only PDF files are allowed. For a PowerPoint, save it as PDF first (File > Save As > PDF).'

/**
 * A browser's reported file.type can be empty (some OS/browser combinations don't populate it
 * for certain extensions) - only reject on MIME when it's actually present and wrong, so the
 * extension check remains the primary client-side signal either way.
 */
export function isAllowedLibraryFile(file: File): boolean {
  const extension = file.name.split('.').pop()?.toLowerCase() || ''
  if (!ALLOWED_LIBRARY_EXTENSIONS.includes(extension)) return false
  if (file.type && !ALLOWED_LIBRARY_MIME_TYPES.includes(file.type)) return false
  return true
}
