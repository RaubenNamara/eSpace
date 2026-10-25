-- 144: The current term follows the calendar.
--  term_auto_switch - 1 (the default): when today falls inside a term, that term becomes the
--                     current one by itself (Services/TermService). 0: the admin chooses the
--                     current term by hand on the Terms page.
--  Safe to run again.
ALTER TABLE `school_settings`
  ADD COLUMN IF NOT EXISTS `term_auto_switch` TINYINT(1) NOT NULL DEFAULT 1;
