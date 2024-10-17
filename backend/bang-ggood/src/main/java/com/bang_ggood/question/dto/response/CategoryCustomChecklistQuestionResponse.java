package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.CategoryEntity;
import java.util.List;

public record CategoryCustomChecklistQuestionResponse(Integer categoryId, String categoryName,
                                                      List<CustomChecklistQuestionResponse> questions) {

    public static CategoryCustomChecklistQuestionResponse of(CategoryEntity category,
                                                             List<CustomChecklistQuestionResponse> questions) {
        return new CategoryCustomChecklistQuestionResponse(category.getId(), category.getName(), questions);
    }
}
