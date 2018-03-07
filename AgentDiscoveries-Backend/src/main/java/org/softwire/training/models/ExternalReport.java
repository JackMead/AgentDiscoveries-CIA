package org.softwire.training.models;

public class ExternalReport {
    private int agentId;
    private String reportBody;
    private int locationId;

    public ExternalReport(int agentId, String reportBody, int locationId) {
        this.agentId = agentId;
        this.reportBody = reportBody;
        this.locationId = locationId;
    }

    public int getAgentId() {return agentId;}

    public void setAgentId(int agentId){this.agentId=agentId;}

    public String getReportBody() {return reportBody;}

    public void setReportBody(String reportBody){this.reportBody=reportBody;}

    public int getLocationId() {return locationId;}

    public void setLocationId(int locationId){this.locationId=locationId;}

}
