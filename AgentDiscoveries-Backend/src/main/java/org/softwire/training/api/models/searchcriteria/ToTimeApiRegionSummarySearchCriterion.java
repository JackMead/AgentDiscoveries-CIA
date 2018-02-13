package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.ToTimeSearchCriterion;
import org.softwire.training.models.RegionSummaryReport;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;

public class ToTimeApiRegionSummarySearchCriterion extends ApiReportSearchCriterionBase<RegionSummaryReport> {

    public ToTimeApiRegionSummarySearchCriterion(ZonedDateTime toTime) {
        // Only need to convert time to UTC as that is how stored in DB
        super(new ToTimeSearchCriterion(toTime.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime()));
    }
}
