package com.bang_ggood.checklist.dto.request;

import jakarta.validation.constraints.NotNull;

public record QuestionCreateRequest(@NotNull Integer questionId, String answer) {
}
