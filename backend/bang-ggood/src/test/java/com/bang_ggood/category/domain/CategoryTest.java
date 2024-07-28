package com.bang_ggood.category.domain;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Question;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.List;

import static com.bang_ggood.category.domain.Category.CLEAN;
import static org.assertj.core.api.Assertions.assertThat;

class CategoryTest {

    @DisplayName("뱃지 부여 : 카테고리 총점이 8점 이상일 때")
    @Test
    void getBadges() {
        // given

        // 청결
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(null, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_2, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_3, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_4, Grade.SOSO),
                new ChecklistQuestion(null, Question.CLEAN_5, Grade.BAD));

        // when
        Badge badge = CLEAN.provideBadge(questions);

        // then
        assertThat(badge).isEqualTo(Badge.CLEAN);
    }

    @DisplayName("뱃지 미부여 : 카테고리 총점이 8점 미만일 때")
    @Test
    void getBadges_NoBadges() {
        // given

        // 청결
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(null, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_2, Grade.GOOD),
                new ChecklistQuestion(null, Question.CLEAN_3, Grade.BAD),
                new ChecklistQuestion(null, Question.CLEAN_4, Grade.BAD),
                new ChecklistQuestion(null, Question.CLEAN_5, Grade.BAD));

        // when
        Badge badge = CLEAN.provideBadge(questions);

        // then
        assertThat(badge).isEqualTo(Badge.NONE);
    }

//    @DisplayName("카테고리 총점수 계산 성공")
//    @Test
//    void calculateTotalScore() {
//        // given
//        List<ChecklistQuestion> questions = List.of(new ChecklistQuestion(null, 1, "GOOD"),
//                new ChecklistQuestion(null, 2, "GOOD"),
//                new ChecklistQuestion(null, 3, "GOOD"),
//                new ChecklistQuestion(null, 4, "BAD"),
//                new ChecklistQuestion(null, 5, "BAD"));
//
//        // when
//        int totalScore = CLEAN.calculateTotalScore(questionList, questions);
//
//        // then
//        assertThat(totalScore).isEqualTo(( 11 * 100 / 15));
//    }
//
//    @DisplayName("카테고리 총점수 계산 성공 : 해당 카테고리에 대한 답변이 없을 경우")
//    @Test
//    void calculateTotalScore_WhenCategoryDoesNotMatch() {
//        // given
//        List<ChecklistQuestion> questions = List.of(new ChecklistQuestion(null, 1, "GOOD"),
//                new ChecklistQuestion(null, 2, "GOOD"),
//                new ChecklistQuestion(null, 3, "GOOD"),
//                new ChecklistQuestion(null, 4, "BAD"),
//                new ChecklistQuestion(null, 5, "BAD"));
//
//        // when
//        int totalScore = SECURITY.calculateTotalScore(questionList, questions);
//
//        // then
//        assertThat(totalScore).isZero();
//    }
}
