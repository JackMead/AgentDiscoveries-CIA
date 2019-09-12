package org.softwire.training.models;

import javax.persistence.*;

@Entity
@Table(name = "users")
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

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "username", unique = true, nullable = false)
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "hashed_password", nullable = false)
    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    @Column(name = "agent_id")
    public Integer getAgentId() {
        return agentId;
    }

    public void setAgentId(Integer agentId) {
        this.agentId = agentId;
    }

    @Column(name = "admin", nullable = false)
    public boolean isAdmin(){
        return admin;
    }

    public void setAdmin(boolean admin){this.admin=admin;}
}
