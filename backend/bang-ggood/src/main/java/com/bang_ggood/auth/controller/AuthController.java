package com.bang_ggood.auth.controller;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.service.AuthService;
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
    private final CookieProvider cookieProvider;

    public AuthController(AuthService authService, CookieProvider cookieProvider) {
        this.authService = authService;
        this.cookieProvider = cookieProvider;
    }

    @PostMapping("/oauth/login")
    public ResponseEntity<Void> login(@Valid @RequestBody OauthLoginRequest request) {
        String token = authService.login(request);
        ResponseCookie cookie = cookieProvider.createCookie(token);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }
}
