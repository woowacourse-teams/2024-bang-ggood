package com.bang_ggood.exception;

import org.springframework.http.HttpStatus;

public enum ExceptionCode {

    // 전체
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "잘못된 인자입니다."),

    // Option
    OPTION_INVALID(HttpStatus.BAD_REQUEST, "잘못된 옵션 ID입니다."),
    OPTION_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 옵션이 존재합니다."),

    // Question
    QUESTION_INVALID(HttpStatus.BAD_REQUEST, "잘못된 질문 ID입니다."),
    QUESTION_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 질문이 존재합니다."),

    // User
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, "유저가 존재하지 않습니다."),

    // Category
    CATEGORY_PRIORITY_INVALID_COUNT(HttpStatus.BAD_REQUEST, "카테고리 개수가 유효하지 않습니다."),
    CATEGORY_NOT_FOUND(HttpStatus.BAD_REQUEST, "카테코리가 존재하지 않습니다."),
    CATEGORY_DUPLICATED(HttpStatus.BAD_REQUEST, "중복된 카테고리가 존재합니다."),

    // Grade
    GRADE_INVALID(HttpStatus.BAD_REQUEST, "점수가 유효하지 않습니다."),

    // Checklist
    CHECKLIST_COMPARISON_INVALID_COUNT(HttpStatus.BAD_REQUEST, "비교할 체크리스트 개수가 유효하지 않습니다."),
    CHECKLIST_NOT_FOUND(HttpStatus.BAD_REQUEST, "체크리스트가 존재하지 않습니다."),

    // Type
    TYPE_INVALID(HttpStatus.BAD_REQUEST, "타입이 유효하지 않습니다."),

    // FloorLevel
    FLOOR_LEVEL_INVALID(HttpStatus.BAD_REQUEST, "층 종류가 유효하지 않습니다."),

    // Structure
    STRUCTURE_INVALID(HttpStatus.BAD_REQUEST, "방 구조가 유효하지 않습니다."),

    // Room
    ROOM_FLOOR_AND_LEVEL_INVALID(HttpStatus.BAD_REQUEST, "방이 지상층일 경우에만 층수를 입력할 수 있습니다.")
    ;


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
