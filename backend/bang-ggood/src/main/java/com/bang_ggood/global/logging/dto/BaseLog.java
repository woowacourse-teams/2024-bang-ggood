package com.bang_ggood.global.logging.dto;

import java.time.LocalDateTime;

public abstract class BaseLog {

    private final LocalDateTime requestTime;
    private final String requestUrl;
    private final String uuid;

    public BaseLog(LocalDateTime requestTime, String requestUrl, String uuid) {
        this.requestTime = requestTime;
        this.requestUrl = requestUrl;
        this.uuid = uuid;
    }

    public LocalDateTime getRequestTime() {
        return requestTime;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public String getUuid() {
        return uuid;
    }

    @Override
    public String toString() {
        return "requestTime=" + requestTime +
                ", requestUrl='" + requestUrl + '\'' +
                ", uuid='" + uuid;
    }
}
