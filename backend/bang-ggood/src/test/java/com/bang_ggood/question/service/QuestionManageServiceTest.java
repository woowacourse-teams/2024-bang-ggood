package com.bang_ggood.question.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.CustomChecklistFixture;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.QuestionResponse;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collection;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

public class QuestionManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private QuestionManageService questionManageService;

    @Autowired
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("커스텀 체크리스트 질문 조회 성공")
    @Test
    void readChecklistQuestions() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        List<CustomChecklistQuestion> customChecklistQuestions = customChecklistQuestionRepository.saveAll(
                CustomChecklistFixture.CUSTOM_CHECKLIST_QUESTION_DEFAULT(user));

        // when
        CustomChecklistQuestionsResponse customChecklistQuestionsResponse =
                questionManageService.readCustomChecklistQuestions(user);

        // then
        List<Integer> defaultQuestionsIds = customChecklistQuestions.stream()
                .map(CustomChecklistQuestion::getQuestion)
                .map(Question::getId)
                .toList();
        List<Integer> responseQuestionsIds = customChecklistQuestionsResponse.categories().stream()
                .map(CategoryQuestionsResponse::questions)
                .flatMap(Collection::stream)
                .map(QuestionResponse::getQuestionId)
                .toList();

        assertThat(responseQuestionsIds).containsExactlyElementsOf(defaultQuestionsIds);
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        CustomChecklistUpdateRequest request = CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST();

        // when & then
        assertThatCode(() -> questionManageService.updateCustomChecklist(user, request))
                .doesNotThrowAnyException();
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 선택한 질문 개수가 0개일 때")
    @Test
    void updateCustomChecklist_empty_exception() {
        // given
        CustomChecklistUpdateRequest request = CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY();

        // when & then
        assertThatThrownBy(() -> questionManageService.updateCustomChecklist(UserFixture.USER1(), request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문이 중복될 때")
    @Test
    void updateCustomChecklist_duplicatedQuestion_exception() {
        // given
        CustomChecklistUpdateRequest request = CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED();

        // when & then
        assertThatThrownBy(() -> questionManageService.updateCustomChecklist(UserFixture.USER1(), request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문 id가 유효하지 않을 때")
    @Test
    void updateCustomChecklist_invalidQuestionId_exception() {
        // given
        CustomChecklistUpdateRequest request = CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID();

        // when & then
        assertThatThrownBy(() -> questionManageService.updateCustomChecklist(UserFixture.USER1(), request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }
}