package com.bang_ggood.category.domain;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Question;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.List;

import static com.bang_ggood.category.domain.Category.CLEAN;
import static com.bang_ggood.category.domain.Category.SECURITY;
import static org.assertj.core.api.Assertions.assertThat;

class CategoryTest {

    @DisplayName("뱃지 부여 : 카테고리 총점이 80점 이상일 때")
    @Test
    void getBadges() {
        // given

        // 청결
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(null, Question.findById(1), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(2), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(3), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(4), Grade.SOSO),
                new ChecklistQuestion(null, Question.findById(5), Grade.BAD));

        // when
        List<Badge> badges = Category.getBadges(questions);

        // then
        assertThat(badges).containsExactly(Badge.CLEAN);
    }

    @DisplayName("뱃지 미부여 : 카테고리 총점이 80점 미만일 때")
    @Test
    void getBadges_NoBadges() {
        // given

        // 청결
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(null, Question.findById(1), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(2), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(3), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(4), Grade.BAD),
                new ChecklistQuestion(null, Question.findById(5), Grade.BAD));

        // when
        List<Badge> badges = Category.getBadges(questions);

        // then
        assertThat(badges).isEmpty();
    }

    @DisplayName("카테고리 총점수 계산 성공")
    @Test
    void calculateTotalScore() {
        // given
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(null, Question.findById(1), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(2), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(3), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(4), Grade.BAD),
                new ChecklistQuestion(null, Question.findById(5), Grade.BAD));

        // when
        int totalScore = CLEAN.calculateTotalScore(questions);

        // then
        assertThat(totalScore).isEqualTo(( 11 * 100 / 15));
    }

    @DisplayName("카테고리 총점수 계산 성공 : 해당 카테고리에 대한 답변이 없을 경우")
    @Test
    void calculateTotalScore_WhenCategoryDoesNotMatch() {
        // given
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(null, Question.findById(1), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(2), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(3), Grade.GOOD),
                new ChecklistQuestion(null, Question.findById(4), Grade.BAD),
                new ChecklistQuestion(null, Question.findById(5), Grade.BAD));

        // when
        int totalScore = SECURITY.calculateTotalScore(questions);

        // then
        assertThat(totalScore).isZero();
    }
}
