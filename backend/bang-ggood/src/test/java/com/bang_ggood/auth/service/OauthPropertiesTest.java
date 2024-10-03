package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.OauthFixture;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.service.oauth.OauthRequestProperties;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.List;

class OauthPropertiesTest extends IntegrationTestSupport {

    @DisplayName("토큰 요청 바디 생성 실패 : Redirect Uri이 일치하지 않을 때")
    @Test
    void createTokenRequestBodyFail_whenRedirectUriMisMatch() {
        // given
        OauthRequestProperties oauthRequestProperties = OauthFixture.OAUTH_REQUEST_PROPERTIES();

        String invalidRedirectUri = OauthFixture.INVALID_REGISTERD_REDIRECT_URI;
        OauthLoginRequest oauthLoginRequest = new OauthLoginRequest("testCode", List.of(invalidRedirectUri));

        // when & then
        Assertions.assertThatThrownBy(() -> oauthRequestProperties.createTokenRequestBody(oauthLoginRequest))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OAUTH_REDIRECT_URI_MISMATCH.getMessage());
    }

    @DisplayName("토큰 요청 바디 생성 성공")
    @Test
    void createTokenRequestBody() {
        // given
        OauthRequestProperties oauthRequestProperties = OauthFixture.OAUTH_REQUEST_PROPERTIES();
        String redirectUri = OauthFixture.REGISTERD_REDIRECT_URI;
        OauthLoginRequest oauthLoginRequest = new OauthLoginRequest("testCode", List.of(redirectUri));

        // when & then
        Assertions.assertThatCode(() -> oauthRequestProperties.createTokenRequestBody(oauthLoginRequest))
                .doesNotThrowAnyException();
    }
}
