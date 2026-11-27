// The PDF a library book is read from: the book itself for a PDF, or for a PowerPoint the PDF
// copy the server made of it at upload (same name, ".reader.pdf"; see backend PresentationToPdf).
// A PowerPoint uploaded while the server had no LibreOffice has no copy (the path then 404s).
export const isPresentationPath = (path: string | null | undefined): boolean => /\.pptx?$/i.test(String(path || ''))

export const readerPdfPath = (book: { file_path?: string | null; file_type?: string | null }): string | null => {
  const path = String(book.file_path || '')
  if (!path) return null
  if ((book.file_type || 'pdf') === 'pdf') return path
  return isPresentationPath(path) ? path.replace(/\.pptx?$/i, '.reader.pdf') : null
}
