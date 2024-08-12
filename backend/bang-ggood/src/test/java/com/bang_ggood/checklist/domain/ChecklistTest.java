package com.bang_ggood.checklist.domain;

import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.user.UserFixture;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class ChecklistTest {

    @DisplayName("체크리스트가 유저가 작성한 것인지 판별 성공 : 유저가 작성한 경우")
    @Test
    void isOwnedBy_true() {
        //given
        Checklist checklist = ChecklistFixture.CHECKLIST1_WITH_USER1_ID;

        //when & then
        Assertions.assertThat(checklist.isOwnedBy(UserFixture.USER1_WITH_ID)).isTrue();
    }

    @DisplayName("체크리스트가 유저가 작성한 것인지 판별 성공 : 유저가 작성하지 않은 경우")
    @Test
    void isOwnedBy() {
        //given
        Checklist checklist = ChecklistFixture.CHECKLIST1_WITH_USER1_ID;

        //when & then
        Assertions.assertThat(checklist.isOwnedBy(UserFixture.USER2_WITH_ID)).isFalse();
    }
}
