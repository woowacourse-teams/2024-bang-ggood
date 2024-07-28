package com.bang_ggood.category.domain;

import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Score;

import java.util.Arrays;
import java.util.List;

public enum Category {

    CLEAN(1, "청결", Badge.CLEAN),
    ROOM_CONDITION(2, "방 컨디션", Badge.ROOM_CONDITION),
    AMENITY(3, "편의시설", Badge.AMENITY),
    OPTION(4, "옵션", Badge.OPTION),
    ENVIRONMENT(5, "주거환경", Badge.ENVIRONMENT),
    SECURITY(6, "보안", Badge.SECURITY),
    ECONOMIC(7, "경제적", Badge.ECONOMIC);

    private static final int BADGE_THRESHOLD = 80;
    private static final int MAX_SCORE = 100;

    private final int id;
    private final String description;
    private final Badge badge;

    Category(int id, String description, Badge badge) {
        this.id = id;
        this.description = description;
        this.badge = badge;
    }

    public static boolean contains(int id) {
        return Arrays.stream(values())
                .anyMatch(category -> category.id == id);
    }

    public static List<Badge> getBadges(List<ChecklistQuestion> questions) {
        return Arrays.stream(values())
                .filter(category -> category.calculateTotalScore(questions) >= BADGE_THRESHOLD)
                .map(Category::getBadge)
                .toList();
    }

    public int calculateTotalScore(List<ChecklistQuestion> questions) {
        List<ChecklistQuestion> filteredQuestions = filterQuestion(questions);

        return filteredQuestions.stream()
                .map(checklistQuestion -> Score.from(checklistQuestion.getGrade()))
                .reduce(Score::sum)
                .orElse(Score.getInstance())
                .intValue(MAX_SCORE);
    }

    private List<ChecklistQuestion> filterQuestion(List<ChecklistQuestion> checklistQuestions) {
        return checklistQuestions.stream()
                .filter(checklistQuestion -> checklistQuestion.getQuestion().isCategory(this))
                .toList();
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
}
