package com.bang_ggood.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ExceptionCode {

    // 전체
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.INTERNAL_SERVER_ERROR, "예상치 못한 서버에러가 발생했습니다"),
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, BangggoodCode.INTERNAL_SERVER_ERROR, "잘못된 인자입니다."),

    // Option
    OPTION_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "잘못된 옵션 ID입니다."),
    OPTION_DUPLICATED(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "중복된 옵션이 존재합니다."),

    // Question
    QUESTION_ID_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.QUESTION_ERROR, "중복된 질문 ID가 존재해 질문을 생성할 수 없습니다."),
    QUESTION_HIGHLIGHT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.QUESTION_ERROR, "잘못된 하이라이트 키워드가 존재해 질문을 생성할 수 없습니다."),
    QUESTION_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.QUESTION_ERROR, "잘못된 질문 ID입니다."),
    QUESTION_DUPLICATED(HttpStatus.BAD_REQUEST, BangggoodCode.QUESTION_ERROR, "중복된 질문이 존재합니다."),
    QUESTION_DIFFERENT(HttpStatus.BAD_REQUEST, BangggoodCode.QUESTION_ERROR, "수정할 질문 목록이 기존의 질문 목록과 동일하지 않습니다."),

    // User
    USER_NOT_FOUND(HttpStatus.UNAUTHORIZED, BangggoodCode.USER_NOT_FOUND, "유저가 존재하지 않습니다."),
    USER_EMAIL_ALREADY_USED(HttpStatus.CONFLICT, BangggoodCode.USER_EMAIL_ALREADY_USED, "이미 해당 이메일을 사용하는 유저가 존재합니다."),
    GUEST_USER_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.GUEST_USER_NOT_FOUND, "게스트 유저가 존재하지 않습니다."),
    GUEST_USER_UNEXPECTED_EXIST(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.GUEST_USER_UNEXPECTED_EXIST, "예상치 못한 게스트 유저가 존재합니다. 데이터베이스를 확인해주세요."),

    //Email
    EMAIL_INVALID_FORMAT(HttpStatus.BAD_REQUEST, BangggoodCode.USER_INVALID_FORMAT, "유효하지 않은 이메일 형식입니다."),

    //Password
    PASSWORD_INVALID_FORMAT(HttpStatus.BAD_REQUEST, BangggoodCode.USER_INVALID_FORMAT, "유효하지 않은 비밀번호 형식입니다."),
    PASSWORD_HASHING_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.PASSWORD_HASHING_ERROR, "비밀번호 해싱 중 오류가 발생했습니다."),

    // Answer
    ANSWER_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "답변이 유효하지 않습니다."),

    // Checklist
    CHECKLIST_NOT_FOUND(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_NOT_FOUND, "체크리스트가 존재하지 않습니다."),
    CHECKLIST_MEMO_INVALID_LENGTH(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "체크리스트 메모는 1000자 이하여야 합니다."),
    CHECKLIST_NOT_OWNED_BY_USER(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "유저의 체크리스트가 아닙니다."),

    // CustomChecklist
    CUSTOM_CHECKLIST_QUESTION_EMPTY(HttpStatus.BAD_REQUEST, BangggoodCode.CUSTOM_ERROR, "커스텀 질문 개수가 유효하지 않습니다."),

    // FloorLevel
    FLOOR_LEVEL_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "층 종류가 유효하지 않습니다."),

    // Structure
    STRUCTURE_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "방 구조가 유효하지 않습니다."),

    // Room
    ROOM_FLOOR_AND_LEVEL_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "방이 지상층일 경우에만 층수를 입력할 수 있습니다."),


    // OccupancyMonth
    OCCUPANCY_MONTH_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "입주 가능월은 1부터 12 사이 혹은 null 값만 가능합니다."),

    // OccupancyPeriod
    OCCUPANCY_PERIOD_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "입주 가능 기간은 초, 중, 말 혹은 null 값만 가능합니다."),

    // MaintenanceItem
    MAINTENANCE_ITEM_DUPLICATE(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "중복된 관리비 항목이 존재합니다."),
    MAINTENANCE_ITEM_INVALID(HttpStatus.BAD_REQUEST, BangggoodCode.CHECKLIST_ERROR, "유효하지 않은 관리비 항목이 입력되었습니다."),

    //like
    LIKE_ALREADY_EXISTS(HttpStatus.CONFLICT, BangggoodCode.LIKE_ALREADY_EXISTS, "체크리스트가 이미 좋아요 상태입니다."),
    LIKE_NOT_EXISTS(HttpStatus.BAD_REQUEST, BangggoodCode.LIKE_NOT_EXISTS, "체크리스트 좋아요가 존재하지 않아 삭제할 수 없습니다."),

    // Auth
    AUTHENTICATION_ACCESS_TOKEN_EMPTY(HttpStatus.UNAUTHORIZED, BangggoodCode.AUTH_ACCESS_TOKEN_EMPTY, "액세스 토큰이 존재하지 않습니다. 액세스 토큰을 발급해주세요."),
    AUTHENTICATION_REFRESH_TOKEN_EMPTY(HttpStatus.UNAUTHORIZED, BangggoodCode.AUTH_TOKEN_EMPTY, "리프레시 토큰이 존재하지 않습니다. 다시 로그인해주세요."),
    AUTHENTICATION_TOKEN_EMPTY(HttpStatus.UNAUTHORIZED, BangggoodCode.AUTH_TOKEN_EMPTY, "로그인이 필요한 사용자입니다."),
    AUTHENTICATION_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, BangggoodCode.AUTH_TOKEN_INVALID, "토큰이 만료되었습니다."),
    AUTHENTICATION_TOKEN_INVALID(HttpStatus.UNAUTHORIZED, BangggoodCode.AUTH_TOKEN_INVALID, "토큰 정보가 올바르지 않습니다."),
    AUTHENTICATION_TOKEN_NOT_OWNED_BY_USER(HttpStatus.UNAUTHORIZED, BangggoodCode.AUTH_TOKEN_NOT_OWNED_BY_USER, "해당 유저의 토큰이 아닙니다."),
    AUTHENTICATION_TOKEN_USER_MISMATCH(HttpStatus.UNAUTHORIZED, BangggoodCode.AUTH_TOKEN_USER_MISMATCH, "엑세스 토큰과 리프레시 토큰의 소유자가 다릅니다."),
    AUTHENTICATION_TOKEN_TYPE_MISMATCH(HttpStatus.BAD_REQUEST, BangggoodCode.AUTH_TOKEN_INVALID, "토큰 타입이 올바르지 않습니다."),
    OAUTH_TOKEN_INTERNAL_EXCEPTION(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.OAUTH_SERVER_ERROR, "카카오 서버와 통신하는 과정 중 예상치 못한 예외가 발생했습니다."),
    OAUTH_REDIRECT_URI_MISMATCH(HttpStatus.BAD_REQUEST, BangggoodCode.AUTH_TOKEN_INVALID, "일치하는 Redirect URI가 존재하지 않습니다."),


    // Article
    ARTICLE_NOT_FOUND(HttpStatus.BAD_REQUEST, BangggoodCode.ARTICLE_NOT_FOUND, "해당 아티클이 존재하지 않습니다."),

    // Station
    STATION_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.STATION_SERVER_ERROR, "지하철 역을 찾을 수 없습니다."),
    STATION_NAME_NOT_SAME(HttpStatus.INTERNAL_SERVER_ERROR, BangggoodCode.STATION_SERVER_ERROR, "지하철 역을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final BangggoodCode bangggoodCode;
    private final String message;

    ExceptionCode(HttpStatus httpStatus, BangggoodCode bangggoodCode, String message) {
        this.httpStatus = httpStatus;
        this.bangggoodCode = bangggoodCode;
        this.message = message;
    }
}
