DROP TABLE IF EXISTS favourite_stories CASCADE;
CREATE TABLE favourite_stories (
  id SERIAL PRIMARY KEY NOT NULL,
  story_id INTEGER REFERENCES stories(id) NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL
);
