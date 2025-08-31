package com.bang_ggood.checklist.domain;

import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.UserFixture;
import org.assertj.core.api.Assertions;
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
                () -> new Checklist(UserFixture.USER1(), BuildingFixture.BUILDING_1(),
                        "살기 좋은 방", FloorLevel.GROUND, 3, Structure.TWO_ROOM, 3.5,
                        1000, 20, 10, 12,
                        OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY, "공인중개사", memo, "요약")
        )
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_MEMO_INVALID_LENGTH.getMessage());
    }

    @DisplayName("체크리스트가 유저가 작성한 것인지 판별 성공 : 유저가 작성한 경우")
    @Test
    void isOwnedBy_true() {
        //given
        Building building = BuildingFixture.BUILDING_1();
        Checklist checklist = ChecklistFixture.CHECKLIST1_WITH_USER1_ID(building);

        //when & then
        Assertions.assertThat(checklist.isOwnedBy(UserFixture.USER1_WITH_ID())).isTrue();
    }

    @DisplayName("체크리스트가 유저가 작성한 것인지 판별 성공 : 유저가 작성하지 않은 경우")
    @Test
    void isOwnedBy_false() {
        //given
        Building building = BuildingFixture.BUILDING_1();
        Checklist checklist = ChecklistFixture.CHECKLIST1_WITH_USER1_ID(building);

        //when & then
        Assertions.assertThat(checklist.isOwnedBy(UserFixture.USER2_WITH_ID())).isFalse();
    }

    @DisplayName("체크리스트 생성 실패 : 지상층이 아닌데 floor를 입력했을 경우")
    @Test
    void createChecklist_floorAndLevelInvalid_exception() {
        //given & when & then
        assertThatThrownBy(() -> {
            new Checklist(UserFixture.USER1(), BuildingFixture.BUILDING_1(),
                    "방이름", FloorLevel.BASEMENT, 10, Structure.TWO_ROOM, 7.5,
                    1000, 20, 10, 12,
                    OccupancyMonth.OCTOBER, OccupancyPeriod.EARLY, "공인중개사", "메모", "요약"
            );
        })
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_FLOOR_AND_LEVEL_INVALID.getMessage());
    }
}
