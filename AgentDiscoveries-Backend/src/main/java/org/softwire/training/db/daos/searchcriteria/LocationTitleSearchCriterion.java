package org.softwire.training.db.daos.searchcriteria;

import java.util.Collections;
import java.util.Map;

public final class LocationTitleSearchCriterion extends ReportSearchCriterion {

    private static final String LOCATION_TITLE_BINDING_NAME = "location_id_sc_location_id";
    private final String titleId;

    public LocationTitleSearchCriterion(String titleId) {
        this.titleId = titleId;
    }

    @Override
    public String getSqlForWhereClause() {
        return "title_id = :" + LOCATION_TITLE_BINDING_NAME;
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(LOCATION_TITLE_BINDING_NAME, titleId);
    }
}
