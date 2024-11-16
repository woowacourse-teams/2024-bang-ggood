package com.bang_ggood.question.dto.response;

import java.util.List;

public record ComparisonCategoryChecklistQuestionsResponse(ComparisonCategoryChecklistQuestionResponse questions) {

    public static ComparisonCategoryChecklistQuestionsResponse of(List<QuestionResponse> good,
                                                                  List<QuestionResponse> bad,
                                                                  List<QuestionResponse> none){
        return new ComparisonCategoryChecklistQuestionsResponse(new ComparisonCategoryChecklistQuestionResponse(good, bad, none));
    }
}
