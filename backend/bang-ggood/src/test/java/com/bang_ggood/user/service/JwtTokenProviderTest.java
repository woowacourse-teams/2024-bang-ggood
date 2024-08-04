package com.bang_ggood.user.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.bang_ggood.user.UserFixture.USER1;

class JwtTokenProviderTest extends IntegrationTestSupport {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private UserRepository userRepository;

    @DisplayName("토큰 생성 성공")
    @Test
    void createToken() {
        // given
        User user = userRepository.save(USER1);
        String token = jwtTokenProvider.createToken(user);

        // when
        AuthUser authUser = jwtTokenProvider.resolveToken(token);

        // then
        Assertions.assertThat(authUser.id()).isEqualTo(user.getId());
    }
}
