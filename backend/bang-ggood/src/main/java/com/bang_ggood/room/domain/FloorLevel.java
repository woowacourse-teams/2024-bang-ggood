package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum FloorLevel {

    GROUND("지상"),
    BASEMENT("반지하/지하"),
    ROOFTOP("옥탑");

    private final String name;

    FloorLevel(String name) {
        this.name = name;
    }

    public static FloorLevel from(String name) {
        return Arrays.stream(FloorLevel.values())
                .filter(value -> value.name.equals(name))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.FLOOR_LEVEL_INVALID));
    }

    public String getName() {
        return name;
    }
}
