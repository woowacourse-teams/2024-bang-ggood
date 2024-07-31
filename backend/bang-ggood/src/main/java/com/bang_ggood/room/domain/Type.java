package com.bang_ggood.room.domain;

public enum Type {

    VILLA("빌라"),
    OFFICETEL("오피스텔"),
    APARTMENT("아파트"),
    OTHER("기타");

    private final String name;

    Type(String name) {
        this.name = name;
    }
}
