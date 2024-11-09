package com.bang_ggood.room.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import java.util.Arrays;

public enum Structure {

    OPEN_ONE_ROOM("오픈형 원룸"),
    DIVIDED_ONE_ROOM("분리형 원룸"),
    TWO_ROOM("투룸"),
    THREE_ROOM_OR_MORE("쓰리룸 이상"),
    DUPLEX("복층"),
    NONE(null);

    private final String name;

    Structure(String name) {
        this.name = name;
    }

    public static Structure from(String name) {
        if (name == null) {
            return NONE;
        }
        return Arrays.stream(Structure.values())
                .filter(value -> value.name != null && value.name.equals(name))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.STRUCTURE_INVALID));
    }

    public String getName() {
        return name;
    }
}
