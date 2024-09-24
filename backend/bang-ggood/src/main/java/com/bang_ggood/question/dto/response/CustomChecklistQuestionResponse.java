package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.Question;

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
