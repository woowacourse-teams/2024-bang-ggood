package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.Highlight;
import com.bang_ggood.question.domain.Question;
import java.util.List;

public class CustomChecklistQuestionResponse extends QuestionResponse {

    private final boolean isSelected;

    public CustomChecklistQuestionResponse(Question question, List<Highlight> highlights, boolean isSelected) {
        super(question, highlights);
        this.isSelected = isSelected;
    }

    public boolean getIsSelected() {
        return isSelected;
    }
}
