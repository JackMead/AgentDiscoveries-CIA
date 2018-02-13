package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.UserIdSearchCriterion;
import org.softwire.training.models.RegionSummaryReport;

public class UserIdApiSearchCriterion extends ApiReportSearchCriterionBase<RegionSummaryReport> {

    public UserIdApiSearchCriterion(int userId) {
        super(new UserIdSearchCriterion(userId));
    }
}
