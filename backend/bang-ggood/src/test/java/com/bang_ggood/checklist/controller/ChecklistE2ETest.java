package com.bang_ggood.checklist.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.category.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.CustomChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.repository.ChecklistLikeRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import static com.bang_ggood.user.UserFixture.USER1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.containsString;

class ChecklistE2ETest extends AcceptanceTest {

    @Autowired
    private ChecklistService checklistService;
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;
    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @DisplayName("체크리스트 방 정보 작성 성공")
    @Test
    void createChecklist() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST)
                .when().post("/checklists")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 방 이름을 넣지 않은 경우")
    @Test
    void createChecklist_noRoomName_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME)
                .when().post("/checklists")
                .then().log().all()
                .statusCode(400);
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 질문 ID를 넣지 않은 경우")
    @Test
    void createChecklist_noQuestionId_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID)
                .when().post("/checklists")
                .then().log().all()
                .statusCode(400);
    }


    @DisplayName("체크리스트 좋아요 추가 성공")
    @Test
    void createChecklistLike() {
        long checklistId = checklistService.createChecklist(USER1, ChecklistFixture.CHECKLIST_CREATE_REQUEST);

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
        long checklistId = checklistService.createChecklist(USER1, ChecklistFixture.CHECKLIST_CREATE_REQUEST);
        checklistService.createChecklistLike(USER1, checklistId);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().post("/checklists/" + checklistId + "/like")
                .then().log().all()
                .statusCode(409);
    }

    @DisplayName("체크리스트 질문 조회 성공")
    @Test
    void readChecklistQuestions() {
        // given
        customChecklistQuestionRepository.saveAll(CustomChecklistFixture.CUSTOM_CHECKLIST_QUESTION_DEFAULT);

        ChecklistQuestionsResponse checklistQuestionsResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().get("/checklists/questions")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(ChecklistQuestionsResponse.class);

        // then
        int questionsSize = 0;
        for (CategoryQuestionsResponse categoryQuestionsResponse : checklistQuestionsResponse.categories()) {
            questionsSize += categoryQuestionsResponse.questions().size();
        }

        assertThat(questionsSize).isEqualTo(CustomChecklistFixture.CUSTOM_CHECKLIST_QUESTION_DEFAULT.size());
    }

    @DisplayName("커스텀 체크리스트 전체 조회 성공")
    @Test
    void readAllCustomChecklistQuestion() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().get("/custom-checklist/all")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(CategoryCustomChecklistQuestionsResponse.class);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        long checklistId = checklistService.createChecklist(USER1, ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        SelectedChecklistResponse selectedChecklistResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().get("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(SelectedChecklistResponse.class);

        Assertions.assertAll(
                () -> assertThat(selectedChecklistResponse.room().roomName()).isEqualTo("방이름"),
                () -> assertThat(selectedChecklistResponse.room().address()).isEqualTo("부산광역시 루터회관")
        );
    }

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
    @Test
    void readLikedUserChecklistsPreview() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().get("/checklists/like")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("체크리스트 수정 성공")
    @Test
    void updateChecklist() {
        long checklistId = checklistService.createChecklist(USER1, ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST)
                .when().put("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 수정 실패: 방 이름을 넣지 않은 경우")
    @Test
    void updateChecklist_noRoomName_exception() {
        long checklistId = checklistService.createChecklist(USER1, ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST_NO_ROOM_NAME)
                .when().put("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("방 이름이 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 수정 실패: 질문 ID를 넣지 않은 경우")
    @Test
    void updateChecklist_noQuestionId_exception() {
        long checklistId = checklistService.createChecklist(USER1, ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST_NO_QUESTION_ID)
                .when().put("/checklists/" + checklistId)
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("질문 아이디가 존재하지 않습니다."));
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST)
                .when().put("/custom-checklist")
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist saved = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().delete("/checklists/" + saved.getId())
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 좋아요 삭제 성공")
    @Test
    void deleteChecklistLikeByChecklistId() {
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist saved = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
        checklistLikeRepository.save(ChecklistFixture.CHECKLIST1_LIKE);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().delete("/checklists/" + saved.getId() + "/like")
                .then().log().all()
                .statusCode(204);
    }
}
