INSERT INTO agents (call_sign, first_name, last_name, date_of_birth, rank) VALUES
  ('Test Fox', 'Test', 'Agent', '1993-02-01', 4);

INSERT INTO users (username, hashed_password, agent_id) VALUES
  ('test_user', '$2a$10$NuLITmF7yiX1ed6b.umRJuqoR9Orjbn3NfmEgx71KjDlv0oB8jnPy', NULL), -- 'password'
  ('test_agent', '$2a$10$vQS27UFASH8lS8Gf84D3A.M9F1W9P3.6lNdotuiBpjfAQ1Lzoz1G2', 1), -- 'password'
  ('test_corrupt', 'bad hash', NULL);

INSERT INTO regions (name) VALUES
  ('England');

INSERT INTO locations (site_name, location, time_zone, region_id) VALUES
  ('MI6', 'London', 'Europe/London', 1);
