package com.bang_ggood.category.domain;

public enum Category {

    ROOM_CONDITION(1, "방 컨디션"),
    WINDOW(2, "창문"),
    BATHROOM(3, "화장실"),
    SECURITY(4, "보안");

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
