-- Teacher canvas marking on a submitted Virtual Lab practical (ticks, crosses, pen, comments...),
-- the same annotation tools used to mark assessments. One row per marked part of the attempt:
-- 'results' (Results Table), 'graph', 'observations', 'conclusion' or 'answer:<question id>'.
-- base_data is the exact content the teacher marked (table rows, graph points, answer text), kept
-- with the marks so the student later sees the marks on the same sheet the teacher marked.
CREATE TABLE IF NOT EXISTS virtual_lab_marking_annotations (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  attempt_id INT UNSIGNED NOT NULL,
  section_key VARCHAR(64) NOT NULL,
  base_data LONGTEXT NOT NULL,
  annotation_data LONGTEXT NOT NULL,
  teacher_id INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_lab_marking_section (attempt_id, section_key),
  CONSTRAINT fk_lab_marking_attempt FOREIGN KEY (attempt_id) REFERENCES virtual_lab_attempts (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
