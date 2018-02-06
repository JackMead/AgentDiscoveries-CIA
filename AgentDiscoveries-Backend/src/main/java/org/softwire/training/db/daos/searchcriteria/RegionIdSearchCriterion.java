package org.softwire.training.db.daos.searchcriteria;

import java.util.Collections;
import java.util.Map;

public final class RegionIdSearchCriterion extends ReportSearchCriterion {

    private static final String REGION_ID_BINDING_NAME = "region_id_sc_region_id";
    private final int regionId;

    public RegionIdSearchCriterion(int regionId) {
        this.regionId = regionId;
    }

    @Override
    public String getSqlForWhereClause() {
        return "region_id = :" + REGION_ID_BINDING_NAME;
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(REGION_ID_BINDING_NAME, regionId);
    }
}
