package com.bang_ggood.question.dto.response;

import java.util.List;

public record ComparisonCategorizedQuestionsResponse(List<QuestionResponse> good,
                                                     List<QuestionResponse> bad,
                                                     List<QuestionResponse> none) {
    public static ComparisonCategorizedQuestionsResponse of(List<QuestionResponse> good,
                                                            List<QuestionResponse> bad,
                                                            List<QuestionResponse> none) {
        return new ComparisonCategorizedQuestionsResponse(good, bad, none);
    }
}
