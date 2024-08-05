package com.bang_ggood.checklist.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class ChecklistE2ETest extends AcceptanceTest {

    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private RoomRepository roomRepository;

    @DisplayName("체크리스트 방 정보 작성 성공")
    @Test
    void createChecklist() {
        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
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
                .body(ChecklistFixture.CHECKLIST_CREATE_REQUEST_NO_QUESTION_ID)
                .when().post("/checklists")
                .then().log().all()
                .statusCode(400);
    }

    @DisplayName("체크리스트 질문 조회 성공")
    @Test
    void readChecklistQuestions() {
        ChecklistQuestionsResponse checklistQuestionsResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/checklists/questions")
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(ChecklistQuestionsResponse.class);
        // Category.OPTION does not have default question
        assertThat(checklistQuestionsResponse.categories().size()).isEqualTo(Category.values().length - 1);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        //체크리스트 저장
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist saved = checklistRepository.save(ChecklistFixture.checklist);

        SelectedChecklistResponse selectedChecklistResponse = RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().get("/checklists/" + saved.getId())
                .then().log().all()
                .statusCode(200)
                .extract()
                .as(SelectedChecklistResponse.class);

        Assertions.assertAll(
                () -> assertThat(selectedChecklistResponse.room().roomName()).isEqualTo("살기 좋은 방"),
                () -> assertThat(selectedChecklistResponse.room().address()).isEqualTo("인천광역시 부평구")
        );
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        Map<String, List<Integer>> params = new HashMap<>();
        params.put("questionIds", List.of(1, 3, 5, 7, 9, 14, 21, 30));

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .body(params)
                .when().put("/custom-checklist")
                .then().log().all()
                .statusCode(204);
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist saved = checklistRepository.save(ChecklistFixture.checklist);

        RestAssured.given().log().all()
                .contentType(ContentType.JSON)
                .when().delete("/checklists/" + saved.getId())
                .then().log().all()
                .statusCode(204);
    }
}
