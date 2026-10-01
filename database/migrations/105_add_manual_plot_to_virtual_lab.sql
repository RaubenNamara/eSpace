-- Students can plot a graph themselves (typing or clicking points on graph paper).
-- Those points are stored as their own notebook entry type so they never mix with the
-- simulation-derived Results Table rows, and the teacher opts in per experiment.
ALTER TABLE virtual_lab_notebook_entries
  MODIFY COLUMN entry_type ENUM('measurement','calculation','result_row','plot_point') NOT NULL;

ALTER TABLE virtual_lab_graph_configs
  ADD COLUMN manual_plot TINYINT(1) NOT NULL DEFAULT 0 AFTER show_best_fit;
