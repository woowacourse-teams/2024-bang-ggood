package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Question;

public record QuestionResponse(Integer questionId, String title, String subtitle) {

    public static QuestionResponse from(Question question) {
        return new QuestionResponse(question.getId(), question.getTitle(), question.getSubtitle());
    }
}
