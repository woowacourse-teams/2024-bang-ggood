package com.bang_ggood.checklist.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class QuestionListTest {

    private QuestionList questionList;

    @BeforeEach
    void init() {
        questionList = new QuestionList();
    }

    @DisplayName("질문 리스트 포함 성공: 포함하는 경우")
    @Test
    void contains_true() {
        assertThat(questionList.contains(1)).isTrue();
    }

    @DisplayName("질문 리스트 포함 성공 : 포함하지 않는 경우")
    @Test
    void contains_false() {
        assertThat(questionList.contains(100)).isFalse();
    }
}
