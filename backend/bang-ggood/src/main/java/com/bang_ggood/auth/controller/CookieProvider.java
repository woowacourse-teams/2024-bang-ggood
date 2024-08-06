package com.bang_ggood.auth.controller;

import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieProvider {

    public static final String TOKEN_COOKIE_NAME = "token";

    public ResponseCookie createCookie(String token) {
        return ResponseCookie
                .from(TOKEN_COOKIE_NAME, token)
                .httpOnly(true)
                .path("/")
                .build();
    }
}
