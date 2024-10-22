package com.bang_ggood.auth.controller.cookie;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class CookieResolverTest {

    @DisplayName("쿠키에서 토큰 값 조회 성공 : 값이 액세스 토큰일 때")
    @Test
    void extractAccessToken() {
        // given
        HttpServletRequest request = mock(HttpServletRequest.class);
        String expectedToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0Ijox";
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = {new Cookie(CookieProvider.ACCESS_TOKEN_COOKIE_NAME, expectedToken)};

        // when
        when(request.getCookies()).thenReturn(cookies);
        String token = cookieResolver.extractAccessToken(request);

        // then
        Assertions.assertThat(token).isEqualTo(expectedToken);
    }

    @DisplayName("쿠키에서 토큰 값 조회 성공 : 값이 리프레시 토큰일 때")
    @Test
    void extractRefreshToken() {
        // given
        HttpServletRequest request = mock(HttpServletRequest.class);
        String expectedToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2IiwiaWF0Ijox";
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = {new Cookie(CookieProvider.REFRESH_TOKEN_COOKIE_NAME, expectedToken)};

        // when
        when(request.getCookies()).thenReturn(cookies);
        String token = cookieResolver.extractRefreshToken(request);

        // then
        Assertions.assertThat(token).isEqualTo(expectedToken);
    }

    @DisplayName("쿠키에서 토큰 값 조회 실패 : 액세스 토큰 값이 존재하지 않을 때")
    @Test
    void tokenValueNotExist() {
        // given
        HttpServletRequest request = mock(HttpServletRequest.class);
        CookieResolver cookieResolver = new CookieResolver();
        Cookie[] cookies = new Cookie[1];
        cookies[0] = new Cookie("testName", "testValue");

        // when & then
        when(request.getCookies()).thenReturn(cookies);
        Assertions.assertThatThrownBy(() -> cookieResolver.extractAccessToken(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_ACCESS_TOKEN_EMPTY.getMessage());

    }

    @DisplayName("쿠키 존재 여부 반환 성공 : 토큰 정보가 존재하면 false를 반환한다.")
    @Test
    void isAllTokenNotExist_returnFalse() {
        // given
        CookieResolver cookieResolver = new CookieResolver();
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        Cookie[] cookies = {new Cookie(CookieProvider.ACCESS_TOKEN_COOKIE_NAME, "test"),
                new Cookie(CookieProvider.REFRESH_TOKEN_COOKIE_NAME, "test")};

        // when
        when(httpServletRequest.getCookies()).thenReturn(cookies);
        boolean result = cookieResolver.isTokenEmpty(httpServletRequest);

        // then
        Assertions.assertThat(result).isFalse();
    }

    @DisplayName("쿠키 존재 여부 반환 성공 : 액세스 & 리프레시 토큰 정보가 존재하지 않으면 true를 반환한다.")
    @Test
    void isTokenEmpty_returnTrue() {
        // given
        CookieResolver cookieResolver = new CookieResolver();
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        Cookie[] cookies = {new Cookie("test", "test"),
                new Cookie("test", "test")};

        // when
        when(httpServletRequest.getCookies()).thenReturn(cookies);
        boolean result = cookieResolver.isTokenEmpty(httpServletRequest);

        // then
        Assertions.assertThat(result).isTrue();
    }

    @DisplayName("쿠키 존재 여부 반환 성공 : 토큰 정보가 하나라도 존재하지 않으면 false를 반환한다.")
    @Test
    void isTokenNotEmpty_returnFalse() {
        // given
        CookieResolver cookieResolver = new CookieResolver();
        HttpServletRequest httpServletRequest = mock(HttpServletRequest.class);
        Cookie[] cookies = {new Cookie(CookieProvider.ACCESS_TOKEN_COOKIE_NAME, "test")};

        // when
        when(httpServletRequest.getCookies()).thenReturn(cookies);
        boolean result = cookieResolver.isTokenEmpty(httpServletRequest);

        // then
        Assertions.assertThat(result).isFalse();
    }
}
