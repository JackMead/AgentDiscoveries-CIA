package org.softwire.training.db.daos.searchcriteria;

import java.util.Map;

public abstract class ReportSearchCriterion {

    // Package level default constructor to prevent implementations outside this package
    ReportSearchCriterion() {

    }

    /**
     * @return A SQL query clause to filter for this criterion. These should be suitable for being
     * chained with SQL ANDs with other criteria. All used bindings should be returned by the get
     * bindings map.
     */
    public abstract String getSqlForWhereClause();


    /**
     * @return A map of binding name to values that should be bound. All binding names should be
     * unique across all implemented search criteria to avoid unexpected conflicts.
     */
    public abstract Map<String, Object> getBindingsForSql();
}
