package com.bang_ggood.checklist.domain;

public class Score {

    private final int count;
    private final int scoreSum;

    private Score(int count, int scoreSum) {
        this.count = count;
        this.scoreSum = scoreSum;
    }

    public static Score getInstance() {
        return new Score(0, 0);
    }

    public static Score from(Grade grade) {
        if (grade == Grade.NONE) return getInstance();
        return new Score(1, grade.getScore());
    }

    public Score sum(Score score) {
        return new Score(count + score.count, scoreSum + score.scoreSum);
    }

    public int intValue(int maxScore) {
        if (count == 0) return 0;
        return scoreSum * maxScore / (count * Grade.GOOD.getScore());
    }
}
