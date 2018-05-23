package org.softwire.training.api.models;

public class FailedRequestException extends Exception {

    private ErrorCode errorCode;

    public FailedRequestException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public FailedRequestException(ErrorCode errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
