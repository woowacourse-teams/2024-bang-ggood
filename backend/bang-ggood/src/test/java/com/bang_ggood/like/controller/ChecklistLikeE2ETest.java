package com.bang_ggood.like.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.like.service.ChecklistLikeManageService;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
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
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

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
