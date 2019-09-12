package org.softwire.training.api.core;

import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.User;
import spark.Request;

import javax.inject.Inject;
import java.util.Optional;
import java.util.function.Predicate;

public class PermissionsVerifier {
    private final UsersDao usersDao;

    @Inject
    public PermissionsVerifier(UsersDao usersDao) {
        this.usersDao = usersDao;
    }

    public void verifyAdminPermission(Request req) {
        verifyUser(req, User::isAdmin);
    }

    public void verifyIsAdminOrRelevantUser(Request req, int relevantUserId) {
        verifyUser(req, user -> user.isAdmin() || user.getUserId() == relevantUserId);
    }

    public void verifyIsAdminOrRelevantAgent(Request req, int relevantAgentId) {
        verifyUser(req, user -> user.isAdmin() || (user.getAgentId() != null && user.getAgentId() == relevantAgentId));
    }

    public void verifyIsAgent(Request req) {
        verifyUser(req, user -> user.getAgentId() != null);
    }

    private void verifyUser(Request req, Predicate<User> condition) {
        usersDao.getUser(req.attribute("user_id"))
                .filter(condition)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.OPERATION_FORBIDDEN, "Insufficient permissions"));
    }
}
