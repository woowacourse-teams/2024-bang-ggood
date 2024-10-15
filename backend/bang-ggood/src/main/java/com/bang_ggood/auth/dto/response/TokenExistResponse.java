package com.bang_ggood.auth.dto.response;

public record TokenExistResponse(boolean isAccessTokenExist, boolean isRefreshTokenExist) {

    public static TokenExistResponse from(boolean isAccessTokenExist, boolean isRefreshTokenExist) {
        return new TokenExistResponse(isAccessTokenExist, isRefreshTokenExist);
    }
}
