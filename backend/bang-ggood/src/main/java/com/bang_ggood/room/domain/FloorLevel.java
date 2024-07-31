package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;

public enum FloorLevel {

    GROUND("지상"),
    BASEMENT("반지하/지하"),
    ROOFTOP("옥탑");

    private final String name;

    FloorLevel(String name) {
        this.name = name;
    }

    public static FloorLevel fromName(String name) {
        for (FloorLevel floorLevel : FloorLevel.values()) {
            if (floorLevel.name.equals(name)) {
                return floorLevel;
            }
        }
        throw new BangggoodException(ExceptionCode.FLOOR_LEVEL_INVALID_NAME);
    }

    public String getName() {
        return name;
    }
}
