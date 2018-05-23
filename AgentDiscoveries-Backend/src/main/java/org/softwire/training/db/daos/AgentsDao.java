package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.Agent;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;

public class AgentsDao {

    @Inject
    Jdbi jdbi;

    public Optional<Agent> getAgent(int agentId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM agents WHERE agent_id = :agent_id")
                    .bind("agent_id", agentId)
                    .mapToBean(Agent.class)
                    .findFirst();
        }
    }

    public List<Agent> getAgents() {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM agents")
                    .mapToBean(Agent.class)
                    .list();
        }
    }

    public int createAgent(Agent agent) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("INSERT INTO agents (first_name, last_name, date_of_birth, rank, call_sign)" +
                    " VALUES (:first_name, :last_name, :date_of_birth, :rank, :call_sign)")
                    .bind("first_name", agent.getFirstName())
                    .bind("last_name", agent.getLastName())
                    .bind("date_of_birth", agent.getDateOfBirth())
                    .bind("rank", agent.getRank())
                    .bind("call_sign", agent.getCallSign())
                    .executeAndReturnGeneratedKeys("agent_id")
                    .mapTo(Integer.class)
                    .findOnly();
        }
    }

    public void deleteAgent(int agentId) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("DELETE FROM agents WHERE agent_id = :agent_id")
                    .bind("agent_id", agentId)
                    .execute();
        }
    }

    public void updateAgent(Agent agent) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("UPDATE agents SET first_name = :first_name, last_name = :last_name, " +
                    "date_of_birth = :date_of_birth, rank = :rank, call_sign = :call_sign " +
                    "WHERE agent_id = :agent_id")
                    .bind("agent_id", agent.getAgentId())
                    .bind("first_name", agent.getFirstName())
                    .bind("last_name", agent.getLastName())
                    .bind("date_of_birth", agent.getDateOfBirth())
                    .bind("rank", agent.getRank())
                    .bind("call_sign", agent.getCallSign())
                    .execute();
        }
    }
}
