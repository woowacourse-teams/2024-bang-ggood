package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class StructureTest {

    @DisplayName("방 구조 이름으로 조회 성공")
    @Test
    void fromName() {
        assertThat(Structure.fromName(Structure.DIVIDED_ONE_ROOM.getName()))
                .isEqualTo(Structure.DIVIDED_ONE_ROOM);
    }

    @DisplayName("방 구조 이름으로 조회 실패 : 유효하지 않은 방 구조 이름일 경우")
    @Test
    void fromName_invalidStructure_exception() {
        assertThatThrownBy(() -> Structure.fromName("InvalidStructure"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.STRUCTURE_INVALID_NAME.getMessage());
    }

}