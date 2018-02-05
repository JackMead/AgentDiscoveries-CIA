
create table user (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `hashed_password` char(128) NOT NULL,
  PRIMARY KEY `user_id` (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table agent (
  `agent_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30),
  `last_name` varchar(100),
  `date_of_birth` date NOT NULL,
  `rank` int NOT NULL,
  `call_sign` varchar(20),
  PRIMARY KEY `agent_id` (`agent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table location (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `site_name` varchar(20) NOT NULL,
  `location` varchar(100) NOT NULL,
  `time_zone` varchar(30) NOT NULL,
  PRIMARY KEY `location_id` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table region (
  `region_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY `region_id` (`region_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table location_region (
  `region_id` int NOT NULL,
  `location_id` int NOT NULL,
  PRIMARY KEY `region_location` (`region_id`, `location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table agent_location_report (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `location_id` int NOT NULL,
  `agent_id` int NOT NULL,
  `status` tinyint NOT NULL,
  `report_time` datetime NOT NULL,
  `report_body` mediumtext NOT NULL,
  PRIMARY KEY `location_id` (`report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;