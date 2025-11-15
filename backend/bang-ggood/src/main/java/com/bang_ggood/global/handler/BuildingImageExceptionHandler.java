package com.bang_ggood.global.handler;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.exception.ExternalAPIException;
import com.bang_ggood.global.exception.dto.BuildingImageExceptionResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.ResponseErrorHandler;
import java.io.IOException;

@Slf4j
@Component
public class BuildingImageExceptionHandler implements ResponseErrorHandler {

    @Override
    public boolean hasError(ClientHttpResponse response) {
        try {
            return response.getStatusCode().is4xxClientError();
        } catch (IOException exception) {
            throw new BangggoodException(ExceptionCode.BUILDING_IMAGE_INTERNAL_EXCEPTION);
        }
    }

    @Override
    public void handleError(ClientHttpResponse response) {
        BuildingImageExceptionResponse responseBody = ExternalAPIExceptionConvertor.convert(response,
                BuildingImageExceptionResponse.class);
        log.warn(responseBody.toString());
        throw new ExternalAPIException(responseBody);
    }
}
