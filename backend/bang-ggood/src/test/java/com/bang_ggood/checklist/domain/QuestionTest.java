package com.bang_ggood.checklist.domain;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

class QuestionTest {

    @DisplayName("특정 카테고리의 질문 찾기 성공")
    @Test
    void findQuestionsByCategory() {
        //given
        Category category = Category.CLEAN;

        //when
        List<Question> questions = Question.findQuestionsByCategory(category);

        //then
        assertAll(
                () -> assertThat(questions.size()).isEqualTo(5),
                () -> assertThat(questions.get(0).getId()).isEqualTo(1)
        );
    }

    @DisplayName("질문 아이디를 통해 질문 찾기 성공")
    @Test
    void fromId() {
        //given
        int questionId = 1;

        //when
        Question question = Question.fromId(questionId);

        //then
        assertAll(
                () -> assertThat(question.getId()).isEqualTo(questionId),
                () -> assertThat(question.getCategory()).isEqualTo(Category.CLEAN)
        );
    }

    @DisplayName("질문 아이디를 통해 질문 찾기 실패 : 유효하지 않은 질문 아이디일 경우")
    @Test
    void fromId_invalidQuestion_exception() {
        //given
        int questionId = 999;

        //when & then
        assertThatThrownBy(() -> Question.fromId(questionId))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }

    @DisplayName("질문 아이디를 통해 포함되어 있는지 확인 성공 : 포함일 경우")
    @Test
    void contains_true() {
        //given
        int questionId = 1;

        //when & then
        assertThat(Question.contains(questionId)).isTrue();
    }

    @DisplayName("질문 아이디를 통해 포함되어 있는지 확인 성공 : 포함이 아닐 경우")
    @Test
    void contains_false() {
        //given
        int questionId = 999;

        //when & then
        assertThat(Question.contains(questionId)).isFalse();
    }

}
