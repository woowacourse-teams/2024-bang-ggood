package com.bang_ggood.user.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class PasswordTest {

    @DisplayName("영어와 숫자를 모두 포함하고 6자 이상인 비밀번호 생성 성공")
    @Test
    void createPassword() {
        assertThatCode(() -> new Password("password1234"))
                .doesNotThrowAnyException();
    }

    @DisplayName("영어와 숫자를 모두 포함하고 6자 이상인 비밀번호 생성 성공")
    @Test
    void createPassword_containSpecialCharacter() {
        assertThatCode(() -> new Password("password1234!@"))
                .doesNotThrowAnyException();
    }

    @DisplayName("비밀번호 생성 실패 : null일 경우")
    @Test
    void createPassword_null_exception() {
        assertThatThrownBy(() -> new Password(null))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.PASSWORD_INVALID_FORMAT.getMessage());
    }

    @DisplayName("비밀번호 생성 실패 : 영어가 포함되지 않은 경우")
    @Test
    void createPassword_notContainEnglish_exception() {
        assertThatThrownBy(() -> new Password("123456"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.PASSWORD_INVALID_FORMAT.getMessage());
    }

    @DisplayName("비밀번호 생성 실패 : 숫자가 포함되지 않은 경우")
    @Test
    void createPassword_notContainNumber_exception() {
        assertThatThrownBy(() -> new Password("password"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.PASSWORD_INVALID_FORMAT.getMessage());
    }

    @DisplayName("비밀번호 생성 실패 : 영어와 숫자가 포함되지 않은 경우")
    @Test
    void createPassword_notContainEnglishAndNumber_exception() {
        assertThatThrownBy(() -> new Password("!@#$%^"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.PASSWORD_INVALID_FORMAT.getMessage());
    }

    @DisplayName("비밀번호 생성 실패 : 길이가 6자 미만인 경우")
    @Test
    void createPassword_lessThan6_exception() {
        assertThatThrownBy(() -> new Password("pas12"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.PASSWORD_INVALID_FORMAT.getMessage());
    }

    @DisplayName("비밀번호 다름 확인: 일치하는 경우")
    @Test
    void isDifferent_false() {
        // given
        String passwordValue = "password1234";
        Password password = new Password(passwordValue);

        // when & then
        assertThat(password.isDifferent(passwordValue)).isFalse();
    }

    @DisplayName("비밀번호 다름 확인: 일치하지 않는 경우")
    @Test
    void isDifferent_true() {
        // given
        String passwordValue = "password1234";
        Password password = new Password(passwordValue);

        // when & then
        assertThat(password.isDifferent(passwordValue)).isFalse();
    }
}
