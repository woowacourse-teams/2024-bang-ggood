package com.bang_ggood.building.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.repository.BuildingRepository;
import com.bang_ggood.checklist.BuildingFixture;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.time.LocalDateTime;

class BuildingE2ETest extends AcceptanceTest {

    @Autowired
    private BuildingRepository buildingRepository;

    @DisplayName("빌딩 조회 성공")
    @Test
    void readBuilding() {
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        LocalDateTime cursor = LocalDateTime.now();
        int size = 10;

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/buildings/"+ building.getId() + "/checklists?cursor=" + cursor + "&size=" + size)
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("빌딩 조회 실패 : 커서 타입이 잘못된 경우 사이즈가 0 이하인 경우")
    @Test
    void readBuilding_cursor_exception() {
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        String invalidCursor = "invalid";
        int size = 10;

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/buildings/"+ building.getId() + "/checklists?cursor=" + invalidCursor + "&size=" + size)
                .then().log().all()
                .statusCode(400);
    }

    @DisplayName("빌딩 조회 실패 : 커서 타입이 잘못된 경우 사이즈가 0 이하인 경우")
    @Test
    void readBuilding_size_exception() {
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        LocalDateTime cursor = LocalDateTime.now();
        int size = 0;

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/buildings/"+ building.getId() + "/checklists?cursor=" + cursor + "&size=" + size)
                .then().log().all()
                .statusCode(400);
    }
}
