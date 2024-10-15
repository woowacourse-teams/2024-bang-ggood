package com.bang_ggood.user.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Optional;

class UserRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;

    @DisplayName("유저 이메일 및 로그인 타입 조회 성공 : 유저 삭제 후 유저를 조회하면(논리적 삭제) 조회되지 않는다.")
    @Test
    void findByEmail() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        userRepository.deleteByUser(user);

        // when
        Optional<User> findUser = userRepository.findByEmailAndLoginType(user.getEmail(), user.getLoginType());

        // then
        Assertions.assertThat(findUser).isEmpty();
    }

    @DisplayName("유저 타입으로 조회 성공")
    @Test
    void findByType() {
        // given
        User expectedUser = userRepository.save(UserFixture.GUEST_USER1());

        // when
        List<User> users = userRepository.findUserByUserType(UserType.GUEST);

        // then
        Assertions.assertThat(users).containsExactly(expectedUser);
    }
}
