package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.Agent;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;

public class AgentsRoutes {

    private final AgentsDao agentsDao;

    @Inject
    public AgentsRoutes(AgentsDao agentsDao) {
        this.agentsDao = agentsDao;
    }

    public Agent readAgent(Request req, Response res, String callSign) throws FailedRequestException {
        return agentsDao.getAgent(callSign)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Agent not found"));
    }

    public Agent updateAgent(Request req, Response res, String currentCallSign) throws FailedRequestException {
        Agent agent = JsonRequestUtils.readBodyAsType(req, Agent.class);

        new UsersDao().updateUserCallSign(currentCallSign, agent.getCallSign());
        agentsDao.updateAgent(agent, currentCallSign);

        return agent;
    }
}
