package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.Agent;
import org.softwire.training.models.User;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;
import java.util.Optional;

public class AgentsRoutes {

    private final AgentsDao agentsDao;
    @Inject
    UsersDao usersDao;

    @Inject
    public AgentsRoutes(AgentsDao agentsDao) {
        this.agentsDao = agentsDao;
    }

    public Agent readAgent(Request req, Response res, int id) throws FailedRequestException {
        int userId = Integer.parseInt(req.params("user_id"));
        Optional<User> optionalUser = usersDao.getUser(userId);
        if (!optionalUser.isPresent()) {
            //Todo Throw something?
        }
        String callSign = optionalUser.get().getCallSign();
        return agentsDao.getAgent(callSign)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Agent not found"));
    }

    public Agent updateAgent(Request req, Response res, int id) throws FailedRequestException {
        Agent agent = JsonRequestUtils.readBodyAsType(req, Agent.class);
        int userId = Integer.parseInt(req.params("user_id"));
        Optional<User> optionalUser = usersDao.getUser(userId);
        if (!optionalUser.isPresent()) {
            //Todo Throw something?
        }
        String callSign = optionalUser.get().getCallSign();
        usersDao.updateUserCallSign(callSign, agent.getCallSign());
        agentsDao.updateAgent(agent, callSign);

        return agent;
    }
}
