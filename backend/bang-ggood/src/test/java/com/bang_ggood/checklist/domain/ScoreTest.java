package com.bang_ggood.checklist.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ScoreTest {

    @DisplayName("점수 계산 성공")
    @Test
    void intValue() {
        Score score = Score.from(Grade.BAD);
        // 1 * 10 / (1 * 3) == 3
        assertThat(score.intValue(10)).isEqualTo(3);
        // 1 * 100 / (1 * 3) == 33
        assertThat(score.intValue(100)).isEqualTo(33);
    }

    @DisplayName("점수 합산 성공")
    @Test
    void sum() {
        Score score1 = Score.from(Grade.BAD);
        Score score2 = Score.from(Grade.GOOD);

        // (1 + 3) * 10 / (2 * 3) = 40 / 6 == 6
        assertThat(score1.sum(score2).intValue(10)).isEqualTo(6);
    }
}
