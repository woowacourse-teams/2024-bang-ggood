package com.bang_ggood.checklist.dto;

import com.bang_ggood.category.domain.Badge;
import com.bang_ggood.checklist.domain.Question;

public record QuestionResponse(Integer questionId, String title, String subtitle) {

    public static QuestionResponse of(Question question) {
        return new QuestionResponse(question.getId(), question.getTitle(), question.getSubtitle());
    }
}
