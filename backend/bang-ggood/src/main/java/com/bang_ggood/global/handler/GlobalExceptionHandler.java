package com.bang_ggood.global.handler;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.exception.OauthException;
import com.bang_ggood.global.exception.dto.ExceptionResponse;
import com.bang_ggood.global.exception.dto.OauthExceptionResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BangggoodException.class)
    public ResponseEntity<ExceptionResponse> handleBangggoodException(BangggoodException exception,
                                                                      HttpServletRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                request.getMethod(),
                request.getRequestURI(),
                exception.getBangggoodCode(),
                exception.getMessage());

        return ResponseEntity.status(exception.getHttpStatusCode())
                .body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionResponse> handleRuntimeException(RuntimeException runtimeException,
                                                                    HttpServletRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                request.getMethod(),
                request.getRequestURI(),
                ExceptionCode.INTERNAL_SERVER_ERROR.getBangggoodCode().name(),
                ExceptionCode.INTERNAL_SERVER_ERROR.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(response);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleMethodArgumentNotValidException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request) {
        ExceptionResponse response = new ExceptionResponse(
                request.getMethod(),
                request.getRequestURI(),
                ExceptionCode.INVALID_PARAMETER.getBangggoodCode().name(),
                exception.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(response);
    }

    @ExceptionHandler(OauthException.class)
    public ResponseEntity<OauthExceptionResponse> handleOauthException(OauthException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(exception.getResponse());
    }
}
