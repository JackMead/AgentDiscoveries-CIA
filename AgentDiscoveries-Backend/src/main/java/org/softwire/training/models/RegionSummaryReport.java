package org.softwire.training.models;

public class RegionSummaryReport extends ReportBase {

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
