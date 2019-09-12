package org.softwire.training.models;

import javax.persistence.*;

@Entity
@Table(name = "profile_pictures")
public class ProfilePicture {
    private byte[] pictureBytes;
    private String contentType;
    private int userId;

    public ProfilePicture() {}

    public ProfilePicture(byte[] pictureBytes, String contentType, int userId) {
        this.contentType = contentType;
        this.pictureBytes = pictureBytes;
        this.userId = userId;
    }

    @Lob
    @Column(name = "image", columnDefinition = "mediumblob", nullable = false)
    public byte[] getPictureBytes(){
        return pictureBytes;
    }

    public void setPictureBytes(byte[] pictureBytes) {
        this.pictureBytes = pictureBytes;
    }

    @Column(name = "content_type", length = 20, nullable = false)
    public String getContentType(){
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    @Id
    @Column(name = "user_id", nullable = false)
    public int getUserId(){
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
