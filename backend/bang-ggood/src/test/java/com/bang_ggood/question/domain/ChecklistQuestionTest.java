package com.bang_ggood.question.domain;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.question.ChecklistQuestionFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistQuestionTest extends IntegrationTestSupport {

    @DisplayName("체크리스트 내에서 질문끼리 다른 id를 갖고 있는지 확인 성공 : 다른 id일 경우")
    @Test
    void isDifferentQuestionId_true() {
        //given
        User user = UserFixture.USER1();
        Building building = BuildingFixture.BUILDING_1();

        ChecklistQuestion checklistQuestion1 = ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(
                ChecklistFixture.CHECKLIST1_USER1(user, building), QuestionFixture.QUESTION1_CATEGORY1);
        ChecklistQuestion checklistQuestion2 = ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(
                ChecklistFixture.CHECKLIST1_USER1(user, building), QuestionFixture.QUESTION2_CATEGORY1);

        //when & then
        assertThat(checklistQuestion1.isDifferentQuestionId(checklistQuestion2)).isTrue();
    }

    @DisplayName("체크리스트 내에서 질문끼리 다른 id를 갖고 있는지 확인 성공 : 같은 id일 경우")
    @Test
    void isDifferentQuestionId_false() {
        //given
        User user = UserFixture.USER1();
        Building building = BuildingFixture.BUILDING_1();
        ChecklistQuestion checklistQuestion = ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(
                ChecklistFixture.CHECKLIST1_USER1(user, building), QuestionFixture.QUESTION1_CATEGORY1);
        ChecklistQuestion compareChecklistQuestion = ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(
                ChecklistFixture.CHECKLIST1_USER1(user, building), QuestionFixture.QUESTION1_CATEGORY1);

        //when & then
        assertThat(checklistQuestion.isDifferentQuestionId(compareChecklistQuestion)).isFalse();
    }
}
