package com.bang_ggood.checklist.dto.request;

import jakarta.validation.constraints.NotNull;

public record QuestionRequest(@NotNull Integer questionId, String grade, String memo) {
}
