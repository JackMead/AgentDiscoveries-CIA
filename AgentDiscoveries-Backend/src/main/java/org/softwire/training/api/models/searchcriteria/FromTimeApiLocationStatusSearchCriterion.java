package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.FromTimeSearchCriterion;
import org.softwire.training.models.LocationStatusReportWithTimeZone;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.TimeZone;
import java.util.function.Predicate;

public class FromTimeApiLocationStatusSearchCriterion extends ApiReportSearchCriterionBase<LocationStatusReportWithTimeZone> {

    public FromTimeApiLocationStatusSearchCriterion(ZonedDateTime fromTime) {
        // Use a DAO search criterion with the smallest possible local time to reduce number of results filtered in code
        super(
            new FromTimeSearchCriterion(fromTime.withZoneSameInstant(ZoneOffset.MIN).toLocalDateTime()),
            generateFromTimePredicate(fromTime));
    }

    private static Predicate<LocationStatusReportWithTimeZone> generateFromTimePredicate(ZonedDateTime fromTime) {
        return locationStatusReport -> !locationStatusReport.getReportTime()
                .atZone(TimeZone.getTimeZone(locationStatusReport.getLocationTimeZone()).toZoneId())
                .isBefore(fromTime);
    }
}
