package com.bang_ggood.auth.controller;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;
import java.util.Arrays;

@Component
public class CookieResolver {

    public String extractAccessToken(Cookie[] cookies) {
        return extractToken(cookies, CookieProvider.ACCESS_TOKEN_COOKIE_NAME);
    }

    public String extractRefreshToken(Cookie[] cookies) {
        return extractToken(cookies, CookieProvider.REFRESH_TOKEN_COOKIE_NAME);
    }

    private String extractToken(Cookie[] cookies, String cookieName) {
        if (cookies == null || cookies.length == 0) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_COOKIE_EMPTY);
        }

        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findAny()
                .map(Cookie::getValue)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.AUTHENTICATION_REQUIRED_TOKEN_EMPTY));
    }

    public boolean isTokenNotExist(Cookie[] cookies) {
        return (!isAccessTokenExist(cookies) && !isRefreshTokenExist(cookies));
    }

    private boolean isAccessTokenExist(Cookie[] cookies) {
        return isTokenExist(cookies, CookieProvider.ACCESS_TOKEN_COOKIE_NAME);
    }

    private boolean isRefreshTokenExist(Cookie[] cookies) {
        return isTokenExist(cookies, CookieProvider.REFRESH_TOKEN_COOKIE_NAME);
    }

    private boolean isTokenExist(Cookie[] cookies, String cookieName) {
        return Arrays.stream(cookies)
                .anyMatch(cookie -> cookie.getName().equals(cookieName));
    }
}
