package org.softwire.training.models;

import spark.utils.StringUtils;

import java.sql.Blob;

public class User {

    private int userId;
    private String username;
    private String hashedPassword;
    private byte[] profilePicture;
    private final String defaultPictureFilename = "default.jpg";
    public User() {

    }

    public User(String username, String hashedPassword) {
        this.username = username;
        this.hashedPassword = hashedPassword;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public byte[] getPicture(){
        return profilePicture;
    }

    public void setPicture(byte[] picture) { this.profilePicture = picture; }
}
