package com.bang_ggood.question;

import com.bang_ggood.question.domain.CategoryEntity;
import com.bang_ggood.question.domain.QuestionEntity;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.QuestionRepository;

public class QuestionFixture {

    public static QuestionEntity QUESTION1_CATEGORY1;
    public static QuestionEntity QUESTION2_CATEGORY1;
    public static QuestionEntity QUESTION3_CATEGORY2;
    public static QuestionEntity QUESTION4_CATEGORY2;
    public static QuestionEntity QUESTION5_CATEGORY2;
    public static CategoryEntity CATEGORY1;
    public static CategoryEntity CATEGORY2;

    public static void init(CategoryRepository categoryRepository, QuestionRepository questionRepository) {
        CATEGORY1 = categoryRepository.save(new CategoryEntity("방 컨디션"));
        CATEGORY2 = categoryRepository.save(new CategoryEntity("창문"));
        QUESTION1_CATEGORY1 = questionRepository.save(new QuestionEntity(CATEGORY1, "testTitle1", "testSubTitle1", true));
        QUESTION2_CATEGORY1 = questionRepository.save(new QuestionEntity(CATEGORY1, "testTitle2", "testSubTitle2", true));
        QUESTION3_CATEGORY2 = questionRepository.save(new QuestionEntity(CATEGORY2, "testTitle3", "testSubTitle3", true));
        QUESTION4_CATEGORY2 = questionRepository.save(new QuestionEntity(CATEGORY2, "testTitle4", "testSubTitle3", true));
        QUESTION5_CATEGORY2 = questionRepository.save(new QuestionEntity(CATEGORY2, "testTitle5", "testSubTitle3", true));
    }
}
