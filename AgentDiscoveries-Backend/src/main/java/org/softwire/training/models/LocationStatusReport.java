package org.softwire.training.models;

public class LocationStatusReport extends ReportBase {

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

    public void setCallSign(String callSign) {
        this.callSign= callSign;
    }
}
