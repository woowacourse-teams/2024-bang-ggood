package com.bang_ggood.question.service;


import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.Question;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class QuestionServiceTest extends IntegrationTestSupport {

    @Autowired
    private QuestionService questionService;

    @DisplayName("질문 생성 성공")
    @Test
    void createQuestion() {
        // given
        Question question = QuestionFixture.QUESTION1_CATEGORY1;

        // when
        Question savedQuestion = questionService.createQuestion(question);

        // then
        Assertions.assertThat(savedQuestion).isEqualTo(question);
    }
}
