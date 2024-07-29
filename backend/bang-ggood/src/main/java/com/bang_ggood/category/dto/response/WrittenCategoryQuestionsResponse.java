package com.bang_ggood.category.dto.response;

import com.bang_ggood.checklist.dto.response.WrittenQuestionResponse;
import java.util.List;

public record WrittenCategoryQuestionsResponse(Integer categoryId, String categoryName, List<WrittenQuestionResponse> questions) {
}
