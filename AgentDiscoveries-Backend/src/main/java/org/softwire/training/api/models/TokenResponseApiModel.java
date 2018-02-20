package org.softwire.training.api.models;

import java.sql.Blob;

public class TokenResponseApiModel {

    private String token;
    private String expires;
    private int userId;
    private byte[] picture;

    public TokenResponseApiModel(String token, String expires, int userId, byte[] picture) {
        this.token = token;
        this.userId = userId;
        this.expires = expires;
        this.picture=picture;
    }

    public String getToken() {
        return token;
    }

    public String getExpires() {
        return expires;
    }

    public int getUserId(){return userId;}

    public byte[] getPicture(){return picture;}
}
