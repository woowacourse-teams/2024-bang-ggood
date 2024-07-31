package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.domain.Badge;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.response.BadgeResponse;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.WrittenChecklistResponse;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.CustomQuestionRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.domain.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;

class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private ChecklistQuestionRepository checklistQuestionRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private CustomQuestionRepository customQuestionRepository;


    @DisplayName("체크리스트 방 정보 작성 성공")
    @Test
    void createChecklist() {
        //given & when
        long checklistId = checklistService.createChecklist(ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //then
        assertAll(
                () -> assertThat(checklistId).isEqualTo(1),
                () -> assertThat(checklistQuestionRepository.findByChecklistId(1).size()).isEqualTo(
                        Question.values().length)
        );

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
                () -> checklistService.createChecklist(
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID))
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

        // then // Category.OPTION does not have default question
        assertThat(checklistQuestionsResponse.categories().size()).isEqualTo(Category.values().length - 1);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        // given
        roomRepository.save(RoomFixture.ROOM);
        checklistRepository.save(ChecklistFixture.checklist);

        // when
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

    @DisplayName("체크리스트 리스트 조회 성공")
    @Test
    void readUserChecklistsPreview() {
        // given
        User user = new User(1L, "방방이");
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = createChecklist(user, room);
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
        assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        assertThat(previewResponse1.badge())
                .containsExactlyInAnyOrder(new BadgeResponse(
                        Badge.CLEAN.getShortNameWithEmoji(),
                        Badge.CLEAN.getLongNameWithEmoji()));
    }

    @DisplayName("체크리스트 리스트 조회 성공 : 뱃지가 존재하지 않을 때")
    @Test
    void readUserChecklistsPreview_NoBadge() {
        // given
        User user = new User(1L, "방방이"); //TODO 리팩토링 필요
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = createChecklist(user, room);
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
        assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        assertThat(previewResponse1.badge()).isEmpty();
    }

    @DisplayName("체크리스트 비교 성공")
    @Test
    void readChecklistsComparison() {
        // given
        User user = new User(1L, "방방이");
        Room room1 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room2 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room3 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist1 = createChecklist(user, room1);
        Checklist checklist2 = createChecklist(user, room2);
        Checklist checklist3 = createChecklist(user, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> checklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(),
                checklists.get(2).getId());

        // when
        ChecklistsWithScoreReadResponse response = checklistService.readChecklistsComparison(checklistIds);

        // then
        assertThat(response.checklists()).hasSize(3);
    }

    @DisplayName("체크리스트 비교 실패 : 아이디 개수가 유효하지 않을 때")
    @Test
    void readChecklistsComparison_invalidIdCount() {
        // given
        List<Long> invalidChecklistIds = List.of(1L, 2L, 3L, 4L);

        // when & then
        assertThatCode(() -> checklistService.readChecklistsComparison(invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_COMPARISON_INVALID_COUNT.getMessage());
    }

    @DisplayName("체크리스트 비교 실패 : 유효하지 않은 체크리스트 id 존재")
    @Test
    void readChecklistsComparison_invalidId() {
        // given
        User user = new User(1L, "방방이");
        Room room1 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room2 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room3 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist1 = createChecklist(user, room1);
        Checklist checklist2 = createChecklist(user, room2);
        Checklist checklist3 = createChecklist(user, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> invalidChecklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(),
                checklists.get(2).getId() + 1);

        // when & then
        assertThatCode(() -> checklistService.readChecklistsComparison(invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        // given
        CustomChecklistUpdateRequest request = new CustomChecklistUpdateRequest(List.of(1, 3, 5, 7, 8, 11, 15, 30));

        // when
        checklistService.updateCustomChecklist(request);

        // then
        assertThat(customQuestionRepository.findByUser(new User(1L, "방방이")))
                .hasSize(request.questionIds().size());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문 개수가 유효하지 않을 때")
    @Test
    void updateCustomChecklist_invalidQuestionCount_exception() {
        // given
        CustomChecklistUpdateRequest request = new CustomChecklistUpdateRequest(new ArrayList<>());

        // when & then
        assertThatThrownBy(() -> checklistService.updateCustomChecklist(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CUSTOM_CHECKLIST_INVALID_COUNT.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문이 중복될 때")
    @Test
    void updateCustomChecklist_duplicatedQuestion_exception() {
        // given
        CustomChecklistUpdateRequest request = new CustomChecklistUpdateRequest(List.of(1, 1, 1));

        // when & then
        assertThatThrownBy(() -> checklistService.updateCustomChecklist(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문 id가 유효하지 않을 때")
    @Test
    void updateCustomChecklist_invalidQuestionId_exception() {
        // given
        CustomChecklistUpdateRequest request = new CustomChecklistUpdateRequest(List.of(99999));

        // when & then
        assertThatThrownBy(() -> checklistService.updateCustomChecklist(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.INVALID_QUESTION.getMessage());
    }

    public static Checklist createChecklist(User user, Room room) {
        return new Checklist(user, room, 1000, 60, 24, "방끗부동산");
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        // given
        roomRepository.save(RoomFixture.ROOM);
        checklistRepository.save(ChecklistFixture.checklist);

        // when
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

    @DisplayName("체크리스트 리스트 조회 성공")
    @Test
    void readUserChecklistsPreview() {
        // given
        User user = new User(1L, "방방이");
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = createChecklist(user, room);
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
        assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        assertThat(previewResponse1.badge())
                .containsExactlyInAnyOrder(new BadgeResponse(
                        Badge.CLEAN.getShortNameWithEmoji(),
                        Badge.CLEAN.getLongNameWithEmoji()));
    }

    @DisplayName("체크리스트 리스트 조회 성공 : 뱃지가 존재하지 않을 때")
    @Test
    void readUserChecklistsPreview_NoBadge() {
        // given
        User user = new User(1L, "방방이"); //TODO 리팩토링 필요
        Room room = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist = createChecklist(user, room);
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
        assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
        assertThat(previewResponse1.badge()).isEmpty();
    }

    @DisplayName("체크리스트 비교 성공")
    @Test
    void readChecklistsComparison() {
        // given
        User user = new User(1L, "방방이");
        Room room1 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room2 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room3 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist1 = createChecklist(user, room1);
        Checklist checklist2 = createChecklist(user, room2);
        Checklist checklist3 = createChecklist(user, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> checklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(),
                checklists.get(2).getId());

        // when
        ChecklistsWithScoreReadResponse response = checklistService.readChecklistsComparison(checklistIds);

        // then
        assertThat(response.checklists()).hasSize(3);
    }

    @DisplayName("체크리스트 비교 실패 : 아이디 개수가 유효하지 않을 때")
    @Test
    void readChecklistsComparison_invalidIdCount() {
        // given
        List<Long> invalidChecklistIds = List.of(1L, 2L, 3L, 4L);

        // when & then
        assertThatCode(() -> checklistService.readChecklistsComparison(invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_COMPARISON_INVALID_COUNT.getMessage());
    }

    @DisplayName("체크리스트 비교 실패 : 유효하지 않은 체크리스트 id 존재")
    @Test
    void readChecklistsComparison_invalidId() {
        // given
        User user = new User(1L, "방방이");
        Room room1 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room2 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Room room3 = new Room("살기 좋은 방", 3, "서울시 도봉구", "잠실", 10);
        Checklist checklist1 = createChecklist(user, room1);
        Checklist checklist2 = createChecklist(user, room2);
        Checklist checklist3 = createChecklist(user, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> invalidChecklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(),
                checklists.get(2).getId() + 1);

        // when & then
        assertThatCode(() -> checklistService.readChecklistsComparison(invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    public static Checklist createChecklist(User user, Room room) {
        return new Checklist(user, room, 1000, 60, 24, "방끗부동산");
    }
}
