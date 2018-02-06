package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.AgentIdSearchCriterion;
import org.softwire.training.models.LocationStatusReportWithTimeZone;

public class AgentIdApiSearchCriterion extends ApiReportSearchCriterionBase<LocationStatusReportWithTimeZone> {

    public AgentIdApiSearchCriterion(int agentId) {
        super(new AgentIdSearchCriterion(agentId));
    }
}
