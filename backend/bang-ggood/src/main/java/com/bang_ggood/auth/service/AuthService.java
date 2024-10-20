package com.bang_ggood.auth.service;

import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.auth.dto.request.ConfirmPasswordResetCodeRequest;
import com.bang_ggood.auth.dto.request.ForgotPasswordRequest;
import com.bang_ggood.auth.dto.request.LocalLoginRequestV1;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.request.RegisterRequestV1;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.auth.repository.PasswordResetCodeRepository;
import com.bang_ggood.auth.service.jwt.JwtTokenProvider;
import com.bang_ggood.auth.service.jwt.JwtTokenResolver;
import com.bang_ggood.auth.service.oauth.OauthClient;
import com.bang_ggood.global.DefaultChecklistService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.Email;
import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final int GUEST_USER_LIMIT = 1;
    private static final int PASSWORD_RESET_CODE_EXPIRED_MINUTES = 3;

    private final OauthClient oauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenResolver jwtTokenResolver;
    private final DefaultChecklistService defaultChecklistService;
    private final UserRepository userRepository;
    private final MailSender mailSender;
    private final PasswordResetCodeRepository passwordResetCodeRepository;
    private final Clock clock;

    @Transactional
    public Long register(RegisterRequestV1 request) {
        User user = processUser(LoginType.LOCAL, request.toUserEntity(), true);
        return user.getId();
    }

    @Transactional
    public AuthTokenResponse oauthLogin(OauthLoginRequest request) {
        OauthInfoApiResponse oauthInfo = oauthClient.requestOauthInfo(request);
        User user = processUser(LoginType.KAKAO, oauthInfo.toUserEntity(), false);
        return createAuthTokenResponse(user);
    }

    private User processUser(LoginType loginType, User user, boolean isRegistration) {
        return userRepository.findByEmailAndLoginTypeWithDeleted(user.getEmail(), loginType)
                .map(savedUser -> handleExistingUser(savedUser, loginType, isRegistration))
                .orElseGet(() -> signUp(user));
    }

    private User handleExistingUser(User user, LoginType loginType, boolean isRegistrationRequest) {
        validateRegister(user, isRegistrationRequest);
        restoreUser(user, loginType);
        return user;
    }

    private void validateRegister(User user, boolean isRegistrationRequest) {
        if (!user.isDeleted() && isRegistrationRequest) {
            throw new BangggoodException(ExceptionCode.USER_EMAIL_ALREADY_USED);
        }
    }

    private void restoreUser(User user, LoginType loginType) {
        if (user.isDeleted()) {
            userRepository.resaveByEmailAndLoginType(user.getEmail(), loginType);
        }
    }

    private AuthTokenResponse createAuthTokenResponse(User user) {
        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);
        return AuthTokenResponse.of(accessToken, refreshToken);
    }


    @Transactional
    public void withdraw(User user) {
        userRepository.deleteById(user.getId());
    }

    @Transactional(readOnly = true)
    public AuthTokenResponse localLogin(LocalLoginRequestV1 request) {
        User user = userRepository.findByEmailAndLoginType(new Email(request.email()), LoginType.LOCAL)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.USER_NOT_FOUND));
        checkPassword(request, user);

        return createAuthTokenResponse(user);
    }


    private void checkPassword(LocalLoginRequestV1 request, User user) {
        if (user.isDifferent(request.password())) {
            throw new BangggoodException(ExceptionCode.USER_INVALID_PASSWORD);
        }
    }

    private User signUp(User user) {
        User savedUser = userRepository.save(user);
        defaultChecklistService.createDefaultChecklistAndQuestions(savedUser);
        return savedUser;
    }

    @Transactional(readOnly = true)
    public User assignGuestUser() {
        List<User> foundGuestUser = userRepository.findUserByUserType(UserType.GUEST);

        if (foundGuestUser.size() > GUEST_USER_LIMIT) {
            throw new BangggoodException(ExceptionCode.GUEST_USER_UNEXPECTED_EXIST);
        }

        return foundGuestUser.stream()
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.GUEST_USER_NOT_FOUND));
    }

    public void logout(String accessToken, String refreshToken) {
        AuthUser accessAuthUser = jwtTokenResolver.resolveAccessToken(accessToken);
        AuthUser refreshAuthUser = jwtTokenResolver.resolveRefreshToken(refreshToken);
        if (!accessAuthUser.id().equals(refreshAuthUser.id())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_USER_MISMATCH);
        }
    }

    public void sendPasswordResetEmail(ForgotPasswordRequest request) {
        String code = mailSender.sendPasswordResetEmail(request.email());
        passwordResetCodeRepository.save(new PasswordResetCode(request.email(), code));
    }

    @Transactional(readOnly = true)
    public void confirmPasswordResetCode(ConfirmPasswordResetCodeRequest request) {
        LocalDateTime timeLimit = LocalDateTime.now(clock).minusMinutes(PASSWORD_RESET_CODE_EXPIRED_MINUTES);
        boolean isValid = passwordResetCodeRepository.existsByEmailAndCodeAndCreatedAtAfter(
                new Email(request.email()), request.code(), timeLimit);
        if (!isValid) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_PASSWORD_CODE_NOT_FOUND);
        }
    }

    @Transactional(readOnly = true)
    public User getAuthUser(String token) {
        AuthUser authUser = jwtTokenResolver.resolveAccessToken(token);
        return userRepository.getUserById(authUser.id());
    }

    @Transactional(readOnly = true)
    public String reissueAccessToken(String refreshToken) {
        AuthUser authUser = jwtTokenResolver.resolveRefreshToken(refreshToken);
        User user = userRepository.getUserById(authUser.id());
        return jwtTokenProvider.createAccessToken(user);
    }
}
