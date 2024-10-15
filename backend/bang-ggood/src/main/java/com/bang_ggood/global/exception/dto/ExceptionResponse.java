package com.bang_ggood.global.exception.dto;

public record ExceptionResponse(String httpMethod, String path, String bangggoodCode, String message) {
}
