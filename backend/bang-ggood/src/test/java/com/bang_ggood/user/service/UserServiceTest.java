package com.bang_ggood.user.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.dto.request.OauthLoginRequest;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static com.bang_ggood.user.UserFixture.OAUTH_INFO_RESPONSE_USER1;
import static com.bang_ggood.user.UserFixture.USER1;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class UserServiceTest extends IntegrationTestSupport {

    @MockBean
    private OauthClient oauthClient;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    private static final OauthLoginRequest oauthLoginRequest = new OauthLoginRequest("testCode");

    @DisplayName("로그인 성공 : 존재하지 않는 회원이면 데이터베이스에 새로운 유저를 추가하고 토큰을 반환한다.")
    @Test
    void login_signup() {
        // given
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2);

        // when
        String token = userService.login(oauthLoginRequest);

        // then
        Assertions.assertThat(token).isNotBlank();
    }

    @DisplayName("로그인 성공 : 존재하는 회원이면 데이터베이스에 새로운 유저를 추가하지않고 토큰을 바로 반환한다.")
    @Test
    void login() {
        // given
        userRepository.save(USER1);
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(OAUTH_INFO_RESPONSE_USER1);

        // when
        String token = userService.login(oauthLoginRequest);

        // then
        Assertions.assertThat(token).isNotBlank();
    }
}
