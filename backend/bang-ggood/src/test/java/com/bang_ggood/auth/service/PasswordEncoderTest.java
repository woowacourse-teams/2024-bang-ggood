package com.bang_ggood.auth.service;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class PasswordEncoderTest {

    @DisplayName("비밀번호 암호화 성공")
    @Test
    void encode() {
        // given & when
        String firstEncode = PasswordEncoder.encodeWithGeneralSalt("bang-ggood");
        String secondEncode = PasswordEncoder.encodeWithGeneralSalt("bang-ggood");

        // then
        assertThat(firstEncode).isEqualTo(secondEncode);
    }
}
