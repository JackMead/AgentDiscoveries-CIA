
create table region_summary_report (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `region_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` tinyint NOT NULL,
  `report_time` datetime NOT NULL,
  `report_body` mediumtext NOT NULL,
  PRIMARY KEY `location_id` (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;