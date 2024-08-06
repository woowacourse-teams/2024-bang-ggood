package com.bang_ggood.user.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

import static com.bang_ggood.user.UserFixture.USER1;

class UserRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;

    @DisplayName("유저 이메일 조회 성공 : 유저 삭제 후 유저를 조회하면(논리적 삭제) 조회되지 않는다.")
    @Test
    void findByEmail() {
        // given
        User user = userRepository.save(USER1);
        user.delete();
        userRepository.save(user);

        // when
        Optional<User> findUser = userRepository.findByEmail(user.getEmail());

        // then
        Assertions.assertThat(findUser).isEmpty();
    }
}
