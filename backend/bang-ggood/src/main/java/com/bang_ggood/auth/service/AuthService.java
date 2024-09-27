package com.bang_ggood.auth.service;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.global.DefaultChecklistService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final int GUEST_USER_LIMIT = 1;

    private final OauthClient oauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final DefaultChecklistService defaultChecklistService;
    private final UserRepository userRepository; // TODO 리팩토링

    public AuthService(OauthClient oauthClient, JwtTokenProvider jwtTokenProvider,
                       DefaultChecklistService defaultChecklistService, UserRepository userRepository) {
        this.oauthClient = oauthClient;
        this.jwtTokenProvider = jwtTokenProvider;
        this.defaultChecklistService = defaultChecklistService;
        this.userRepository = userRepository;
    }

    @Transactional
    public AuthTokenResponse login(OauthLoginRequest request) {
        OauthInfoApiResponse oauthInfoApiResponse = oauthClient.requestOauthInfo(request);

        User user = userRepository.findByEmail(oauthInfoApiResponse.kakao_account().email())
                .orElseGet(() -> signUp(oauthInfoApiResponse));

        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);
        return AuthTokenResponse.of(accessToken, refreshToken);
    }

    private User signUp(OauthInfoApiResponse oauthInfoApiResponse) {
        User user = userRepository.save(oauthInfoApiResponse.toUserEntity());
        defaultChecklistService.createDefaultChecklistAndQuestions(user);
        return user;
    }

    @Transactional(readOnly = true)
    public User assignGuestUser() {
        List<User> foundGuestUser = userRepository.findUserByType(UserType.GUEST);

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
        AuthUser accessAuthUser = jwtTokenProvider.resolveToken(accessToken);
        AuthUser refreshAuthUser = jwtTokenProvider.resolveToken(refreshToken);
        validateTokenOwnership(user, accessAuthUser, refreshAuthUser);
    }

    private static void validateTokenOwnership(User user, AuthUser accessAuthUser, AuthUser refreshAuthUser) {
        if (!accessAuthUser.id().equals(refreshAuthUser.id())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_USER_MISMATCH);
        }
        if (!user.getId().equals(accessAuthUser.id())) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_TOKEN_NOT_OWNED_BY_USER);
        }
    }

    @Transactional(readOnly = true)
    public User getAuthUser(String token) {
        log.info("extractUser token: {}", token);
        AuthUser authUser = jwtTokenProvider.resolveToken(token);
        log.info("extractUser authUserId: {}", authUser.id());
        return userRepository.getUserById(authUser.id());
    }

    @Transactional(readOnly = true)
    public String reIssueAccessToken(String refreshToken) {
        jwtTokenProvider.validateRefreshTokenType(refreshToken);
        AuthUser authUser = jwtTokenProvider.resolveToken(refreshToken);

        User user = userRepository.getUserById(authUser.id());
        return jwtTokenProvider.createAccessToken(user);
    }
}
