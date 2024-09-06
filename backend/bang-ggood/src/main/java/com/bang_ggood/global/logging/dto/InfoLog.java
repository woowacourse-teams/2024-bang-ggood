package com.bang_ggood.global.logging.dto;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.UUID;

public class InfoLog extends BaseLog {

    private final String infoMethodName;

    public InfoLog(LocalDateTime requestTime, String requestUrl, String uuid, String infoMethodName) {
        super(requestTime, requestUrl, uuid);
        this.infoMethodName = infoMethodName;
    }

    public static InfoLog of(HttpServletRequest request, String methodName) {
        return new InfoLog(
                LocalDateTime.now(),
                request.getMethod() + ' ' + request.getRequestURI(),
                UUID.randomUUID().toString(),
                methodName
        );
    }

    public String getInfoMethodName() {
        return infoMethodName;
    }

    @Override
    public String toString() {
        return super.toString() + '\'' +
                ", infoMessage='" + infoMethodName + '\'';
    }
}
