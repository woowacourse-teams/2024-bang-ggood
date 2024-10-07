package com.bang_ggood.auth.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.auth.controller.cookie.CookieProvider;
import com.bang_ggood.auth.controller.cookie.CookieResolver;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.user.domain.User;
import jakarta.servlet.http.HttpServletRequest;
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
    private final CookieResolver cookieResolver;

    public AuthController(AuthService authService, CookieProvider cookieProvider, CookieResolver cookieResolver) {
        this.authService = authService;
        this.cookieProvider = cookieProvider;
        this.cookieResolver = cookieResolver;
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
                                       HttpServletRequest httpServletRequest) {
        String accessToken = cookieResolver.extractAccessToken(httpServletRequest.getCookies());
        String refreshToken = cookieResolver.extractRefreshToken(httpServletRequest.getCookies());

        authService.logout(accessToken, refreshToken, user);

        ResponseCookie deletedAccessTokenCookie = cookieProvider.deleteAccessTokenCookie();
        ResponseCookie deletedRefreshTokenCookie = cookieProvider.deleteRefreshTokenCookie();

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, deletedAccessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, deletedRefreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/accessToken/reissue")
    public ResponseEntity<Void> reIssueAccessToken(HttpServletRequest httpServletRequest) {
        cookieResolver.checkLoginRequired(httpServletRequest);

        String refreshToken = cookieResolver.extractRefreshToken(httpServletRequest.getCookies());
        String accessToken = authService.reIssueAccessToken(refreshToken);

        ResponseCookie accessTokenCookie = cookieProvider.createAccessTokenCookie(accessToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .build();
    }
}
