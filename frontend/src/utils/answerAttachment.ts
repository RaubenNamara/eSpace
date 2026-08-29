// FreeResponseAnswer.vue silently auto-uploads a starting document for every free-response
// question on mount (a copy of the teacher's starting doc, or a blank page) so the Write-mode
// canvas is always ready - this always gets a predictable placeholder filename, distinct from
// anything a real student upload would be named, so completion checks (progress dots, the submit
// confirmation) can tell the two apart without any new persisted flag.
const PLACEHOLDER_ATTACHMENT_NAME_PATTERNS = [/^Assignment file\./i, /^Blank canvas\.png$/i]

export function isPlaceholderAttachmentName(originalName?: string | null): boolean {
  if (!originalName) return true
  return PLACEHOLDER_ATTACHMENT_NAME_PATTERNS.some(re => re.test(originalName))
}
