package com.bang_ggood.user.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class UserRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;

    @DisplayName("유저 이메일 및 로그인 타입 조회 성공 : 유저 삭제 후 유저를 조회하면(논리적 삭제) 조회되지 않는다.")
    @Test
    void findByEmail() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        userRepository.deleteById(user.getId());

        // when
        Optional<User> findUser = userRepository.findByEmailAndLoginType(user.getEmail(), user.getLoginType());

        // then
        assertThat(findUser).isEmpty();
    }

    @DisplayName("유저 타입으로 조회 성공")
    @Test
    void findByType() {
        // given
        User expectedUser = userRepository.save(UserFixture.GUEST_USER1());

        // when
        List<User> users = userRepository.findUserByUserType(UserType.GUEST);

        // then
        assertThat(users).containsExactly(expectedUser);
    }

    @DisplayName("논리적 삭제 성공")
    @Test
    void deleteById() {
        // given
        User user = userRepository.save(UserFixture.USER1());

        // when
        userRepository.deleteById(user.getId());

        // then
        Optional<User> findUser = userRepository.findById(user.getId());
        assertThat(findUser).isEmpty();
    }

    @DisplayName("이메일과 로그인 타입으로 재저장 성공")
    @Test
    void resaveByEmailAndLoginType() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        userRepository.deleteById(user.getId());

        // when
        userRepository.resaveByEmailAndLoginType(user.getEmail(), user.getLoginType());

        // then
        Optional<User> deletedUser = userRepository.findByEmailAndLoginType(user.getEmail(), user.getLoginType());
        assertAll(
                () -> assertThat(deletedUser).isPresent(),
                () -> assertThat(deletedUser.get().isDeleted()).isFalse()
        );
    }

    @DisplayName("논리적 삭제된 유저를 포함해 이메일과 로그인 타입으로 조회 성공")
    @Test
    void findByEmailAndLoginTypeWithDeleted() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        userRepository.deleteById(user.getId());

        // when
        Optional<User> deletedUser = userRepository.findByEmailAndLoginTypeWithDeleted(user.getEmail(), user.getLoginType());

        // then
        assertAll(
                () -> assertThat(deletedUser).isPresent(),
                () -> assertThat(deletedUser.get().isDeleted()).isTrue()
        );
    }
}
