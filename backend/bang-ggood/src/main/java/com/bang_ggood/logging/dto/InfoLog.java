package com.bang_ggood.logging.dto;

public class InfoLog extends BaseLog {

    private final String infoMessage;

    public InfoLog(String infoMessage) {
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
