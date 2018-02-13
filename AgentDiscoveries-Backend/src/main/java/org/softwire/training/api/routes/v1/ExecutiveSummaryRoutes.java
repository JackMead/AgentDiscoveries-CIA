package org.softwire.training.api.routes.v1;

import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.*;
import org.softwire.training.db.daos.searchcriteria.FromTimeSearchCriterion;
import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.models.*;
import spark.Request;
import spark.Response;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

class SortByStatus implements Comparator<LocationStatusReportWithTimeZone>
{
    // Used for sorting in ascending order of
    // roll number
    public int compare(LocationStatusReportWithTimeZone a, LocationStatusReportWithTimeZone b)
    {
        return b.getStatus() - a.getStatus();
    }
}

public class ExecutiveSummaryRoutes {
    @Inject
    LocationReportsDao locationReportsDao;
    RegionSummaryReportsDao regionSummaryReportsDao;
    AgentsDao agentsDao;
    LocationsDao locationsDao;

    @Inject
    public ExecutiveSummaryRoutes(LocationReportsDao locationReportsDao, RegionSummaryReportsDao regionSummaryReportsDao, AgentsDao agentsDao, LocationsDao locationsDao) {
        this.locationReportsDao = locationReportsDao;
        this.regionSummaryReportsDao = regionSummaryReportsDao;
        this.agentsDao = agentsDao;
        this.locationsDao = locationsDao;
    }

    public String readExecutiveSummary(Request req, Response res) throws FailedRequestException {
        int numberOfDays = Integer.parseInt(req.body());
        LocalDateTime fromTime = LocalDateTime.now().minus(Period.ofDays(numberOfDays));
        List<LocationStatusReportWithTimeZone> locationStatusReports = getLocationStatusReports(fromTime);
        List<RegionSummaryReport> regionSummaryReports = getRegionSummaryReports(fromTime);
        return buildSummaryString(numberOfDays, locationStatusReports, regionSummaryReports, 5);
    }

    private List<LocationStatusReportWithTimeZone> getLocationStatusReports(LocalDateTime fromTime) {
        List<ReportSearchCriterion> searchCriteria = new ArrayList<>();
        searchCriteria.add(new FromTimeSearchCriterion(fromTime));
        List<LocationStatusReportWithTimeZone> locationStatusReports = locationReportsDao.searchReports(searchCriteria);
        System.out.print(locationStatusReports.size());
        return locationStatusReports;
    }

    private List<RegionSummaryReport> getRegionSummaryReports(LocalDateTime fromTime) {
        List<ReportSearchCriterion> searchCriteria = new ArrayList<>();
        searchCriteria.add(new FromTimeSearchCriterion(fromTime));
        List<RegionSummaryReport> regionSummaryReports = regionSummaryReportsDao.searchReports(searchCriteria);
        System.out.print(regionSummaryReports.size());
        return regionSummaryReports;
    }

    private String buildSummaryString(int numberOfDays, List<LocationStatusReportWithTimeZone> locationStatusReports, List<RegionSummaryReport> regionSummaryReports, int numberOfEntries) {
        StringBuilder summary = new StringBuilder();
        summary.append(createSummaryTitle(numberOfDays, locationStatusReports, regionSummaryReports));
        summary.append("The ");
        summary.append(numberOfEntries);
        summary.append("most important location status reports in this period are as follows:\n");
        summary.append(generateLocationStatusReportsString(locationStatusReports, numberOfEntries));
        return summary.toString();
    }

    private String createSummaryTitle(int numberOfDays, List<LocationStatusReportWithTimeZone> locationStatusReports, List<RegionSummaryReport> regionSummaryReports) {
        StringBuilder summaryTitleBuilder = new StringBuilder();

        summaryTitleBuilder.append("Over the past ");
        summaryTitleBuilder.append(numberOfDays);
        summaryTitleBuilder.append(" days there have been ");
        summaryTitleBuilder.append(regionSummaryReports.size());
        summaryTitleBuilder.append(" region summary reports and ");
        summaryTitleBuilder.append(locationStatusReports.size());
        summaryTitleBuilder.append(" location status reports.\n\n");
        return summaryTitleBuilder.toString();
    }

    private String generateLocationStatusReportsString(List<LocationStatusReportWithTimeZone> locationStatusReports, int numberOfReports) {
        StringBuilder locationStatusReportsBuilder = new StringBuilder();
        locationStatusReports.sort(new SortByStatus());
        for (int i = 0; i < Math.min(numberOfReports, locationStatusReports.size()); i++) {
            locationStatusReportsBuilder.append("\n** Report ");
            locationStatusReportsBuilder.append(i + 1);
            locationStatusReportsBuilder.append(" **\n\n");

            locationStatusReportsBuilder.append(generateIndividualLocationStatusReportString(locationStatusReports.get(i)));
        }
        return locationStatusReportsBuilder.toString();
    }

    private String generateIndividualLocationStatusReportString(LocationStatusReportWithTimeZone locationStatusReport) {
        Agent agent = agentsDao.getAgent(locationStatusReport.getAgentId()).get();
        Location location = locationsDao.getLocation(locationStatusReport.getLocationId()).get();
        StringBuilder individualLocationStatusReportBuilder = new StringBuilder();
        individualLocationStatusReportBuilder.append("Submitted by: ");
        individualLocationStatusReportBuilder.append(agent.getFirstName());
        individualLocationStatusReportBuilder.append(" (");
        individualLocationStatusReportBuilder.append(agent.getCallSign());
        individualLocationStatusReportBuilder.append(")\nSubmuitted at: ");
        individualLocationStatusReportBuilder.append(locationStatusReport.getReportTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
        individualLocationStatusReportBuilder.append("\nLocation Name: ");
        individualLocationStatusReportBuilder.append(location.getLocation());
        individualLocationStatusReportBuilder.append("\nLocation Status: ");
        individualLocationStatusReportBuilder.append(locationStatusReport.getStatus());
        individualLocationStatusReportBuilder.append("\n\n");
        individualLocationStatusReportBuilder.append(locationStatusReport.getReportBody());
        individualLocationStatusReportBuilder.append("\n\n");

        return individualLocationStatusReportBuilder.toString();
    }
}
