package com.bang_ggood.question.domain;

import java.util.List;

public class ChecklistQuestions {

    private final List<ChecklistQuestion> questions;

    public ChecklistQuestions(List<ChecklistQuestion> questions) {
        this.questions = questions;
    }

    public List<ChecklistQuestion> filterByAnswer(Answer answer) {
        return questions.stream()
                .filter(question -> question.matchAnswer(answer))
                .toList();
    }

    public int size() {
        return questions.size();
    }
}
