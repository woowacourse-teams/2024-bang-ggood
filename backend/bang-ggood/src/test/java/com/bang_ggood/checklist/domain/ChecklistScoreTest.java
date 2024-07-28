package com.bang_ggood.checklist.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.List;

import static com.bang_ggood.category.domain.Category.AMENITY;
import static com.bang_ggood.category.domain.Category.ECONOMIC;
import static org.assertj.core.api.Assertions.assertThat;

class ChecklistScoreTest {

    @DisplayName("체크리스트 총점 계산")
    @Test
    void calculateTotalScore() {
        // given
        List<ChecklistQuestion> questions = List.of(
                // 청결
                new ChecklistQuestion(null, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_2, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_3, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_4, Grade.SOSO),
                new ChecklistQuestion(null, Question.CLEAN_5, Grade.BAD),

                // 편의시설
                new ChecklistQuestion(null, Question.AMENITY_12, Grade.SOSO),
                new ChecklistQuestion(null, Question.AMENITY_13, Grade.SOSO),
                new ChecklistQuestion(null, Question.AMENITY_14, Grade.GOOD));

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
                new ChecklistQuestion(null, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_2, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_3, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_4, Grade.SOSO),
                new ChecklistQuestion(null, Question.CLEAN_5, Grade.BAD),

                // 편의시설
                new ChecklistQuestion(null, Question.AMENITY_12, Grade.SOSO),
                new ChecklistQuestion(null, Question.AMENITY_13, Grade.SOSO),
                new ChecklistQuestion(null, Question.AMENITY_14, Grade.GOOD));

        // when
        int totalScore = ChecklistScore.calculateCategoryScore(AMENITY, questions);

        // then
        assertThat(totalScore).isEqualTo(7);
    }

    @DisplayName("카테고리별 총점 계산 : 질문이 없는 경우")
    @Test
    void calculateCategoryScore0() {
        // given
        List<ChecklistQuestion> questions = List.of(
                // 청결
                new ChecklistQuestion(null, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_2, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_3, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_4, Grade.SOSO),
                new ChecklistQuestion(null, Question.CLEAN_5, Grade.BAD),

                // 편의시설
                new ChecklistQuestion(null, Question.AMENITY_12, Grade.SOSO),
                new ChecklistQuestion(null, Question.AMENITY_13, Grade.SOSO),
                new ChecklistQuestion(null, Question.AMENITY_14, Grade.GOOD));
        // when
        int totalScore = ChecklistScore.calculateCategoryScore(ECONOMIC, questions);

        // then
        assertThat(totalScore).isEqualTo(0);
    }
}
