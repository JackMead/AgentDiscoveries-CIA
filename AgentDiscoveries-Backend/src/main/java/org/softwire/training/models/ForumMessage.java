package org.softwire.training.models;

import javax.persistence.*;

@Entity
@Table(name = "messages")
public class ForumMessage {

    private int MessageId;
    private String Message;

    public ForumMessage() {}

    public ForumMessage(int messageId, String message) {
        MessageId = messageId;
        Message = message;
    }

    @Id
    @Column(name = "MessageId", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getMessageId() { return MessageId; }

    public void  setMessageId(int messageId) { this.MessageId = messageId; }

    @Column(name = "Message", nullable = false)
    public String getMessage() { return Message; }

    public void setMessage(String Message) { this.Message = Message; }

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "UserID")
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    private User user;
}
