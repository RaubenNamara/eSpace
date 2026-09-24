-- Teacher-chosen "book cover" for an eNote topic, shown on the student/teacher eNotes shelves.
-- Stored as a small JSON object (validated/normalized by Teacher\ENoteController::update()):
--   { "template": "portrait|classic|split|exercise", "color": "#rrggbb",
--     "image": "/uploads/enotes/<file>" | null, "title": "...", "author": "...", "year": "2026" }
-- NULL means "never designed" - the shelf falls back to the default exercise-book look.
-- TEXT rather than JSON so it works the same on every MySQL/MariaDB version the school may run.
ALTER TABLE `enote_topics`
    ADD COLUMN `cover_design` TEXT NULL;
