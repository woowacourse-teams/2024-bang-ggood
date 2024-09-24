package com.bang_ggood.auth.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
        AuthTokenResponse response = authService.login(request);

        ResponseCookie accessTokenCookie = cookieProvider.createAccessTokenCookie(response.accessToken());
        ResponseCookie refreshTokenCookie = cookieProvider.createRefreshTokenCookie(response.refreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/oauth/logout")
    public ResponseEntity<Void> logout(@AuthRequiredPrincipal User user,
                                       @RequestHeader(value = "Cookie") String accessToken) {
        authService.logout(accessToken, user);
        ResponseCookie expiredCookie = cookieProvider.deleteCookie();

        return ResponseEntity.noContent().header(HttpHeaders.SET_COOKIE, expiredCookie.toString()).build();
    }
}
