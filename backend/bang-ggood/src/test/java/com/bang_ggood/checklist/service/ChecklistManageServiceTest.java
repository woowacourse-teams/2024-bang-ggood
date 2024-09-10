package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static com.bang_ggood.question.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST;
import static com.bang_ggood.question.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED;
import static com.bang_ggood.question.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY;
import static com.bang_ggood.question.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID;
import static com.bang_ggood.user.UserFixture.USER1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChecklistManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistManageService checklistManageService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
    }

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        ChecklistRequest checklist = ChecklistFixture.CHECKLIST_CREATE_REQUEST;

        // when
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1, checklist);

        //then
        assertThat(checklistId).isGreaterThan(0);
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST;

        // when & then
        assertThatCode(() -> checklistManageService.updateCustomChecklist(USER1, request))
                .doesNotThrowAnyException();
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 선택한 질문 개수가 0개일 때")
    @Test
    void updateCustomChecklist_empty_exception() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY;

        // when & then
        assertThatThrownBy(() -> checklistManageService.updateCustomChecklist(USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문이 중복될 때")
    @Test
    void updateCustomChecklist_duplicatedQuestion_exception() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED;

        // when & then
        assertThatThrownBy(() -> checklistManageService.updateCustomChecklist(USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문 id가 유효하지 않을 때")
    @Test
    void updateCustomChecklist_invalidQuestionId_exception() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID;

        // when & then
        assertThatThrownBy(() -> checklistManageService.updateCustomChecklist(USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }
}
