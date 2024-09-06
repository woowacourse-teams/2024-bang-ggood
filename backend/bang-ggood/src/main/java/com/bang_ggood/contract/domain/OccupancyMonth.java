package com.bang_ggood.contract.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum OccupancyMonth {

    JANUARY(1),
    FEBRUARY(2),
    MARCH(3),
    APRIL(4),
    MAY(5),
    JUNE(6),
    JULY(7),
    AUGUST(8),
    SEPTEMBER(9),
    OCTOBER(10),
    NOVEMBER(11),
    DECEMBER(12),
    NONE(null);

    private final Integer month;

    OccupancyMonth(Integer month) {
        this.month = month;
    }

    public static OccupancyMonth from(Integer month) {
        if (month == null) {
            return NONE;
        }
        return Arrays.stream(OccupancyMonth.values())
                .filter(value -> value.month != null && value.month.equals(month))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.OCCUPANCY_MONTH_INVALID));
    }

    public Integer getMonth() {
        return month;
    }
}

