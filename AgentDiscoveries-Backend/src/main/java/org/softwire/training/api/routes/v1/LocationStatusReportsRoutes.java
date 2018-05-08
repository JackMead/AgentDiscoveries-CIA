package org.softwire.training.api.routes.v1;

import com.google.common.base.Strings;
import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.LocationStatusReportApiModel;
import org.softwire.training.api.models.searchcriteria.*;
import org.softwire.training.db.daos.AgentsDao;
import org.softwire.training.db.daos.LocationReportsDao;
import org.softwire.training.db.daos.LocationsDao;
import org.softwire.training.models.Agent;
import org.softwire.training.models.Location;
import org.softwire.training.models.LocationStatusReport;
import org.softwire.training.models.LocationStatusReportWithTimeZone;
import spark.QueryParamsMap;
import spark.Request;

import javax.inject.Inject;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static com.google.common.base.Strings.isNullOrEmpty;

public class LocationStatusReportsRoutes extends ReportsRoutesBase<LocationStatusReportApiModel, LocationStatusReport, LocationStatusReportWithTimeZone> {

    @Inject
    public LocationStatusReportsRoutes(LocationReportsDao locationReportsDao, AgentsDao agentsDao, LocationsDao locationsDao, PermissionsVerifier permissionsVerifier) {
        super(
                LocationStatusReportApiModel.class,
                new LocationStatusValidationMapper(locationsDao, agentsDao),
                locationReportsDao,
                new LocationStatusReportSearchCriteriaParser(),
                permissionsVerifier);
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
            Optional<Agent> optionalAgent = agentsDao.getAgentByUserId(apiModel.getUserId());

            // First check agent exists
            if (!optionalAgent.isPresent()) {
                throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "Agent does not exist");
            }

            Agent agent = optionalAgent.get();
            Optional<Location> location = locationsDao.getLocation(apiModel.getLocationId());

            if (!location.isPresent()) {
                throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "Location does not exist");
            } else {
                ZoneId locationTimeZone = ZoneId.of(location.get().getTimeZone());

                // Ignore any supplied report time and use the current instant
                LocalDateTime dateTimeInReportLocation = Instant.now()
                        .atZone(locationTimeZone)
                        .toLocalDateTime();

                LocationStatusReport model = new LocationStatusReport();
                model.setCallSign(agent.getCallSign());
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

            ZoneId locationTimeZone = ZoneId.of(timeZone);

            apiModel.setReportId(model.getReportId());
            apiModel.setCallsign(model.getCallSign());
            apiModel.setLocationId(model.getLocationId());
            apiModel.setStatus(model.getStatus());
            apiModel.setReportTime(model.getReportTime().atZone(locationTimeZone));
            apiModel.setReportBody(model.getReportBody());

            return apiModel;
        }
    }

    private static class LocationStatusReportSearchCriteriaParser
            implements ReportSearchCriteriaParser<LocationStatusReportWithTimeZone> {

        // TODO: This is a bit overly generic and confusing - would be easier to parse query parameters into a direct representation
        public List<ApiReportSearchCriterion<LocationStatusReportWithTimeZone>> parseApiReportSearchCriteria(Request req) {
            QueryParamsMap queryMap = req.queryMap();
            List<ApiReportSearchCriterion<LocationStatusReportWithTimeZone>> apiReportSearchCriteria = new ArrayList<>();

            if (!isNullOrEmpty(queryMap.get("callSign").value())) {
                apiReportSearchCriteria.add(new AgentCallSignApiSearchCriterion(queryMap.get("callSign").value()));
            }

            if (!isNullOrEmpty(queryMap.get("locationId").value())) {
                apiReportSearchCriteria.add(new LocationIdApiSearchCriterion(queryMap.get("locationId").integerValue()));
            }

            if (!isNullOrEmpty(queryMap.get("fromTime").value())) {
                apiReportSearchCriteria.add(new FromTimeApiLocationStatusSearchCriterion(
                        ZonedDateTime.parse(queryMap.get("fromTime").value())));
            }

            if (!isNullOrEmpty(queryMap.get("toTime").value())) {
                apiReportSearchCriteria.add(new ToTimeApiLocationStatusSearchCriterion(
                        ZonedDateTime.parse(queryMap.get("toTime").value())));
            }

            // TODO: unused?
            // If specified then the reportBody should include exactly this many digits.
            Optional.ofNullable(queryMap.get("digitsInBody").integerValue())
                    .ifPresent(digitsInBody ->
                            apiReportSearchCriteria.add(new DigitsInBodyApiSearchCriterion<>(digitsInBody)));

            return apiReportSearchCriteria;
        }
    }
}
