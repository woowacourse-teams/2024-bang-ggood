package com.bang_ggood.category.domain;

import com.bang_ggood.checklist.domain.Questionlist;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.checklist.domain.ChecklistQuestion;

import java.util.Arrays;
import java.util.List;
import java.util.Set;

import static com.bang_ggood.category.domain.Badge.*;
import static com.bang_ggood.checklist.domain.Grade.*;

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

    //TODO 테스트해야 함
    public boolean isQuestionIn(Questionlist questionlist, int questionId) {
        return this.id == findIdByQuestionId(questionlist, questionId);
    }

    private int findIdByQuestionId(Questionlist questionlist, int questionId) {
        return Arrays.stream(Category.values())
                .filter(category -> questionlist.isCategory(questionId, category))
                .mapToInt(category -> category.id)
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.INVALID_QUESTION));
    }

    public Badge provideBadge(Questionlist questionlist, List<ChecklistQuestion> questions) {
        List<ChecklistQuestion> filteredQuestions = questionlist.filterQuestions(this, questions);

        int maxScore = calculateMaxScore(filteredQuestions.size());
        int score = calculateTotalScore(filteredQuestions);

        if (score * 100 / maxScore >= 80) {
            return this.badge;
        }
        return NONE;
    }

    // 1. 총점 : score * 100 / maxScore
    public int calculateHaTotalScore(Questionlist questionlist, List<ChecklistQuestion> questions) {
        List<ChecklistQuestion> filteredQuestions = questionlist.filterQuestions(this, questions);

        if (filteredQuestions.isEmpty()) {
            return 0;
        }

        int maxScore = calculateMaxScore(filteredQuestions.size());
        int score = filteredQuestions.stream()
                .mapToInt(question -> getScore(question.getAnswer()))
                .sum();

        return score * 100 / maxScore;
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
        return null;
    }
}
