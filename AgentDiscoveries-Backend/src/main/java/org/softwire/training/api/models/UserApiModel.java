package org.softwire.training.api.models;

/**
 * The UserApiModel is a version of the domain model with a password field instead of a hashed password.
 *
 * This should as the model for requests/responses for the API though responses should not include the password.
 */
public class UserApiModel {

    private int userId;
    private String username;
    private String password;
    private boolean admin;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public boolean isAdmin(){ return admin; }

    public void setAdmin(boolean admin){ this.admin=admin; }
}
