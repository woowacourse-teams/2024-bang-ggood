package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class OccupancyPeriodTest {

    @DisplayName("생성 성공")
    @Test
    void constructor() {
        assertThat(OccupancyPeriod.from("초")).isEqualTo(OccupancyPeriod.EARLY);
    }

    @DisplayName("생성 성공: null인 경우")
    @Test
    void constructor_null() {
        assertThat(OccupancyPeriod.from(null)).isEqualTo(OccupancyPeriod.NONE);
    }

    @DisplayName("생성 실패: 유효하지 않은 기간인 경우")
    @Test
    void constructor_invalidPeriod_exception() {
        assertThatThrownBy(
                () -> OccupancyPeriod.from("기간")
        ).isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OCCUPANCY_PERIOD_INVALID.getMessage());
    }
}
