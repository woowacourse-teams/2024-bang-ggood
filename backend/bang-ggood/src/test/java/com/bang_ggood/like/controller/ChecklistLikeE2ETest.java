package com.bang_ggood.like.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.like.service.ChecklistLikeManageService;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

class ChecklistLikeE2ETest extends AcceptanceTest {

    @Autowired
    private ChecklistManageService checklistManageService;
    @Autowired
    private ChecklistLikeManageService checklistLikeManageService;

    @DisplayName("체크리스트 좋아요 추가 성공")
    @Test
    void createChecklistLike() {
        long checklistId = checklistManageService.createChecklist(getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().post("/checklists/" + checklistId + "/like")
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 좋아요 추가 실패 : 이미 좋아요가 추가가 된 체크리스트인 경우")
    @Test
    void createChecklistLike_checklistAlreadyLiked_exception() {
        long checklistId = checklistManageService.createChecklist(getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());
        checklistLikeManageService.createLike(getAuthenticatedUser(), checklistId);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().post("/checklists/" + checklistId + "/like")
                .then().log().all()
                .statusCode(409);
    }
}