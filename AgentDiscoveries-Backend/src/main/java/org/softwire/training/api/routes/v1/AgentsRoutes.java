package org.softwire.training.api.routes.v1;

import org.apache.commons.lang3.StringUtils;
import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.models.Agent;
import spark.Request;
import spark.Response;

import javax.inject.Inject;
import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

public class AgentsRoutes {

    private final AgentsDao agentsDao;
    private final PermissionsVerifier permissionsVerifier;

    @Inject
    public AgentsRoutes(AgentsDao agentsDao, PermissionsVerifier permissionsVerifier) {
        this.agentsDao = agentsDao;
        this.permissionsVerifier = permissionsVerifier;
    }

    public Agent createAgent(Request req, Response res) {
        Agent agentModel = JsonRequestUtils.readBodyAsType(req, Agent.class);
        permissionsVerifier.verifyAdminPermission(req);

        int agentId = agentsDao.createAgent(agentModel);
        agentModel.setAgentId(agentId);

        // Create requests should return 201
        res.status(201);

        return agentModel;
    }

    public Agent readAgent(Request req, Response res, int id) {
        permissionsVerifier.verifyIsAdminOrRelevantAgent(req, id);
        return agentsDao.getAgent(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Agent not found"));
    }

    public List<Agent> readAgents(Request req, Response res) {
        permissionsVerifier.verifyAdminPermission(req);
        return agentsDao.getAgents();
    }

    public Agent updateAgent(Request req, Response res, int id) {
        permissionsVerifier.verifyIsAdminOrRelevantAgent(req, id);

        Agent agent = JsonRequestUtils.readBodyAsType(req, Agent.class);
        agent.setAgentId(id);
        agentsDao.updateAgent(agent);

        return agent;
    }

    public Object deleteAgent(Request req, Response res, int id) {
        permissionsVerifier.verifyAdminPermission(req);

        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Agent delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        agentsDao.deleteAgent(id);
        res.status(204);

        return new Object();
    }
//this works
    public Agent editCallSign(Request req, Response res, int agentID) {
        permissionsVerifier.verifyIsAdminOrRelevantAgent(req, agentID);
        Agent agent = agentsDao.getAgent(agentID).get();
        agent.setCallSign(JsonRequestUtils.readBodyAsType(req, Agent.class).getCallSign());
        agentsDao.updateAgent(agent);
        return agent;
    }
}
