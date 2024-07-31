package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;

public enum Type {

    VILLA("빌라"),
    OFFICETEL("오피스텔"),
    APARTMENT("아파트"),
    OTHER("기타");

    private final String name;

    Type(String name) {
        this.name = name;
    }

    public static Type fromName(String name) {
        for (Type type : Type.values()) {
            if (type.name.equals(name)) {
                return type;
            }
        }
        throw new BangggoodException(ExceptionCode.TYPE_INVALID_NAME);
    }

    public String getName() {
        return name;
    }
}
