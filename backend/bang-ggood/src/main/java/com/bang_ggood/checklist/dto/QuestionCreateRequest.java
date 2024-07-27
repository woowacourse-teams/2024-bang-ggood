package com.bang_ggood.checklist.dto;

import jakarta.validation.constraints.NotNull;

public record QuestionCreateRequest(@NotNull Integer questionId, @NotNull String answer) {
}
