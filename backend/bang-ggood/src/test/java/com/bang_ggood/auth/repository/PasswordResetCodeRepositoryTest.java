package com.bang_ggood.auth.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.Email;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class PasswordResetCodeRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private PasswordResetCodeRepository passwordResetCodeRepository;

    @DisplayName("특정 시간보다 나중에 생성된 비밀번호 초기화 코드 조회 성공")
    @Test
    void getByEmailAndCodeAndCreatedAtAfter() {
        //given
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        PasswordResetCode passwordResetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = passwordResetCode.getCreatedAt();

        PasswordResetCode findPasswordResetCode = passwordResetCodeRepository.getByEmailAndCodeAndCreatedAtAfter(
                new Email(email), code, createdAt.minusMinutes(3)
        );
        assertThat(findPasswordResetCode).isEqualTo(passwordResetCode);
    }

    @DisplayName("특정 시간보다 나중에 생성된 비밀번호 초기화 코드 조회 실패 : 특정 시간 이내 생성 코드가 없는 경우")
    @Test
    void getByEmailAndCodeAndCreatedAtAfter_notFound() {
        //given
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        PasswordResetCode passwordResetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = passwordResetCode.getCreatedAt();

        assertThatThrownBy(() -> passwordResetCodeRepository.getByEmailAndCodeAndCreatedAtAfter(
                new Email(email), code, createdAt.plusMinutes(1)
        )).isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_PASSWORD_CODE_NOT_FOUND.getMessage());
    }
}
