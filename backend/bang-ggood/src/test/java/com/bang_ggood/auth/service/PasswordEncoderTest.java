package com.bang_ggood.auth.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.*;

class PasswordEncoderTest {

    @DisplayName("비밀번호 암호화 성공")
    @Test
    void encode() {
        // given & when
        PasswordEncoder passwordEncoder = new PasswordEncoder();
        String firstEncode = passwordEncoder.encode("bang-ggood@gmail.com", "bang-ggood");
        String secondEncode = passwordEncoder.encode("bang-ggood@gmail.com", "bang-ggood");

        // then
        assertThat(firstEncode).isEqualTo(secondEncode);
    }
}
