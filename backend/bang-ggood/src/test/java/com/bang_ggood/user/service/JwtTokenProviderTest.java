package com.bang_ggood.user.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.bang_ggood.user.UserFixture.USER1;
import static org.junit.jupiter.api.Assertions.assertAll;

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
        AuthInfo authInfo = jwtTokenProvider.resolveToken(token);

        // then
        assertAll(
                () -> authInfo.id().equals(user.getId()),
                () -> authInfo.name().equals(user.getName()),
                () -> authInfo.email().equals(user.getEmail())
        );
    }
}
