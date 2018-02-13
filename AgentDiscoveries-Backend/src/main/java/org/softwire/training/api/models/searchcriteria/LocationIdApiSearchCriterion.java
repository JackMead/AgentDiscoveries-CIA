package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.LocationIdSearchCriterion;
import org.softwire.training.models.LocationStatusReportWithTimeZone;

public class LocationIdApiSearchCriterion extends ApiReportSearchCriterionBase<LocationStatusReportWithTimeZone> {

    public LocationIdApiSearchCriterion(int locationId) {
        super(new LocationIdSearchCriterion(locationId));
    }
}
