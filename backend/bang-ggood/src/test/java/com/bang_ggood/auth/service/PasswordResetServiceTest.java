package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.auth.dto.request.ConfirmPasswordResetCodeRequest;
import com.bang_ggood.auth.dto.request.ResetPasswordRequest;
import com.bang_ggood.auth.repository.PasswordResetCodeRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.Password;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;
import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.mockito.Mockito.when;

class PasswordResetServiceTest extends IntegrationTestSupport {

    @Autowired
    private PasswordResetService passwordResetService;
    @Autowired
    private PasswordResetCodeRepository passwordResetCodeRepository;
    @Autowired
    private UserRepository userRepository;
    @SpyBean
    private Clock clock;


    @DisplayName("비밀번호 초기화 코드 인증 성공")
    @Test
    void confirmPasswordResetCode() {
        //given
        int VALID_TIME_MINUTES = 2;
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        ConfirmPasswordResetCodeRequest request = new ConfirmPasswordResetCodeRequest(email, code);

        //when
        PasswordResetCode resetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = resetCode.getCreatedAt();
        Instant instant = createdAt.plusMinutes(VALID_TIME_MINUTES).toInstant(ZoneOffset.UTC);
        when(clock.instant()).thenReturn(instant);
        when(clock.getZone()).thenReturn(ZoneOffset.UTC);

        //then
        assertThatCode(() -> passwordResetService.confirmPasswordResetCode(request))
                .doesNotThrowAnyException();
    }

    @DisplayName("비밀번호 초기화 코드 인증 실패 : 유효기간이 지난 경우")
    @Test
    void confirmPasswordResetCode_timeOver_exception() {
        //given
        int EXPIRED_TIME_MINUTES = 6;
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        ConfirmPasswordResetCodeRequest request = new ConfirmPasswordResetCodeRequest(email, code);

        //when
        PasswordResetCode resetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = resetCode.getCreatedAt();
        Instant instant = createdAt.plusMinutes(EXPIRED_TIME_MINUTES).toInstant(ZoneOffset.UTC);
        when(clock.instant()).thenReturn(instant);
        when(clock.getZone()).thenReturn(ZoneOffset.UTC);

        //then
        assertThatThrownBy(() -> passwordResetService.confirmPasswordResetCode(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_PASSWORD_CODE_NOT_FOUND.getMessage());
    }

    @DisplayName("비밀번호 재설정 성공")
    @Test
    void resetPassword() {
        //given
        User user = UserFixture.USER1();
        userRepository.save(user);
        Password oldPassword = user.getPassword();
        String code = "abc123";
        String newPassword = "newPassword1234";
        ResetPasswordRequest request = new ResetPasswordRequest(
                user.getEmail().getValue(), code, newPassword);
        passwordResetCodeRepository.save(new PasswordResetCode(user.getEmail().getValue(), code));

        //when
        passwordResetService.resetPassword(request);

        //then
        Password changedPassword = userRepository.findById(user.getId()).get().getPassword();
        assertThat(changedPassword).isNotEqualTo(oldPassword);
    }

    @DisplayName("비밀번호 재설정 시 비밀번호 초기화 코드 삭제 성공")
    @Test
    void resetPassword_deleteCode() {
        //given
        User user = UserFixture.USER1();
        userRepository.save(user);
        String code = "abc123";
        String newPassword = "newPassword1234";
        ResetPasswordRequest request = new ResetPasswordRequest(
                user.getEmail().getValue(), code, newPassword);
        passwordResetCodeRepository.save(new PasswordResetCode(user.getEmail().getValue(), code));

        //when
        passwordResetService.resetPassword(request);

        //then
        assertThat(passwordResetCodeRepository.existsByEmailAndCode(user.getEmail(), code)).isFalse();
    }
}
