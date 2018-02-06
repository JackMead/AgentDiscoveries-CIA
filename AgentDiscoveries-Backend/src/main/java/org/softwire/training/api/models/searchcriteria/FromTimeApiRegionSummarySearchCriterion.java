package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.FromTimeSearchCriterion;
import org.softwire.training.models.LocationStatusReportWithTimeZone;
import org.softwire.training.models.RegionSummaryReport;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.TimeZone;
import java.util.function.Predicate;

public class FromTimeApiRegionSummarySearchCriterion extends ApiReportSearchCriterionBase<RegionSummaryReport> {

    public FromTimeApiRegionSummarySearchCriterion(ZonedDateTime fromTime) {
        // Only need to convert time to UTC as that is how stored in DB
        super(new FromTimeSearchCriterion(fromTime.withZoneSameInstant(ZoneOffset.UTC).toLocalDateTime()));
    }
}
