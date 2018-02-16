package org.softwire.training.api.models;

public class TokenResponseApiModel {

    private String token;
    private String expires;
    private int userId;
    private String pictureFilepath;

    public TokenResponseApiModel(String token, String expires, int userId, String pictureFilepath) {
        this.token = token;
        this.userId = userId;
        this.expires = expires;
        this.pictureFilepath=pictureFilepath;
    }

    public String getToken() {
        return token;
    }

    public String getExpires() {
        return expires;
    }

    public int getUserId(){return userId;}

    public String getPictureFilepath(){return pictureFilepath;}
}
