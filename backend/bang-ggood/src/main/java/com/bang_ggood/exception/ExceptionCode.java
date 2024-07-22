package com.bang_ggood.exception;

import org.springframework.http.HttpStatus;

public enum ExceptionCode {

    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "잘못된 인자입니다.");

    private final HttpStatus httpStatus;
    private final String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }
}
