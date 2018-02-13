package org.softwire.training.db.daos;

import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;

import java.util.List;
import java.util.Optional;

public interface ReportsDao<T, U> {

    int addReport(T model);

    Optional<T> getReport(int reportId);

    int deleteReport(int reportId);

    List<U> searchReports(List<ReportSearchCriterion> searchCriteria);
}
