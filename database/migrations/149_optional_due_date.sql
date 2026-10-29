-- 149: An assessment's deadline is optional.
--  A teacher can publish without one; due_date NULL means "no deadline" - it is never late and
--  stays open until the teacher closes it. Reports that pick assessments by date use the date it
--  was published instead (see ReportCardService, PerformanceReportService).
--  Safe to run again.
ALTER TABLE `assignments` MODIFY `due_date` DATETIME NULL DEFAULT NULL;
