package com.bang_ggood.category.domain;

import java.util.Arrays;

public enum Category {

    CLEAN(1, "청결"),
    ROOM_CONDITION(2, "방 컨디션"),
    AMENITY(3, "편의시설"),
    OPTION(4, "옵션"),
    ENVIRONMENT(5, "주거환경"),
    SECURITY(6, "보안"),
    ECONOMIC(7, "경제적");

    private final int id;
    private final String description;

    Category(int id, String description) {
        this.id = id;
        this.description = description;
    }

    public static boolean contains(int id) {
        return Arrays.stream(values())
                .anyMatch(category -> category.id == id);
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }
}
