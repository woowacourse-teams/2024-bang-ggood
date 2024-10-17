package com.bang_ggood.question;

import com.bang_ggood.question.domain.CategoryEntity;
import com.bang_ggood.question.domain.QuestionEntity;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.QuestionRepository;

public class QuestionFixture {

    public static QuestionEntity QUESTION1;
    public static QuestionEntity QUESTION2;
    public static CategoryEntity CATEGORY1;

    public static void init(CategoryRepository categoryRepository, QuestionRepository questionRepository) {
        CATEGORY1 = categoryRepository.save(new CategoryEntity("testCategory"));
        QUESTION1 = questionRepository.save(new QuestionEntity(CATEGORY1, "testTitle1", "testSubTitle1", true));
        QUESTION2 = questionRepository.save(new QuestionEntity(CATEGORY1, "testTitle2", "testSubTitle2", true));
    }
}
