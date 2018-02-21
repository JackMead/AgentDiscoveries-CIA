create table profile_picture (
  `image` blob NOT NULL,
  `file_type` varchar(10) NOT NULL,
  `user_id` int NOT NULL,
  FOREIGN KEY `user_id` (`user_id`) REFERENCES user(`user_id`) ON DELETE CASCADE,
  UNIQUE `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;