package com.bang_ggood.global.logging.dto;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.UUID;

public class WarnLog extends BaseLog {

    private final String warnMessage;

    public WarnLog(LocalDateTime requestTime, String requestUrl, String uuid, String warnMessage) {
        super(requestTime, requestUrl, uuid);
        this.warnMessage = warnMessage;
    }

    public static WarnLog of(Exception exception, HttpServletRequest request) {
        return new WarnLog(
                LocalDateTime.now(),
                request.getMethod() + ' ' + request.getRequestURI(),
                UUID.randomUUID().toString(),
                exception.getMessage()
        );
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
