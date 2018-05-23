package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.ProfilePicture;

import javax.inject.Inject;
import java.sql.Blob;
import java.util.Optional;

public class PicturesDao {

    @Inject
    Jdbi jdbi;

    public Optional<ProfilePicture> getPicture(int userId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM profile_pictures WHERE user_id = :userId")
                    .bind("userId", userId)
                    .map((rs, ctx) -> new ProfilePicture(rs.getBytes("image"), rs.getString("content_type"), rs.getInt("user_id")))
                    .findFirst();
        }
    }


    public void createOrUpdateUserPicture(int userId, Blob blob, String fileType) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("INSERT INTO profile_pictures (image, content_type, user_id) "+
                    "VALUES(:image , :content_type , :user_id) "+
                    "ON DUPLICATE KEY UPDATE image = :image , content_type = :content_type")
                    .bind("user_id", userId)
                    .bind("image", blob)
                    .bind("content_type", fileType)
                    .execute();
        }
    }

    public void deleteUserPicture(int userId){
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("DELETE FROM profile_picture "+
                    "WHERE user_id = :user_id ")
                    .bind("user_id", userId)
                    .execute();
        }
    }
}
