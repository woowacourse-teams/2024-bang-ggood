package com.bang_ggood.checklist.dto.request;

import jakarta.validation.constraints.NotNull;

public record QuestionRequest(@NotNull(message = "질문 아이디가 존재하지 않습니다.") Integer questionId, String answer) {
}
