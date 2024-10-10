package com.bang_ggood.auth.service;

import com.bang_ggood.auth.dto.request.LocalLoginRequestV1;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.auth.service.jwt.JwtTokenProvider;
import com.bang_ggood.auth.service.jwt.JwtTokenResolver;
import com.bang_ggood.auth.service.oauth.OauthClient;
import com.bang_ggood.global.DefaultChecklistService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final int GUEST_USER_LIMIT = 1;

    private final OauthClient oauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final JwtTokenResolver jwtTokenResolver;
    private final DefaultChecklistService defaultChecklistService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private static void validateTokenOwnership(User user, AuthUser accessAuthUser, AuthUser refreshAuthUser) {
        if (!accessAuthUser.id().equals(refreshAuthUser.id())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_USER_MISMATCH);
        }
        if (!user.getId().equals(accessAuthUser.id())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_NOT_OWNED_BY_USER);
        }
    }

    @Transactional
    public AuthTokenResponse authLogin(OauthLoginRequest request) {
        OauthInfoApiResponse oauthInfoApiResponse = oauthClient.requestOauthInfo(request);

        User user = userRepository.findByEmailAndLoginType(oauthInfoApiResponse.kakao_account().email(),
                        LoginType.KAKAO)
                .orElseGet(() -> signUp(oauthInfoApiResponse));

        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);
        return AuthTokenResponse.of(accessToken, refreshToken);
    }

    @Transactional(readOnly = true)
    public AuthTokenResponse localLogin(LocalLoginRequestV1 request) {
        User user = userRepository.findByEmailAndLoginType(request.email(), LoginType.LOCAL)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.USER_NOT_FOUND));
        checkPassword(request, user);

        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);
        return AuthTokenResponse.of(accessToken, refreshToken);
    }

    private void checkPassword(LocalLoginRequestV1 request, User user) {
        String encodingPassword = passwordEncoder.encode(request.email(), request.password());
        if (user.isDifferentPassword(encodingPassword)) {
            throw new BangggoodException(ExceptionCode.USER_INVALID_PASSWORD);
        }
    }

    private User signUp(OauthInfoApiResponse oauthInfoApiResponse) {
        User user = userRepository.save(oauthInfoApiResponse.toUserEntity());
        defaultChecklistService.createDefaultChecklistAndQuestions(user);
        return user;
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

    public void logout(String accessToken, String refreshToken, User user) {
        log.info("logout accessToken: {}", accessToken);
        log.info("logout refreshToken: {}", refreshToken);
        AuthUser accessAuthUser = jwtTokenResolver.resolveAccessToken(accessToken);
        AuthUser refreshAuthUser = jwtTokenResolver.resolveRefreshToken(refreshToken);
        validateTokenOwnership(user, accessAuthUser, refreshAuthUser);
    }

    @Transactional(readOnly = true)
    public User getAuthUser(String token) {
        AuthUser authUser = jwtTokenResolver.resolveAccessToken(token);
        log.info("extractUser token: {}", token);
        log.info("extractUser authUserId: {}", authUser.id());
        return userRepository.getUserById(authUser.id());
    }

    @Transactional(readOnly = true)
    public String reissueAccessToken(String refreshToken) {
        AuthUser authUser = jwtTokenResolver.resolveRefreshToken(refreshToken);
        User user = userRepository.getUserById(authUser.id());
        return jwtTokenProvider.createAccessToken(user);
    }
}
