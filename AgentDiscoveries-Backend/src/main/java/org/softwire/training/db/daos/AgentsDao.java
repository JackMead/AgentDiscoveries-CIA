package org.softwire.training.db.daos;

import org.softwire.training.models.Agent;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.Optional;

public class AgentsDao {

    private DaoHelper<Agent> helper;

    @Inject
    public AgentsDao(EntityManagerFactory entityManagerFactory) {
        this.helper = new DaoHelper<>(entityManagerFactory);
    }

    public Optional<Agent> getAgent(int agentId) {
        return helper.getEntity(Agent.class, agentId);
    }

    public List<Agent> getAgents() {
        return helper.getEntities(Agent.class);
    }

    public int createAgent(Agent agent) {
        helper.createEntity(agent);
        return agent.getAgentId();
    }

    public void deleteAgent(int agentId) {
        helper.deleteEntity(Agent.class, agentId);
    }

    public void updateAgent(Agent agent) {
        helper.updateEntity(agent);
    }
}
