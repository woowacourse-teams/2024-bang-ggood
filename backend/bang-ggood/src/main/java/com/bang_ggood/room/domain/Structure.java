package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum Structure {

    STUDIO("오픈형 원룸"),
    DIVIDED("분리형 원룸"),
    TWO_ROOM("투룸"),
    THREE_ROOM_OR_MORE("쓰리룸 이상"),
    DUPLEX("복층");

    private final String name;

    Structure(String name) {
        this.name = name;
    }

    public static Structure from(String name) {
        return Arrays.stream(Structure.values())
                .filter(value -> value.name.equals(name))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.STRUCTURE_INVALID));
    }
}
