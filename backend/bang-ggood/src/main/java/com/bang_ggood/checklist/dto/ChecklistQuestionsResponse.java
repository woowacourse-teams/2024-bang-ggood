package com.bang_ggood.checklist.dto;

import com.bang_ggood.category.dto.CategoryQuestionsResponse;
import java.util.List;

public record ChecklistQuestionsResponse(List<CategoryQuestionsResponse> categories) {
}
