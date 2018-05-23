CREATE TABLE profile_pictures (
  user_id int NOT NULL PRIMARY KEY,
  image blob(1048576) NOT NULL,
  content_type varchar(20) NOT NULL,
  FOREIGN KEY fk_pictures_user_id (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
