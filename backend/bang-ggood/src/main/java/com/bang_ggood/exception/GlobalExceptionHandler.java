package com.bang_ggood.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BangggoodException.class)
    public ResponseEntity<ExceptionResponse> handleBangggoodException(BangggoodException exception, HttpServletRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                request.getMethod(),
                request.getRequestURI(),
                exception.getMessage());
        return ResponseEntity.status(exception.getHttpStatusCode())
                .body(response);
    }

}
