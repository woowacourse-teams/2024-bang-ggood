package com.bang_ggood.checklist.controller;

import com.bang_ggood.AcceptanceTest;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.dto.WrittenChecklistResponse;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistE2ETest extends AcceptanceTest {

    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private RoomRepository roomRepository;

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        //체크리스트 저장
        roomRepository.save(RoomFixture.ROOM);
        checklistRepository.save(ChecklistFixture.checklist);

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