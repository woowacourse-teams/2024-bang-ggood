package com.bang_ggood.question.domain;

import com.bang_ggood.checklist.ChecklistFixture;
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
        ChecklistQuestion checklistQuestion1 = ChecklistFixture.CHECKLIST_QUESTION_1(
                ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistQuestion checklistQuestion2 = ChecklistFixture.CHECKLIST_QUESTION_2(
                ChecklistFixture.CHECKLIST1_USER1(room, user));

        //when & then
        assertThat(checklistQuestion1.isDifferentQuestionId(checklistQuestion2)).isTrue();
    }

    @DisplayName("체크리스트 내에서 질문끼리 다른 id를 갖고 있는지 확인 성공 : 같은 id일 경우")
    @Test
    void isDifferentQuestionId_false() {
        //given
        Room room = RoomFixture.ROOM_1();
        User user = UserFixture.USER1();
        ChecklistQuestion checklistQuestion = ChecklistFixture.CHECKLIST_QUESTION_1(
                ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistQuestion compareChecklistQuestion = ChecklistFixture.CHECKLIST_QUESTION_1(
                ChecklistFixture.CHECKLIST1_USER1(room, user));

        //when & then
        assertThat(checklistQuestion.isDifferentQuestionId(compareChecklistQuestion)).isFalse();
    }

}
