package com.bang_ggood.checklist.domain;

import java.util.Arrays;
import java.util.List;

public enum Grade {

    GOOD(3),
    SOSO(2),
    BAD(1);

    private final int score;

    Grade(int score) {
        this.score = score;
    }

    public static int calculateMaxScore(int size) {
        return GOOD.score * size;
    }

    public static int calculateTotalScore(List<ChecklistQuestion> questions) {
        return questions.stream()
                .mapToInt(question -> getScore(question.getAnswer()))
                .sum();
    }

    public static int getScore(String answer) { //TODO null 예외처리
        return Arrays.stream(values())
                .filter(grade -> grade.name().equals(answer))
                .map(grade -> grade.score)
                .findAny()
                .orElse(0);
    }
}
