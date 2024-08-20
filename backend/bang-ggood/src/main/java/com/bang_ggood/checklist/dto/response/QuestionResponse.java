package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Question;

public class QuestionResponse {

    private final Integer questionId;
    private final String title;
    private final String subtitle;

    public QuestionResponse(Question question) {
        this.questionId = question.getId();
        this.title = question.getTitle();
        this.subtitle = question.getSubtitle();
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }
}
