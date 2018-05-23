package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.PermissionsVerifier;
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
import java.util.ArrayList;
import java.util.List;

import static com.google.common.base.Strings.isNullOrEmpty;

public class RegionSummaryReportsRoutes extends ReportsRoutesBase<RegionSummaryReportApiModel, RegionSummaryReport, RegionSummaryReport> {

    @Inject
    public RegionSummaryReportsRoutes(RegionSummaryReportsDao regionSummaryReportsDao, RegionsDao regionsDao, UsersDao usersDao, PermissionsVerifier permissionsVerifier) {
        super(
                RegionSummaryReportApiModel.class,
                new RegionSummaryValidationMapper(regionsDao, usersDao),
                regionSummaryReportsDao,
                new RegionSummaryReportSearchCriteriaParser(),
                usersDao,
                permissionsVerifier);
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
            // Ignore any supplied report time
            LocalDateTime reportTime = LocalDateTime.now(ZoneOffset.UTC);

            RegionSummaryReport model = new RegionSummaryReport();
            model.setAgentId(apiModel.getAgentId());
            model.setRegionId(apiModel.getRegionId());
            model.setStatus(apiModel.getStatus());
            model.setReportTime(reportTime);
            model.setReportBody(apiModel.getReportBody());

            return model;
        }

        @Override
        public RegionSummaryReportApiModel mapToApiModel(RegionSummaryReport model) {
            RegionSummaryReportApiModel apiModel = new RegionSummaryReportApiModel();

            apiModel.setReportId(model.getReportId());
            apiModel.setAgentId(model.getAgentId());
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

            if (!isNullOrEmpty(queryMap.get("regionId").value())) {
                apiReportSearchCriteria.add(new RegionIdApiSearchCriterion(queryMap.get("regionId").integerValue()));
            }

            if (!isNullOrEmpty(queryMap.get("userId").value())) {
                apiReportSearchCriteria.add(new UserIdApiSearchCriterion(queryMap.get("userId").integerValue()));
            }

            if (!isNullOrEmpty(queryMap.get("fromTime").value())) {
                apiReportSearchCriteria.add(new FromTimeApiRegionSummarySearchCriterion(
                        ZonedDateTime.parse(queryMap.get("fromTime").value())));
            }

            if (!isNullOrEmpty(queryMap.get("toTime").value())) {
                apiReportSearchCriteria.add(new FromTimeApiRegionSummarySearchCriterion(
                        ZonedDateTime.parse(queryMap.get("toTime").value())));
            }

            return apiReportSearchCriteria;
        }
    }
}
