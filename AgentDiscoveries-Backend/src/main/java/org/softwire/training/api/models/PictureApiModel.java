package org.softwire.training.api.models;

public class PictureApiModel{
    private byte[] imageBytes;
    private String fileType;
    private int userId;

    public PictureApiModel(byte[] imageBytes, String fileType, int userId) {
        this.fileType=fileType;
        this.imageBytes=imageBytes;
        this.userId=userId;
    }

    public byte[] getImageBytes(){return imageBytes;}

    public String getFileType(){return fileType;}

    public int getUserId(){return userId;}
}
