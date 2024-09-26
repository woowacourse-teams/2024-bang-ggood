package com.bang_ggood.auth.controller;

import com.bang_ggood.AcceptanceMockTestSupport;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.service.AuthService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class LoginMockE2ETest extends AcceptanceMockTestSupport {

    @MockBean
    AuthService authService;

    private static final String COOKIE_DELIMITER = "=";

    @DisplayName("로그인 성공 : 액세스 토큰과 리프레시 토큰을 쿠키로 반환한다.")
    @Test
    void login() throws Exception {
        // given
        AuthTokenResponse authTokenResponse = AuthTokenResponse.of("accessToken", "refreshToken");
        String accessTokenCookieHeader = CookieProvider.ACCESS_TOKEN_COOKIE_NAME + COOKIE_DELIMITER + authTokenResponse.accessToken();
        String refreshTokenCookieHeader = CookieProvider.REFRESH_TOKEN_COOKIE_NAME + COOKIE_DELIMITER + authTokenResponse.refreshToken();

        // when & then
        Mockito.when(authService.login(any(OauthLoginRequest.class))).thenReturn(authTokenResponse);

        mockMvc.perform(post("/oauth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"code\"}")) // 요청 본문
                .andExpect(status().isOk())
                .andExpect(result -> {
                    String[] cookies = result.getResponse().getHeaders(HttpHeaders.SET_COOKIE).toArray(new String[0]);

                    Assertions.assertThat(cookies[0]).contains(accessTokenCookieHeader);
                    Assertions.assertThat(cookies[1]).contains(refreshTokenCookieHeader);
                });
    }
}
