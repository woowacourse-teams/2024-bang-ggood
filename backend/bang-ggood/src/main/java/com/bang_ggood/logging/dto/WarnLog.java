package com.bang_ggood.logging.dto;

import java.time.LocalDateTime;

public class WarnLog extends BaseLog {

    private final String warnMessage;

    public WarnLog(LocalDateTime requestTime, String requestUrl, String uuid, String warnMessage) {
        super(requestTime, requestUrl, uuid);
        this.warnMessage = warnMessage;
    }

    public String getWarnMessage() {
        return warnMessage;
    }

    @Override
    public String toString() {
        return super.toString() + '\'' +
                ", warnMessage='" + warnMessage + '\'';
    }
}
