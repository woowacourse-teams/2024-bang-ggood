package com.bang_ggood.user.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Objects;
import java.util.regex.Pattern;

import static lombok.AccessLevel.PROTECTED;

@Embeddable
@Getter
@NoArgsConstructor(access = PROTECTED)
public class Email {

    //이메일은 영문 대소문자, 숫자, 점, 하이픈, 언더스코어, 플러스 기호를 포함할 수 있으며,
    // "@" 기호 뒤에 도메인 이름이 필요하고,
    // 마지막에는 최소 2글자의 영문자로 이루어진 최상위 도메인이 포함되어야 한다..
    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

    @Column(name = "email")
    private String value;

    public Email(String value) {
        validateEmailPattern(value);
        this.value = value;
    }

    public void validateEmailPattern(String email) {
        if(!EMAIL_PATTERN.matcher(email).matches()) {
            throw new BangggoodException(ExceptionCode.EMAIL_INVALID_FORMAT);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Email email = (Email) o;
        return Objects.equals(value, email.value);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(value);
    }
}
