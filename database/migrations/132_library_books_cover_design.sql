-- eLibrary book covers designed in eSpace - the same templates as eNote covers (portrait, classic,
-- split, exercise book), a colour, an optional picture, and the title, author and year on the
-- cover. JSON, validated by App\Utils\CoverDesign. NULL = the cover picture (or the first page of
-- the file) as before.

ALTER TABLE `library_books`
    ADD COLUMN `cover_design` TEXT NULL DEFAULT NULL AFTER `cover_image`;
