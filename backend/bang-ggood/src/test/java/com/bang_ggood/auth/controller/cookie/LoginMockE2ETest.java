package com.bang_ggood.auth.controller.cookie;

import com.bang_ggood.AcceptanceMockTestSupport;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static com.bang_ggood.auth.AuthFixture.OAUTH_LOGIN_REQUEST;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class LoginMockE2ETest extends AcceptanceMockTestSupport {

    private static final String COOKIE_DELIMITER = "=";
    @Autowired
    ObjectMapper objectMapper;
    @MockBean
    AuthService authService;

    @DisplayName("로그인 성공 : 액세스 토큰과 리프레시 토큰을 쿠키로 반환한다.")
    @Test
    void login() throws Exception {
        // given
        AuthTokenResponse authTokenResponse = AuthTokenResponse.of("accessToken", "refreshToken");
        String accessTokenCookieHeader =
                CookieProvider.ACCESS_TOKEN_COOKIE_NAME + COOKIE_DELIMITER + authTokenResponse.accessToken();
        String refreshTokenCookieHeader =
                CookieProvider.REFRESH_TOKEN_COOKIE_NAME + COOKIE_DELIMITER + authTokenResponse.refreshToken();
        String oauthLoginRequestJson = objectMapper.writeValueAsString(OAUTH_LOGIN_REQUEST);

        // when & then
        when(authService.oauthLogin(any(OauthLoginRequest.class))).thenReturn(authTokenResponse);

        mockMvc.perform(post("/oauth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(oauthLoginRequestJson))
                .andExpect(status().isOk())
                .andExpect(result -> {
                    String[] cookies = result.getResponse().getHeaders(HttpHeaders.SET_COOKIE).toArray(new String[0]);

                    Assertions.assertThat(cookies[0]).contains(accessTokenCookieHeader);
                    Assertions.assertThat(cookies[1]).contains(refreshTokenCookieHeader);
                });
    }
}
