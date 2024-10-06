package com.bang_ggood.auth.controller.cookie;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import java.util.Arrays;
import java.util.Optional;

@Component
public class CookieResolver {

    public void checkLoginRequired(HttpServletRequest request) {
        if (isTokenEmpty(request)) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_EMPTY);
        }

        if (isRefreshTokenEmpty(request.getCookies())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_REFRESH_TOKEN_EMPTY);
        }
    }

    private boolean isAccessTokenEmpty(Cookie[] cookies) {
        return isTokenEmpty(cookies, CookieProvider.ACCESS_TOKEN_COOKIE_NAME);
    }

    private boolean isRefreshTokenEmpty(Cookie[] cookies) {
        return isTokenEmpty(cookies, CookieProvider.REFRESH_TOKEN_COOKIE_NAME);
    }

    private boolean isTokenEmpty(Cookie[] cookies, String cookieName) {
        return Arrays.stream(cookies)
                .noneMatch(cookie -> cookie.getName().equals(cookieName));
    }

    public String extractAccessToken(Cookie[] cookies) {
        return extractToken(cookies, CookieProvider.ACCESS_TOKEN_COOKIE_NAME)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.AUTHENTICATION_ACCESS_TOKEN_EMPTY));
    }

    public String extractRefreshToken(Cookie[] cookies) {
        return extractToken(cookies, CookieProvider.REFRESH_TOKEN_COOKIE_NAME)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.AUTHENTICATION_REFRESH_TOKEN_EMPTY));
    }

    private Optional<String> extractToken(Cookie[] cookies, String cookieName) {
        return Arrays.stream(cookies)
                .filter(cookie -> cookie.getName().equals(cookieName))
                .findAny()
                .map(Cookie::getValue);
    }

    public boolean isTokenEmpty(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return true;
        }

        Cookie[] cookies = request.getCookies();
        return isAccessTokenEmpty(cookies) && isRefreshTokenEmpty(cookies);
    }
}
