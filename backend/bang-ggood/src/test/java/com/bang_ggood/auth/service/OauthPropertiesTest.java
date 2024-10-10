package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.AuthFixture;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.service.oauth.OauthRequestProperties;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class OauthPropertiesTest extends IntegrationTestSupport {

    @DisplayName("토큰 요청 바디 생성 실패 : Redirect Uri이 일치하지 않을 때")
    @Test
    void createTokenRequestBodyFail_whenRedirectUriMisMatch() {
        // given
        OauthRequestProperties oauthRequestProperties = AuthFixture.OAUTH_REQUEST_PROPERTIES();

        String invalidRedirectUri = AuthFixture.INVALID_REGISTERED_REDIRECT_URI;
        OauthLoginRequest oauthLoginRequest = new OauthLoginRequest("testCode", invalidRedirectUri);

        // when & then
        Assertions.assertThatThrownBy(() -> oauthRequestProperties.createTokenRequestBody(oauthLoginRequest))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OAUTH_REDIRECT_URI_MISMATCH.getMessage());
    }

    @DisplayName("토큰 요청 바디 생성 성공")
    @Test
    void createTokenRequestBody() {
        // given
        OauthRequestProperties oauthRequestProperties = AuthFixture.OAUTH_REQUEST_PROPERTIES();
        String redirectUris = AuthFixture.REGISTERED_REDIRECT_URIS;
        OauthLoginRequest oauthLoginRequest = new OauthLoginRequest("testCode", "localhost:3000");

        // when & then
        Assertions.assertThatCode(() -> oauthRequestProperties.createTokenRequestBody(oauthLoginRequest))
                .doesNotThrowAnyException();
    }

    @DisplayName("Redirect Uri 여러개를 받아 저장한다.")
    @Test
    void convertToList() {
        // given
        String firstRedirectUri = "localhost:3000";
        String secondRedirectUri = "localhost:3001";
        String testRegisteredUris = firstRedirectUri + ", " + secondRedirectUri;

        OauthRequestProperties oauthRequestProperties = new OauthRequestProperties(
                "testPostUri", "testUserUri", "testGrantType",
                "testClientId", testRegisteredUris, "testClientSecret");

        // when & then
        Assertions.assertThat(oauthRequestProperties.getRegisteredRedirectUris())
                .containsExactlyInAnyOrder(firstRedirectUri, secondRedirectUri);
    }
}
