package com.bang_ggood.category.domain;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.util.List;

class CategoryTest {

    @DisplayName("뱃지 부여 : 카테고리 총점이 80점 이상일 때")
    @Test
    void getBadges() {
        // given

        // 청결
        List<ChecklistQuestion> questions = List.of(new ChecklistQuestion(null, 1, "GOOD"),
                new ChecklistQuestion(null, 2, "GOOD"),
                new ChecklistQuestion(null, 3, "GOOD"),
                new ChecklistQuestion(null, 4, "SOSO"),
                new ChecklistQuestion(null, 5, "BAD"));

        // when
        List<Badge> badges = Category.getBadges(questions);

        // then
        Assertions.assertThat(badges).containsExactly(Badge.CLEAN);
    }

    @DisplayName("뱃지 미부여 : 카테고리 총점이 80점 미만일 때")
    @Test
    void getBadges_NoBadges() {
        // given

        // 청결
        List<ChecklistQuestion> questions = List.of(new ChecklistQuestion(null, 1, "GOOD"),
                new ChecklistQuestion(null, 2, "GOOD"),
                new ChecklistQuestion(null, 3, "GOOD"),
                new ChecklistQuestion(null, 4, "BAD"),
                new ChecklistQuestion(null, 5, "BAD"));

        // when
        List<Badge> badges = Category.getBadges(questions);

        // then
        Assertions.assertThat(badges).isEmpty();
    }
}
