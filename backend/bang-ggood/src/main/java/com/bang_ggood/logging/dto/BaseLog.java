package com.bang_ggood.logging.dto;

import java.time.LocalDateTime;

public abstract class BaseLog {

    private LocalDateTime requestTime;
    private String requestUrl;
    private Long userId;
    private boolean accessTokenExist;

    public LocalDateTime getRequestTime() {
        return requestTime;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public Long getUserId() {
        return userId;
    }

    public boolean isAccessTokenExist() {
        return accessTokenExist;
    }

    @Override
    public String toString() {
        return "requestTime=" + requestTime +
                ", requestUrl='" + requestUrl +
                ", userId=" + userId +
                ", accessTokenExist=" + accessTokenExist;
    }
}
