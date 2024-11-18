package com.bang_ggood.auth.controller.cookie;

import com.bang_ggood.auth.service.jwt.JwtTokenProperties;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.server.Cookie.SameSite;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import java.time.Duration;

@Component
public class CookieProvider {

    protected static final String ACCESS_TOKEN_COOKIE_NAME = "accessToken";
    protected static final String REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

    private final JwtTokenProperties jwtTokenProperties;
    private final String domain;
    private final String accessTokenPath;
    private final String refreshTokenPath;

    public CookieProvider(@Value("${domain}") String domain,
                          @Value("${access-token-path}") String accessTokenPath,
                          @Value("${refresh-token-path}") String refreshTokenPath,
                          JwtTokenProperties jwtTokenProperties) {
        this.domain = domain;
        this.accessTokenPath = accessTokenPath;
        this.refreshTokenPath = refreshTokenPath;
        this.jwtTokenProperties = jwtTokenProperties;
    }

    public ResponseCookie createAccessTokenCookie(String token) {
        return createCookie(
                ACCESS_TOKEN_COOKIE_NAME,
                token,
                jwtTokenProperties.getAccessTokenExpirationMillis(),
                accessTokenPath);
    }

    public ResponseCookie createRefreshTokenCookie(String token) {
        return createCookie(
                REFRESH_TOKEN_COOKIE_NAME,
                token,
                jwtTokenProperties.getRefreshTokenExpirationMillis(),
                refreshTokenPath);
    }

    private ResponseCookie createCookie(String tokenName, String token, long expiredMillis, String path) {
        return ResponseCookie
                .from(tokenName, token)
                .domain(domain)
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.NONE.attributeValue())
                .maxAge(Duration.ofMillis(expiredMillis))
                .path(path)
                .build();
    }

    public ResponseCookie deleteAccessTokenCookie() {
        return deleteCookie(ACCESS_TOKEN_COOKIE_NAME, accessTokenPath);
    }

    public ResponseCookie deleteRefreshTokenCookie() {
        return deleteCookie(REFRESH_TOKEN_COOKIE_NAME, refreshTokenPath);
    }

    private ResponseCookie deleteCookie(String tokenName, String path) {
        return ResponseCookie
                .from(tokenName, "")
                .domain(domain)
                .httpOnly(true)
                .secure(true)
                .sameSite(SameSite.NONE.attributeValue())
                .maxAge(0)
                .path(path)
                .build();
    }
}
