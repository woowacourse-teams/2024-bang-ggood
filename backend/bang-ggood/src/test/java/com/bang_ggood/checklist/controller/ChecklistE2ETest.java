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
import com.bang_ggood.user.repository.UserRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.http.Header;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;

import static org.hamcrest.Matchers.containsString;

class ChecklistE2ETest extends AcceptanceTest {

    @Autowired
    private ChecklistManageService checklistManageService;
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
    @Autowired
    private UserRepository userRepository;

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST())
                .when().post("/checklists")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("체크리스트 작성 실패: 방 이름을 넣지 않은 경우")
    @Test
    void createChecklist_noRoomName_exception() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
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
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID())
                .when().post("/checklists")
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("질문 아이디가 존재하지 않습니다."));
    }


    @DisplayName("체크리스트 좋아요 추가 성공")
    @Test
    void createChecklistLike() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
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
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());
        checklistService.createChecklistLike(this.getAuthenticatedUser(), checklistId);

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
        customChecklistQuestionRepository.saveAll(
                CustomChecklistFixture.CUSTOM_CHECKLIST_QUESTION_DEFAULT(this.getAuthenticatedUser()));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
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
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
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

    //TODO 체크리스트 수정 API 리팩토링 후 확인 필요
//    @DisplayName("체크리스트 수정 성공")
//    @Test
//    void updateChecklist() {
//        Long checklistId = checklistManageService.createChecklist(USER1(), ChecklistFixture.CHECKLIST_CREATE_REQUEST());
//
//        RestAssured.given().log().all()
//                .contentType(ContentType.JSON)
//                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
//                .body(ChecklistFixture.CHECKLIST_UPDATE_REQUEST)
//                .when().put("/checklists/" + checklistId)
//                .then().log().all()
//                .statusCode(204);
//    }

    @DisplayName("체크리스트 수정 실패: 방 이름을 넣지 않은 경우")
    @Test
    void updateChecklist_noRoomName_exception() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
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
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
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
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().delete("/checklists/" + saved.getId())
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 좋아요 삭제 성공")
    @Test
    void deleteChecklistLikeByChecklistId() {
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist checklist = checklistRepository.save(
                ChecklistFixture.CHECKLIST1_USER1(room, this.getAuthenticatedUser()));
        checklistLikeRepository.save(ChecklistFixture.CHECKLIST1_LIKE(checklist));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .header(new Header(HttpHeaders.COOKIE, this.responseCookie.toString()))
                .when().delete("/checklists/" + checklist.getId() + "/like")
                .then().log().all()
                .statusCode(204);
    }
}
