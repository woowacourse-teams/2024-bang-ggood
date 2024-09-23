package com.bang_ggood.user.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class UserServiceTest extends IntegrationTestSupport {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @DisplayName("게스트 유저 조회 성공 : 게스트 유저가 존재하면 해당 유저를 반환한다.")
    @Test
    void getOrCreateGuestUser_getExistedGuestUser() {
        // given
        User user = userRepository.save(UserFixture.GUEST_USER());

        // when
        User guestUser = userService.getOrCreateGuestUser();

        // then
        Assertions.assertThat(user).isEqualTo(guestUser);
    }

    @DisplayName("게스트 유저 조회 성공 : 게스트 유저가 존재하지 않으면 새롭게 유저를 생성한다.")
    @Test
    void getOrCreateGuestUser_createNewGuestUser() {
        // given
        int expectedGuestUserSize = 1;
        int userSizeBeforeMethodExecute = userRepository.findUserByType(UserType.GUEST).size();

        // when
        userService.getOrCreateGuestUser();
        int userSizeAfterMethodExecute = userRepository.findUserByType(UserType.GUEST).size();

        // then
        Assertions.assertThat(userSizeBeforeMethodExecute).isZero();
        Assertions.assertThat(userSizeAfterMethodExecute).isEqualTo(expectedGuestUserSize);
    }
}
