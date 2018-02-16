package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.Agent;
import org.softwire.training.models.User;

import javax.inject.Inject;
import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.Optional;

public class UsersDao {

    @Inject
    Jdbi jdbi;

    public Optional<User> getUserByUsername(String username) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM user WHERE username = :username")
                    .bind("username", username)
                    .mapToBean(User.class)
                    .findFirst();
        }
    }

    public Optional<User> getUser(int userId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM user WHERE user_id = :userId")
                    .bind("userId", userId)
                    .mapToBean(User.class)
                    .findFirst();
        }
    }

    public int addUser(User user) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("INSERT INTO user (username, hashed_password) " +
                    "VALUES (:username, :hashed_password)")
                    .bind("username", user.getUsername())
                    .bind("hashed_password", user.getHashedPassword())
                    .executeAndReturnGeneratedKeys("user_id")
                    .mapTo(Integer.class)
                    .findOnly();
        }
    }

    public int deleteUser(int userId) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("DELETE FROM user WHERE user_id = :user_id")
                    .bind("user_id", userId)
                    .execute();
        }
    }

    public int updateUser(User user) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("UPDATE user SET username = :username , hashed_password = :password , picture_filename = :picture_filename " +
                    "WHERE user_id = :user_id")
                    .bind("user_id", user.getUserId())
                    .bind("username", user.getUsername())
                    .bind("password", user.getHashedPassword())
                    .bind("picture_filename", user.getPictureFilename())
                    .execute();
        }
    }
}
