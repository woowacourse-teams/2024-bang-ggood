package com.bang_ggood.logging.dto;

import java.time.LocalDateTime;

public class ErrorLog extends BaseLog {

    private final String errorMessage;
    private final String stackTrace;

    public ErrorLog(LocalDateTime requestTime, String requestUrl, String uuid,
                    String errorMessage, String stackTrace) {
        super(requestTime, requestUrl, uuid);
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
