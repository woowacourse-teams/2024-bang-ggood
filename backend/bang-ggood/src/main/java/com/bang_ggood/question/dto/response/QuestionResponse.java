package com.bang_ggood.question.dto.response;

import com.bang_ggood.question.domain.Question;
import java.util.List;

public class QuestionResponse {

    private final Integer questionId;
    private final String title;
    private final String subtitle;
    private final List<String> highlights;

    public QuestionResponse(Question question) {
        this.questionId = question.getId();
        this.title = question.getTitle();
        this.subtitle = question.getSubtitle();
        this.highlights = question.getHighlights();
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

    public List<String> getHighlights() {
        return highlights;
    }
}
