package org.softwire.training.api.routes.v1;

import org.softwire.training.api.core.JsonRequestUtils;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.FailedRequestException;
import org.softwire.training.api.models.ReportApiModelBase;
import org.softwire.training.api.models.searchcriteria.ApiReportSearchCriterion;
import org.softwire.training.db.daos.ReportsDao;
import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;
import org.softwire.training.models.ReportBase;
import spark.Request;
import spark.Response;
import spark.utils.StringUtils;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class ReportsRoutesBase<T extends ReportApiModelBase, U extends ReportBase, V> {

    private final ReportsDao<U, V> reportsDao;
    private final ValidatorMapper<T, U, V> validatorThenMapper;
    private final Class<T> apiModelClass;
    private final ReportSearchCriteriaParser<V> searchCriteriaParser;

    protected ReportsRoutesBase(
            Class<T> apiModelClass,
            ValidatorMapper<T, U, V> validatorThenMapper,
            ReportsDao<U, V> reportsDao,
            ReportSearchCriteriaParser<V> searchCriteriaParser) {
        this.apiModelClass = apiModelClass;
        this.validatorThenMapper = validatorThenMapper;
        this.reportsDao = reportsDao;
        this.searchCriteriaParser = searchCriteriaParser;
    }

    public T createReport(Request req, Response res) throws FailedRequestException {
        T reportApiModel = JsonRequestUtils.readBodyAsType(req, apiModelClass);

        if (reportApiModel.getReportId() != 0) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "reportId cannot be specified on create");
        }

        // Validate report model before storing
        U reportModel = validatorThenMapper.validateThenMap(reportApiModel);

        int newReportId = reportsDao.addReport(reportModel);

        // Create requests should return 201
        reportApiModel.setReportId(newReportId);
        res.status(201);

        return reportApiModel;
    }

    public T readReport(Request req, Response res, int id) throws FailedRequestException {
        return validatorThenMapper.mapToApiModel(reportsDao.getReport(id)
                .orElseThrow(() -> new FailedRequestException(ErrorCode.NOT_FOUND, "Report not found")));
    }

    public Object deleteReport(Request req, Response res, int id) throws Exception {
        if (StringUtils.isNotEmpty(req.body())) {
            throw new FailedRequestException(ErrorCode.INVALID_INPUT, "Report delete request should have no body");
        }

        // Do not do anything with output, if nothing to delete request is successfully done (no-op)
        reportsDao.deleteReport(id);
        res.status(204);

        return new Object();
    }

    public List<T> searchReports(Request req, Response res) {
        List<ApiReportSearchCriterion<V>> apiReportSearchCriteria = searchCriteriaParser.parseApiReportSearchCriteria(req);

        // Extract the existing ReportSearchCriterions from th ApiReportSearchCriterion list
        List<ReportSearchCriterion> reportSearchCriteria = apiReportSearchCriteria.stream()
                .map(ApiReportSearchCriterion::getDaoSearchCriterion)
                .filter(Optional::isPresent).map(Optional::get)
                .collect(Collectors.toList());

        Stream<V> statusReports = reportsDao.searchReports(reportSearchCriteria).stream();

        // Do remaining filtering using the predicates
        Optional<Predicate<V>> optionalFurtherFiltering = apiReportSearchCriteria.stream()
                .map(ApiReportSearchCriterion::getCriterionResultInclusionPredicate)
                .reduce(Predicate::and);

        if (optionalFurtherFiltering.isPresent()) {
            statusReports = statusReports.filter(optionalFurtherFiltering.get());
        }

        return statusReports.map(validatorThenMapper::mapSearchResultToApiModel).collect(Collectors.toList());
    }
}
