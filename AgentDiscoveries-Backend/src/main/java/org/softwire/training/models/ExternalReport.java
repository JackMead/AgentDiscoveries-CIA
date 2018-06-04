package org.softwire.training.models;

/**
 * A report to be sent to the external API
 */
public class ExternalReport {

    private String callSign;
    private String reportBody;

    public ExternalReport(String callSign, String reportBody) {
        this.callSign = callSign;
        this.reportBody = reportBody;
    }

    public String getCallSign() {
        return callSign;
    }

    public void setAgentId(String callSign) {
        this.callSign = callSign;
    }

    public String getReportBody() {
        return reportBody;
    }

    public void setReportBody(String reportBody) {
        this.reportBody=reportBody;
    }

}
