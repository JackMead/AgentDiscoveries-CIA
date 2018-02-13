package org.softwire.training.db.daos.searchcriteria;

import java.util.Collections;
import java.util.Map;

public final class LocationIdSearchCriterion extends ReportSearchCriterion {

    private static final String LOCATION_ID_BINDING_NAME = "location_id_sc_location_id";
    private final int locationId;

    public LocationIdSearchCriterion(int locationId) {
        this.locationId = locationId;
    }

    @Override
    public String getSqlForWhereClause() {
        return "location.location_id = :" + LOCATION_ID_BINDING_NAME;
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(LOCATION_ID_BINDING_NAME, locationId);
    }
}
