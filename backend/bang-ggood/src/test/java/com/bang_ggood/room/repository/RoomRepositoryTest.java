package com.bang_ggood.room.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.repository.RoomRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class RoomRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;


    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1());
    }


    @DisplayName("방 논리적 삭제 성공")
    @Test
    void deleteById() {
        //given
        Room saved = roomRepository.save(RoomFixture.ROOM_1());

        //when
        roomRepository.deleteById(saved.getId());

        //then
        assertAll(
                () -> assertThat(roomRepository.existsById(saved.getId())).isTrue(),
                () -> assertThat(roomRepository.findById(saved.getId()).get().isDeleted()).isTrue()
        );
    }
}
