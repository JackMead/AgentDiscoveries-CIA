package org.softwire.training.api.models;

public class PictureApiModel{
    private byte[] pictureBytes;
    private String contentType;
    private int userId;

    public PictureApiModel(byte[] pictureBytes, String contentType, int userId) {
        this.contentType = contentType;
        this.pictureBytes = pictureBytes;
        this.userId = userId;
    }

    public byte[] getPictureBytes(){return pictureBytes;}

    public String getContentType(){return contentType;}

    public int getUserId(){return userId;}
}
