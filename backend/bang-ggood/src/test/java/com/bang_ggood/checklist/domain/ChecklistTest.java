package com.bang_ggood.checklist.domain;

import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class ChecklistTest {

    @DisplayName("체크리스트가 유저가 작성한 것인지 판별 성공 : 유저가 작성한 경우")
    @Test
    void isOwnedBy_true() {
        //given
        User user = new User(1L, "방방이", "bang-bang@gmail.com");
        Checklist checklist = new Checklist(
                user,
                RoomFixture.ROOM_1,
                1000, 50, 12, "방끗공인중개사"
        );

        //when & then
        Assertions.assertThat(checklist.isOwnedBy(user)).isTrue();
    }

    @DisplayName("체크리스트가 유저가 작성한 것인지 판별 성공 : 유저가 작성하지 않은 경우")
    @Test
    void isOwnedBy() {
        //given
        User user1 = new User(1L, "방방이", "bang-bang@gmail.com");
        User user2 = new User(2L, "방방이", "bang-bang@gmail.com");
        Checklist checklist = new Checklist(
                user1,
                RoomFixture.ROOM_1,
                1000, 50, 12, "방끗공인중개사"
        );

        //when & then
        Assertions.assertThat(checklist.isOwnedBy(user2)).isFalse();
    }
}
