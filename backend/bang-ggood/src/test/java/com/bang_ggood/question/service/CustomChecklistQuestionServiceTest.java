package com.bang_ggood.question.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class CustomChecklistQuestionServiceTest extends IntegrationTestSupport {

    @Autowired
    private CustomChecklistQuestionService customChecklistQuestionService;

    @DisplayName("커스텀 체크리스트 질문 생성 성공")
    @Test
    void createCustomChecklistQuestionService() {
        // given
        User user = UserFixture.USER1;
        Question question = QuestionFixture.QUESTION1_CATEGORY1;
        CustomChecklistQuestion customChecklistQuestion = new CustomChecklistQuestion(user, question);

        // when
        CustomChecklistQuestion saved = customChecklistQuestionService.createCustomChecklistQuestion(
                customChecklistQuestion);

        // then
        Assertions.assertThat(saved).isEqualTo(customChecklistQuestion);
    }
}
