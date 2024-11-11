package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.Category;
import java.util.List;

public record CategoryQuestionsResponse(Integer categoryId, String categoryName, List<QuestionResponse> questions) {

    public static CategoryQuestionsResponse of(Category category, List<QuestionResponse> questions) {
        return new CategoryQuestionsResponse(category.getId(), category.getName(), questions);
    }
}
