package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.Agent;
import org.softwire.training.models.User;

import javax.inject.Inject;
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
            return handle.createUpdate("INSERT INTO user (username, hashed_password, call_sign) " +
                    "VALUES (:username, :hashed_password, :call_sign)")
                    .bind("username", user.getUsername())
                    .bind("hashed_password", user.getHashedPassword())
                    .bind("call_sign", user.getCallSign())
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
            return handle.createUpdate("UPDATE user SET username = :username , hashed_password = :password , call_sign = :call_sign" +
                    "WHERE user_id = :user_id")
                    .bind("user_id", user.getUserId())
                    .bind("username", user.getUsername())
                    .bind("password", user.getHashedPassword())
                    .bind("call_sign", user.getCallSign())
                    .execute();
        }
    }

    public int updateUserCallSign(String currentCallSign, String newCallSign) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("UPDATE user SET call_sign = :call_sign WHERE call_sign = :current_call_sign")
                    .bind("call_sign", newCallSign)
                    .bind("current_call_sign", currentCallSign)
                    .execute();
        }
    }
}
