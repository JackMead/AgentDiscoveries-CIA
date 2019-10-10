package org.softwire.training.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "location_reports")
public class LocationStatusReport extends ReportBase {

    private int locationId;
    private String reportTitle;

    @Column(name = "report_title", nullable = false)
    public String getReportTitle() {
        return reportTitle;
    }

    public void setReportTitle(String reportTitle) {
        this.reportTitle = reportTitle;
    }


    @Column(name = "location_id", nullable = false)
    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }
}
