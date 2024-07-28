package com.bang_ggood.checklist.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.List;

import static com.bang_ggood.category.domain.Category.AMENITY;
import static com.bang_ggood.category.domain.Category.ECONOMIC;
import static org.assertj.core.api.Assertions.assertThat;

class ChecklistScoreTest {

    private static final Questionlist questionList = new Questionlist();

    @DisplayName("체크리스트 총점 계산")
    @Test
    void calculateTotalScore() {
        // given
        List<ChecklistQuestion> questions = List.of(
                // 청결
                new ChecklistQuestion(null, 1, "GOOD"),
                new ChecklistQuestion(null, 2, "GOOD"),
                new ChecklistQuestion(null, 3, "GOOD"),
                new ChecklistQuestion(null, 4, "SOSO"),
                new ChecklistQuestion(null, 5, "BAD"),

                // 편의시설
                new ChecklistQuestion(null, 12, "SOSO"),
                new ChecklistQuestion(null, 13, "SOSO"),
                new ChecklistQuestion(null, 14, "GOOD"));

        // when
        int totalScore = ChecklistScore.calculateTotalScore(questions);

        // then
        assertThat(totalScore).isEqualTo(19 * 100 / 24);
    }

    @DisplayName("카테고리별 총점 계산")
    @Test
    void calculateCategoryScore() {
        // given
        List<ChecklistQuestion> questions = List.of(
                // 청결
                new ChecklistQuestion(null, 1, "GOOD"),
                new ChecklistQuestion(null, 2, "GOOD"),
                new ChecklistQuestion(null, 3, "GOOD"),
                new ChecklistQuestion(null, 4, "SOSO"),
                new ChecklistQuestion(null, 5, "BAD"),

                // 편의시설
                new ChecklistQuestion(null, 12, "SOSO"),
                new ChecklistQuestion(null, 13, "SOSO"),
                new ChecklistQuestion(null, 14, "GOOD"));

        // when
        int totalScore = ChecklistScore.calculateCategoryScore(AMENITY, questionList, questions);

        // then
        assertThat(totalScore).isEqualTo(7);
    }

    @DisplayName("카테고리별 총점 계산 : 질문이 없는 경우")
    @Test
    void calculateCategoryScore0() {
        // given
        List<ChecklistQuestion> questions = List.of(
                // 청결
                new ChecklistQuestion(null, 1, "GOOD"),
                new ChecklistQuestion(null, 2, "GOOD"),
                new ChecklistQuestion(null, 3, "GOOD"),
                new ChecklistQuestion(null, 4, "SOSO"),
                new ChecklistQuestion(null, 5, "BAD"),

                // 편의시설
                new ChecklistQuestion(null, 12, "SOSO"),
                new ChecklistQuestion(null, 13, "SOSO"),
                new ChecklistQuestion(null, 14, "GOOD"));

        // when
        int totalScore = ChecklistScore.calculateCategoryScore(ECONOMIC, questionList, questions);

        // then
        assertThat(totalScore).isEqualTo(0);
    }
}
