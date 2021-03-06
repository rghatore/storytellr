DROP TABLE IF EXISTS branches CASCADE;
CREATE TABLE branches (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  branch_point_id INTEGER REFERENCES branch_points(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  date_started TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  date_approved TIMESTAMPTZ DEFAULT NULL
);
