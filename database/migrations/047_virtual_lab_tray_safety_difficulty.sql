-- Apparatus tray: an object with "in_tray": true in its scene_objects entry starts off the bench
-- in a pickable tray instead of pre-placed - the student must place it before it can be
-- connected/used. Existing experiments are untouched (no in_tray key = false, exactly today's
-- pre-placed behaviour), so nothing already working changes for them.
-- No schema change needed for this - "in_tray" simply lives inside the existing scene_objects
-- JSON column, read by the frontend the same way "props"/"position" already are.

-- Safety mistakes tracked separately from ordinary wrong actions (a wrong click vs. an unsafe
-- one are different signals for a teacher).
ALTER TABLE `virtual_lab_attempts`
    ADD COLUMN `safety_mistakes` INT UNSIGNED NOT NULL DEFAULT 0 AFTER `hints_used`;

-- Difficulty affects how much guidance the student sees client-side (more hints/highlighting for
-- beginner, less for advanced) - the underlying step/tolerance grading is unchanged at every
-- level, only how much help is surfaced.
ALTER TABLE `virtual_lab_experiments`
    ADD COLUMN `difficulty` ENUM('beginner', 'intermediate', 'advanced') NOT NULL DEFAULT 'intermediate' AFTER `category`;
