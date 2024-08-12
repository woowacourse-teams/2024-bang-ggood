package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.UserFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChecklistTest {

    @DisplayName("체크리스트 생성 실패 : 메모가 1000자 넘을 경우")
    @Test
    void constructor_ChecklistInvalidMemoLength_exception() {
        // given
        String memo = "a".repeat(1001);

        // when & then
        assertThatThrownBy(
                () -> new Checklist(RoomFixture.ROOM_1, UserFixture.USER1, 1000, 20, 12,
                        "공인중개사", memo, "요약", OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY)
        )
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_MEMO_INVALID_LENGTH.getMessage());
    }

}
