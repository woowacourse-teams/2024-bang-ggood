package com.bang_ggood.room.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class RoomServiceTest extends IntegrationTestSupport {

    @Autowired
    private RoomService roomService;

    @DisplayName("방 작성 성공")
    @Test
    void createRoom() {
        //given
        Room room = RoomFixture.ROOM_1;

        //when
        Room savedRoom = roomService.createRoom(room);

        //then
        assertThat(savedRoom)
                .usingRecursiveComparison()
                .ignoringFields("id")
                .isEqualTo(room);
    }
}
