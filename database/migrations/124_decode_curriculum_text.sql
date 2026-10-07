-- 124: curriculum topics, learning outcomes and constructs were saved HTML-escaped, so screens
-- showed "Qur&#039;an" and "R&amp;D". They are plain text now (the app escapes on display);
-- this turns the stored codes back into the characters they stand for. &amp; goes last so a
-- literal "&amp;lt;" isn't decoded twice.
UPDATE enote_curriculum_topics SET
  theme_branch = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(theme_branch, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&'),
  topic        = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(topic, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&'),
  competence   = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(competence, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&');

UPDATE enote_learning_outcomes SET
  learning_outcome = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(learning_outcome, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&');

UPDATE constructs SET
  name        = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(name, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&'),
  description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(description, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&');

-- Some outcomes were escaped twice ("&amp;amp;") - a second pass finishes them
UPDATE enote_learning_outcomes SET
  learning_outcome = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(learning_outcome, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&')
WHERE learning_outcome REGEXP '&(#0?39|amp|quot|lt|gt);';
UPDATE enote_curriculum_topics SET
  topic      = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(topic, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&'),
  competence = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(competence, '&#039;', ''''), '&#39;', ''''), '&quot;', '"'), '&lt;', '<'), '&gt;', '>'), '&amp;', '&')
WHERE CONCAT(topic, competence) REGEXP '&(#0?39|amp|quot|lt|gt);';
