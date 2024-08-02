package com.bang_ggood.exception.dto;

public record ExceptionResponse(String httpMethod, String path, String message) {
}
