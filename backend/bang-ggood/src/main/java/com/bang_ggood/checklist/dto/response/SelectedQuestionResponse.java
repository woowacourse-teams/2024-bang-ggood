package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.ChecklistQuestion;

public record SelectedQuestionResponse(Integer questionId, String title, String subtitle, String grade) {

    public static SelectedQuestionResponse of(ChecklistQuestion checklistQuestion) {
        return new SelectedQuestionResponse(
                checklistQuestion.getQuestion().getId(),
                checklistQuestion.getQuestion().getTitle(),
                checklistQuestion.getQuestion().getSubtitle(),
                checklistQuestion.getGrade().name()
        );
    }
}
