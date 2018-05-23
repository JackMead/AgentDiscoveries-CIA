package org.softwire.training.api.core;

import org.jdbi.v3.core.JdbiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.softwire.training.api.models.ErrorCode;
import org.softwire.training.api.models.ErrorResponseApiModel;
import org.softwire.training.api.models.FailedRequestException;
import spark.Request;
import spark.Response;

public class ExceptionMapper {

    private static final Logger LOGGER = LoggerFactory.getLogger(ExceptionMapper.class);
    private JsonResponseTransformer jsonResponseTransformer = new JsonResponseTransformer();

    public void handleInvalidRequestException(FailedRequestException exception, Request req, Response res) {
        updateResponseForErrorCode(res, exception.getErrorCode(), exception.getMessage());
    }

    public void handleDatabaseException(JdbiException exception, Request req, Response res) {
        // For database to not shown error to end users as may be sensitive.
        LOGGER.error("Database exception occurred", exception);
        updateResponseForErrorCode(res, ErrorCode.UNKNOWN_ERROR, "Error contacting persistence layer");
    }

    private void updateResponseForErrorCode(Response res, ErrorCode errorCode, String message) {
        res.status(errorCode.httpResponseCode);

        ErrorResponseApiModel responseModel = new ErrorResponseApiModel();
        responseModel.setErrorCode(errorCode.numericErrorCode);
        responseModel.setMessage(message);

        res.body(jsonResponseTransformer.render(responseModel));
    }
}
