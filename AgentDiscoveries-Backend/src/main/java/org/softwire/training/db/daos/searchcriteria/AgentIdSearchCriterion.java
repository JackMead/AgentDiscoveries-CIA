package org.softwire.training.db.daos.searchcriteria;

import java.util.Collections;
import java.util.Map;

public final class AgentIdSearchCriterion extends ReportSearchCriterion {

    private static final String AGENT_ID_BINDING_NAME = "agent_id_sc_agent_id";
    private final int agentId;

    public AgentIdSearchCriterion(int agentId) {
        this.agentId = agentId;
    }

    @Override
    public String getSqlForWhereClause() {
        return "agent_id = :" + AGENT_ID_BINDING_NAME;
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(AGENT_ID_BINDING_NAME, agentId);
    }
}
