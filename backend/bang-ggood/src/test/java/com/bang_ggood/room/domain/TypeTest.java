package com.bang_ggood.room.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class TypeTest {

    @DisplayName("방 종류 이름으로 조회 성공")
    @Test
    void fromName() {
        assertThat(Type.fromName(Type.APARTMENT.getName()))
                .isEqualTo(Type.APARTMENT);
    }

    @DisplayName("방 종류 이름으로 조회 실패 : 유효하지 않은 방 종류 이름일 경우")
    @Test
    void fromName_invalidType_exception() {
        assertThatThrownBy(() -> Type.fromName("InvalidType"))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.TYPE_INVALID_NAME.getMessage());
    }
}