package org.softwire.training.db.daos;

import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;

import java.util.List;
import java.util.Optional;

/**
 * A DAO for accessing different report types
 * @param <T> The report DB class
 */
public interface ReportsDao<T> {

    int createReport(T model);

    Optional<T> getReport(int reportId);

    void deleteReport(int reportId);

    List<T> searchReports(List<ReportSearchCriterion> searchCriteria);
}
