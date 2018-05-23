package org.softwire.training.models;

public class User {

    private int userId;
    private String username;
    private String hashedPassword;
    private Integer agentId; // Nullable
    private boolean admin;

    public User() {}

    public User(String username, String hashedPassword, Integer agentId, boolean admin) {
        this.username = username;
        this.hashedPassword = hashedPassword;
        this.agentId = agentId;
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

    public Integer getAgentId() {
        return agentId;
    }

    public void setAgentId(Integer agentId) {
        this.agentId = agentId;
    }

    public boolean isAdmin(){return admin;}

    public void setAdmin(boolean admin){this.admin=admin;}
}
