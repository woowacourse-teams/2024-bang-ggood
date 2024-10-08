package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.JwtTokenFixture;
import com.bang_ggood.auth.service.jwt.JwtTokenProvider;
import com.bang_ggood.auth.service.jwt.JwtTokenResolver;
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
    private JwtTokenResolver jwtTokenResolver;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;

    @DisplayName("토큰 생성 성공")
    @Test
    void createToken() {
        // given
        User user = userRepository.getUserById(1L);
        String token = jwtTokenProvider.createAccessToken(user);

        // when
        AuthUser authUser = jwtTokenResolver.resolveAccessToken(token);

        // then
        Assertions.assertThat(authUser.id()).isEqualTo(user.getId());
    }

    @DisplayName("토큰 확인 실패 : 시그니처가 잘못된 경우")
    @Test
    void resolveToken_invalidSignature_exception() {
        // given
        JwtTokenProvider invalidJwtTokenProvider = JwtTokenFixture.JWT_TOKEN_PROVIDER_WITH_INVALID_KEY();

        User user = userRepository.save(UserFixture.USER1());
        String token = invalidJwtTokenProvider.createAccessToken(user);

        // when & then
        Assertions.assertThatCode(() -> jwtTokenResolver.resolveAccessToken(token))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_INVALID.getMessage());
    }

    @DisplayName("토큰 확인 실패 : 토큰 형태가 잘못된 경우")
    @Test
    void resolveToken_invalidToken_exception() {
        // given
        String invalidToken = "malformed";

        // when & then
        Assertions.assertThatCode(() -> jwtTokenResolver.resolveAccessToken(invalidToken))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_INVALID.getMessage());
    }
}
