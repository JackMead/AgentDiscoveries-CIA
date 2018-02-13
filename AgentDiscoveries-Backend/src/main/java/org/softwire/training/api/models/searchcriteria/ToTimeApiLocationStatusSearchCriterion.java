package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.ToTimeSearchCriterion;
import org.softwire.training.models.LocationStatusReportWithTimeZone;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.TimeZone;
import java.util.function.Predicate;

public class ToTimeApiLocationStatusSearchCriterion extends ApiReportSearchCriterionBase<LocationStatusReportWithTimeZone> {

    public ToTimeApiLocationStatusSearchCriterion(ZonedDateTime fromTime) {
        // Use a DAO search criterion with the largest possible local time to reduce number of results filtered in code
        super(
            new ToTimeSearchCriterion(fromTime.withZoneSameInstant(ZoneOffset.MAX).toLocalDateTime()),
            generateToTimePredicate(fromTime));
    }

    private static Predicate<LocationStatusReportWithTimeZone> generateToTimePredicate(ZonedDateTime fromTime) {
        return locationStatusReport -> !locationStatusReport.getReportTime()
                .atZone(TimeZone.getTimeZone(locationStatusReport.getLocationTimeZone()).toZoneId())
                .isAfter(fromTime);
    }
}
