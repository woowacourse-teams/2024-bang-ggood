package com.bang_ggood.checklist.dto;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Question;

public record WrittenQuestionResponse(Integer questionId, String title, String subtitle, String answer) {

    public static WrittenQuestionResponse of(ChecklistQuestion checklistQuestion) {
        Question question = checklistQuestion.getQuestion();

        return new WrittenQuestionResponse(
                question.getId(),
                question.getTitle(),
                question.getSubtitle(),
                checklistQuestion.getGrade().getAnswer()
        );
    }
}
