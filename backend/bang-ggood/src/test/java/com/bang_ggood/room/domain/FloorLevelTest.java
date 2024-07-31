package com.bang_ggood.room.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class FloorLevelTest {
    
    @DisplayName("name으로 FloorLevel 생성 성공")
    @Test
    void from() {
        // given
        String name = "반지하/지하";

        // when & then
        assertThat(FloorLevel.from(name)).isEqualTo(FloorLevel.BASEMENT);
    }

    @DisplayName("name으로 FloorLevel 생성 실패 : 해당하지 않는 이름일 경우")
    @Test
    void from_invalidType_exception() {
        // given
        String name = "우주";

        // when & then
        assertThatThrownBy(() -> FloorLevel.from(name))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.FLOOR_LEVEL_INVALID.getMessage());
    }

}
