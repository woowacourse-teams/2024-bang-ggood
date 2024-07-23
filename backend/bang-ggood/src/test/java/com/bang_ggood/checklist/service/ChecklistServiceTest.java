package com.bang_ggood.checklist.service;


import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.exception.BangggoodException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistService checklistService;

    @DisplayName("체크리스트 방 정보 작성 성공")
    @Test
    void createChecklist() {
        //given & when
        long checklistId = checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //then
        Assertions.assertThat(checklistId).isEqualTo(1);
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 질문 id가 유효하지 않을 경우")
    @Test
    void createChecklistNotValidQuestionId() {
        //given & when & then
        Assertions.assertThatThrownBy(
                        () -> checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST_INVALID_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage("잘못된 질문 ID입니다.");
    }
}
