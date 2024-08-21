package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.ChecklistQuestion;

public class SelectedQuestionResponse extends QuestionResponse {

    private final String answer;

    public SelectedQuestionResponse(ChecklistQuestion checklistQuestion) {
        super(checklistQuestion.getQuestion());
        this.answer = checklistQuestion.getAnswer().name();
    }

    public String getAnswer() {
        return answer;
    }
}
