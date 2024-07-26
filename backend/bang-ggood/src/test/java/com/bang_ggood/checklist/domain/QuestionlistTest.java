package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class QuestionlistTest {

    @DisplayName("질문 리스트 포함 성공: 포함하는 경우")
    @Test
    void contains_true() {
        assertThat(Questionlist.contains(1)).isTrue();
    }

    @DisplayName("질문 리스트 포함 성공 : 포함하지 않는 경우")
    @Test
    void contains_false() {
        assertThat(Questionlist.contains(9999)).isFalse();
    }

    @DisplayName("질문 제목 조회 성공")
    @Test
    void getTitle() {
        assertThat(Questionlist.getTitleByQuestionId(1))
                .isEqualTo("방 안에 물이 새거나 곰팡이가 핀 곳은 없나요?");
    }

    @DisplayName("질문 부제목 조회 성공")
    @Test
    void getSubtitle() {
        assertThat(Questionlist.getSubtitleByQuestionId(1))
                .isEqualTo("천장, 벽면, 가구 뒤, 장판을 확인하세요.");
    }

    @DisplayName("카테고리에 질문 포함 여부 판별 성공 : 포함하는 경우")
    @Test
    void isQuestionsInCategory_true() {
        assertThat(Questionlist.isQuestionsInCategory(1, 1))
                .isTrue();
    }

    @DisplayName("카테고리에 질문 포함 여부 판별 성공 : 포함하지 않는 경우")
    @Test
    void isQuestionsInCategory_false() {
        assertThat(Questionlist.isQuestionsInCategory(1, 2))
                .isFalse();
    }

    @DisplayName("카테고리에 질문 포함 여부 판별 실패 : 잘못된 질문 id인 경우")
    @Test
    void isQuestionsInCategory_invalidQuestion_exception() {
        assertThatThrownBy(() -> Questionlist.isQuestionsInCategory(999, 1))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.INVALID_QUESTION.getMessage());
    }

    @DisplayName("카테고리에 질문 포함 여부 판별 실패 : 존재하지 않는 카테고리 id인 경우")
    @Test
    void isQuestionsInCategory_categoryNotFound_exception() {
        assertThatThrownBy(() -> Questionlist.isQuestionsInCategory(1, 999))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CATEGORY_NOT_FOUND.getMessage());
    }

    @DisplayName("카테고리에 포함되는 질문 목록 조회 성공")
    @Test
    void getQuestionsByCategoryId() {
        assertThat(Questionlist.getQuestionsByCategoryId(1).size()).isEqualTo(5);
    }

    @DisplayName("질문 id 조회 성공")
    @Test
    void getQuestionIdByQuestion() {
        assertThat(Questionlist.getQuestionIdByQuestion(new Question(1, "방 안에 물이 새거나 곰팡이가 핀 곳은 없나요?", "천장, 벽면, 가구 뒤, 장판을 확인하세요.")))
                .isEqualTo(1);
    }

    @DisplayName("질문 id 조회 실패 : 잘못된 질문인 경우")
    @Test
    void getQuestionIdByQuestion_invalidQuestion_exception() {
        assertThatThrownBy(() -> Questionlist.getQuestionIdByQuestion(new Question(1, "wrong", null)))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.INVALID_QUESTION.getMessage());
    }
}
