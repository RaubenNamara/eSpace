-- New apparatus for a Projectile Motion experiment: everything else it needs (a ruler for range,
-- already supporting horizontal orientation; a stopwatch for time of flight) already exists.
INSERT INTO `virtual_lab_objects` (`object_type`, `display_name`, `category`, `description`, `default_props`, `supported_actions`, `icon`, `is_active`, `created_at`, `updated_at`)
VALUES
  ('projectile_launcher', 'Projectile Launcher', 'physics',
   'A spring-loaded launcher with an adjustable firing angle, used to investigate how launch angle affects range.',
   JSON_OBJECT('launch_velocity_ms', 12), JSON_ARRAY('move', 'rotate', 'switch_on', 'switch_off', 'zoom', 'inspect'),
   '🎯', 1, NOW(), NOW()),
  ('projectile', 'Projectile Ball', 'physics',
   'The ball fired by the launcher - follows a real parabolic trajectory once fired.',
   JSON_OBJECT(), JSON_ARRAY('move', 'zoom', 'inspect'),
   '🔴', 1, NOW(), NOW())
ON DUPLICATE KEY UPDATE
  display_name = VALUES(display_name), description = VALUES(description),
  default_props = VALUES(default_props), supported_actions = VALUES(supported_actions),
  icon = VALUES(icon), updated_at = NOW();
