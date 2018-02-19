package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.Verifier;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.models.Agent;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;

public class AgentsRoutes {

    private final AgentsDao agentsDao;
    private final Verifier verifier;

    @Inject
    public AgentsRoutes(AgentsDao agentsDao, Verifier verifier) {
        this.agentsDao = agentsDao;
        this.verifier=verifier;
    }

    public Agent createAgent(Request req, Response res) throws FailedRequestException {
        Agent agentModel = JsonRequestUtils.readBodyAsType(req, Agent.class);
        if (agentModel.getAgentId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "agentId cannot be specified on create");
        }

        int userId = req.attribute("user_id");
        if (!verifier.isAdmin(userId)) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "user doesn't have valid permissions");
        }

        int newAgentId = agentsDao.addAgent(agentModel);

        // Create requests should return 201
        agentModel.setAgentId(newAgentId);
        res.status(201);

        return agentModel;
    }

    public Agent readAgent(Request req, Response res, int id) throws FailedRequestException {
        int userId = req.attribute("user_id");
        if (id!=userId && !verifier.isAdmin(userId)) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "user doesn't have valid permissions");
        }

        return agentsDao.getAgent(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Agent not found"));
    }

    public Agent updateAgent(Request req, Response res, int id) throws FailedRequestException {
        int userId = req.attribute("user_id");
        if (id!=userId && !verifier.isAdmin(userId)) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "user doesn't have valid permissions");
        }

        Agent agent = JsonRequestUtils.readBodyAsType(req, Agent.class);

        if (agent.getAgentId() != id && agent.getAgentId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "agentId cannot be specified differently to URI");
        }

        agent.setAgentId(id);
        agentsDao.updateAgent(agent);

        return agent;
    }

    public Object deleteAgent(Request req, Response res, int id) throws Exception {
        int userId = req.attribute("user_id");
        if (!verifier.isAdmin(userId)) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "user doesn't have valid permissions");
        }

        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Agent delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        agentsDao.deleteAgent(id);
        res.status(204);

        return new Object();
    }
}
