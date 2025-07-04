package com.bang_ggood.global.exception;

public enum ClientExceptionCode {

    ARTICLE_NOT_FOUND,
    AUTH_ACCESS_TOKEN_EMPTY,
    AUTH_TOKEN_EMPTY,
    AUTH_TOKEN_INVALID,
    AUTH_PASSWORD_CODE_NOT_FOUND,
    CHECKLIST_ERROR,
    CHECKLIST_NOT_FOUND,
    CHECKLIST_SERVER_ERROR,
    CHECKLIST_COMPARE_ERROR,
    CHECKLIST_SHARE_NOT_FOUND,
    CUSTOM_ERROR,
    INTERNAL_SERVER_ERROR,
    OAUTH_SERVER_ERROR,
    PASSWORD_HASHING_ERROR,
    QUESTION_ERROR,
    STATION_SERVER_ERROR,
    UNAUTH_ERROR,
    USER_EMAIL_ALREADY_USED,
    USER_INVALID_FORMAT,
    USER_NOT_FOUND,
    LOGIN_ERROR,
    INVALID_PARAMETER,
    MAIL_SEND_ERROR,

    // TODO: 임의 사용 지워질 코드
    AUTH_TOKEN_NOT_OWNED_BY_USER,
    AUTH_TOKEN_USER_MISMATCH,
    GUEST_USER_NOT_FOUND,
    GUEST_USER_UNEXPECTED_EXIST,
    LIKE_ALREADY_EXISTS,
    LIKE_NOT_EXISTS,
}
