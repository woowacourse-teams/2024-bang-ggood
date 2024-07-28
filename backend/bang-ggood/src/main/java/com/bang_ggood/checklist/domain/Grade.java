package com.bang_ggood.checklist.domain;

import java.util.Arrays;

public enum Grade {

    GOOD(3, "GOOD"),
    SOSO(2, "SOSO"),
    BAD(1, "BAD"),
    NONE(0, null);

    private final int score;
    private final String answer;

    Grade(int score, String answer) {
        this.score = score;
        this.answer = answer;
    }

    public static int calculateMaxScore(int size) {
        return GOOD.score * size;
    }

    public static Grade getInstance(String name) {
        return Arrays.stream(values())
                .filter(grade -> grade.name().equals(name))
                .findAny()
                .orElse(NONE);
    }

    public int getScore() {
        return score;
    }

    public String getAnswer() {
        return answer;
    }
}
