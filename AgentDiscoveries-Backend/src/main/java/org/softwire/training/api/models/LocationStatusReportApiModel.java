package org.softwire.training.api.models;

/**
 * The LocationStatusReportApiModel is a version of the LocationStatusReport storage model.
 *
 * This version uses a zoned date time for the report time to allow the offset to be specified by API clients.
 */
public class LocationStatusReportApiModel extends ReportApiModelBase {

    private int locationId;
    private int agentId;

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }
}
