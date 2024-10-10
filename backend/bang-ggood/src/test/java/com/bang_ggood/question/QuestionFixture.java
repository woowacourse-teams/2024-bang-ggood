package com.bang_ggood.question;

import com.bang_ggood.question.domain.CategoryEntity;
import com.bang_ggood.question.domain.QuestionEntity;

public class QuestionFixture {

    public static QuestionEntity QUESTION1(CategoryEntity category) {
        return new QuestionEntity(category, "testTitle1", "testSubTitle1", true);
    }

    public static QuestionEntity QUESTION2(CategoryEntity category) {
        return new QuestionEntity(category, "testTitle2", "testSubTitle2", true);
    }

    public static QuestionEntity QUESTION3(CategoryEntity category) {
        return new QuestionEntity(category, "testTitle3", "testSubTitle3", true);
    }

    public static CategoryEntity CATEGORY1() {
        return new CategoryEntity("testCategory");
    }
}
