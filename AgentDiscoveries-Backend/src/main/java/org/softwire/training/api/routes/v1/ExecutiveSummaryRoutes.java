package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.ExecutiveSummaryBuilder;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.LocationReportsDao;
import org.softwire.training.db.daos.LocationsDao;
import org.softwire.training.db.daos.RegionSummaryReportsDao;
import org.softwire.training.db.daos.searchcriteria.FromTimeSearchCriterion;
import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.models.*;
import spark.Request;
import spark.Response;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class ExecutiveSummaryRoutes {

    private static final int MAX_REPORTS = 5;

    private final LocationReportsDao locationReportsDao;
    private final RegionSummaryReportsDao regionSummaryReportsDao;
    private final AgentsDao agentsDao;
    private final LocationsDao locationsDao;

    @Inject
    public ExecutiveSummaryRoutes(LocationReportsDao locationReportsDao, RegionSummaryReportsDao regionSummaryReportsDao, AgentsDao agentsDao, LocationsDao locationsDao) {
        this.locationReportsDao = locationReportsDao;
        this.regionSummaryReportsDao = regionSummaryReportsDao;
        this.agentsDao = agentsDao;
        this.locationsDao = locationsDao;
    }

    public String readExecutiveSummary(Request req, Response res) {
        int numberOfDays = Integer.parseInt(req.queryParams("days"));
        ZonedDateTime fromTime = ZonedDateTime.now(ZoneOffset.UTC).minus(Period.ofDays(numberOfDays));

        List<LocationStatusReport> locationStatusReports = getLocationStatusReports(fromTime);
        List<RegionSummaryReport> regionSummaryReports = getRegionSummaryReports(fromTime);

        return buildSummaryString(numberOfDays, locationStatusReports, regionSummaryReports);
    }

    private List<LocationStatusReport> getLocationStatusReports(ZonedDateTime fromTime) {
        return locationReportsDao.searchReports(
                Collections.singletonList(new FromTimeSearchCriterion(fromTime)));
    }

    private List<RegionSummaryReport> getRegionSummaryReports(ZonedDateTime fromTime) {
        return regionSummaryReportsDao.searchReports(
                Collections.singletonList(new FromTimeSearchCriterion(fromTime)));
    }

    private String buildSummaryString(int numberOfDays, List<LocationStatusReport> locationStatusReports, List<RegionSummaryReport> regionSummaryReports) {
        ExecutiveSummaryBuilder builder = new ExecutiveSummaryBuilder();
        builder.appendSummaryTitle(numberOfDays, regionSummaryReports.size(), locationStatusReports.size(), MAX_REPORTS);

        AtomicInteger index = new AtomicInteger(0);
        locationStatusReports.stream()
                .sorted((a, b) -> b.getStatus() - a.getStatus())
                .limit(MAX_REPORTS)
                .forEachOrdered(report -> {
                    Agent agent = agentsDao.getAgent(report.getAgentId())
                            .orElseThrow(() -> new FailedRequestException(ErrorCode.UNKNOWN_ERROR, "Unknown Agent: " + report.getAgentId()));
                    Location location = locationsDao.getLocation(report.getLocationId())
                            .orElseThrow(() -> new FailedRequestException(ErrorCode.UNKNOWN_ERROR, "Unknown Location: " + report.getLocationId()));;
                    builder.appendLocationStatusReport(index.incrementAndGet(), report, agent, location);
                });

        return builder.toString();
    }
}
