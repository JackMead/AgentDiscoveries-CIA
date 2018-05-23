create table region_summary_reports (
  report_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  region_id int NOT NULL,
  agent_id int NOT NULL,
  status tinyint NOT NULL,
  report_time datetime NOT NULL,
  report_body mediumtext NOT NULL,
  FOREIGN KEY fk_reports_region_id (region_id) REFERENCES regions(region_id),
  FOREIGN KEY fk_reports_agent_id (agent_id) REFERENCES agents(agent_id)
);
