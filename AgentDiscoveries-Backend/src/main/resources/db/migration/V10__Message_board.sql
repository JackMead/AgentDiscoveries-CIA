create table messages (
   MessageID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   Message VARCHAR(255) NOT NULL,
   UserID INT NULL,
   FOREIGN KEY fk_messages_user_id (UserID) REFERENCES users(user_id) ON DELETE SET NULL
);