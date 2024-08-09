package com.bang_ggood.auth.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import java.time.Duration;

@Component
public class CookieProvider {

    public static final String TOKEN_COOKIE_NAME = "token";

    private final String domain;

    public CookieProvider(@Value("${domain}") String domain) {
        this.domain = domain;
    }

    public ResponseCookie createCookie(String token) {
        return ResponseCookie
                .from(TOKEN_COOKIE_NAME, token)
                .domain(domain)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .maxAge(Duration.ofHours(2))
                .path("/")
                .build();
    }
}
