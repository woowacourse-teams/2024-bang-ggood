package com.bang_ggood.user.controller;

import com.bang_ggood.user.dto.request.OauthLoginRequest;
import com.bang_ggood.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    public static final String TOKEN_COOKIE_NAME = "token";
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/oauth/login")
    public ResponseEntity<Void> login(@Valid @RequestBody OauthLoginRequest request) {
        String token = userService.login(request);

        ResponseCookie cookie = ResponseCookie
                .from(TOKEN_COOKIE_NAME, token)
                .httpOnly(true)
                .path("/")
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }
}
