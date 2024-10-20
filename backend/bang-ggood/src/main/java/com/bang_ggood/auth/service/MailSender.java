package com.bang_ggood.auth.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MailSender {

    private static final String FIND_PASSWORD_MAIL_SUBJECT = "방끗 비밀번호 찾기";

    private final JavaMailSender javaMailSender;

    public void sendPasswordResetEmail(String email) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
            mimeMessageHelper.setTo(email);
            mimeMessageHelper.setSubject(FIND_PASSWORD_MAIL_SUBJECT);
            mimeMessageHelper.setText(generatePasswordResetCode());
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new BangggoodException(ExceptionCode.MAIL_SEND_ERROR);
        }
    }

    private String generatePasswordResetCode() {
        int code = (int) (Math.random() * 1000000);
        return String.format("%06d", code);
    }
}
