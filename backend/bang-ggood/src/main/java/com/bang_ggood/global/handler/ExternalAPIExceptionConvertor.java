package com.bang_ggood.global.handler;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class ExternalAPIExceptionConvertor {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static <T> T convert(ClientHttpResponse response, Class<T> classType) {
        try {
            return objectMapper
                    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                    .readValue(response.getBody(), classType);
        } catch (IOException exception) {
            throw new BangggoodException(ExceptionCode.EXTERNAL_API_EXCEPTION_CONVERT_ERROR);
        }
    }
}
