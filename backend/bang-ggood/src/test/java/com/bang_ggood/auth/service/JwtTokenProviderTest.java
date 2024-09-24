package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


class JwtTokenProviderTest extends IntegrationTestSupport {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;

    @DisplayName("토큰 생성 성공")
    @Test
    void createToken() {
        // given
        User user = userRepository.getUserById(1L);
        String token = jwtTokenProvider.createToken(user);

        // when
        AuthUser authUser = jwtTokenProvider.resolveToken(token);

        // then
        Assertions.assertThat(authUser.id()).isEqualTo(user.getId());
    }

    @DisplayName("토큰 획인 실패 : 유효시간이 지난 경우")
    @Test
    void resolveToken_expiredTime_exception() {
        // given
        String JWT_SECRET_KEY = "A".repeat(32);
        int JWT_ACCESS_TOKEN_EXPIRE_LENGTH = 1;
        JwtTokenProvider expiredJwtTokenProvider = new JwtTokenProvider(JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRE_LENGTH);

        User user = userRepository.save(UserFixture.USER1());
        String token = expiredJwtTokenProvider.createToken(user);

        // when & then
        Assertions.assertThatCode(() -> expiredJwtTokenProvider.resolveToken(token))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_EXPIRED.getMessage());
    }

    @DisplayName("토큰 확인 실패 : 시그니처가 잘못된 경우")
    @Test
    void resolveToken_invalidSignature_exception() {
        // given
        String JWT_SECRET_KEY = "A".repeat(32);
        int JWT_ACCESS_TOKEN_EXPIRE_LENGTH = 1800000;
        JwtTokenProvider invalidJwtTokenProvider = new JwtTokenProvider(JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRE_LENGTH);

        User user = userRepository.save(UserFixture.USER1());
        String token = jwtTokenProvider.createToken(user);

        // when & then
        Assertions.assertThatCode(() -> invalidJwtTokenProvider.resolveToken(token))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_INVALID.getMessage());
    }

    @DisplayName("토큰 확인 실패 : 토큰 형태가 잘못된 경우")
    @Test
    void resolveToken_invalidToken_exception() {
        // given
        String invalidToken = "malformed";

        // when & then
        Assertions.assertThatCode(() -> jwtTokenProvider.resolveToken(invalidToken))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_INVALID.getMessage());
    }
}
