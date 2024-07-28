package com.bang_ggood.checklist.dto;

import com.bang_ggood.checklist.domain.ChecklistQuestion;

public record WrittenQuestionResponse(Integer questionId, String title, String subtitle, String answer) {

    public static WrittenQuestionResponse of(ChecklistQuestion checklistQuestion) {
        return new WrittenQuestionResponse(
                checklistQuestion.getQuestion().getId(),
                checklistQuestion.getQuestion().getTitle(),
                checklistQuestion.getQuestion().getSubtitle(),
                checklistQuestion.getGrade().name()
        );
    }
}
