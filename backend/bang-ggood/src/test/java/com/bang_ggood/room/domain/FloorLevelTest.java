package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FloorLevelTest {

    @DisplayName("name으로 FloorLevel 생성 성공")
    @Test
    void from() {
        // given
        String name = "반지하/지하";

        // when & then
        assertThat(FloorLevel.from(name)).isEqualTo(FloorLevel.BASEMENT);
    }

    @DisplayName("name으로 FloorLevel 생성 성공: null일 경우")
    @Test
    void from_null() {
        // given
        String name = null;

        // when & then
        assertThat(FloorLevel.from(name)).isEqualTo(FloorLevel.NONE);
    }

    @DisplayName("name으로 FloorLevel 생성 실패 : 해당하지 않는 이름일 경우")
    @Test
    void from_invalidFloorLevel_exception() {
        // given
        String name = "우주";

        // when & then
        assertThatThrownBy(() -> FloorLevel.from(name))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.FLOOR_LEVEL_INVALID.getMessage());
    }
}
