package com.bang_ggood.question.dto.response;

import java.util.List;

public record CategoryCustomChecklistQuestionsResponse(List<CategoryCustomChecklistQuestionResponse> categories) {

    public static CategoryCustomChecklistQuestionsResponse from(
            List<CategoryCustomChecklistQuestionResponse> categories) {
        return new CategoryCustomChecklistQuestionsResponse(categories);
    }
}
