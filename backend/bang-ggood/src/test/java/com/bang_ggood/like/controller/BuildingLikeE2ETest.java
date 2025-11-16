package com.bang_ggood.like.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.checklist.BuildingFixture;
import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.repository.BuildingRepository;
import com.bang_ggood.like.domain.BuildingLike;
import com.bang_ggood.like.repository.BuildingLikeRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class BuildingLikeE2ETest extends AcceptanceTest {

    @Autowired
    private BuildingRepository buildingRepository;
    @Autowired
    private BuildingLikeRepository buildingLikeRepository;

    @DisplayName("빌딩 좋아요 추가 성공")
    @Test
    void createBuildingLike() {
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().post("/buildings/" + building.getId() + "/like")
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("빌딩 좋아요 추가 시도 : 이미 좋아요가 추가가 된 경우")
    @Test
    void createBuildingLike_alreadyLiked() {
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        buildingLikeRepository.save(new BuildingLike(getAuthenticatedUser(), building));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().post("/buildings/" + building.getId() + "/like")
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("빌딩 좋아요 삭제 성공")
    @Test
    void deleteChecklistLikeByChecklistId() {
        Building building = buildingRepository.save(BuildingFixture.BUILDING_1());
        buildingLikeRepository.save(new BuildingLike(getAuthenticatedUser(), building));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().delete("/buildings/" + building.getId() + "/like")
                .then().log().all()
                .statusCode(204);
    }
}
