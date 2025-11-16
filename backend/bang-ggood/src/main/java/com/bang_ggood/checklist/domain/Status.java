package com.bang_ggood.checklist.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import java.util.Arrays;

public enum Status {
    OPEN, CLOSE;

    public static Status from(String name) {
        if (name == null) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_STATUS_INVALID);
        }
        try {
            return Status.valueOf(name.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_STATUS_INVALID);
        }
    }
}
