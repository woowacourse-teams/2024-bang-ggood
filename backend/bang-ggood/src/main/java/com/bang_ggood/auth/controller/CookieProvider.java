package com.bang_ggood.auth.controller;

import com.bang_ggood.auth.service.jwt.JwtTokenProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import java.time.Duration;

@Component
public class CookieProvider {

    public static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
    private final JwtTokenProperties jwtTokenProperties;
    private final String domain;

    public CookieProvider(@Value("${domain}") String domain,
                          JwtTokenProperties jwtTokenProperties) {
        this.domain = domain;
        this.jwtTokenProperties = jwtTokenProperties;
    }

    public ResponseCookie createAccessTokenCookie(String token) {
        return createCookie(
                ACCESS_TOKEN_COOKIE_NAME,
                token,
                jwtTokenProperties.getAccessTokenExpirationMillis());
    }

    public ResponseCookie createRefreshTokenCookie(String token) {
        return createCookie(
                REFRESH_TOKEN_COOKIE_NAME,
                token,
                jwtTokenProperties.getRefreshTokenExpirationMillis());
    }

    private ResponseCookie createCookie(String tokenName, String token, long expiredMillis) {
        return ResponseCookie
                .from(tokenName, token)
                .domain(domain)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .maxAge(Duration.ofMillis(expiredMillis))
                .path("/")
                .build();
    }

    public ResponseCookie deleteAccessTokenCookie(String token) {
        return deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
    }

    public ResponseCookie deleteRefreshTokenCookie(String token) {
        return deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
    }

    private ResponseCookie deleteCookie(String tokenName) {
        return ResponseCookie
                .from(tokenName, "")
                .domain(domain)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .maxAge(0)
                .path("/")
                .build();
    }
}
