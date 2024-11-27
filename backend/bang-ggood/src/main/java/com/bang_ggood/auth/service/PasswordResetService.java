package com.bang_ggood.auth.service;

import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.auth.dto.request.ConfirmPasswordResetCodeRequest;
import com.bang_ggood.auth.dto.request.ForgotPasswordRequest;
import com.bang_ggood.auth.dto.request.ResetPasswordRequest;
import com.bang_ggood.auth.repository.PasswordResetCodeRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.user.domain.Email;
import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.Password;
import com.bang_ggood.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.Clock;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class PasswordResetService {

    private static final int PASSWORD_RESET_CODE_EXPIRED_MINUTES = 5;

    private final MailSender mailSender;
    private final PasswordResetCodeRepository passwordResetCodeRepository;
    private final Clock clock;
    private final UserRepository userRepository;

    public void sendPasswordResetEmail(ForgotPasswordRequest request) {
        String code = mailSender.sendPasswordResetEmail(request.email());
        passwordResetCodeRepository.deleteByEmail(new Email(request.email()));
        passwordResetCodeRepository.save(new PasswordResetCode(request.email(), code));
    }
    

    @Transactional
    public void confirmPasswordResetCode(ConfirmPasswordResetCodeRequest request) {
        LocalDateTime timeLimit = LocalDateTime.now(clock).minusMinutes(PASSWORD_RESET_CODE_EXPIRED_MINUTES);
        PasswordResetCode passwordResetCode = passwordResetCodeRepository.getByEmailAndCodeAndCreatedAtAfter(
                new Email(request.email()), request.code(), timeLimit);
        passwordResetCode.verify();
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        Email email = new Email(request.email());
        String code = request.code();
        if (!passwordResetCodeRepository.existsByEmailAndCodeAndVerifiedTrue(email, code)) {
            throw new BangggoodException(ExceptionCode.AUTHENTICATION_PASSWORD_CODE_NOT_FOUND);
        }

        userRepository.updatePasswordByEmail(
                new Email(request.email()), new Password(request.newPassword()), LoginType.LOCAL);
        passwordResetCodeRepository.deleteByEmailAndCode(email, code);
    }
}
