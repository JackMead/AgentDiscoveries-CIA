package org.softwire.training.db.daos;

import org.jdbi.v3.core.Handle;
import org.jdbi.v3.core.Jdbi;
import org.softwire.training.models.LocationStatusReport;

import javax.inject.Inject;
import java.util.Optional;

public class LocationReportsDao {

    @Inject
    Jdbi jdbi;

    public Optional<LocationStatusReport> getReport(int reportId) {
        try (Handle handle = jdbi.open()) {
            return handle.createQuery("SELECT * FROM agent_location_report WHERE report_id = :report_id")
                    .bind("report_id", reportId)
                    .mapToBean(LocationStatusReport.class)
                    .findFirst();
        }
    }

    public int addReport(LocationStatusReport report) {
        try (Handle handle = jdbi.open()) {
            return handle.createUpdate("INSERT INTO agent_location_report (location_id, agent_id, status, report_time, report_body)" +
                    " VALUES (:location_id, :agent_id, :status, :report_time, :report_body)")
                    .bind("location_id", report.getLocationId())
                    .bind("agent_id", report.getAgentId())
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
            return handle.createUpdate("DELETE FROM agent_location_report WHERE report_id = :report_id")
                    .bind("report_id", report_id)
                    .execute();
        }
    }
}
