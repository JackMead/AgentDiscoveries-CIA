package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.api.models.RegionSummaryReportApiModel;
import org.softwire.training.db.daos.RegionSummaryReportsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.db.daos.searchcriteria.FromTimeSearchCriterion;
import org.softwire.training.db.daos.searchcriteria.RegionIdSearchCriterion;
import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.db.daos.searchcriteria.UserIdSearchCriterion;
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

public class RegionSummaryReportsRoutes extends ReportsRoutesBase<RegionSummaryReportApiModel, RegionSummaryReport> {

    @Inject
    public RegionSummaryReportsRoutes(RegionSummaryReportsDao regionSummaryReportsDao, UsersDao usersDao, PermissionsVerifier permissionsVerifier) {
        super(
                RegionSummaryReportApiModel.class,
                regionSummaryReportsDao,
                usersDao,
                permissionsVerifier);
    }

    @Override
    protected RegionSummaryReport validateThenMap(RegionSummaryReportApiModel apiModel) {
        // Ignore any supplied report time
        LocalDateTime reportTimeUtc = LocalDateTime.now(ZoneOffset.UTC);

        RegionSummaryReport model = new RegionSummaryReport();
        model.setAgentId(apiModel.getAgentId());
        model.setRegionId(apiModel.getRegionId());
        model.setStatus(apiModel.getStatus());
        model.setReportTime(reportTimeUtc);
        model.setReportBody(apiModel.getReportBody());

        return model;
    }

    @Override
    protected RegionSummaryReportApiModel mapToApiModel(RegionSummaryReport model) {
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
    protected List<ReportSearchCriterion> parseSearchCriteria(Request req) {
        QueryParamsMap queryMap = req.queryMap();
        List<ReportSearchCriterion> apiReportSearchCriteria = new ArrayList<>();

        if (!isNullOrEmpty(queryMap.get("regionId").value())) {
            apiReportSearchCriteria.add(new RegionIdSearchCriterion(queryMap.get("regionId").integerValue()));
        }

        if (!isNullOrEmpty(queryMap.get("userId").value())) {
            apiReportSearchCriteria.add(new UserIdSearchCriterion(queryMap.get("userId").integerValue()));
        }

        if (!isNullOrEmpty(queryMap.get("fromTime").value())) {
            apiReportSearchCriteria.add(new FromTimeSearchCriterion(ZonedDateTime.parse(queryMap.get("fromTime").value())));
        }

        if (!isNullOrEmpty(queryMap.get("toTime").value())) {
            apiReportSearchCriteria.add(new FromTimeSearchCriterion(ZonedDateTime.parse(queryMap.get("toTime").value())));
        }

        return apiReportSearchCriteria;
    }
}
