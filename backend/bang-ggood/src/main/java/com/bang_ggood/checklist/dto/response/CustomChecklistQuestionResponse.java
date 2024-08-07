package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Question;

public record CustomChecklistQuestionResponse(Integer questionId, String title, String subtitle,
                                              boolean isSelected) {
    public static CustomChecklistQuestionResponse of(Question question, boolean isSelected) {
        return new CustomChecklistQuestionResponse(question.getId(), question.getTitle(), question.getSubtitle(), isSelected);
    }
}
