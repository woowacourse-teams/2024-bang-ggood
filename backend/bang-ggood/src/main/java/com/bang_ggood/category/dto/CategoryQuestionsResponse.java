package com.bang_ggood.category.dto;

import com.bang_ggood.checklist.dto.response.QuestionResponse;
import java.util.List;

public record CategoryQuestionsResponse(Integer categoryId, String categoryName, List<QuestionResponse> questions) {
}
