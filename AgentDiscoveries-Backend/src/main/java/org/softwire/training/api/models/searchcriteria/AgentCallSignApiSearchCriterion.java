package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.AgentCallSignSearchCriterion;
import org.softwire.training.models.LocationStatusReportWithTimeZone;

public class AgentCallSignApiSearchCriterion extends ApiReportSearchCriterionBase<LocationStatusReportWithTimeZone> {

    public AgentCallSignApiSearchCriterion(String callSign) {
        super(new AgentCallSignSearchCriterion(callSign));
    }
}
