package org.softwire.training.db.daos;

import org.apache.commons.io.IOUtils;
import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.mapper.MapMapper;
import org.jdbi.v3.core.mapper.RowMapper;
import org.softwire.training.models.Agent;
import org.softwire.training.models.User;
import org.yaml.snakeyaml.reader.StreamReader;

import javax.inject.Inject;
import javax.servlet.http.Part;
import javax.sql.rowset.serial.SerialBlob;
import javax.swing.text.html.Option;
import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.ResultSet;
import java.time.LocalDate;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public Optional<byte[]> getPicture(int userId){
        try (Handle handle = jdbi.open()) {
            RowMapper<byte[]> byteMapper = (rs, ctx)-> rs.getBytes("profile_picture");
            return handle.createQuery("SELECT profile_picture FROM user WHERE user_id = :userId")
                    .bind("userId", userId)
                    .map(byteMapper)
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
            return handle.createUpdate("UPDATE user SET username = :username , hashed_password = :password " +
                    "WHERE user_id = :user_id")
                    .bind("user_id", user.getUserId())
                    .bind("username", user.getUsername())
                    .bind("password", user.getHashedPassword())
                    .execute();
        }
    }

    public int updateUserPicture(int userId, InputStream pictureStream) {
        Blob blob = null;
        try {
            byte[] contents = IOUtils.toByteArray(pictureStream);
            blob = new SerialBlob(contents);
        } catch (Exception e) {
            //TODO
        }

        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("UPDATE user SET profile_picture = :profile_picture " +
                    "WHERE user_id = :user_id")
                    .bind("user_id", userId)
                    .bind("profile_picture", blob)
                    .execute();
        }
    }
}
