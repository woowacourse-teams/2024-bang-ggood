package com.bang_ggood.auth.controller;

import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;
    public static final String TOKEN_COOKIE_NAME = "token";

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/oauth/login")
    public ResponseEntity<Void> login(@Valid @RequestBody OauthLoginRequest request) {
        String token = authService.login(request);

        ResponseCookie cookie = ResponseCookie
                .from(TOKEN_COOKIE_NAME, token)
                .httpOnly(true)
                .path("/")
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }
}
