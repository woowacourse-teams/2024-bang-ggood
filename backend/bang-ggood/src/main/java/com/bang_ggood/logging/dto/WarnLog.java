package com.bang_ggood.logging.dto;

public class WarnLog extends BaseLog {

    private final String warnMessage;

    public WarnLog(String warnMessage) {
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
