package com.bang_ggood.checklist.domain;

import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.question.domain.ChecklistQuestion;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistQuestionTest {

    @DisplayName("체크리스트 내에서 질문끼리 다른 id를 갖고 있는지 확인 성공 : 다른 id일 경우")
    @Test
    void isDifferentQuestionId_true() {
        //given
        ChecklistQuestion checklistQuestion1 = ChecklistFixture.CHECKLIST_QUESTION_1;
        ChecklistQuestion checklistQuestion2 = ChecklistFixture.CHECKLIST_QUESTION_2;

        //when & then
        assertThat(checklistQuestion1.isDifferentQuestionId(checklistQuestion2)).isTrue();
    }

    @DisplayName("체크리스트 내에서 질문끼리 다른 id를 갖고 있는지 확인 성공 : 같은 id일 경우")
    @Test
    void isDifferentQuestionId_false() {
        //given
        ChecklistQuestion checklistQuestion = ChecklistFixture.CHECKLIST_QUESTION_1;
        ChecklistQuestion compareChecklistQuestion = ChecklistFixture.CHECKLIST_QUESTION_1;

        //when & then
        assertThat(checklistQuestion.isDifferentQuestionId(compareChecklistQuestion)).isFalse();
    }

}
