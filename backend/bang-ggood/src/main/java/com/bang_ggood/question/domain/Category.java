package com.bang_ggood.question.domain;

public enum Category {

    ROOM_CONDITION(1, "방 컨디션"),
    WINDOW(2, "창문"),
    BATHROOM(3, "화장실"),
    SECURITY(4, "보안"),
    OUTSIDE(5, "외부");

    private final int id;
    private final String name;

    Category(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
