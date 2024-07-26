package com.bang_ggood.checklist.service;


import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.dto.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.WrittenChecklistResponse;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistService checklistService;

    @DisplayName("체크리스트 방 정보 작성 성공")
    @Test
    void createChecklist() {
        //given & when
        long checklistId = checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //then
        assertThat(checklistId).isEqualTo(2);
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 질문 id가 유효하지 않을 경우")
    @Test
    void createChecklist_invalidQuestionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST_INVALID_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.INVALID_QUESTION.getMessage());
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 질문 id가 중복일 경우")
    @Test
    void createChecklist_duplicatedQuestionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 옵션 id가 유효하지 않을 경우")
    @Test
    void createChecklist_invalidOptionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST_INVALID_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.INVALID_OPTION.getMessage());
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 옵션 id가 중복일 경우")
    @Test
    void createChecklist_duplicatedOptionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 질문 조회 성공")
    @Test
    void readChecklistQuestions() {
        // given & when
        ChecklistQuestionsResponse checklistQuestionsResponse = checklistService.readChecklistQuestions();

        // then
        assertThat(checklistQuestionsResponse.categories().size()).isEqualTo(Category.values().length);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        // given & when
        WrittenChecklistResponse writtenChecklistResponse = checklistService.readChecklistById(1L);

        // then
        Assertions.assertAll(
                () -> assertThat(writtenChecklistResponse.room().name()).isEqualTo("살기 좋은 방"),
                () -> assertThat(writtenChecklistResponse.room().address()).isEqualTo("인천광역시 부평구")
        );
    }

    @DisplayName("작성된 체크리스트 조회 실패 : 체크리스트가 존재하지 않는 id인 경우")
    @Test
    void readChecklistById_invalidChecklistId_exception() {
        // given & when & then
        assertThatThrownBy(() -> checklistService.readChecklistById(0))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }
}
