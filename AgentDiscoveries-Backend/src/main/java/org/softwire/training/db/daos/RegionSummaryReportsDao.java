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

public class RegionSummaryReportsDao implements ReportsDao<RegionSummaryReport> {

    @Inject
    Jdbi jdbi;

    public Optional<RegionSummaryReport> getReport(int reportId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM region_summary_reports WHERE report_id = :report_id")
                    .bind("report_id", reportId)
                    .mapToBean(RegionSummaryReport.class)
                    .findFirst();
        }
    }

    public int createReport(RegionSummaryReport report) {
        try (Handle handle = jdbi.open()) {
            return handle.createScript("INSERT INTO region_summary_reports (region_id, agent_id, status, report_time, report_body)" +
                    " VALUES ("
                    + report.getRegionId() + ", "
                    + report.getAgentId() + ", "
                    + report.getStatus() + ", '"
                    + report.getReportTime() + "', '"
                    + report.getReportBody()
                    +"')").execute()[0];
        }
    }

    public void deleteReport(int report_id) {
        try (Handle handle = jdbi.open()) {
            handle.createUpdate("DELETE FROM region_summary_reports WHERE report_id = :report_id")
                    .bind("report_id", report_id)
                    .execute();
        }
    }

    public List<RegionSummaryReport> searchReports(List<ReportSearchCriterion> searchCriteria) {
        String whereClause = ReportsDaoUtils.buildWhereSubClauseFromCriteria(searchCriteria);

        try (Handle handle = jdbi.open()) {
             Query query = handle.createQuery("SELECT * FROM region_summary_reports " + whereClause);

             for (ReportSearchCriterion criterion : searchCriteria) {
                 for (Map.Entry<String, Object> bindingEntry : criterion.getBindingsForSql().entrySet()) {
                     query.bind(bindingEntry.getKey(), bindingEntry.getValue());
                 }
             }

             return query.mapToBean(RegionSummaryReport.class).list();
        }
    }
}
