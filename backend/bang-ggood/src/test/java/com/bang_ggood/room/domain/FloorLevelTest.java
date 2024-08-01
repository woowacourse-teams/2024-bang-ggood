package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class FloorLevelTest {

    @DisplayName("층 종류 이름으로 조회 성공")
    @Test
    void fromName() {
        assertThat(FloorLevel.fromName(FloorLevel.BASEMENT.getName()))
                .isEqualTo(FloorLevel.BASEMENT);
    }

    @DisplayName("층 종류 이름으로 조회 실패 : 유효하지 않은 층 종류 이름일 경우")
    @Test
    void fromName_invalidFloorLevel_exception() {
        assertThatThrownBy(() -> FloorLevel.fromName("InvalidFloorLevel"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.FLOOR_LEVEL_INVALID_NAME.getMessage());
    }
}
