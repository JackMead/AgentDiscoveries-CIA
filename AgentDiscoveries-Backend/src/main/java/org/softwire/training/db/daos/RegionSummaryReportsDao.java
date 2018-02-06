package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.Query;
import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.models.RegionSummaryReport;

import javax.inject.Inject;
import java.util.List;
import java.util.Map;
import java.util.Optional;

public class RegionSummaryReportsDao implements ReportsDao<RegionSummaryReport, RegionSummaryReport> {

    @Inject
    Jdbi jdbi;

    public Optional<RegionSummaryReport> getReport(int reportId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM region_summary_report WHERE report_id = :report_id")
                    .bind("report_id", reportId)
                    .mapToBean(RegionSummaryReport.class)
                    .findFirst();
        }
    }

    public int addReport(RegionSummaryReport report) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("INSERT INTO region_summary_report (region_id, user_id, status, report_time, report_body)" +
                    " VALUES (:region_id, :user_id, :status, :report_time, :report_body)")
                    .bind("region_id", report.getRegionId())
                    .bind("user_id", report.getUserId())
                    .bind("status", report.getStatus())
                    .bind("report_time", report.getReportTime())
                    .bind("report_body", report.getReportBody())
                    .executeAndReturnGeneratedKeys("report_id")
                    .mapTo(Integer.class)
                    .findOnly();
        }
    }

    public int deleteReport(int report_id) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("DELETE FROM region_summary_report WHERE report_id = :report_id")
                    .bind("report_id", report_id)
                    .execute();
        }
    }

    public List<RegionSummaryReport> searchReports(List<ReportSearchCriterion> searchCriteria) {
        String whereClause = ReportsDaoUtils.buildWhereSubClaseFromCriteria(searchCriteria);

        try (Handle handle = jdbi.open()) {
             Query query = handle.createQuery("SELECT * FROM region_summary_report " + whereClause);

             for (ReportSearchCriterion criterion : searchCriteria) {
                 for (Map.Entry<String, Object> bindingEntry : criterion.getBindingsForSql().entrySet()) {
                     query.bind(bindingEntry.getKey(), bindingEntry.getValue());
                 }
             }

             return query.mapToBean(RegionSummaryReport.class).list();
        }
    }
}
