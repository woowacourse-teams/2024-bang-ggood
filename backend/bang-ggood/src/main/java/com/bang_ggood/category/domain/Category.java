package com.bang_ggood.category.domain;

import java.util.Arrays;
import java.util.List;

public enum Category {

    CLEAN(1, "청결", List.of(1, 2, 3, 4, 5)),
    ROOM_CONDITION(2, "방 컨디션", List.of(6, 7, 8, 9, 10, 11)),
    AMENITY(3, "편의시설", List.of(12, 13, 14)),
    OPTION(4, "옵션", List.of(15, 16)),
    ENVIRONMENT(5, "주거환경", List.of(17, 18, 19, 20, 21, 22)),
    SECURITY(6, "보안", List.of(22, 23, 24, 25, 26, 27, 28, 29, 30)),
    ECONOMIC(7, "경제적", List.of(31, 32));

    private final int id;
    private final String description;
    private final List<Integer> questionIds;

    Category(int id, String description, List<Integer> questionIds) {
        this.id = id;
        this.description = description;
        this.questionIds = questionIds;
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

    public List<Integer> getQuestionIds() {
        return questionIds;
    }
}
