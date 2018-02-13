package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.db.daos.searchcriteria.ReportSearchCriterion;

import java.util.Optional;
import java.util.function.Predicate;

public interface ApiReportSearchCriterion<T> {

    Optional<ReportSearchCriterion> getDaoSearchCriterion();

    Predicate<T> getCriterionResultInclusionPredicate();
}
