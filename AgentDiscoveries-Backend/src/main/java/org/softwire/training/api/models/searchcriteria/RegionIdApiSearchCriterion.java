package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.RegionIdSearchCriterion;
import org.softwire.training.models.RegionSummaryReport;

public class RegionIdApiSearchCriterion extends ApiReportSearchCriterionBase<RegionSummaryReport> {

    public RegionIdApiSearchCriterion(int regionId) {
        super(new RegionIdSearchCriterion(regionId));
    }
}
