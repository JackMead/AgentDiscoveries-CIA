package org.softwire.training.db.daos.searchcriteria;

import java.util.Collections;
import java.util.Map;

public final class LocationTitleSearchCriterion extends ReportSearchCriterion {

    private static final String LOCATION_TITLE_BINDING_NAME = "report_title_sc_report_title";
    private final String report_title;

    public LocationTitleSearchCriterion(String reportTitle) {
        this.report_title = reportTitle;
    }

    @Override
    public String getSqlForWhereClause() {
        return "report_title LIKE CONCAT ('%' , :" + LOCATION_TITLE_BINDING_NAME + " , '%')";
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(LOCATION_TITLE_BINDING_NAME, report_title);
    }
}
