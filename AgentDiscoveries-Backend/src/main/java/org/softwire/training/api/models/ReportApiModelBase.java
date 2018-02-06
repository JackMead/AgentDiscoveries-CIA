package org.softwire.training.api.models;

import java.time.ZonedDateTime;

public class ReportApiModelBase {

    private int reportId;
    private byte status;
    private ZonedDateTime reportTime;
    private String reportBody;

    public int getReportId() {
        return reportId;
    }

    public void setReportId(int reportId) {
        this.reportId = reportId;
    }

    public byte getStatus() {
        return status;
    }

    public void setStatus(byte status) {
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
}
