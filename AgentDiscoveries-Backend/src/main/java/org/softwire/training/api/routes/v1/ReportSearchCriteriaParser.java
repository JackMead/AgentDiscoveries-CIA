package org.softwire.training.api.routes.v1;

import org.softwire.training.api.models.searchcriteria.ApiReportSearchCriterion;
import spark.Request;

import java.util.List;

public interface ReportSearchCriteriaParser<T> {

    List<ApiReportSearchCriterion<T>> parseApiReportSearchCriteria(Request req);
}
