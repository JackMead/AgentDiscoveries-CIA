package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.LocationStatusReportApiModel;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.LocationReportsDao;
import org.softwire.training.db.daos.LocationsDao;
import org.softwire.training.models.Location;
import org.softwire.training.models.LocationStatusReport;
import spark.QueryParamsMap;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.TimeZone;

public class LocationStatusReportsRoutes {

    private final LocationReportsDao locationReportsDao;
    private final AgentsDao agentsDao;
    private final LocationsDao locationsDao;

    @Inject
    public LocationStatusReportsRoutes(LocationReportsDao locationReportsDao, AgentsDao agentsDao, LocationsDao locationsDao) {
        this.locationReportsDao = locationReportsDao;
        this.agentsDao = agentsDao;
        this.locationsDao = locationsDao;
    }

    public LocationStatusReportApiModel createReport(Request req, Response res) throws FailedRequestException {
        LocationStatusReportApiModel reportApiModel = JsonRequestUtils.readBodyAsType(req, LocationStatusReportApiModel.class);

        if (reportApiModel.getReportId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "reportId cannot be specified on create");
        }

        // Validate report model before storing
        LocationStatusReport reportModel = validateApiModelThenMap(reportApiModel);

        int newReportId = locationReportsDao.addReport(reportModel);

        // Create requests should return 201
        reportApiModel.setReportId(newReportId);
        res.status(201);

        return reportApiModel;
    }

    private LocationStatusReport validateApiModelThenMap(LocationStatusReportApiModel apiModel) throws FailedRequestException {
        // First check agent exists
        if (!agentsDao.getAgent(apiModel.getAgentId()).isPresent()) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "Agent does not exist");
        }

        Optional<Location> location = locationsDao.getLocation(apiModel.getLocationId());

        if (!location.isPresent()) {
            throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "Location does not exist");
        } else {
            TimeZone locationTimeZone = TimeZone.getTimeZone(location.get().getTimeZone());

            LocalDateTime dateTimeInReportLocation = apiModel.getReportTime()
                    .withZoneSameInstant(locationTimeZone.toZoneId())
                    .toLocalDateTime();

            LocationStatusReport model = new LocationStatusReport();
            model.setAgentId(apiModel.getAgentId());
            model.setLocationId(apiModel.getLocationId());
            model.setStatus(apiModel.getStatus());
            model.setReportTime(dateTimeInReportLocation);
            model.setReportBody(apiModel.getReportBody());

            return model;
        }

    }

    public LocationStatusReportApiModel readReport(Request req, Response res, int id) throws FailedRequestException {
        return mapToApiModel(locationReportsDao.getReport(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Report not found")));
    }

    private LocationStatusReportApiModel mapToApiModel(LocationStatusReport model) throws FailedRequestException {
        LocationStatusReportApiModel apiModel = new LocationStatusReportApiModel();

        Optional<Location> location = locationsDao.getLocation(model.getLocationId());
        if (!location.isPresent()) {
            throw new FailedRequestException(ErrorCode.UNKNOWN_ERROR, "Could not successfully get location info");
        }

        TimeZone locationTimeZone = TimeZone.getTimeZone(location.get().getTimeZone());

        apiModel.setAgentId(model.getAgentId());
        apiModel.setLocationId(model.getLocationId());
        apiModel.setStatus(model.getStatus());
        apiModel.setReportTime(model.getReportTime().atZone(locationTimeZone.toZoneId()));
        apiModel.setReportBody(model.getReportBody());

        return apiModel;
    }

    public Object deleteReport(Request req, Response res, int id) throws Exception {
        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Report delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        locationReportsDao.deleteReport(id);
        res.status(204);

        return new Object();
    }

    public List<LocationStatusReportApiModel> searchReports(Request req, Response res) {
        QueryParamsMap queryMap = req.queryMap();

        // All query parameters are optional and any combination can be specified
        Optional<Integer> agentId = Optional.ofNullable(queryMap.get("agentId").integerValue());
        Optional<Integer> locationId = Optional.ofNullable(queryMap.get("locationId").integerValue());

        // fromTime / toTime specify the report should be made between those times taking into account time zones.
        // The reports are stored as a date time in the location timezone.
        Optional<ZonedDateTime> fromTime = Optional.ofNullable(queryMap.get("fromTime").value())
                .map(timeString -> ZonedDateTime.parse(timeString, DateTimeFormatter.ISO_OFFSET_DATE_TIME));
        Optional<ZonedDateTime> toTime = Optional.ofNullable(queryMap.get("toTime").value())
                .map(timeString -> ZonedDateTime.parse(timeString, DateTimeFormatter.ISO_OFFSET_DATE_TIME));

        // If specified then the reportBody should include exactly this many digits.
        Optional<Integer> numberOfDigitsInBody = Optional.ofNullable(queryMap.get("digitsInBody").integerValue());

        // TODO: Part2 Implement this

        return new ArrayList<>();
    }
}
