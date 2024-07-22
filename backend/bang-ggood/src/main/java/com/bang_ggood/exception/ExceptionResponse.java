package com.bang_ggood.exception;

public record ExceptionResponse(String httpMethod, String path, String message) {
}
