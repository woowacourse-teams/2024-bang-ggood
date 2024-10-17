package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.CategoryEntity;
import java.util.List;

public record CategoryQuestionsResponse(Integer categoryId, String categoryName, List<QuestionResponse> questions) {

    public static CategoryQuestionsResponse of(CategoryEntity category, List<QuestionResponse> questions) {
        return new CategoryQuestionsResponse(category.getId(), category.getName(), questions);
    }
}
