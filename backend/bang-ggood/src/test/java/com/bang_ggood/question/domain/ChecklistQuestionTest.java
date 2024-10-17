package com.bang_ggood.question.domain;

import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.question.ChecklistQuestionFixture;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistQuestionTest {

    @DisplayName("체크리스트 내에서 질문끼리 다른 id를 갖고 있는지 확인 성공 : 다른 id일 경우")
    @Test
    void isDifferentQuestionId_true() {
        //given
        Room room = RoomFixture.ROOM_1();
        User user = UserFixture.USER1();

        ChecklistQuestion checklistQuestion1 = ChecklistQuestionFixture.CHECKLIST1_QUESTION1(
                ChecklistFixture.CHECKLIST1_USER1(room, user), null);
        ChecklistQuestion checklistQuestion2 = ChecklistQuestionFixture.CHECKLIST1_QUESTION2(
                ChecklistFixture.CHECKLIST1_USER1(room, user), null);

        //when & then
        assertThat(checklistQuestion1.isDifferentQuestionId(checklistQuestion2)).isTrue();
    }

    @DisplayName("체크리스트 내에서 질문끼리 다른 id를 갖고 있는지 확인 성공 : 같은 id일 경우")
    @Test
    void isDifferentQuestionId_false() {
        //given
        Room room = RoomFixture.ROOM_1();
        User user = UserFixture.USER1();
        ChecklistQuestion checklistQuestion = ChecklistQuestionFixture.CHECKLIST1_QUESTION1(
                ChecklistFixture.CHECKLIST1_USER1(room, user), null);
        ChecklistQuestion compareChecklistQuestion = ChecklistQuestionFixture.CHECKLIST1_QUESTION1(
                ChecklistFixture.CHECKLIST1_USER1(room, user), null);

        //when & then
        assertThat(checklistQuestion.isDifferentQuestionId(compareChecklistQuestion)).isFalse();
    }

}
