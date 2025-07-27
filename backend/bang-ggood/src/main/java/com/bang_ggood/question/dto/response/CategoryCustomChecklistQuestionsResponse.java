package com.bang_ggood.question.dto.response;

import java.util.List;

public record CategoryCustomChecklistQuestionsResponse(
        List<CategoryCustomChecklistQuestionResponse> defaultCategories,
        List<CategoryCustomChecklistQuestionResponse> userCategories
) {

    public static CategoryCustomChecklistQuestionsResponse of(
            List<CategoryCustomChecklistQuestionResponse> defaultCategories,
            List<CategoryCustomChecklistQuestionResponse> userCategories
    ) {
        return new CategoryCustomChecklistQuestionsResponse(defaultCategories, userCategories);
    }
}
