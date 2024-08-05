package com.bang_ggood.checklist.domain;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class ChecklistRankTest {

    @DisplayName("Score 에 대한 Rank 계산 성공 : 3명인 경우")
    @Test
    void calculateRanksByDescendingScores_threeScores() {
        //give
        List<Integer> scores = List.of(5, 3, 1);

        //when & then
        assertAll(
                () -> assertThat(ChecklistRank.calculateRanks(5, scores)).isEqualTo(1),
                () -> assertThat(ChecklistRank.calculateRanks(3, scores)).isEqualTo(2),
                () -> assertThat(ChecklistRank.calculateRanks(1, scores)).isEqualTo(3)
        );
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 2명인 경우")
    @Test
    void calculateRanksByDescendingScores_twoScores() {
        //given
        List<Integer> scores = List.of(5, 3);

        //when & then
        assertAll(
                () -> assertThat(ChecklistRank.calculateRanks(5, scores)).isEqualTo(1),
                () -> assertThat(ChecklistRank.calculateRanks(3, scores)).isEqualTo(2)
        );
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 1명인 경우")
    @Test
    void calculateRanksByDescendingScores_oneScores() {
        //given
        List<Integer> scores = List.of(5);

        //when & then
        assertThat(ChecklistRank.calculateRanks(5, scores)).isEqualTo(1);
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 모두 점수가 같은 경우")
    @Test
    void calculateRanksByDescendingScores_allSameScore() {
        //given
        List<Integer> scores = List.of(5, 5, 5);

        //when & then
        assertThat(ChecklistRank.calculateRanks(5, scores)).isEqualTo(1);
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 1등이 2명인 경우")
    @Test
    void calculateRanksByDescendingScores_bothRankOne() {
        //given
        List<Integer> scores = List.of(5, 5, 1);

        //when & then
        assertAll(
                () -> assertThat(ChecklistRank.calculateRanks(5, scores)).isEqualTo(1),
                () -> assertThat(ChecklistRank.calculateRanks(1, scores)).isEqualTo(3)
        );
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 2등이 2명인 경우")
    @Test
    void calculateRanksByDescendingScores_BothRankTwo() {
        //given
        List<Integer> scores = List.of(5, 1, 1);

        //when & then
        assertAll(
                () -> assertThat(ChecklistRank.calculateRanks(5, scores)).isEqualTo(1),
                () -> assertThat(ChecklistRank.calculateRanks(1, scores)).isEqualTo(2)
        );
    }
}
