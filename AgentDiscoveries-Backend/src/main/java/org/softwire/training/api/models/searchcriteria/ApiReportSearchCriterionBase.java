package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;

import java.util.Optional;
import java.util.function.Predicate;

class ApiReportSearchCriterionBase<T> implements ApiReportSearchCriterion<T> {

    private final Optional<ReportSearchCriterion> reportSearchCriterion;
    private final Predicate<T> criterionResultInclusionPredicate;

    ApiReportSearchCriterionBase(ReportSearchCriterion criterion) {
        reportSearchCriterion = Optional.of(criterion);
        criterionResultInclusionPredicate = report -> true;
    }

    ApiReportSearchCriterionBase(Predicate<T> predicate) {
        reportSearchCriterion = Optional.empty();
        criterionResultInclusionPredicate = predicate;
    }

    ApiReportSearchCriterionBase(ReportSearchCriterion criterion, Predicate<T> predicate) {
        reportSearchCriterion = Optional.of(criterion);
        criterionResultInclusionPredicate = predicate;
    }

    @Override
    public Optional<ReportSearchCriterion> getDaoSearchCriterion() {
        return reportSearchCriterion;
    }

    @Override
    public Predicate<T> getCriterionResultInclusionPredicate() {
        return criterionResultInclusionPredicate;
    }
}
