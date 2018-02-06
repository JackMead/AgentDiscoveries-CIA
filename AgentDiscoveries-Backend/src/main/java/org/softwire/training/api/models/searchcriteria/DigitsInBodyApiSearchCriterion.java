package org.softwire.training.api.models.searchcriteria;

import org.softwire.training.models.ReportBase;

public class DigitsInBodyApiSearchCriterion<T extends ReportBase> extends ApiReportSearchCriterionBase<T> {

    public DigitsInBodyApiSearchCriterion(int digitsInBody) {
        super(report -> report.getReportBody().codePoints().filter(Character::isDigit).count() == digitsInBody);
    }
}
