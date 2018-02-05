package org.softwire.training.api.models;

public class TokenResponseApiModel {

    private String token;
    private String expires;

    public TokenResponseApiModel(String token, String expires) {
        this.token = token;
        this.expires = expires;
    }

    public String getToken() {
        return token;
    }

    public String getExpires() {
        return expires;
    }
}
