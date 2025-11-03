package com.bang_ggood.checklist.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

class StatusTest {

    @DisplayName("Status 변환 성공 : 소문자 'open' 입력 시 OPEN 반환")
    @Test
    void from_lowercaseOpen_success() {
        // when
        Status status = Status.from("open");

        // then
        assertThat(status).isEqualTo(Status.OPEN);
    }

    @DisplayName("Status 변환 성공 : 대문자 'CLOSE' 입력 시 CLOSE 반환")
    @Test
    void from_uppercaseClose_success() {
        // when
        Status status = Status.from("CLOSE");

        // then
        assertThat(status).isEqualTo(Status.CLOSE);
    }

    @DisplayName("Status 변환 실패 : null 입력 시 예외 발생")
    @Test
    void from_null_exception() {
        // when & then
        assertThatThrownBy(() -> Status.from(null))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_STATUS_INVALID.getMessage());
    }

    @DisplayName("Status 변환 실패 : 존재하지 않는 값 입력 시 예외 발생")
    @Test
    void from_invalidValue_exception() {
        // when & then
        assertThatThrownBy(() -> Status.from("invalid"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_STATUS_INVALID.getMessage());
    }
}
