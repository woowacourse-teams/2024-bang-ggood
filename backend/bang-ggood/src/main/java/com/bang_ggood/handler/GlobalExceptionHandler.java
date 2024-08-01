package com.bang_ggood.handler;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.dto.ExceptionResponse;
import com.bang_ggood.exception.OauthException;
import com.bang_ggood.exception.dto.OauthExceptionResponse;
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
                exception.getMessage());
        return ResponseEntity.status(exception.getHttpStatusCode())
                .body(response);
    }

    //TODO 로깅해야함
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionResponse> handleRuntimeException(RuntimeException runtimeException,
                                                                    HttpServletRequest request) {
        runtimeException.printStackTrace();
        ExceptionResponse response = new ExceptionResponse(
                request.getMethod(),
                request.getRequestURI(),
                "예상치 못한 서버에러가 발생했습니다.");
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
