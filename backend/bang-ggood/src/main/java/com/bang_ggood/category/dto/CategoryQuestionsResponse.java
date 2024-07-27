package com.bang_ggood.category.dto;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.dto.QuestionResponse;
import java.util.List;

public record CategoryQuestionsResponse(Integer categoryId, String categoryName, List<QuestionResponse> questions) {

    public static CategoryQuestionsResponse of(Category category, List<QuestionResponse> questions) {
        return new CategoryQuestionsResponse(category.getId(), category.getDescription(), questions);
    }
}
