package com.bang_ggood.auth.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.auth.controller.cookie.CookieProvider;
import com.bang_ggood.auth.controller.cookie.CookieResolver;
import com.bang_ggood.auth.dto.request.ConfirmPasswordResetCodeRequest;
import com.bang_ggood.auth.dto.request.ForgotPasswordRequest;
import com.bang_ggood.auth.dto.request.LocalLoginRequestV1;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.request.RegisterRequestV1;
import com.bang_ggood.auth.dto.request.ResetPasswordRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.dto.response.TokenExistResponse;
import com.bang_ggood.auth.service.AuthService;
import com.bang_ggood.auth.service.PasswordResetService;
import com.bang_ggood.user.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;
    private final PasswordResetService passwordResetService;
    private final CookieProvider cookieProvider;
    private final CookieResolver cookieResolver;

    @PostMapping("/v1/local-auth/register")
    public ResponseEntity<Void> register(@Valid @RequestBody RegisterRequestV1 request) {
        Long userId = authService.register(request);
        return ResponseEntity.created(URI.create("/v1/local-auth/register/" + userId)).build();
    }

    @DeleteMapping("/v1/withdraw")
    public ResponseEntity<Void> withdraw(@AuthRequiredPrincipal User user,
                                         HttpServletRequest httpServletRequest) {
        String accessToken = cookieResolver.extractAccessToken(httpServletRequest);
        String refreshToken = cookieResolver.extractRefreshToken(httpServletRequest);

        authService.logout(accessToken, refreshToken);

        ResponseCookie deletedAccessTokenCookie = cookieProvider.deleteAccessTokenCookie();
        ResponseCookie deletedRefreshTokenCookie = cookieProvider.deleteRefreshTokenCookie();

        authService.withdraw(user);

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, deletedAccessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, deletedRefreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/oauth/login")
    public ResponseEntity<Void> oauthLogin(@Valid @RequestBody OauthLoginRequest request) {
        AuthTokenResponse response = authService.oauthLogin(request);

        ResponseCookie accessTokenCookie = cookieProvider.createAccessTokenCookie(response.accessToken());
        ResponseCookie refreshTokenCookie = cookieProvider.createRefreshTokenCookie(response.refreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/v1/local-auth/login")
    public ResponseEntity<Void> localLogin(@Valid @RequestBody LocalLoginRequestV1 request) {
        AuthTokenResponse response = authService.localLogin(request);

        ResponseCookie accessTokenCookie = cookieProvider.createAccessTokenCookie(response.accessToken());
        ResponseCookie refreshTokenCookie = cookieProvider.createRefreshTokenCookie(response.refreshToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/v1/logout")
    public ResponseEntity<Void> logout(@AuthRequiredPrincipal User user,
                                       HttpServletRequest httpServletRequest) {
        String accessToken = cookieResolver.extractAccessToken(httpServletRequest);
        String refreshToken = cookieResolver.extractRefreshToken(httpServletRequest);

        authService.logout(accessToken, refreshToken);

        ResponseCookie deletedAccessTokenCookie = cookieProvider.deleteAccessTokenCookie();
        ResponseCookie deletedRefreshTokenCookie = cookieProvider.deleteRefreshTokenCookie();

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, deletedAccessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, deletedRefreshTokenCookie.toString())
                .build();
    }

    @PostMapping("/v1/password-reset/send-code")
    public ResponseEntity<Void> sendPasswordResetEmail(@Valid @RequestBody ForgotPasswordRequest request) {
        passwordResetService.sendPasswordResetEmail(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/v1/password-reset/confirm")
    public ResponseEntity<Void> confirmPasswordResetCode(@Valid @RequestBody ConfirmPasswordResetCodeRequest request) {
        passwordResetService.confirmPasswordResetCode(request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/v1/password-reset")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        passwordResetService.resetPassword(request);
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/accessToken/reissue")
    public ResponseEntity<Void> reissueAccessToken(HttpServletRequest httpServletRequest) {
        cookieResolver.checkLoginRequired(httpServletRequest);

        String refreshToken = cookieResolver.extractRefreshToken(httpServletRequest);
        String accessToken = authService.reissueAccessToken(refreshToken);

        ResponseCookie accessTokenCookie = cookieProvider.createAccessTokenCookie(accessToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .build();
    }

    @GetMapping("/token-exist")
    public ResponseEntity<TokenExistResponse> check(HttpServletRequest httpServletRequest) {
        boolean isAccessTokenExist = !cookieResolver.isAccessTokenEmpty(httpServletRequest);
        boolean isRefreshTokenExist = !cookieResolver.isRefreshTokenEmpty(httpServletRequest);

        TokenExistResponse tokenExistResponse = TokenExistResponse.from(isAccessTokenExist, isRefreshTokenExist);
        return ResponseEntity.ok(tokenExistResponse);
    }

    @DeleteMapping("/token")
    public ResponseEntity<Void> deleteToken() {
        ResponseCookie deletedAccessTokenCookie = cookieProvider.deleteAccessTokenCookie();
        ResponseCookie deletedRefreshTokenCookie = cookieProvider.deleteRefreshTokenCookie();

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, deletedAccessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, deletedRefreshTokenCookie.toString())
                .build();
    }
}
