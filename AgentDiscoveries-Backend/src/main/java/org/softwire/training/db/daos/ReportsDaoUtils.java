package org.softwire.training.db.daos;

import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;

import java.util.List;

/**
 * Utility class with static method for building sub clause for query logic. This is used by multiple
 * report search implementations.
 */
public class ReportsDaoUtils {

    public static String buildWhereSubClaseFromCriteria(List<ReportSearchCriterion> searchCriteria) {
        String whereClause = "";

        if (!searchCriteria.isEmpty()) {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append(" WHERE (");

            stringBuilder.append(searchCriteria.get(0).getSqlForWhereClause());
            stringBuilder.append(')');

            for (ReportSearchCriterion criterion : searchCriteria.subList(1, searchCriteria.size())) {
                stringBuilder.append(" AND (");
                stringBuilder.append(criterion.getSqlForWhereClause());
                stringBuilder.append(')');

            }

            whereClause = stringBuilder.toString();
        }

        return whereClause;
    }
}
