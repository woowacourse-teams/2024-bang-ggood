package com.bang_ggood.auth.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class PasswordEncoderTest {

    @DisplayName("고유 salt로 비밀번호 암호화 성공")
    @Test
    void encodeWithGeneralSalt() {
        // given & when
        String password = "bang-ggood";
        String encodedPassword = PasswordEncoder.encodeWithGeneralSalt("bang-ggood");

        // then
        assertThat(password).isNotEqualTo(encodedPassword);
    }

    @DisplayName("특정 salt로 비밀번호 암호화 성공")
    @Test
    void encodeWithSpecificSalt() {
        // given
        String password = "bang-ggood";
        String encodedPassword = PasswordEncoder.encodeWithGeneralSalt(password);

       // when
        String targetPassword = PasswordEncoder.encodeWithSpecificSalt(password, encodedPassword);

        // then
        assertThat(targetPassword).isEqualTo(encodedPassword);
    }
}
