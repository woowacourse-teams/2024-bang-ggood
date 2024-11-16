package com.bang_ggood.question.dto.response;

import java.util.List;

public record ComparisonCategoryChecklistQuestionResponse(List<QuestionResponse> good,
                                                          List<QuestionResponse> bad,
                                                          List<QuestionResponse> none) {
    public static ComparisonCategoryChecklistQuestionResponse of(List<QuestionResponse> good,
                                                                 List<QuestionResponse> bad,
                                                                 List<QuestionResponse> none) {
        return new ComparisonCategoryChecklistQuestionResponse(good, bad, none);
    }
}
