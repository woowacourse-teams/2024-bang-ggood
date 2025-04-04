package com.bang_ggood.question.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.question.CustomChecklistFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.dto.request.QuestionCreateRequest;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class QuestionE2ETest extends AcceptanceTest {

    @DisplayName("사용자 질문 생성 성공")
    @Test
    void createQuestion() {
        // given
        Category category = QuestionFixture.CATEGORY1;
        QuestionCreateRequest request = new QuestionCreateRequest(category.getId(), "title", "subtitle");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(request)
                .when().post("/questions")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("사용자 질문 생성 실패 : 카테고리ID 존재하지 않을 떄")
    @Test
    void createQuestion_categoryIdEmptyException() {
        // given
        QuestionCreateRequest request = new QuestionCreateRequest(null, "title", "subtitle");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(request)
                .when().post("/questions")
                .then().log().all()
                .statusCode(400);
    }

    @DisplayName("사용자 질문 생성 실패 : 질문 내용이 존재하지 않을 때")
    @Test
    void createQuestion_titleEmptyException() {
        // given
        Category category = QuestionFixture.CATEGORY1;
        QuestionCreateRequest request = new QuestionCreateRequest(category.getId(), null, "subtitle");

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(request)
                .when().post("/questions")
                .then().log().all()
                .statusCode(400);
    }


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
