package com.bang_ggood.logging.dto;

public class ErrorLog extends BaseLog {

    private final String errorMessage;
    private final String stackTrace;

    public ErrorLog(String errorMessage, String stackTrace) {
        this.errorMessage = errorMessage;
        this.stackTrace = stackTrace;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public String getStackTrace() {
        return stackTrace;
    }

    @Override
    public String toString() {
        return super.toString() + '\'' +
                ", errorMessage='" + errorMessage + '\'' +
                ", stackTrace='" + stackTrace + '\'';
    }
}
