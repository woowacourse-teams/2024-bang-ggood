package com.bang_ggood.category.dto.response;

import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.dto.response.WrittenQuestionResponse;
import java.util.List;

public record WrittenCategoryQuestionsResponse(Integer categoryId, String categoryName,
                                               List<WrittenQuestionResponse> questions) {

    public static WrittenCategoryQuestionsResponse of(Category category, List<WrittenQuestionResponse> questions) {
        return new WrittenCategoryQuestionsResponse(
                category.getId(),
                category.getName(),
                questions
        );
    }
}
