package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum Grade {

    GOOD, BAD, NONE;

    public static Grade from(String grade) {
        return Arrays.stream(Grade.values())
                .filter(value -> value.name().equals(grade))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.GRADE_INVALID));
    }
}
