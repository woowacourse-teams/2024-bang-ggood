package com.bang_ggood.checklist.domain;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.*;

class BuildingTest {

    @DisplayName("빌딩 생성 성공: address, walkingTime, latitude, longitude가 전부 값이 있을 경우")
    @Test
    void createBuilding_allFieldsPresent() {
        // when
        Building building = new Building("서울시 강남구", "강남빌딩", 37.4979, 127.0276);

        // then
        assertAll(
                () -> assertThat(building.getAddress()).isEqualTo("서울시 강남구"),
                () -> assertThat(building.getName()).isEqualTo("강남빌딩"),
                () -> assertThat(building.getLatitude()).isEqualTo(37.4979),
                () -> assertThat(building.getLongitude()).isEqualTo(127.0276)
        );
    }

    @DisplayName("빌딩 생성 성공: address, walkingTime, latitude, longitude가 전부 null일 경우")
    @Test
    void createBuilding_allFieldsNull() {
        // when
        Building building = new Building(null, "무명빌딩", null, null);

        // then
        assertAll(
                () -> assertThat(building.getAddress()).isNull(),
                () -> assertThat(building.getLatitude()).isNull(),
                () -> assertThat(building.getLongitude()).isNull(),
                () -> assertThat(building.getName()).isEqualTo("무명빌딩")
        );
    }

    @DisplayName("빌딩 생성 실패: address, walkingTime, latitude, longitude 중 일부만 null일 경우")
    @Test
    void createBuilding_partialNullFields_exception() {
        // expect
        assertThatThrownBy(() -> new Building(null, "강남빌딩", 37.4979, 127.0276))
                .isInstanceOf(BangggoodException.class)
                .hasMessageContaining(ExceptionCode.BUILDING_ALL_NULL_OR_NOT_NULL.getMessage());
    }
}

