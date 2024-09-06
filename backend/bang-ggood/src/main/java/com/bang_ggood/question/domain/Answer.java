package com.bang_ggood.question.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import java.util.Arrays;

public enum Answer {

    GOOD, BAD, NONE;

    public static Answer from(String grade) {
        return Arrays.stream(Answer.values())
                .filter(value -> value.name().equals(grade))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.ANSWER_INVALID));
    }
}
