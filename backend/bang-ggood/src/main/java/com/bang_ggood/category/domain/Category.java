package com.bang_ggood.category.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;

import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

public enum Category {

    CLEAN(1, "청결", Badge.CLEAN),
    ROOM_CONDITION(2, "방 컨디션", Badge.ROOM_CONDITION),
    AMENITY(3, "편의시설", Badge.AMENITY),
    OPTION(4, "옵션", Badge.OPTION),
    ENVIRONMENT(5, "주거환경", Badge.ENVIRONMENT),
    SECURITY(6, "보안", Badge.SECURITY),
    ECONOMIC(7, "경제적", Badge.ECONOMIC);

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


    /*
    // 2. 뱃지 부여
    public static List<Badge> getBadges(List<ChecklistQuestion> questions) {
        return Arrays.stream(values())
                .filter(category -> category.calculateTotalScore(questions) >= 80)
                .map(Category::getBadge)
                .toList();
    }
     */

    /*
    // 1. 총점 : score * 100 / maxScore
    public int calculateTotalScore(List<ChecklistQuestion> questions) {
        List<ChecklistQuestion> filteredQuestions = filterQuestion(questions);

        if (filteredQuestions.isEmpty()) {
            return 0;
        }

        int maxScore = Grade.calculateMaxScore(filteredQuestions.size());
        int score = filteredQuestions.stream()
                .mapToInt(question -> Grade.getScore(question.getAnswer()))
                .sum();

        return score * 100 / maxScore;
    }
     */

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
