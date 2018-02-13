package org.softwire.training.api.routes.v1;

import org.softwire.training.api.models.FailedRequestException;

public interface ValidatorMapper<T, U, V> {

    U validateThenMap(T model) throws FailedRequestException;

    T mapToApiModel(U model) throws FailedRequestException;

    T mapSearchResultToApiModel(V model);
}
