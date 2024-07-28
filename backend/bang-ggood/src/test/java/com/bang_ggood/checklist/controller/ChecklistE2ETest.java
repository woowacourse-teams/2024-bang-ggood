package com.bang_ggood.checklist.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.checklist.dto.WrittenChecklistResponse;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistE2ETest extends AcceptanceTest {

//    @DisplayName("체크리스트 방 정보 작성 성공")
//    @Test
//    void createChecklist() {
//        RestAssured.given().log().all()
//                .contentType(ContentType.JSON)
//                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST)
//                .when().post("/checklists")
//                .then().log().all()
//                .statusCode(201);
//    }
//
//    @DisplayName("체크리스트 방 정보 작성 실패: 방 이름을 넣지 않은 경우")
//    @Test
//    void createChecklist_noRoomName_exception() {
//        RestAssured.given().log().all()
//                .contentType(ContentType.JSON)
//                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME)
//                .when().post("/checklists")
//                .then().log().all()
//                .statusCode(400);
//    }
//
//    @DisplayName("체크리스트 질문 조회 성공")
//    @Test
//    void readChecklistQuestions() {
//        ChecklistQuestionsResponse checklistQuestionsResponse = RestAssured.given().log().all()
//                .contentType(ContentType.JSON)
//                .when().get("/checklists/questions")
//                .then().log().all()
//                .statusCode(200)
//                .extract()
//                .as(ChecklistQuestionsResponse.class);
//
//        assertThat(checklistQuestionsResponse.categories().size()).isEqualTo(Category.values().length);
//    }
//
//    @DisplayName("체크리스트 방 정보 작성 실패: 질문 ID를 넣지 않은 경우")
//    @Test
//    void createChecklist_noQuestionId_exception() {
//        RestAssured.given().log().all()
//                .contentType(ContentType.JSON)
//                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID)
//                .when().post("/checklists")
//                .then().log().all()
//                .statusCode(400);
//    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        WrittenChecklistResponse writtenChecklistResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/checklists/1")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(WrittenChecklistResponse.class);

        Assertions.assertAll(
                () -> assertThat(writtenChecklistResponse.room().name()).isEqualTo("살기 좋은 방"),
                () -> assertThat(writtenChecklistResponse.room().address()).isEqualTo("인천광역시 부평구")
        );
    }
}
