package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.category.dto.response.CategoryQuestionsResponse;
import java.util.List;

public record ChecklistQuestionsResponse(List<CategoryQuestionsResponse> categories) {
}
