package org.softwire.training.api.models;

/**
 * The LocationStatusReportApiModel is a version of the LocationStatusReport storage model.
 *
 * This version uses a zoned date time for the report time to allow the offset to be specified by API clients.
 */
public class RegionSummaryReportApiModel extends ReportApiModelBase {

    private int regionId;
    private int userId;

    public int getRegionId() {
        return regionId;
    }

    public void setRegionId(int regionId) {
        this.regionId = regionId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
