package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistRankTest {

    @DisplayName("Score 에 대한 Rank 계산 성공 : 3명인 경우")
    @Test
    void calculateRanksByDescendingScores_threeScores() {
        //given
        List<Integer> scores = List.of(5, 3, 1);

        //when
        List<Integer> ranks = ChecklistRank.calculateRanksByDescendingScores(scores);

        //then
        assertThat(ranks).isEqualTo(List.of(1, 2, 3));
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 2명인 경우")
    @Test
    void calculateRanksByDescendingScores_twoScores() {
        //given
        List<Integer> scores = List.of(5, 3);

        //when
        List<Integer> ranks = ChecklistRank.calculateRanksByDescendingScores(scores);

        //then
        assertThat(ranks).isEqualTo(List.of(1, 2));
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 1명인 경우")
    @Test
    void calculateRanksByDescendingScores_oneScores() {
        //given
        List<Integer> scores = List.of(5);

        //when
        List<Integer> ranks = ChecklistRank.calculateRanksByDescendingScores(scores);

        //then
        assertThat(ranks).isEqualTo(List.of(1));
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 모두 점수가 같은 경우")
    @Test
    void calculateRanksByDescendingScores_allSameScore() {
        //given
        List<Integer> scores = List.of(5, 5, 5);

        //when
        List<Integer> ranks = ChecklistRank.calculateRanksByDescendingScores(scores);

        //then
        assertThat(ranks).isEqualTo(List.of(1, 1, 1));
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 1등이 2명인 경우")
    @Test
    void calculateRanksByDescendingScores_bothRankOne() {
        //given
        List<Integer> scores = List.of(5, 5, 1);

        //when
        List<Integer> ranks = ChecklistRank.calculateRanksByDescendingScores(scores);

        //then
        assertThat(ranks).isEqualTo(List.of(1, 1, 3));
    }

    @DisplayName("Score 에 대한 Rank 계산 성공 : 2등이 2명인 경우")
    @Test
    void calculateRanksByDescendingScores_BothRankTwo() {
        //given
        List<Integer> scores = List.of(5, 1, 1);

        //when
        List<Integer> ranks = ChecklistRank.calculateRanksByDescendingScores(scores);

        //then
        assertThat(ranks).isEqualTo(List.of(1, 2, 2));
    }

    @DisplayName("Score 에 대한 Rank 계산 실패 : 정렬되지 않은 점수인 경우")
    @Test
    void calculateRanksByDescendingScores_notSorted_exception() {
        //given && when
        List<Integer> scores = List.of(1, 3, 5);

        //then
        Assertions.assertThatThrownBy(() -> ChecklistRank.calculateRanksByDescendingScores(scores))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.SCORE_NOT_DESCENDING_SORTED.getMessage());
    }
}
