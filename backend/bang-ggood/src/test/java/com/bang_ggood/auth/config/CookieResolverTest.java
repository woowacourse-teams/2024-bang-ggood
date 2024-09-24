package com.bang_ggood.auth.config;

import com.bang_ggood.auth.controller.CookieProvider;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.servlet.http.Cookie;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CookieResolverTest {

    @DisplayName("쿠키에서 토큰 값 조회 성공")
    @Test
    void extractToken() {
        // given
        String expectedToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0Ijox";
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = { new Cookie(CookieProvider.ACCESS_TOKEN_COOKIE_NAME, expectedToken) };

        // when
        String token = cookieResolver.extractToken(cookies);

        // then
        Assertions.assertThat(token).isEqualTo(expectedToken);
    }

    @DisplayName("쿠키에서 토큰 값 조회 실패 : 토큰 값이 존재하지 않을 때")
    @Test
    void tokenValueNotExist() {
        // given
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = new Cookie[1];
        cookies[0] = new Cookie("testName", "testValue");

        // when & then
        Assertions.assertThatThrownBy(() -> cookieResolver.extractToken(cookies))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_COOKIE_TOKEN_EMPTY.getMessage());

    }
}
