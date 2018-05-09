package org.softwire.training.models;

public class ProfilePicture {
    private byte[] pictureBytes;
    private String contentType;
    private int userId;

    public ProfilePicture(byte[] pictureBytes, String contentType, int userId) {
        this.contentType = contentType;
        this.pictureBytes = pictureBytes;
        this.userId = userId;
    }

    public byte[] getPictureBytes(){
        return pictureBytes;
    }

    public String getContentType(){
        return contentType;
    }

    public int getUserId(){
        return userId;
    }
}
