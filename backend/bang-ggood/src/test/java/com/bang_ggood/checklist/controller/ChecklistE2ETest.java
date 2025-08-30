package com.bang_ggood.checklist.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.ChecklistImageFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistImageRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.checklist.repository.RoomRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

import static org.hamcrest.Matchers.containsString;

class ChecklistE2ETest extends AcceptanceTest {

    private static final String TEST_IMAGE_PATH = "/test-image.png";

    @Autowired
    private ChecklistManageService checklistManageService;
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ChecklistImageRepository checklistImageRepository;

    private ObjectMapper objectMapper = new ObjectMapper();

    @DisplayName("체크리스트 작성 v1 성공")
    @Test
    void createChecklistV1() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST())
                .when().post("/v1/checklists")
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
                .when().post("/v1/checklists")
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
                .when().post("/v1/checklists")
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("질문 아이디가 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 v2 작성 성공")
    @Test
    void createChecklistV2() throws IOException {
        // given
        String jsonBody = objectMapper.writeValueAsString(ChecklistFixture.CHECKLIST_CREATE_REQUEST());
        File file = new File(Objects.requireNonNull(getClass().getResource(TEST_IMAGE_PATH)).getFile());
        byte[] jsonBytes = jsonBody.getBytes(StandardCharsets.UTF_8);

        RestAssured.given().log().all()
                .contentType(ContentType.MULTIPART)
                .headers(this.headers)
                .multiPart("checklistRequest", "checklistRequest.json", jsonBytes, "application/json")
                .multiPart("images", file)
                .when().post("/v2/checklists")
                .then().log().all()
                .statusCode(201);
    }

    @DisplayName("체크리스트 v2 작성 실패: 방 이름을 넣지 않은 경우")
    @Test
    void createChecklistV2_noRoomName_exception() throws JsonProcessingException {
        String jsonBody = objectMapper.writeValueAsString(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_ROOM_NAME());
        File file = new File(Objects.requireNonNull(getClass().getResource(TEST_IMAGE_PATH)).getFile());
        byte[] jsonBytes = jsonBody.getBytes(StandardCharsets.UTF_8);

        RestAssured.given().log().all()
                .contentType(ContentType.MULTIPART)
                .headers(this.headers)
                .multiPart("checklistRequest", "checklistRequest.json", jsonBytes, "application/json")
                .multiPart("images", file)
                .when().post("/v2/checklists")
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("방 이름이 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 v2 작성 실패: 질문 ID를 넣지 않은 경우")
    @Test
    void createChecklistV2_noQuestionId_exception() throws JsonProcessingException {
        String jsonBody = objectMapper.writeValueAsString(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID());
        File file = new File(Objects.requireNonNull(getClass().getResource(TEST_IMAGE_PATH)).getFile());
        byte[] jsonBytes = jsonBody.getBytes(StandardCharsets.UTF_8);

        RestAssured.given().log().all()
                .contentType(ContentType.MULTIPART)
                .headers(this.headers)
                .multiPart("checklistRequest", "checklistRequest.json", jsonBytes, "application/json")
                .multiPart("images", file)
                .when().post("/v2/checklists")
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

    @DisplayName("작성된 체크리스트 조회 v2 성공")
    @Test
    void readChecklistV2() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("v2/checklists/" + checklistId)
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("체크리스트 전체 조회 v2 성공")
    @Test
    void readChecklistPreviewV2() {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("v2/checklists")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
    @Test
    void readLikedUserChecklistsPreview() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().get("/v1/checklists/like")
                .then().log().all()
                .statusCode(200);
    }

    @DisplayName("체크리스트 비교 성공")
    @Test
    void compareChecklists() {
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        Checklist checklist1 = checklistRepository.save(
                ChecklistFixture.CHECKLIST1_USER1(room1, this.getAuthenticatedUser()));
        Checklist checklist2 = checklistRepository.save(
                ChecklistFixture.CHECKLIST2_USER1(room2, this.getAuthenticatedUser()));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .queryParam("id", checklist1.getId(), checklist2.getId())  // 두 체크리스트 ID를 전달
                .when().get("/v1/checklists/comparison")
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
                .when().put("/v1/checklists/" + checklistId)
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
                .when().put("/v1/checklists/" + checklistId)
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("질문 아이디가 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 수정 성공 V2")
    @Test
    void updateChecklistV2() throws IOException {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());
        String jsonBody = objectMapper.writeValueAsString(ChecklistFixture.CHECKLIST_UPDATE_REQUEST());
        File file = new File(Objects.requireNonNull(getClass().getResource(TEST_IMAGE_PATH)).getFile());
        byte[] jsonBytes = jsonBody.getBytes(StandardCharsets.UTF_8);

        RestAssured.given().log().all()
                .contentType(ContentType.MULTIPART)
                .headers(this.headers)
                .multiPart("checklistRequest", "checklistRequest.json", jsonBytes, "application/json")
                .multiPart("updateImages", file)
                .when().put("/v2/checklists/" + checklistId)
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 수정 실패 V2: 방 이름을 넣지 않은 경우")
    @Test
    void updateChecklistV2_noRoomName_exception() throws IOException {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());
        String jsonBody = objectMapper.writeValueAsString(ChecklistFixture.CHECKLIST_UPDATE_REQUEST_NO_ROOM_NAME());
        File file = new File(Objects.requireNonNull(getClass().getResource(TEST_IMAGE_PATH)).getFile());
        byte[] jsonBytes = jsonBody.getBytes(StandardCharsets.UTF_8);

        RestAssured.given().log().all()
                .contentType(ContentType.MULTIPART)
                .headers(this.headers)
                .multiPart("checklistRequest", "checklistRequest.json", jsonBytes, "application/json")
                .multiPart("updateImages", file)
                .when().put("/v2/checklists/" + checklistId)
                .then().log().all()
                .statusCode(400)
                .body("message", containsString("방 이름이 존재하지 않습니다."));
    }

    @DisplayName("체크리스트 수정 실패 V2: 질문 ID를 넣지 않은 경우")
    @Test
    void updateChecklistV2_noQuestionId_exception() throws IOException {
        long checklistId = checklistManageService.createChecklist(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());
        String jsonBody = objectMapper.writeValueAsString(ChecklistFixture.CHECKLIST_UPDATE_REQUEST_NO_QUESTION_ID());
        File file = new File(Objects.requireNonNull(getClass().getResource(TEST_IMAGE_PATH)).getFile());
        byte[] jsonBytes = jsonBody.getBytes(StandardCharsets.UTF_8);

        RestAssured.given().log().all()
                .contentType(ContentType.MULTIPART)
                .headers(this.headers)
                .multiPart("checklistRequest", "checklistRequest.json", jsonBytes, "application/json")
                .multiPart("updateImages", file)
                .when().put("/v2/checklists/" + checklistId)
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

    @DisplayName("체크리스트 이미지 삭제 성공")
    @Test
    void deleteChecklistImageById() {
        long checklistId = checklistManageService.createChecklistV2(this.getAuthenticatedUser(),
                ChecklistFixture.CHECKLIST_CREATE_REQUEST(), ChecklistImageFixture.IMAGES());
        long imageId = checklistImageRepository.findByChecklistId(checklistId).get(0).getId();

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .headers(this.headers)
                .when().delete("/checklists/{checklist_id}/images/{image_id}", checklistId, imageId)
                .then().log().all()
                .statusCode(204);
    }
}
