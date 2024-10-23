package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.Highlight;
import com.bang_ggood.question.domain.QuestionEntity;
import java.util.List;

public class CustomChecklistQuestionResponse extends QuestionResponse {

    private final boolean isSelected;

    public CustomChecklistQuestionResponse(QuestionEntity question, List<Highlight> highlights, boolean isSelected) {
        super(question, highlights);
        this.isSelected = isSelected;
    }

    public boolean getIsSelected() {
        return isSelected;
    }
}
