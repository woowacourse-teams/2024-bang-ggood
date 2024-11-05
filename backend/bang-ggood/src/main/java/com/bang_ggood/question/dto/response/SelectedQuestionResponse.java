package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.Highlight;
import java.util.List;

public class SelectedQuestionResponse extends QuestionResponse {

    private final String answer;

    public SelectedQuestionResponse(ChecklistQuestion checklistQuestion, List<Highlight> highlights) {
        super(checklistQuestion.getQuestion(), highlights);
        this.answer = checklistQuestion.getAnswer().name();
    }

    public String getAnswer() {
        return answer;
    }
}
