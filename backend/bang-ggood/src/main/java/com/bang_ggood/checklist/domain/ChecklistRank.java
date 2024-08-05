package com.bang_ggood.checklist.domain;

import java.util.List;

public class ChecklistRank {

    private ChecklistRank() {
    }

    public static int calculateRanks(int targetScore, List<Integer> scores) {
        return (int) scores.stream()
                .filter(score -> score > targetScore)
                .count() + 1;
    }
}
