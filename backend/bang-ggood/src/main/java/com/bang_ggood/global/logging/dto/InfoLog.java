package com.bang_ggood.global.logging.dto;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.UUID;

public class InfoLog extends BaseLog {

    private final Long userId;

    public InfoLog(LocalDateTime requestTime, String requestUrl, String uuid, Long userId) {
        super(requestTime, requestUrl, uuid);
        this.userId = userId;
    }

    public static InfoLog of(HttpServletRequest request, Long userId) {
        return new InfoLog(
                LocalDateTime.now(),
                request.getMethod() + ' ' + request.getRequestURI(),
                UUID.randomUUID().toString(),
                userId
        );
    }

    public Long getUserId() {
        return userId;
    }

    @Override
    public String toString() {
        if (userId == null) {
            return super.toString() + '\'';
        }

        return super.toString() + '\'' +
                ", userId='" + userId + '\'';
    }
}
