package com.bang_ggood.room.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class StructureTest {

    @DisplayName("name으로 Structure 생성 성공")
    @Test
    void from() {
        // given
        String name = "복층";

        // when & then
        assertThat(Structure.from(name)).isEqualTo(Structure.DUPLEX);
    }

    @DisplayName("name으로 Structure 생성 실패 : 해당하지 않는 이름일 경우")
    @Test
    void from_invalidStructure_exception() {
        // given
        String name = "제제";

        // when & then
        assertThatThrownBy(() -> Structure.from(name))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.STRUCTURE_INVALID.getMessage());
    }

}
