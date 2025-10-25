package com.bang_ggood.global.exception;

import com.bang_ggood.global.exception.dto.ExternalAPIExceptionResponse;
import lombok.Getter;

@Getter
public class ExternalAPIException extends RuntimeException {

    private final ExternalAPIExceptionResponse response;

    public ExternalAPIException(ExternalAPIExceptionResponse response) {
        this.response = response;
    }

    @Override
    public String getMessage() {
        return response.toString();
    }
}
