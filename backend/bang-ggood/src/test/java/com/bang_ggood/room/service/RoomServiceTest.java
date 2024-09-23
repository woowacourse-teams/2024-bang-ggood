package com.bang_ggood.room.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class RoomServiceTest extends IntegrationTestSupport {

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomRepository roomRepository;

    @DisplayName("방 작성 성공")
    @Test
    void createRoom() {
        //given
        Room room = RoomFixture.ROOM_1();

        //when
        Room savedRoom = roomService.createRoom(room);

        //then
        assertThat(savedRoom.getName()).isEqualTo(room.getName());
    }

    @DisplayName("방 삭제 성공")
    @Test
    void deleteById() {
        //given
        Room room = RoomFixture.ROOM_1();
        Room savedRoom = roomService.createRoom(room);

        //when
        roomService.deleteById(savedRoom.getId());

        //then
        assertThat(roomRepository.findById(savedRoom.getId()).get().isDeleted()).isTrue();
    }
}
