package com.bang_ggood.auth.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.user.domain.Email;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

class PasswordResetCodeRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private PasswordResetCodeRepository passwordResetCodeRepository;

    @DisplayName("특정 시간보다 나중에 생성된 비밀번호 초기화 코드 존재 시 참 반환")
    @Test
    void existsByEmailAndCodeAndCreatedAtAfter_true() {
        //given
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        PasswordResetCode passwordResetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = passwordResetCode.getCreatedAt();

        boolean isExist = passwordResetCodeRepository.existsByEmailAndCodeAndCreatedAtAfter(
                new Email(email), code, createdAt.minusMinutes(3));

        assertThat(isExist).isTrue();
    }

    @DisplayName("특정 시간보다 나중에 생성된 비밀번호 초기화 코드 없을 시 거짓 반환")
    @Test
    void existsByEmailAndCodeAndCreatedAtAfter_false() {
        //given
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        PasswordResetCode passwordResetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = passwordResetCode.getCreatedAt();

        boolean isExist = passwordResetCodeRepository.existsByEmailAndCodeAndCreatedAtAfter(
                new Email(email), code, createdAt.plusMinutes(1));

        assertThat(isExist).isFalse();
    }
}
