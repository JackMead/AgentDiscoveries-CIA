package org.softwire.training.models;

import spark.utils.StringUtils;

import java.sql.Blob;

public class User {

    private int userId;
    private String username;
    private String hashedPassword;
    private boolean admin;

    public User() {

    }

    public User(String username, String hashedPassword, boolean admin) {
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.admin = admin;
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

    public boolean isAdmin(){return admin;}

    public void setAdmin(boolean admin){this.admin=admin;}
}
