package com.bang_ggood.question;

import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.repository.CategoryRepository;
import com.bang_ggood.question.repository.QuestionRepository;
import com.bang_ggood.user.UserFixture;

public class QuestionFixture {

    public static Question QUESTION1_CATEGORY1;
    public static Question QUESTION2_CATEGORY1;
    public static Question QUESTION3_CATEGORY2;
    public static Question QUESTION4_CATEGORY2;
    public static Question QUESTION5_CATEGORY2;
    public static Category CATEGORY1;
    public static Category CATEGORY2;

    public static void init(CategoryRepository categoryRepository, QuestionRepository questionRepository) {
        CATEGORY1 = categoryRepository.save(new Category("방 컨디션"));
        CATEGORY2 = categoryRepository.save(new Category("창문"));
        QUESTION1_CATEGORY1 = questionRepository.save(
                new Question(CATEGORY1, UserFixture.USER1, "testTitle1", "testSubTitle1", true));
        QUESTION2_CATEGORY1 = questionRepository.save(
                new Question(CATEGORY1, UserFixture.USER1, "testTitle2", "testSubTitle2", true));
        QUESTION3_CATEGORY2 = questionRepository.save(
                new Question(CATEGORY2, UserFixture.USER1, "testTitle3", "testSubTitle3", true));
        QUESTION4_CATEGORY2 = questionRepository.save(
                new Question(CATEGORY2, UserFixture.USER1, "testTitle4", "testSubTitle3", true));
        QUESTION5_CATEGORY2 = questionRepository.save(
                new Question(CATEGORY2, UserFixture.USER1, "testTitle5", "testSubTitle3", true));
    }
}
