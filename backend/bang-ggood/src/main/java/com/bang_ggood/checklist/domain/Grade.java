package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;
import java.util.List;

public enum Grade {

    GOOD(3),
    SOSO(2),
    BAD(1),
    NONE(0)
    ;

    private final int score;

    Grade(int score) {
        this.score = score;
    }

    public static Grade from(String grade) {
        return Arrays.stream(Grade.values())
                .filter(value -> value.name().equals(grade))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.GRADE_INVALID));
    }

    public static int calculateMaxScore(int size) {
        return GOOD.score * size;
    }

    public static int calculateTotalScore(List<ChecklistQuestion> questions) {
        return questions.stream()
                .mapToInt(question -> question.getGrade().score)
                .sum();
    }
}
