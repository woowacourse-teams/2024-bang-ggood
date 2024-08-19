package com.bang_ggood.exception;

import org.springframework.http.HttpStatusCode;

public class BangggoodException extends RuntimeException {

    private final ExceptionCode exceptionCode;

    public BangggoodException(ExceptionCode exceptionCode) {
        this.exceptionCode = exceptionCode;
    }

    @Override
    public String getMessage() {
        return exceptionCode.getMessage();
    }

    public HttpStatusCode getHttpStatusCode() {
        return exceptionCode.getHttpStatus();
    }
}
