package com.bang_ggood.global.handler;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.exception.dto.ExternalAPIExceptionResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.client.ClientHttpResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExternalAPIExceptionConvertorTest {

    @Mock
    private ClientHttpResponse clientHttpResponse;

    @DisplayName("외부 API 예외 변환 성공")
    @Test
    void success() throws IOException {
        // given
        String error = "INVALID_KEY";
        String json = String.format("""
            {
                "error": "%s"
            }
            """, error);
        ExternalAPIExceptionResponse exceptionResponse = new TestAPIExceptionResponse(error);
        when(clientHttpResponse.getBody()).thenReturn(new ByteArrayInputStream(json.getBytes()));

        // when
        TestAPIExceptionResponse result = ExternalAPIExceptionConvertor.convert(clientHttpResponse,
                TestAPIExceptionResponse.class);

        // then
        assertThat(result.error()).isEqualTo(error);
    }

    @DisplayName("외부 API 예외 변환 실패")
    @Test
    void fail() throws IOException {
        // given
        when(clientHttpResponse.getBody()).thenThrow(new IOException());

        // when & then
        assertThatThrownBy(() -> ExternalAPIExceptionConvertor.convert(clientHttpResponse, ExternalAPIExceptionResponse.class))
                        .isInstanceOf(BangggoodException.class)
                        .hasMessage(ExceptionCode.EXTERNAL_API_EXCEPTION_CONVERT_ERROR.getMessage());
    }

    protected record TestAPIExceptionResponse(String error)
            implements ExternalAPIExceptionResponse {}

}
