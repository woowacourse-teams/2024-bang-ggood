package com.bang_ggood.category.domain;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static com.bang_ggood.category.domain.Badge.NONE;
import static com.bang_ggood.checklist.domain.ChecklistScore.calculateCategoryScore;

public enum Category {

    CLEAN(1, "청결", Badge.CLEAN),
    ROOM_CONDITION(2, "방 컨디션", Badge.ROOM_CONDITION),
    AMENITY(3, "편의시설", Badge.AMENITY),
    OPTION(4, "옵션", Badge.OPTION),
    ENVIRONMENT(5, "주거환경", Badge.ENVIRONMENT),
    SECURITY(6, "보안", Badge.SECURITY),
    ECONOMIC(7, "경제적", Badge.ECONOMIC);

    private final int id;
    private final String name;
    private final Badge badge;

    Category(int id, String name, Badge badge) {
        this.id = id;
        this.name = name;
        this.badge = badge;
    }

    public static boolean contains(int id) {
        return Arrays.stream(values())
                .anyMatch(category -> category.id == id);
    }

    public Badge provideBadge(List<ChecklistQuestion> questions) {
        int categoryScore = calculateCategoryScore(this, questions);

        if (categoryScore >= 8) {
            return this.badge;
        }
        return NONE;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
