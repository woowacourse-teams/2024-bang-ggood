package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Question;

public class CustomChecklistQuestionResponse extends QuestionResponse {

    private final boolean isSelected;

    public CustomChecklistQuestionResponse(Question question, boolean isSelected) {
        super(question);
        this.isSelected = isSelected;
    }

    public boolean getIsSelected() {
        return isSelected;
    }
}
