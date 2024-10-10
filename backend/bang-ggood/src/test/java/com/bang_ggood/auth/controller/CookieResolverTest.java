package com.bang_ggood.auth.controller;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.servlet.http.Cookie;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CookieResolverTest {

    @DisplayName("쿠키에서 토큰 값 조회 성공 : 값이 액세스 토큰일 때")
    @Test
    void extractAccessToken() {
        // given
        String expectedToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0Ijox";
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = {new Cookie(CookieProvider.ACCESS_TOKEN_COOKIE_NAME, expectedToken)};

        // when
        String token = cookieResolver.extractAccessToken(cookies);

        // then
        Assertions.assertThat(token).isEqualTo(expectedToken);
    }

    @DisplayName("쿠키에서 토큰 값 조회 성공 : 값이 리프레시 토큰일 때")
    @Test
    void extractRefreshToken() {
        // given
        String expectedToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0Ijox";
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = {new Cookie(CookieProvider.REFRESH_TOKEN_COOKIE_NAME, expectedToken)};

        // when
        String token = cookieResolver.extractRefreshToken(cookies);

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
        Assertions.assertThatThrownBy(() -> cookieResolver.extractAccessToken(cookies))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_REQUIRED_TOKEN_EMPTY.getMessage());

    }

    @DisplayName("쿠키 존재 여부 반환 성공 : 토큰 정보가 존재하면 false를 반환한다.")
    @Test
    void isAllTokenNotExist_returnFalse() {
        // given
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = {new Cookie(CookieProvider.ACCESS_TOKEN_COOKIE_NAME, "test"),
                new Cookie(CookieProvider.REFRESH_TOKEN_COOKIE_NAME, "test")};

        // when
        boolean result = cookieResolver.isTokenNotExist(cookies);

        // then
        Assertions.assertThat(result).isFalse();
    }

    @DisplayName("쿠키 존재 여부 반환 성공 : 액세스 & 리프레시 토큰 정보가 존재하지 않으면 true를 반환한다.")
    @Test
    void isTokenNotExist_returnTrue() {
        // given
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = {new Cookie("test", "test")};

        // when
        boolean result = cookieResolver.isTokenNotExist(cookies);

        // then
        Assertions.assertThat(result).isTrue();
    }

    @DisplayName("쿠키 존재 여부 반환 성공 : 토큰 정보가 하나라도 존재하지 않으면 false를 반환한다.")
    @Test
    void isTokenNotExist_returnFalse() {
        // given
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = {new Cookie(CookieProvider.ACCESS_TOKEN_COOKIE_NAME, "test")};

        // when
        boolean result = cookieResolver.isTokenNotExist(cookies);

        // then
        Assertions.assertThat(result).isFalse();
    }
}
