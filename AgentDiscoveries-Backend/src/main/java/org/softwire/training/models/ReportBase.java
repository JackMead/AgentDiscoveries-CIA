package org.softwire.training.models;

import javax.persistence.*;
import java.time.LocalDateTime;

@MappedSuperclass
public class ReportBase {

    private int reportId;
    private byte status;
    private LocalDateTime reportTime; // Always UTC in the DB
    private String reportBody;
    private int agentId;

    @Id
    @Column(name = "report_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    @Column(name = "status", nullable = false)
    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
        this.status = status;
    }

    @Convert(converter = LocalDateTimeAttributeConverter.class)
    @Column(name = "report_time", nullable = false)
    public LocalDateTime getReportTime() {
        return reportTime;
    }

    public void setReportTime(LocalDateTime reportTime) {
        this.reportTime = reportTime;
    }

    @Column(name = "report_body", columnDefinition = "mediumtext", nullable = false)
    public String getReportBody() {
        return reportBody;
    }

    public void setReportBody(String reportBody) {
        this.reportBody = reportBody;
    }

    @Column(name = "agent_id", nullable = false)
    public int getAgentId() { return agentId; }

    public void setAgentId(int agentId) { this.agentId = agentId; }
}
