package com.bang_ggood.user.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class JwtTokenProviderTest extends IntegrationTestSupport {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("토큰 생성 성공")
    @Test
    void createToken() {
        // given
        User user = new User("방끗", "bang-ggood@gmail.com");

        // when
        String token = jwtTokenProvider.createToken(user);

        // then
        Assertions.assertThat(token).isNotEmpty();
    }
}
