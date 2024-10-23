package com.bang_ggood.question.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.user.UserFixture;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

class CategoryRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @DisplayName("카테고리 조회 성공 : 커스텀 체크리스트 카테고리 조회")
    @Test
    void findAllById() {
        //given
        int expectedCategory = 2;
        CustomChecklistQuestion customChecklistQuestion1 = new CustomChecklistQuestion(
                UserFixture.USER1,
                QuestionFixture.QUESTION1_CATEGORY1);
        CustomChecklistQuestion customChecklistQuestion2 = new CustomChecklistQuestion(
                UserFixture.USER1,
                QuestionFixture.QUESTION2_CATEGORY1);
        CustomChecklistQuestion customChecklistQuestion3 = new CustomChecklistQuestion(
                UserFixture.USER1,
                QuestionFixture.QUESTION3_CATEGORY2);
        customChecklistQuestionRepository.saveAll(List.of(customChecklistQuestion1, customChecklistQuestion2, customChecklistQuestion3));

        // when
        List<Category> categories = categoryRepository.findAllCustomQuestionCategoriesByUserId(UserFixture.USER1.getId());

        // then
        Assertions.assertThat(categories)
                .hasSize(expectedCategory)
                .containsOnly(QuestionFixture.CATEGORY1, QuestionFixture.CATEGORY2);
    }
}
