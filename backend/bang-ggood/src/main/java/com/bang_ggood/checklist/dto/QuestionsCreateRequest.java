package com.bang_ggood.checklist.dto;

import java.util.List;

public record QuestionsCreateRequest(List<QuestionCreateRequest> questions) {
}
