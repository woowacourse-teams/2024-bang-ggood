package com.bang_ggood.global.handler;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.exception.OauthException;
import com.bang_ggood.global.exception.dto.OauthExceptionResponse;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;
import java.io.IOException;

@Component
public class OauthClientExceptionHandler implements ResponseErrorHandler {

    @Override
    public boolean hasError(ClientHttpResponse response) {
        try {
            return response.getStatusCode().is4xxClientError();
        } catch (IOException exception) {
            throw new BangggoodException(ExceptionCode.OAUTH_TOKEN_INTERNAL_EXCEPTION);
        }
    }

    @Override
    public void handleError(ClientHttpResponse response) {
        throw new OauthException(getResponseBody(response));
    }

    private OauthExceptionResponse getResponseBody(ClientHttpResponse response) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();

            return objectMapper
                    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                    .readValue(response.getBody(), OauthExceptionResponse.class);
        } catch (IOException exception) {
            throw new BangggoodException(ExceptionCode.OAUTH_TOKEN_INTERNAL_EXCEPTION);
        }
    }
}
