package com.bang_ggood.question.domain;

import java.util.List;

public class QuestionsScoreCalculator {

    private static final int NO_QUESTIONS_ANSWERED = 0;
    private static final int PERCENT = 100;

    private final ChecklistQuestions allAnsweredQuestions;
    private final ChecklistQuestions goodAnsweredQuestions;

    public QuestionsScoreCalculator(List<ChecklistQuestion> questions) {
        this.allAnsweredQuestions = new ChecklistQuestions(questions);
        this.goodAnsweredQuestions = new ChecklistQuestions(allAnsweredQuestions.filterByAnswer(Answer.GOOD));
    }

    public Integer calculateScore() {
        int allAnsweredQuestionCount = allAnsweredQuestions.size();
        int goodAnsweredQuestionCount = goodAnsweredQuestions.size();

        if (allAnsweredQuestionCount == NO_QUESTIONS_ANSWERED) {
            return null;
        }

        double score = ((double) goodAnsweredQuestionCount / allAnsweredQuestionCount) * PERCENT;
        return (int) Math.round(score);
    }
}
