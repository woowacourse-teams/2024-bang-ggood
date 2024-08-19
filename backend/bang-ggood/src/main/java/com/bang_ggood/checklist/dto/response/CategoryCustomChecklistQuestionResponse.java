package com.bang_ggood.checklist.dto.response;

import java.util.List;

public record CategoryCustomChecklistQuestionResponse(Integer categoryId, String categoryName,
                                                      List<CustomChecklistQuestionResponse> questions) {
}
