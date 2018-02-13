package org.softwire.training.api.routes.v1;

import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.LocationStatusReportApiModel;
import org.softwire.training.api.models.searchcriteria.*;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.LocationReportsDao;
import org.softwire.training.db.daos.LocationsDao;
import org.softwire.training.models.Location;
import org.softwire.training.models.LocationStatusReport;
import org.softwire.training.models.LocationStatusReportWithTimeZone;
import spark.QueryParamsMap;
import spark.Request;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class LocationStatusReportsRoutes extends ReportsRoutesBase<LocationStatusReportApiModel, LocationStatusReport, LocationStatusReportWithTimeZone> {

    @Inject
    public LocationStatusReportsRoutes(LocationReportsDao locationReportsDao, AgentsDao agentsDao, LocationsDao locationsDao) {
        super(
            LocationStatusReportApiModel.class,
            new LocationStatusValidationMapper(locationsDao, agentsDao),
            locationReportsDao,
            new LocationStatusReportSearchCriteriaParser());
    }

    private static class LocationStatusValidationMapper
            implements ValidatorMapper<LocationStatusReportApiModel, LocationStatusReport, LocationStatusReportWithTimeZone> {

        private final LocationsDao locationsDao;
        private final AgentsDao agentsDao;

        LocationStatusValidationMapper(LocationsDao locationReportsDao, AgentsDao agentsDao) {
            this.locationsDao = locationReportsDao;
            this.agentsDao = agentsDao;
        }

        @Override
        public LocationStatusReport validateThenMap(LocationStatusReportApiModel apiModel) throws FailedRequestException {
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

        @Override
        public LocationStatusReportApiModel mapToApiModel(LocationStatusReport model) throws FailedRequestException {
            Optional<Location> location = locationsDao.getLocation(model.getLocationId());
            if (!location.isPresent()) {
                throw new FailedRequestException(ErrorCode.UNKNOWN_ERROR, "Could not successfully get location info");
            }

            return mapReportAndTimezoneToApiModel(model, location.get().getTimeZone());
        }

        @Override
        public LocationStatusReportApiModel mapSearchResultToApiModel(LocationStatusReportWithTimeZone model) {
            return mapReportAndTimezoneToApiModel(model, model.getLocationTimeZone());
        }

        private LocationStatusReportApiModel mapReportAndTimezoneToApiModel(LocationStatusReport model, String timeZone) {
            LocationStatusReportApiModel apiModel = new LocationStatusReportApiModel();

            TimeZone locationTimeZone = TimeZone.getTimeZone(timeZone);

            apiModel.setReportId(model.getReportId());
            apiModel.setAgentId(model.getAgentId());
            apiModel.setLocationId(model.getLocationId());
            apiModel.setStatus(model.getStatus());
            apiModel.setReportTime(model.getReportTime().atZone(locationTimeZone.toZoneId()));
            apiModel.setReportBody(model.getReportBody());

            return apiModel;
        }
    }

    private static class LocationStatusReportSearchCriteriaParser
            implements ReportSearchCriteriaParser<LocationStatusReportWithTimeZone> {

        public List<ApiReportSearchCriterion<LocationStatusReportWithTimeZone>> parseApiReportSearchCriteria(Request req) {
            QueryParamsMap queryMap = req.queryMap();
            List<ApiReportSearchCriterion<LocationStatusReportWithTimeZone>> apiReportSearchCriteria = new ArrayList<>();

            // All query parameters are optional and any combination can be specified
            Optional.ofNullable(queryMap.get("agentId").integerValue())
                    .ifPresent(agentId -> apiReportSearchCriteria.add(new AgentIdApiSearchCriterion(agentId)));
            Optional.ofNullable(queryMap.get("locationId").integerValue())
                    .ifPresent(locationId -> apiReportSearchCriteria.add(new LocationIdApiSearchCriterion(locationId)));

            // fromTime / toTime specify the report should be made between those times taking into account time zones.
            // The reports are stored as a date time in the location timezone.
            Optional.ofNullable(queryMap.get("fromTime").value())
                    .map(timeString -> ZonedDateTime.parse(timeString, DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                    .ifPresent(fromTime -> apiReportSearchCriteria.add(new FromTimeApiLocationStatusSearchCriterion(fromTime)));
            Optional.ofNullable(queryMap.get("toTime").value())
                    .map(timeString -> ZonedDateTime.parse(timeString, DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                    .ifPresent(toTime -> apiReportSearchCriteria.add(new ToTimeApiLocationStatusSearchCriterion(toTime)));

            // If specified then the reportBody should include exactly this many digits.
            Optional.ofNullable(queryMap.get("digitsInBody").integerValue())
                    .ifPresent(digitsInBody ->
                            apiReportSearchCriteria.add(new DigitsInBodyApiSearchCriterion<>(digitsInBody)));

            return apiReportSearchCriteria;
        }
    }
}
