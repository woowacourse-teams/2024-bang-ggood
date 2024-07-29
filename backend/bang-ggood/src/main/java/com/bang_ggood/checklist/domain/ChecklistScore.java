package com.bang_ggood.checklist.domain;

import com.bang_ggood.category.domain.Category;
import java.util.List;

public class ChecklistScore {

    public static int calculateTotalScore(List<ChecklistQuestion> questions) {
        if (questions.isEmpty()) {
            return 0;
        }

        int maxScore = Grade.calculateMaxScore(questions.size());
        int totalScore = Grade.calculateTotalScore(questions);

        return totalScore * 100 / maxScore;
    }

    public static int calculateCategoryScore(Category category, List<ChecklistQuestion> questions) {
        List<ChecklistQuestion> filteredQuestions = Question.filter(category, questions);

        if (filteredQuestions.isEmpty()) {
            return 0;
        }

        int maxScore = Grade.calculateMaxScore(filteredQuestions.size());
        int totalScore = Grade.calculateTotalScore(filteredQuestions);

        return totalScore * 10 / maxScore;
    }

    private ChecklistScore() {
    }
}
