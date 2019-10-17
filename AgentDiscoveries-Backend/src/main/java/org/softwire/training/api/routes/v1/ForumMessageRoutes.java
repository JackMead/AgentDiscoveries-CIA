package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.ForumMessageDao;
import org.softwire.training.models.ForumMessage;
import spark.Request;
import spark.Response;

import javax.inject.Inject;
import java.util.List;

public class ForumMessageRoutes {

    private final ForumMessageDao forumMessageDao;
    private final PermissionsVerifier permissionsVerifier;

    @Inject
    public ForumMessageRoutes(ForumMessageDao forumMessageDao, PermissionsVerifier permissionsVerifier) {
        this.forumMessageDao = forumMessageDao;
        this.permissionsVerifier = permissionsVerifier;
    }

    public List<ForumMessage> readForum(Request req, Response res) {
        permissionsVerifier.verifyisAgentorAdmin(req);
        return forumMessageDao.getForumMessages();
    }

    public ForumMessage createForumMessage(Request req, Response res) {
        ForumMessage forumMessageModel = JsonRequestUtils.readBodyAsType(req, ForumMessage.class);
        permissionsVerifier.verifyisAgentorAdmin(req);

        forumMessageModel.setUserId(req.attribute("user_id"));

        int MessageId = forumMessageDao.createForum(forumMessageModel);
        forumMessageModel.setMessageId(MessageId);

        // Create requests should return 201
        res.status(201);

        return forumMessageModel;
    }

    public ForumMessage readForum(Request req, Response res, int id) {
        permissionsVerifier.verifyisAgentorAdmin(req);
        return forumMessageDao.getForumMessage(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Forum not found"));
    }

}