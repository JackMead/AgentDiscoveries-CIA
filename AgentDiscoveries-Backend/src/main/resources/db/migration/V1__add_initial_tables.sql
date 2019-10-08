-- Agents and Users

create table agents (
  agent_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  call_sign varchar(20) NOT NULL UNIQUE,
  first_name varchar(30) NOT NULL,
  last_name varchar(100) NOT NULL,
  date_of_birth date NOT NULL,
  `agent_rank` int NOT NULL
);

create table users (
  user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(20) NOT NULL UNIQUE,
  hashed_password char(128) NOT NULL,
  agent_id int NULL,
  FOREIGN KEY fk_users_agent_id (agent_id) REFERENCES agents(agent_id) ON DELETE SET NULL
);

-- Regions and Locations

create table regions (
  region_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(50) NOT NULL
);

create table locations (
  location_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  site_name varchar(20) NOT NULL,
  location varchar(100) NOT NULL,
  time_zone varchar(30) NOT NULL,
  region_id int NULL,
  FOREIGN KEY fk_locations_region_id (region_id) REFERENCES regions(region_id) ON DELETE SET NULL
);

-- Reports

create table location_reports (
  report_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  location_id int NOT NULL,
  agent_id int NOT NULL,
  status tinyint NOT NULL,
  report_time datetime NOT NULL,
  report_body mediumtext NOT NULL,
  FOREIGN KEY fk_reports_location_id (location_id) REFERENCES locations(location_id),
  FOREIGN KEY fk_reports_agent_id (agent_id) REFERENCES agents(agent_id)
);
