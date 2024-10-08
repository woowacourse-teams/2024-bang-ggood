package com.bang_ggood.auth.dto.response;

public record RefreshTokenCheckResponse(boolean isRefreshTokenExist) {

    public static RefreshTokenCheckResponse from(boolean isRefreshTokenExist) {
        return new RefreshTokenCheckResponse(isRefreshTokenExist);
    }
}
