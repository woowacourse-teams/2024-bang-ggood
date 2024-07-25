package com.bang_ggood.checklist.domain;

import java.util.Arrays;

public enum Grade {

    GOOD(3),
    SOSO(2),
    BAD(1),
    NONE(0);

    private final int score;

    Grade(int score) {
        this.score = score;
    }

    public static int calculateMaxScore(int size) {
        return GOOD.score * size;
    }

    public int getScore() {
        return score;
    }

    public static Grade getInstance(String name) {
        return Arrays.stream(values())
                .filter(grade -> grade.name().equals(name))
                .findAny()
                .orElse(NONE);
    }
}
