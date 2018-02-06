package org.softwire.training.api.routes.v1;

import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.RegionSummaryReportApiModel;
import org.softwire.training.api.models.searchcriteria.*;
import org.softwire.training.db.daos.RegionSummaryReportsDao;
import org.softwire.training.db.daos.RegionsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.models.RegionSummaryReport;
import spark.QueryParamsMap;
import spark.Request;

import javax.inject.Inject;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class RegionSummaryReportsRoutes extends ReportsRoutesBase<RegionSummaryReportApiModel, RegionSummaryReport, RegionSummaryReport> {

    @Inject
    public RegionSummaryReportsRoutes(RegionSummaryReportsDao regionSummaryReportsDao, RegionsDao regionsDao, UsersDao usersDao) {
        super(
            RegionSummaryReportApiModel.class,
            new RegionSummaryValidationMapper(regionsDao, usersDao),
            regionSummaryReportsDao,
            new RegionSummaryReportSearchCriteriaParser());
    }

    private static class RegionSummaryValidationMapper
            implements ValidatorMapper<RegionSummaryReportApiModel, RegionSummaryReport, RegionSummaryReport> {

        private final RegionsDao regionsDao;
        private final UsersDao usersDao;

        RegionSummaryValidationMapper(RegionsDao regionsDao, UsersDao usersDao) {
            this.regionsDao = regionsDao;
            this.usersDao = usersDao;
        }

        @Override
        public RegionSummaryReport validateThenMap(RegionSummaryReportApiModel apiModel) throws FailedRequestException {
            // First check agent exists
            if (!usersDao.getUser(apiModel.getUserId()).isPresent()) {
                throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "User does not exist");
            }

            if (!regionsDao.getRegion(apiModel.getRegionId()).isPresent()) {
                throw new FailedRequestException(ErrorCode.OPERATION_INVALID, "Region does not exist");
            }

            LocalDateTime dateTimeInReportLocation = apiModel.getReportTime()
                    .withZoneSameInstant(ZoneOffset.UTC)
                    .toLocalDateTime();

            RegionSummaryReport model = new RegionSummaryReport();
            model.setUserId(apiModel.getUserId());
            model.setRegionId(apiModel.getRegionId());
            model.setStatus(apiModel.getStatus());
            model.setReportTime(dateTimeInReportLocation);
            model.setReportBody(apiModel.getReportBody());

            return model;
        }

        @Override
        public RegionSummaryReportApiModel mapToApiModel(RegionSummaryReport model) {
            RegionSummaryReportApiModel apiModel = new RegionSummaryReportApiModel();

            apiModel.setReportId(model.getReportId());
            apiModel.setUserId(model.getUserId());
            apiModel.setRegionId(model.getRegionId());
            apiModel.setStatus(model.getStatus());
            apiModel.setReportTime(model.getReportTime().atZone(ZoneOffset.UTC));
            apiModel.setReportBody(model.getReportBody());

            return apiModel;
        }

        @Override
        public RegionSummaryReportApiModel mapSearchResultToApiModel(RegionSummaryReport model) {
            return mapToApiModel(model);
        }
    }

    private static class RegionSummaryReportSearchCriteriaParser
            implements ReportSearchCriteriaParser<RegionSummaryReport> {

        public List<ApiReportSearchCriterion<RegionSummaryReport>> parseApiReportSearchCriteria(Request req) {
            QueryParamsMap queryMap = req.queryMap();
            List<ApiReportSearchCriterion<RegionSummaryReport>> apiReportSearchCriteria = new ArrayList<>();

            // All query parameters are optional and any combination can be specified
            Optional.ofNullable(queryMap.get("userId").integerValue())
                    .ifPresent(userId -> apiReportSearchCriteria.add(new UserIdApiSearchCriterion(userId)));
            Optional.ofNullable(queryMap.get("regionId").integerValue())
                    .ifPresent(regionId -> apiReportSearchCriteria.add(new RegionIdApiSearchCriterion(regionId)));

            // fromTime / toTime specify the report should be made between those times
            Optional.ofNullable(queryMap.get("fromTime").value())
                    .map(timeString -> ZonedDateTime.parse(timeString, DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                    .ifPresent(fromTime -> apiReportSearchCriteria.add(new FromTimeApiRegionSummarySearchCriterion(fromTime)));
            Optional.ofNullable(queryMap.get("toTime").value())
                    .map(timeString -> ZonedDateTime.parse(timeString, DateTimeFormatter.ISO_OFFSET_DATE_TIME))
                    .ifPresent(toTime -> apiReportSearchCriteria.add(new ToTimeApiRegionSummarySearchCriterion(toTime)));

            // If specified then the reportBody should include exactly this many digits.
            Optional.ofNullable(queryMap.get("digitsInBody").integerValue())
                    .ifPresent(digitsInBody ->
                            apiReportSearchCriteria.add(new DigitsInBodyApiSearchCriterion<>(digitsInBody)));

            return apiReportSearchCriteria;
        }
    }
}
