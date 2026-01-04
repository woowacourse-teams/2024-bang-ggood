package com.bang_ggood.global.domain;

import com.bang_ggood.BaseEntity;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.user.UserFixture;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.time.LocalDateTime;
import java.util.List;

class CursorResultTest {

    @DisplayName("현재 커서 반환 : 결과값이 존재하지 않는 경우")
    @Test
    void getCurrentCursor() {
        // given & then
        LocalDateTime currentCursor = LocalDateTime.now();
        CursorResult<BaseEntity> results = new CursorResult<>(currentCursor, null);

        // then
        Assertions.assertThat(results.getLastCursor()).isEqualTo(currentCursor);
    }

    @DisplayName("마지막 커서 반환 : 결과값이 존재하는 경우")
    @Test
    void getLastCursor() {
        // given & then
        LocalDateTime currentCursor = LocalDateTime.now();
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(UserFixture.USER1(), BuildingFixture.BUILDING_1());
        List<BaseEntity> item = List.of(checklist);
        CursorResult<BaseEntity> results = new CursorResult<>(currentCursor, item);

        // then
        Assertions.assertThat(results.getLastCursor()).isEqualTo(checklist.getCreatedAt());
    }
}
