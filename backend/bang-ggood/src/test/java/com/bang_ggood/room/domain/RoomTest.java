package com.bang_ggood.room.domain;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class RoomTest {

    @DisplayName("방 생성 실패: 방이 지상층이 아닌데 floor를 입력했을 경우")
    @Test
    void createChecklist_roomFloorAndLevelInvalid_exception() {
        //given & when & then
        assertThatThrownBy(() -> {
            new Room(
                    "방이름", "잠실역", 12, "부산광역시 루터회관", Type.APARTMENT, 12,
                    10, FloorLevel.BASEMENT, Structure.TWO_ROOM
            );
        })
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.ROOM_FLOOR_AND_LEVEL_INVALID.getMessage());
    }
}
