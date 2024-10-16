package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.CategoryEntity;
import java.util.List;

public record SelectedCategoryQuestionsResponse(Integer categoryId, String categoryName,
                                                List<SelectedQuestionResponse> questions) {

    public static SelectedCategoryQuestionsResponse of(CategoryEntity category, List<SelectedQuestionResponse> questions) {
        return new SelectedCategoryQuestionsResponse(
                category.getId(),
                category.getName(),
                questions
        );
    }
}
