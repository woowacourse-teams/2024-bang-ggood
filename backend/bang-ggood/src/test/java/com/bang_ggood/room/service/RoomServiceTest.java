package com.bang_ggood.room.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.repository.RoomRepository;
import com.bang_ggood.checklist.service.RoomService;
import com.bang_ggood.room.RoomFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertAll;

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

    @DisplayName("방 수정 성공")
    @Test
    void updateRoom() {
        // given
        Room room = RoomFixture.ROOM_1();
        Room updateRoom = RoomFixture.ROOM_2();
        roomService.createRoom(room);

        // when
        roomService.updateRoom(room, updateRoom);

        // then
        assertAll(
                () -> assertThat(room.getName()).isEqualTo(updateRoom.getName()),
                () -> assertThat(room.getAddress()).isEqualTo(updateRoom.getAddress()),
                () -> assertThat(room.getBuildingName()).isEqualTo(updateRoom.getBuildingName())
        );
    }
}
