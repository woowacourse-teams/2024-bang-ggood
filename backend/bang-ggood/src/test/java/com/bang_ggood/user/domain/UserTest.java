package com.bang_ggood.user.domain;

import com.bang_ggood.question.domain.Question;
import com.bang_ggood.user.UserFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    @DisplayName("비밀번호 불일치 확인 성공: 일치하는 경우")
    @Test
    void passwordEqual_false() {
        //given
        User user = UserFixture.USER1();
        String password = "password";

        //when & then
        assertThat(user.isDifferentPassword(password)).isFalse();
    }

    @DisplayName("비밀번호 불일치 확인 성공: 일치하지 않는 경우")
    @Test
    void passwordEqual_true() {
        //given
        User user = UserFixture.USER1();
        String password = "pass";

        //when & then
        assertThat(user.isDifferentPassword(password)).isTrue();
    }
}
