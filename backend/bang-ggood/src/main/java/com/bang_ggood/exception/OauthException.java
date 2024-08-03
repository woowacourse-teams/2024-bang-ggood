package com.bang_ggood.exception;

import com.bang_ggood.exception.dto.OauthExceptionResponse;

public class OauthException extends RuntimeException {

    private OauthExceptionResponse response;

    public OauthException(OauthExceptionResponse response) {
        this.response = response;
    }

    public OauthExceptionResponse getResponse() {
        return response;
    }
}
