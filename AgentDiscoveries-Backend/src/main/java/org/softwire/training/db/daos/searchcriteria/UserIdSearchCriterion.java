package org.softwire.training.db.daos.searchcriteria;

import java.util.Collections;
import java.util.Map;

public final class UserIdSearchCriterion extends ReportSearchCriterion {

    private static final String USER_ID_BINDING_NAME = "user_id_sc_user_id";
    private final int userId;

    public UserIdSearchCriterion(int userId) {
        this.userId = userId;
    }

    @Override
    public String getSqlForWhereClause() {
        return "user_id = :" + USER_ID_BINDING_NAME;
    }

    @Override
    public Map<String, Object> getBindingsForSql() {
        return Collections.singletonMap(USER_ID_BINDING_NAME, userId);
    }
}
