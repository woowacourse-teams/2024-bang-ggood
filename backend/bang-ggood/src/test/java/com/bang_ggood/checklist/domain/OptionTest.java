package com.bang_ggood.checklist.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class OptionTest {

    @DisplayName("옵션 포함 성공: 포함하는 경우")
    @Test
    void contains_true() {
        assertThat(Option.contains(1)).isTrue();
    }

    @DisplayName("옵션 포함 성공 : 포함하지 않는 경우")
    @Test
    void contains_false() {
        assertThat(Option.contains(15)).isFalse();
    }
}
