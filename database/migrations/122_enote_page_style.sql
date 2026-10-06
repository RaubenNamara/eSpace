-- 122: how an eNote topic's pages look to students - 'book' (the printed-book page they have
-- always had) or 'notebook' (ruled paper, red margin, handwritten-style text, blue headings).
ALTER TABLE `enote_topics`
  ADD COLUMN IF NOT EXISTS `page_style` VARCHAR(16) NOT NULL DEFAULT 'book' AFTER `cover_design`;
