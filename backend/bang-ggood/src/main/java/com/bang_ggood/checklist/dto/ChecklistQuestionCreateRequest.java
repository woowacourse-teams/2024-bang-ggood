package com.bang_ggood.checklist.dto;

import jakarta.validation.constraints.NotNull;

public record ChecklistQuestionCreateRequest(@NotNull Integer questionId, String answer) {
}
