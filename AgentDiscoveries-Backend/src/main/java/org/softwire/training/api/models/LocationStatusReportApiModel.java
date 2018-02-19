package org.softwire.training.api.models;

/**
 * The LocationStatusReportApiModel is a version of the LocationStatusReport storage model.
 *
 * This version uses a zoned date time for the report time to allow the offset to be specified by API clients.
 */
public class LocationStatusReportApiModel extends ReportApiModelBase {

    private int locationId;
    private String callSign;

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public String getCallSign() {
        return callSign;
    }

    public void setCallsign(String callsign) {
        this.callSign = callsign;
    }
}
