package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

class OccupancyMonthTest {

    @DisplayName("생성 성공")
    @Test
    void constructor() {
        assertThat(OccupancyMonth.from(1)).isEqualTo(OccupancyMonth.JANUARY);
    }

    @DisplayName("생성 성공: null인 경우")
    @Test
    void constructor_null() {
        assertThat(OccupancyMonth.from(null)).isEqualTo(OccupancyMonth.NONE);
    }

    @DisplayName("생성 실패: 유효하지 않은 달인 경우")
    @Test
    void constructor_invalidMonth_exception() {
        assertThatThrownBy(
                () -> OccupancyMonth.from(13)
        ).isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OCCUPANCY_MONTH_INVALID.getMessage());
    }

}
