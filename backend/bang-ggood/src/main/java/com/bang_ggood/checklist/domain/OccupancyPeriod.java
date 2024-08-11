package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import java.util.Arrays;

public enum OccupancyPeriod {

    EARLY("초"),
    MIDDLE("중"),
    LATE("말"),
    NONE(null);

    private final String period;

    OccupancyPeriod(String period) {
        this.period = period;
    }

    public static OccupancyPeriod from(String period) {
        if (period == null) {
            return NONE;
        }
        return Arrays.stream(OccupancyPeriod.values())
                .filter(value -> value.period != null && value.period.equals(period))
                .findFirst()
                .orElseThrow(() -> new BangggoodException(ExceptionCode.OCCUPANCY_PERIOD_INVALID));
    }

    public String getPeriod() {
        return period;
    }
}
