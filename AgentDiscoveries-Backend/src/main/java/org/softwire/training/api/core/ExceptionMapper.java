package org.softwire.training.api.core;

import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.ErrorResponseApiModel;
import org.softwire.training.api.models.FailedRequestException;
import spark.Request;
import spark.Response;

public class ExceptionMapper {

    private JsonResponseTransformer jsonResponseTransformer = new JsonResponseTransformer();

    public void handleInvalidRequestException(FailedRequestException exception, Request req, Response res) {
        updateResponseForErrorCode(res, exception.getErrorCode(), exception.getMessage());
    }

    private void updateResponseForErrorCode(Response res, ErrorCode errorCode, String message) {
        res.status(errorCode.httpResponseCode);

        ErrorResponseApiModel responseModel = new ErrorResponseApiModel();
        responseModel.setErrorCode(errorCode.numericErrorCode);
        responseModel.setMessage(message);

        res.body(jsonResponseTransformer.render(responseModel));
    }
}
