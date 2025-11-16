package com.bang_ggood.global.handler;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.exception.ExternalAPIException;
import com.bang_ggood.global.exception.dto.OauthExceptionResponse;
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
        OauthExceptionResponse responseBody = ExternalAPIExceptionConvertor.convert(response,
                OauthExceptionResponse.class);
        throw new ExternalAPIException(responseBody);
    }
}
