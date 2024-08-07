package com.bang_ggood.logging.dto;

import java.time.LocalDateTime;

public class InfoLog extends BaseLog {

    private final String infoMessage;

    public InfoLog(LocalDateTime requestTime, String requestUrl, String uuid, String infoMessage) {
        super(requestTime, requestUrl, uuid);
        this.infoMessage = infoMessage;
    }


    public String getInfoMessage() {
        return infoMessage;
    }

    @Override
    public String toString() {
        return super.toString() + '\'' +
                ", infoMessage='" + infoMessage + '\'';
    }
}
