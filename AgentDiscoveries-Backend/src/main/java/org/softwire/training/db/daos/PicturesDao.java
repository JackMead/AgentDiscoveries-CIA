package org.softwire.training.db.daos;

import org.softwire.training.models.ProfilePicture;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import java.util.Optional;

public class PicturesDao {

    private DaoHelper<ProfilePicture> helper;

    @Inject
    public PicturesDao(EntityManagerFactory entityManagerFactory) {
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<ProfilePicture> getPicture(int userId) {
        return helper.getEntity(ProfilePicture.class, userId);
    }

    public void createOrUpdateUserPicture(int userId, byte[] pictureBytes, String fileType) {
        ProfilePicture picture = new ProfilePicture(pictureBytes, fileType, userId);
        helper.updateEntity(picture);
    }

    public void deleteUserPicture(int userId){
        helper.deleteEntity(ProfilePicture.class, userId);
    }
}
