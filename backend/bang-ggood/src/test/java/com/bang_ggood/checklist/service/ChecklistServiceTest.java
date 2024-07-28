package com.bang_ggood.checklist.service;


import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.domain.Badge;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.response.BadgeResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChecklistQuestionRepository checklistQuestionRepository;


//    @DisplayName("체크리스트 방 정보 작성 성공")
//    @Test
//    void createChecklist() {
//        //given & when
//        long checklistId = checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST);
//
//        //then
//        assertThat(checklistId).isEqualTo(1);
//    }

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

//    @DisplayName("체크리스트 질문 조회 성공")
//    @Test
//    void readChecklistQuestions() {
//        // given & when
//        ChecklistQuestionsResponse checklistQuestionsResponse = checklistService.readChecklistQuestions();
//
//        // then
//        assertThat(checklistQuestionsResponse.categories().size()).isEqualTo(Category.values().length);
//    }

    @DisplayName("체크리스트 리스트 조회 성공")
    @Test
    void readUserChecklistsPreview() {
        // given
        User user = new User(1L, "방방이");
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = ChecklistFixture.createChecklist(user, room);
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(checklist, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_2, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_3, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_4, null),
                new ChecklistQuestion(checklist, Question.CLEAN_5, null));

        roomRepository.save(room);
        checklistRepository.save(checklist);
        checklistQuestionRepository.saveAll(questions);

        // when
        UserChecklistsPreviewResponse response = checklistService.readUserChecklistsPreview(user);

        // then
        UserChecklistPreviewResponse previewResponse1 = response.checklists().get(0);
        Assertions.assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        Assertions.assertThat(previewResponse1.badge())
                .containsExactlyInAnyOrder(new BadgeResponse(
                        Badge.CLEAN.getShortNameWithEmoji(),
                        Badge.CLEAN.getLongNameWithEmoji()));
    }

    @DisplayName("체크리스트 리스트 조회 성공 : 뱃지가 존재하지 않을 때")
    @Test
    void readUserChecklistsPreview_NoBadge() {
        // given
        User user = new User(1L, "방방이");
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = ChecklistFixture.createChecklist(user, room);
        List<ChecklistQuestion> questions = List.of(
                new ChecklistQuestion(checklist, Question.CLEAN_1, Grade.GOOD),
                new ChecklistQuestion(checklist, Question.CLEAN_2, Grade.BAD),
                new ChecklistQuestion(checklist, Question.CLEAN_3, Grade.BAD),
                new ChecklistQuestion(checklist, Question.CLEAN_4, null),
                new ChecklistQuestion(checklist, Question.CLEAN_5, null));

        roomRepository.save(room);
        checklistRepository.save(checklist);
        checklistQuestionRepository.saveAll(questions);

        // when
        UserChecklistsPreviewResponse response = checklistService.readUserChecklistsPreview(user);

        // then
        UserChecklistPreviewResponse previewResponse1 = response.checklists().get(0);
        Assertions.assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        Assertions.assertThat(previewResponse1.badge()).isEmpty();
    }
}
