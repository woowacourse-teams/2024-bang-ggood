package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class QuestionTest {

    @DisplayName("질문 ID가 고유한 값인 확인")
    @Test
    void questionId_unique() {
        // given & when
        List<Integer> questionIds = Arrays.stream(Question.values())
                .map(Question::getId)
                .toList();

        Set<Integer> setQuestionIds = new HashSet<>(questionIds);

        // then
        assertThat(questionIds).hasSize(setQuestionIds.size());
    }

    @DisplayName("질문 아이디를 통해 질문 찾기 성공")
    @Test
    void fromId() {
        //given
        int questionId = Question.BATHROOM_1.getId();

        //when
        Question question = Question.fromId(questionId);

        //then
        assertThat(question).isEqualTo(Question.BATHROOM_1);
    }

    @DisplayName("질문 아이디를 통해 질문 찾기 실패 : 유효하지 않은 질문 아이디일 경우")
    @Test
    void fromId_invalidQuestion_exception() {
        //given
        int questionId = Integer.MAX_VALUE;

        //when & then
        assertThatThrownBy(() -> Question.fromId(questionId))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }

    @DisplayName("질문 아이디를 통해 포함되어 있는지 확인 성공 : 포함일 경우")
    @Test
    void contains_true() {
        //given
        int questionId = Question.ROOM_CONDITION_1.getId();

        //when & then
        assertThat(Question.contains(questionId)).isTrue();
    }

    @DisplayName("질문 아이디를 통해 포함되어 있는지 확인 성공 : 포함이 아닐 경우")
    @Test
    void contains_false() {
        //given
        int questionId = Integer.MAX_VALUE;

        //when & then
        assertThat(Question.contains(questionId)).isFalse();
    }
}
