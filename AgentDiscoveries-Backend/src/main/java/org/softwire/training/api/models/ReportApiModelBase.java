package org.softwire.training.api.models;

import java.time.ZonedDateTime;

public class ReportApiModelBase {

    private int reportId;
    private int status;
    private ZonedDateTime reportTime;
    private String reportBody;
    private int agentId;

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public ZonedDateTime getReportTime() {
        return reportTime;
    }

    public void setReportTime(ZonedDateTime reportTime) {
        this.reportTime = reportTime;
    }

    public String getReportBody() {
        return reportBody;
    }

    public void setReportBody(String reportBody) {
        this.reportBody = reportBody;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }
}
