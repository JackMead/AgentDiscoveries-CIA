package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.core.PermissionsVerifier;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.ReportApiModelBase;
import org.softwire.training.db.daos.ReportsDao;
import org.softwire.training.db.daos.UsersDao;
import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.models.ReportBase;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Base class for routing for different report types
 *
 * @param <T> the API model class
 * @param <U> the DB model class
 */
public abstract class ReportsRoutesBase<T extends ReportApiModelBase, U extends ReportBase> {

    private final ReportsDao<U> reportsDao;
    private final Class<T> apiModelClass;
    private final UsersDao usersDao;

    protected PermissionsVerifier permissionsVerifier;

    protected ReportsRoutesBase(
            Class<T> apiModelClass,
            ReportsDao<U> reportsDao,
            UsersDao usersDao,
            PermissionsVerifier permissionsVerifier) {
        this.apiModelClass = apiModelClass;
        this.reportsDao = reportsDao;
        this.usersDao = usersDao;
        this.permissionsVerifier = permissionsVerifier;
    }

    /**
     * Mapping methods between API and DB models
     */
    protected abstract U validateThenMap(T model);
    protected abstract T mapToApiModel(U model);

    /**
     * Parse a search request criteria
     */
    protected abstract List<ReportSearchCriterion> parseSearchCriteria(Request req);

    public T createReport(Request req, Response res) {
        int agentId = usersDao.getUser(req.attribute("user_id"))
                .flatMap(user -> Optional.ofNullable(user.getAgentId()))
                .orElseThrow(() -> new FailedRequestException(ErrorCode.OPERATION_FORBIDDEN, "Insufficient permissions"));

        T reportApiModel = JsonRequestUtils.readBodyAsType(req, apiModelClass);

        if (reportApiModel.getReportId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "reportId cannot be specified on create");
        }

        reportApiModel.setAgentId(agentId);

        // Validate report model before storing
        U reportModel = validateThenMap(reportApiModel);

        int newReportId = reportsDao.createReport(reportModel);

        // Create requests should return 201
        reportApiModel.setReportId(newReportId);
        res.status(201);

        return reportApiModel;
    }

    public T readReport(Request req, Response res, int id) {
        permissionsVerifier.verifyAdminPermission(req);
        return mapToApiModel(reportsDao.getReport(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Report not found")));
    }

    public Object deleteReport(Request req, Response res, int id) throws Exception {
        permissionsVerifier.verifyAdminPermission(req);
        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Report delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        reportsDao.deleteReport(id);
        res.status(204);

        return new Object();
    }

    public List<T> searchReports(Request req, Response res) {
        permissionsVerifier.verifyAdminPermission(req);

        return reportsDao.searchReports(parseSearchCriteria(req))
                .stream()
                .map(this::mapToApiModel)
                .collect(Collectors.toList());
    }
}
