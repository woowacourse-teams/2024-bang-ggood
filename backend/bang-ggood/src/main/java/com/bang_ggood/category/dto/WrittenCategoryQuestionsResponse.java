package com.bang_ggood.category.dto;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.dto.WrittenQuestionResponse;
import java.util.List;

public record WrittenCategoryQuestionsResponse(Integer categoryId, String categoryName, List<WrittenQuestionResponse> questions) {

    public static WrittenCategoryQuestionsResponse of(Category category, List<WrittenQuestionResponse> questionResponses) {
        return new WrittenCategoryQuestionsResponse(
                category.getId(),
                category.getDescription(),
                questionResponses
        );
    }
}
