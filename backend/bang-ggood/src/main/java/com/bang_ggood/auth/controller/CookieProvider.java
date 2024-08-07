package com.bang_ggood.auth.controller;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import java.time.Duration;

@Component
public class CookieProvider {

    public static final String TOKEN_COOKIE_NAME = "token";

    public ResponseCookie createCookie(String token) {
        return ResponseCookie
                .from(TOKEN_COOKIE_NAME, token)
                .domain("localhost")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .maxAge(Duration.ofHours(2))
                .path("/")
                .build();
    }
}
