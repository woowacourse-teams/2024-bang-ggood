package com.bang_ggood.category.dto.response;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.dto.response.SelectedQuestionResponse;
import java.util.List;

public record SelectedCategoryQuestionsResponse(Integer categoryId, String categoryName, Integer score,
                                                List<SelectedQuestionResponse> questions) {

    public static SelectedCategoryQuestionsResponse of(Category category, Integer score,
                                                       List<SelectedQuestionResponse> questions) {
        return new SelectedCategoryQuestionsResponse(
                category.getId(),
                category.getName(),
                score,
                questions
        );
    }
}
