package org.softwire.training.api.models;

public enum ErrorCode {
    INVALID_CREDENTIALS(1001, 401),
    INVALID_TOKEN(1002, 401),
    TOKEN_EXPIRED(1003, 401),
    INVALID_INPUT(1004, 400),
    NOT_FOUND(1005, 404),
    OPERATION_INVALID(1006, 409),
    OPERATION_FORBIDDEN(1007, 403),
    UNKNOWN_ERROR(2000, 500);

    public final int numericErrorCode;
    public final int httpResponseCode;

    ErrorCode(int numericErrorCode, int httpResponseCode) {
        this.numericErrorCode = numericErrorCode;
        this.httpResponseCode = httpResponseCode;
    }
}
