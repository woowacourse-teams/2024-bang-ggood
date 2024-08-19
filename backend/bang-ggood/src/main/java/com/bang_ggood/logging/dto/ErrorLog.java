package com.bang_ggood.logging.dto;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.UUID;

public class ErrorLog extends BaseLog {

    private final String errorMessage;
    private final String stackTrace;

    public ErrorLog(LocalDateTime requestTime, String requestUrl, String uuid,
                    String errorMessage, String stackTrace) {
        super(requestTime, requestUrl, uuid);
        this.errorMessage = errorMessage;
        this.stackTrace = stackTrace;
    }

    public static ErrorLog of(Exception exception, HttpServletRequest request) {
        return new ErrorLog(
                LocalDateTime.now(),
                request.getMethod() + ' ' + request.getRequestURI(),
                UUID.randomUUID().toString(),
                exception.getMessage(),
                Arrays.toString(exception.getStackTrace())
        );
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
