package org.softwire.training.db.daos.searchcriteria;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Map;

public final class FromTimeSearchCriterion extends ReportSearchCriterion {

    private static final String REPORT_BINDING_NAME = "from_time_sc_report_time";
    private final LocalDateTime fromTime;

    public FromTimeSearchCriterion(LocalDateTime dateTime) {
        this.fromTime = dateTime;
    }

    @Override
    public String getSqlForWhereClause() {
        return "report_time >= :" + REPORT_BINDING_NAME;
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(REPORT_BINDING_NAME, fromTime);
    }
}
