package com.bang_ggood.checklist.domain;

import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class MaintenanceItemTest {

    @DisplayName("관리 항목 포함 성공: 포함하는 경우")
    @Test
    void contains_true() {
        assertThat(MaintenanceItem.contains(MaintenanceItem.GAS.getId())).isTrue();
    }

    @DisplayName("관리 항목 포함 성공 : 포함하지 않는 경우")
    @Test
    void contains_false() {
        assertThat(Option.contains(Integer.MAX_VALUE)).isFalse();
    }

    @DisplayName("아이디를 통해 생성 성공")
    @Test
    void fromId() {
        // given & when
        MaintenanceItem maintenanceItem = MaintenanceItem.ELECTRICITY;

        //then
        assertThat(MaintenanceItem.fromId(maintenanceItem.getId())).isEqualTo(maintenanceItem);
    }

    @DisplayName("아이디를 통해 생성 실패 : 유효하지 않은 아이디일 경우")
    @Test
    void fromId_invalid_exception() {
        // given & when & then
        assertThatThrownBy(
                () -> MaintenanceItem.fromId(Integer.MAX_VALUE)
        )
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.MAINTENANCE_ITEM_INVALID.getMessage());
    }
}
