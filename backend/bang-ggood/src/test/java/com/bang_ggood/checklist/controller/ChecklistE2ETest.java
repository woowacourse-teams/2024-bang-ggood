package com.bang_ggood.checklist.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.question.CustomChecklistFixture;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.hamcrest.Matchers.containsString;

class ChecklistE2ETest extends AcceptanceTest {

    @Autowired
    private ChecklistManageService checklistManageService;
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST())
                .when().post("/checklists")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("체크리스트 작성 v1 성공")
    @Test
    void createChecklistV1() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_V1())
                .when().post("v1/checklists")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("체크리스트 작성 실패: 방 이름을 넣지 않은 경우")
    @Test
    void createChecklist_noRoomName_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME())
                .when().post("/checklists")
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("방 이름이 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 작성 실패: 질문 ID를 넣지 않은 경우")
    @Test
    void createChecklist_noQuestionId_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID())
                .when().post("/checklists")
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("질문 아이디가 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 질문 조회 성공")
    @Test
    void readChecklistQuestions() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/checklists/questions")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(200);
                /*.extract()
                .as(SelectedChecklistResponse.class);

        Assertions.assertAll(
                () -> assertThat(selectedChecklistResponse.room().roomName()).isEqualTo(ChecklistFixture.CHECKLIST_CREATE_REQUEST().room().roomName()),
                () -> assertThat(selectedChecklistResponse.room().address()).isEqualTo(ChecklistFixture.CHECKLIST_CREATE_REQUEST().room().address())
        );*/
        //TODO 수정
    }

    @DisplayName("작성된 체크리스트 조회 v1 성공")
    @Test
    void readChecklistV1() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("v1/checklists/" + checklistId)
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
    @Test
    void readLikedUserChecklistsPreview() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/checklists/like")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("체크리스트 수정 성공")
    @Test
    void updateChecklist() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST())
                .when().put("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 수정 v1 성공")
    @Test
    void updateChecklistV1() {
        long checklistId = checklistManageService.createChecklistV1(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST_V1());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST_V1())
                .when().put("/v1/checklists/" + checklistId)
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 수정 실패: 방 이름을 넣지 않은 경우")
    @Test
    void updateChecklist_noRoomName_exception() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST_NO_ROOM_NAME())
                .when().put("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("방 이름이 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 수정 실패: 질문 ID를 넣지 않은 경우")
    @Test
    void updateChecklist_noQuestionId_exception() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST_NO_QUESTION_ID())
                .when().put("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("질문 아이디가 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist saved = checklistRepository.save(
                ChecklistFixture.CHECKLIST1_USER1(room, this.getAuthenticatedUser()));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().delete("/checklists/" + saved.getId())
                .then().log().all()
                .statusCode(204);
    }
}
