package org.softwire.training.models;

public class LocationStatusReportWithTimeZone extends LocationStatusReport {

    private String locationTimeZone;

    public String getLocationTimeZone() {
        return locationTimeZone;
    }

    public void setLocationTimeZone(String locationTimeZone) {
        this.locationTimeZone = locationTimeZone;
    }
}
