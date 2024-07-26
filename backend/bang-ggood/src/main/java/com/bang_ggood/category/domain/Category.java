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

    CLEAN(1, "청결", Badge.CLEAN, new LinkedHashSet<>(List.of(1, 2, 3, 4, 5))),
    ROOM_CONDITION(2, "방 컨디션", Badge.ROOM_CONDITION, new LinkedHashSet<>(List.of(6, 7, 8, 9, 10, 11))),
    AMENITY(3, "편의시설", Badge.AMENITY, new LinkedHashSet<>(List.of(12, 13, 14))),
    OPTION(4, "옵션", Badge.OPTION, new LinkedHashSet<>(List.of(15, 16))),
    ENVIRONMENT(5, "주거환경", Badge.ENVIRONMENT, new LinkedHashSet<>(List.of(17, 18, 19, 20, 21, 22))),
    SECURITY(6, "보안", Badge.SECURITY, new LinkedHashSet<>(List.of(23, 24, 25, 26, 27, 28, 29, 30))),
    ECONOMIC(7, "경제적", Badge.ECONOMIC, new LinkedHashSet<>(List.of(31, 32)));

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

    // 2. 뱃지 부여
    public static List<Badge> getBadges(List<ChecklistQuestion> questions) {
        return Arrays.stream(values())
                .filter(category -> category.calculateTotalScore(questions) >= 80)
                .map(Category::getBadge)
                .toList();
    }

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

    private List<ChecklistQuestion> filterQuestion(List<ChecklistQuestion> questions) {
        return questions.stream()
                .filter(checklistQuestion -> questionIds.contains(checklistQuestion.getQuestionId()))
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

    public Set<Integer> getQuestionIds() {
        return questionIds;
    }
}
