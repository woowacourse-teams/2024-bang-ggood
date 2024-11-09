package com.bang_ggood.room.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class RoomTest {

    @DisplayName("방 생성 실패: 방이 지상층이 아닌데 floor를 입력했을 경우")
    @Test
    void createChecklist_roomFloorAndLevelInvalid_exception() {
        //given & when & then
        assertThatThrownBy(() -> {
            new Room(
                    "방이름", "부산광역시 북구", "루터회관", "잠실", 12,
                    FloorLevel.BASEMENT, 10, Structure.TWO_ROOM, 7.5
            );
        })
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ROOM_FLOOR_AND_LEVEL_INVALID.getMessage());
    }
}
