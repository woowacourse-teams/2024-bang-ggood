package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.ArrayList;
import java.util.List;

public class ChecklistRank {

    private ChecklistRank() {
    }

    public static List<Integer> calculateRanksByDescendingScores(List<Integer> scores) {
        List<Integer> ranks = new ArrayList<>(scores.size());

        validateDescendingScore(scores);

        int currentRank = 1;

        for (int idx = 0; idx < scores.size(); idx++) {
            if (idx > 0 && scores.get(idx).equals(scores.get(idx - 1))) {
                ranks.add(currentRank);
            } else {
                currentRank = idx + 1;
                ranks.add(currentRank);
            }
        }

        return ranks;
    }

    private static void validateDescendingScore(List<Integer> scores) {
        for (int idx = 1; idx < scores.size(); idx++) {
            if (scores.get(idx) > scores.get(idx - 1)) {
                throw new BangggoodException(ExceptionCode.SCORE_NOT_DESCENDING_SORTED);
            }
        }
    }
}
