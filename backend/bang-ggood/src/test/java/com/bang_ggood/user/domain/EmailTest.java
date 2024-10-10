package com.bang_ggood.user.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class EmailTest {

    @DisplayName("이메일 형식에 맞는 이메일 생성 성공")
    @Test
    void createEmail() {
        assertThatCode(() -> new Email("abc@gmail.com"))
                .doesNotThrowAnyException();
    }

    @DisplayName("서브 도메인 존재할 시 이메일 생성 성공")
    @Test
    void createEmail_subDomain() {
        assertThatCode(() -> new Email("abc@mail.gmail.com"))
                .doesNotThrowAnyException();
    }

    @DisplayName("이메일 생성 실패 : local-part가 존재하지 않는 경우")
    @Test
    void createPassword_emptyLocalPart_exception() {
        assertThatThrownBy(() -> new Email("@gmail.com"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.EMAIL_INVALID_FORMAT.getMessage());
    }

    @DisplayName("이메일 생성 실패 : 2차 도메인이 존재하지 않는 경우")
    @Test
    void createPassword_emptySecondLevelDomain_exception() {
        assertThatThrownBy(() -> new Email("abc@.com"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.EMAIL_INVALID_FORMAT.getMessage());
    }

    @DisplayName("이메일 생성 실패 : 최상위 도메인이 존재하지 않는 경우")
    @Test
    void createPassword_emptyTopLevelDomain_exception() {
        assertThatThrownBy(() -> new Email("abc@gmail"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.EMAIL_INVALID_FORMAT.getMessage());
    }

    @DisplayName("이메일 생성 실패 : 최상위 도메인이 한글자인 경우")
    @Test
    void createPassword_oneWordTopLevelDomain_exception() {
        assertThatThrownBy(() -> new Email("abc@gmail.g"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.EMAIL_INVALID_FORMAT.getMessage());
    }

    @DisplayName("이메일 생성 실패 : 공백이 포함된 경우")
    @Test
    void createPassword_withWhitespace_exception() {
        assertThatThrownBy(() -> new Email("abc @gmail.com"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.EMAIL_INVALID_FORMAT.getMessage());
    }
}
