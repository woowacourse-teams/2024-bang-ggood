package com.bang_ggood.question.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.question.CustomChecklistFixture;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class QuestionE2ETest extends AcceptanceTest {

    @DisplayName("커스텀 체크리스트 질문 조회 성공")
    @Test
    void readCustomChecklistQuestions() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/checklists/questions")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("커스텀 체크리스트 질문 전체 조회 성공")
    @Test
    void readAllCustomChecklistQuestion() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/custom-checklist/all")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST())
                .when().put("/custom-checklist")
                .then().log().all()
                .statusCode(204);
    }

}
