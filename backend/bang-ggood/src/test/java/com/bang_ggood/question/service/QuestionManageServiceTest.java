package com.bang_ggood.question.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.ChecklistQuestionFixture;
import com.bang_ggood.question.CustomChecklistFixture;
import com.bang_ggood.question.QuestionFixture;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.domain.ChecklistQuestion;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.question.dto.request.QuestionCreateRequest;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.ComparisonCategorizedQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.QuestionResponse;
import com.bang_ggood.question.repository.ChecklistQuestionRepository;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.question.repository.QuestionRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collection;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

class QuestionManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private QuestionManageService questionManageService;

    @Autowired
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private ChecklistQuestionRepository checklistQuestionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @DisplayName("사용자 질문 생성 성공")
    @Test
    void createQuestion() {
        // given
        Category category = QuestionFixture.CATEGORY1;
        User user = UserFixture.USER1;
        QuestionCreateRequest questionCreateRequest = new QuestionCreateRequest(category.getId(), "title", "subtitle");

        // when
        Integer questionId = questionManageService.createQuestion(questionCreateRequest, user);

        // then
        Assertions.assertThat(questionId).isNotNull();
    }

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
        assertThatThrownBy(() -> questionManageService.updateCustomChecklist(UserFixture.USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 비교를 위한 카테고리별 질문 조회 성공")
    @Test
    void readComparisonChecklistQuestionsByCategory() {
        // given
        User user = UserFixture.USER1;
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        Question question1Category1 = QuestionFixture.QUESTION1_CATEGORY1;
        Question question2Category2 = QuestionFixture.QUESTION2_CATEGORY1;

        ChecklistQuestion checklist1Question1Bad = ChecklistQuestionFixture.CHECKLIST1_QUESTION1_BAD(checklist,
                question1Category1);
        ChecklistQuestion checklist1Question2Good = ChecklistQuestionFixture.CHECKLIST1_QUESTION2_GOOD(checklist,
                question1Category1);
        checklistQuestionRepository.saveAll(List.of(checklist1Question1Bad, checklist1Question2Good));

        // when
        ComparisonCategorizedQuestionsResponse questions = questionManageService.readComparisonChecklistQuestionsByCategory(
                user, checklist.getId(), question1Category1.getCategory().getId());

        // then
        List<QuestionResponse> good = questions.good();
        List<QuestionResponse> bad = questions.bad();
        List<QuestionResponse> none = questions.none();

        assertAll(
                () -> Assertions.assertThat(good).hasSize(1),
                () -> Assertions.assertThat(good.get(0).getQuestionId())
                        .isEqualTo(checklist1Question2Good.getQuestionId()),
                () -> Assertions.assertThat(bad).hasSize(1),
                () -> Assertions.assertThat(bad.get(0).getQuestionId())
                        .isEqualTo(checklist1Question1Bad.getQuestionId()),
                () -> Assertions.assertThat(none).isEmpty()
        );
    }


    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문 id가 유효하지 않을 때")
    @Test
    void updateCustomChecklist_invalidQuestionId_exception() {
        // given
        CustomChecklistUpdateRequest request = CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID();

        // when & then
        assertThatThrownBy(() -> questionManageService.updateCustomChecklist(UserFixture.USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }
}
