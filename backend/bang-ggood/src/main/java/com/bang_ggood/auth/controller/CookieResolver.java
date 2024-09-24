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
        if (cookies == null) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_COOKIE_EMPTY);
        }

        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findAny()
                .map(Cookie::getValue)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.AUTHENTICATION_COOKIE_TOKEN_EMPTY));
    }
}
