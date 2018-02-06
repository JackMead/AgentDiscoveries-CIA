package org.softwire.training.db.daos.searchcriteria;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

public final class ToTimeSearchCriterion extends ReportSearchCriterion {

    private static final String REPORT_BINDING_NAME = "to_time_sc_report_time";
    private final LocalDateTime toTime;

    public ToTimeSearchCriterion(LocalDateTime dateTime) {
        this.toTime = dateTime;
    }

    @Override
    public String getSqlForWhereClause() {
        return "report_time <= :" + REPORT_BINDING_NAME;
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(REPORT_BINDING_NAME, toTime);
    }
}
