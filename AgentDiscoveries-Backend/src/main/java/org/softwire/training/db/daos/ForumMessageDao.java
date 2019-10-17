package org.softwire.training.db.daos;

import org.softwire.training.models.ForumMessage;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public class ForumMessageDao {

    private DaoHelper<ForumMessage> helper;

    @Inject
    public ForumMessageDao(EntityManagerFactory entityManagerFactory) {
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<ForumMessage> getForumMessage(int MessageId) { return helper.getEntity(ForumMessage.class, MessageId);}

    public List<ForumMessage> getForumMessages() { return helper.getEntities(ForumMessage.class);}

    public int createForum(ForumMessage forumMessage) {
        helper.createEntity(forumMessage);
        return forumMessage.getMessageId();
    }

}
