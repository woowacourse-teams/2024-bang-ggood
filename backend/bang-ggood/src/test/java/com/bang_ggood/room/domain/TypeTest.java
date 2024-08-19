package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class TypeTest {

    @DisplayName("name으로 Type 생성 성공")
    @Test
    void from() {
        // given
        String name = "빌라";

        // when & then
        assertThat(Type.from(name)).isEqualTo(Type.VILLA);
    }

    @DisplayName("name으로 Type 생성 성공 : null일 경우")
    @Test
    void from_null() {
        // given
        String name = null;

        // when & then
        assertThat(Type.from(name)).isEqualTo(Type.NONE);
    }

    @DisplayName("name으로 Type 생성 실패 : 해당하지 않는 이름일 경우")
    @Test
    void from_invalidType_exception() {
        // given
        String name = "시소";

        // when & then
        assertThatThrownBy(() -> Type.from(name))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.TYPE_INVALID.getMessage());
    }
}
