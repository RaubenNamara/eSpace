-- A student's own colour for each page's "My Summary" / "My Notes" (eNotes reader and library
-- PDF viewer), so different pages' summaries can be told apart at a glance. NULL = the student's
-- default colour. Values are validated against the fixed palette in Student\PageNoteController.
ALTER TABLE `enote_page_notes`
    ADD COLUMN `color` VARCHAR(20) NULL;

ALTER TABLE `library_page_notes`
    ADD COLUMN `color` VARCHAR(20) NULL;
