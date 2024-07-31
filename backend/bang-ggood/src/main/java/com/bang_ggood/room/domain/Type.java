package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum Type {

    VILLA("빌라"),
    OFFICETEL("오피스텔"),
    APARTMENT("아파트"),
    OTHER("기타");

    private final String name;

    Type(String name) {
        this.name = name;
    }

    public static Type from(String name) {
        return Arrays.stream(Type.values())
                .filter(value -> value.name.equals(name))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.TYPE_INVALID));
    }
}
