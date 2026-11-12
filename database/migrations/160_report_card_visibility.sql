-- 160: Who can see report cards. Admins always can; the super admin turns the others on
-- (Admin\ReportCardController::visibility, the Reports page).
--  report_cards_students - learners see their own card (My Progress, Report card)
--  report_cards_teachers - teachers see the cards of the learners they teach, or of their class
--  report_cards_parents  - the private parent page shows the child's card
-- All start off. Safe to run again.
ALTER TABLE `school_settings`
  ADD COLUMN IF NOT EXISTS `report_cards_students` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `report_cards_teachers` TINYINT(1) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS `report_cards_parents` TINYINT(1) NOT NULL DEFAULT 0;
