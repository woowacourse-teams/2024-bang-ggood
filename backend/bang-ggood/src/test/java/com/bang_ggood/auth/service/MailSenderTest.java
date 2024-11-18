package com.bang_ggood.auth.service;

import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mail.javamail.JavaMailSender;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class MailSenderTest {

    @DisplayName("이메일 전송 시 send 메소드 호출 성공")
    @Test
    void name() {
        //given
        JavaMailSender javaMailSender = mock(JavaMailSender.class);
        MailSender mailSender = new MailSender(javaMailSender);
        String email = "bang-ggood@gmail.com";
        MimeMessage mimeMessage = mock(MimeMessage.class);
        when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);

        // when
        mailSender.sendPasswordResetEmail(email);

        // then
        verify(javaMailSender, times(1)).send(mimeMessage);
    }
}
