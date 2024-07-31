package com.bang_ggood.exception;

import org.springframework.http.HttpStatus;

public enum ExceptionCode {

    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "잘못된 인자입니다."),
    INVALID_OPTION(HttpStatus.BAD_REQUEST, "잘못된 옵션 ID입니다."),
    OPTION_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 옵션이 존재합니다."),
    INVALID_QUESTION(HttpStatus.BAD_REQUEST, "잘못된 질문 ID입니다."),
    QUESTION_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 질문이 존재합니다."),
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "유저가 존재하지 않습니다."),

    // Category
    CATEGORY_PRIORITY_INVALID_COUNT(HttpStatus.BAD_REQUEST, "카테고리 개수가 유효하지 않습니다."),
    CATEGORY_NOT_FOUND(HttpStatus.BAD_REQUEST, "카테코리가 존재하지 않습니다."),
    CATEGORY_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 카테고리가 존재합니다."),
    GRADE_INVALID(HttpStatus.BAD_REQUEST, "점수가 유효하지 않습니다."),

    // Checklist
    CHECKLIST_COMPARISON_INVALID_COUNT(HttpStatus.BAD_REQUEST, "비교할 체크리스트 개수가 유효하지 않습니다."),
    CHECKLIST_NOT_FOUND(HttpStatus.BAD_REQUEST, "체크리스트가 존재하지 않습니다."),

    //FloorLevel
    FLOOR_LEVEL_INVALID_NAME(HttpStatus.BAD_REQUEST, "층 종류가 유효하지 않습니다."),

    //Structure
    STRUCTURE_INVALID_NAME(HttpStatus.BAD_REQUEST, "방 구조가 유효하지 않습니다."),

    //Type
    TYPE_INVALID_NAME(HttpStatus.BAD_REQUEST, "방 종류가 유효하지 않습니다.");

    private final HttpStatus httpStatus;
    private final String message;

    ExceptionCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getMessage() {
        return message;
    }
}
