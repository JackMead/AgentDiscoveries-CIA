package org.softwire.training.models;

import javax.persistence.*;

@Entity
@Table(name = "messages")
public class ForumMessage {

    private int MessageId;
    private String Message;
    private int UserId;

    public ForumMessage() {}

    public ForumMessage(int messageId, String message, int userId) {
        MessageId = messageId;
        Message = message;
        UserId = userId;
    }

    @Id
    @Column(name = "MessageId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getMessageId() { return MessageId; }

    public void  setMessageId(int messageId) { this.MessageId = messageId; }

    @Column(name = "Message", nullable = false)
    public String getMessage() { return Message; }

    public void setMessage(String Message) { this.Message = Message; }


    @Column(name = "UserID")
    public int getUserId() {
        return UserId;
    }

    public void setUserId(int userId) { UserId = userId; }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    public User user;
}
