package com.bang_ggood.category.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;

public enum Category {

    CLEAN(1, "청결", Badge.CLEAN, new LinkedHashSet<>(Set.of(1, 2, 3, 4, 5))),
    ROOM_CONDITION(2, "방 컨디션", Badge.ROOM_CONDITION, new LinkedHashSet<>(Set.of(6, 7, 8, 9, 10, 11))),
    AMENITY(3, "편의시설", Badge.AMENITY, new LinkedHashSet<>(Set.of(12, 13, 14))),
    OPTION(4, "옵션", Badge.OPTION, new LinkedHashSet<>(Set.of(15, 16))),
    ENVIRONMENT(5, "주거환경", Badge.ENVIRONMENT, new LinkedHashSet<>(Set.of(17, 18, 19, 20, 21, 22))),
    SECURITY(6, "보안", Badge.SECURITY, new LinkedHashSet<>(Set.of(22, 23, 24, 25, 26, 27, 28, 29, 30))),
    ECONOMIC(7, "경제적", Badge.ECONOMIC, new LinkedHashSet<>(Set.of(31, 32)));

    private final int id;
    private final String description;
    private final Badge badge;
    private final Set<Integer> questionIds;

    Category(int id, String description, Badge badge, Set<Integer> questionIds) {
        this.id = id;
        this.description = description;
        this.badge = badge;
        this.questionIds = questionIds;
    }

    public static boolean contains(int id) {
        return Arrays.stream(values())
                .anyMatch(category -> category.id == id);
    }

    //TODO 테스트해야 함
    public boolean isQuestionIn(int questionId) {
        return this.id == findIdByQuestionId(questionId);
    }

    private int findIdByQuestionId(int questionId) {
        return Arrays.stream(Category.values())
                .filter(category -> category.questionIds.contains(questionId))
                .mapToInt(category -> category.id)
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.INVALID_QUESTION));
    }

    public int getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Badge getBadge() {
        return badge;
    }

    public Set<Integer> getQuestionIds() {
        return questionIds;
    }
}
