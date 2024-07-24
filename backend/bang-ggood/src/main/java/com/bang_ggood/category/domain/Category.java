package com.bang_ggood.category.domain;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import java.util.Arrays;
import java.util.List;

public enum Category {

    CLEAN(1, "청결", Badge.CLEAN, List.of(1, 2, 3, 4, 5)),
    ROOM_CONDITION(2, "방 컨디션", Badge.ROOM_CONDITION, List.of(6, 7, 8, 9, 10, 11)),
    AMENITY(3, "편의시설", Badge.AMENITY, List.of(12, 13, 14)),
    OPTION(4, "옵션", Badge.OPTION, List.of(15, 16)),
    ENVIRONMENT(5, "주거환경", Badge.ENVIRONMENT, List.of(17, 18, 19, 20, 21, 22)),
    SECURITY(6, "보안", Badge.SECURITY, List.of(22, 23, 24, 25, 26, 27, 28, 29, 30)),
    ECONOMIC(7, "경제적", Badge.ECONOMIC, List.of(31, 32));

    private final int id;
    private final String description;
    private final Badge badge;
    private final List<Integer> questionIds;

    Category(int id, String description, Badge badge, List<Integer> questionIds) {
        this.id = id;
        this.description = description;
        this.badge = badge;
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

    public Badge getBadge() { return badge; }

    public static List<Badge> getBadges(List<ChecklistQuestion> questions) {
        return Arrays.stream(values())
                .filter(category -> {
                    List<Integer> questionIds = category.questionIds;
                    List<ChecklistQuestion> categoryQuestions = questions.stream()
                            .filter(checklistQuestion -> questionIds.contains(checklistQuestion.getQuestionId()))
                            .toList();

                    int maxScore = Grade.calculateMaxScore(categoryQuestions.size());
                    int score = categoryQuestions.stream()
                            .mapToInt(question -> Grade.getScore(question.getAnswer()))
                            .sum();

                    return (score / maxScore) * 100 >= 80;
                })
                .map(Category::getBadge)
                .toList();
    }
}
