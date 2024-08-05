package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.domain.Category;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistQuestion;
import com.bang_ggood.checklist.domain.Grade;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST;
import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED;
import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY;
import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID;
import static com.bang_ggood.user.UserFixture.USER1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @Autowired
    private ChecklistOptionRepository checklistOptionRepository;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach()
    public void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        roomRepository.save(RoomFixture.ROOM_2);
        roomRepository.save(RoomFixture.ROOM_3);
    }

    @DisplayName("체크리스트 방 정보 작성 성공")
    @Test
    void createChecklist() {
        //given
        ChecklistRequest checklist = ChecklistFixture.CHECKLIST_CREATE_REQUEST;

        // when
        long checklistId = checklistService.createChecklist(UserFixture.USER1, checklist);

        //then
        assertAll(
                () -> assertThat(checklistId).isEqualTo(1),
                () -> assertThat(checklistQuestionRepository.findByChecklistId(1).size()).isEqualTo(
                        checklist.questions().size())
        );

    }

    @DisplayName("체크리스트 방 정보 작성 실패: 질문 id가 유효하지 않을 경우")
    @Test
    void createChecklist_invalidQuestionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_INVALID_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 질문 id가 중복일 경우")
    @Test
    void createChecklist_duplicatedQuestionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 옵션 id가 유효하지 않을 경우")
    @Test
    void createChecklist_invalidOptionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_INVALID_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 방 정보 작성 실패: 옵션 id가 중복일 경우")
    @Test
    void createChecklist_duplicatedOptionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 질문 조회 성공")
    @Test
    void readChecklistQuestions() {
        // TODO : 유저 생성 시 default 질문을 DB에 저장하는 기능 추가
        checklistService.updateCustomChecklist(USER1,
                new CustomChecklistUpdateRequest(List.of(1, 4, 6, 7, 8, 12, 18, 19, 23, 25, 31)));
        // given & when
        ChecklistQuestionsResponse checklistQuestionsResponse = checklistService.readChecklistQuestions(USER1);

        // then // Category.OPTION does not have default question
        assertThat(checklistQuestionsResponse.categories().size()).isEqualTo(Category.values().length - 1);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        // given
        roomRepository.save(RoomFixture.ROOM_1);
        checklistRepository.save(ChecklistFixture.checklist);

        // when
        SelectedChecklistResponse selectedChecklistResponse = checklistService.readChecklistById(1L);

        // then
        assertAll(
                () -> assertThat(selectedChecklistResponse.room().roomName()).isEqualTo("살기 좋은 방"),
                () -> assertThat(selectedChecklistResponse.room().address()).isEqualTo("인천광역시 부평구")
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

//    @DisplayName("체크리스트 리스트 조회 성공")
//    @Test
//    void readUserChecklistsPreview() {
//        // given
//        User user = new User(1L, "방방이");
//        Room room = RoomFixture.ROOM_1;
//        Checklist checklist = createChecklist(user, room);
//        List<ChecklistQuestion> questions = List.of(
//                new ChecklistQuestion(checklist, Question.CLEAN_1, Grade.GOOD),
//                new ChecklistQuestion(checklist, Question.CLEAN_2, Grade.GOOD),
//                new ChecklistQuestion(checklist, Question.CLEAN_3, Grade.GOOD),
//                new ChecklistQuestion(checklist, Question.CLEAN_4, null),
//                new ChecklistQuestion(checklist, Question.CLEAN_5, null));
//
//        roomRepository.save(room);
//        checklistRepository.save(checklist);
//        checklistQuestionRepository.saveAll(questions);
//
//        // when
//        UserChecklistsPreviewResponse response = checklistService.readUserChecklistsPreview(user);
//
//        // then
//        UserChecklistPreviewResponse previewResponse1 = response.checklists().get(0);
//        assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
//        assertThat(previewResponse1.badge())
//                .containsExactlyInAnyOrder(new BadgeResponse(
//                        Badge.CLEAN.getShortNameWithEmoji(),
//                        Badge.CLEAN.getLongNameWithEmoji()));
//    }
//
//    @DisplayName("체크리스트 리스트 조회 성공 : 뱃지가 존재하지 않을 때")
//    @Test
//    void readUserChecklistsPreview_NoBadge() {
//        // given
//        User user = new User(1L, "방방이"); //TODO 리팩토링 필요
//        Room room = RoomFixture.ROOM_1;
//        Checklist checklist = createChecklist(user, room);
//        List<ChecklistQuestion> questions = List.of(
//                new ChecklistQuestion(checklist, Question.CLEAN_1, Grade.GOOD),
//                new ChecklistQuestion(checklist, Question.CLEAN_2, Grade.BAD),
//                new ChecklistQuestion(checklist, Question.CLEAN_3, Grade.BAD),
//                new ChecklistQuestion(checklist, Question.CLEAN_4, null),
//                new ChecklistQuestion(checklist, Question.CLEAN_5, null));
//
//        roomRepository.save(room);
//        checklistRepository.save(checklist);
//        checklistQuestionRepository.saveAll(questions);
//
//        // when
//        UserChecklistsPreviewResponse response = checklistService.readUserChecklistsPreview(user);
//
//        // then
//        UserChecklistPreviewResponse previewResponse1 = response.checklists().get(0);
//        assertThat(previewResponse1.checklistId()).isEqualTo(checklist.getId());
//        assertThat(previewResponse1.badge()).isEmpty();
//    }

    @DisplayName("체크리스트 비교 성공")
    @Test
    void readChecklistsComparison() {
        // given
        User user1 = UserFixture.USER1;
        Room room1 = RoomFixture.ROOM_1;
        Room room2 = RoomFixture.ROOM_2;
        Room room3 = RoomFixture.ROOM_3;
        Checklist checklist1 = createChecklist(user1, room1);
        Checklist checklist2 = createChecklist(user1, room2);
        Checklist checklist3 = createChecklist(user1, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> checklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(),
                checklists.get(2).getId());

        // when
        ChecklistsWithScoreReadResponse response = checklistService.readChecklistsComparison(user1, checklistIds);

        // then
        assertThat(response.checklists()).hasSize(3);
    }

    @DisplayName("체크리스트 비교 성공 : 순위가 정상적으로 계산된 경우")
    @Test
    void readChecklistsComparison_compareRank() {
        // given
        User user1 = UserFixture.USER1;
        Room room1 = RoomFixture.ROOM_1;
        Room room2 = RoomFixture.ROOM_2;
        Room room3 = RoomFixture.ROOM_3;
        Checklist checklist1 = createChecklist(user1, room1);
        Checklist checklist2 = createChecklist(user1, room2);
        Checklist checklist3 = createChecklist(user1, room3);
        ChecklistQuestion checklistQuestion1 = new ChecklistQuestion(checklist1, Question.CLEAN_1, Grade.GOOD, null);
        ChecklistQuestion checklistQuestion2 = new ChecklistQuestion(checklist2, Question.CLEAN_2, Grade.SOSO, null);
        ChecklistQuestion checklistQuestion3 = new ChecklistQuestion(checklist3, Question.CLEAN_3, Grade.BAD, null);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        checklistQuestionRepository.saveAll(List.of(checklistQuestion1, checklistQuestion2, checklistQuestion3));
        List<Long> checklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(),
                checklists.get(2).getId());

        // when
        ChecklistsWithScoreReadResponse response = checklistService.readChecklistsComparison(user1, checklistIds);

        // then
        assertAll(
                () -> assertThat(response.checklists().get(0).getRank()).isEqualTo(1),
                () -> assertThat(response.checklists().get(1).getRank()).isEqualTo(2),
                () -> assertThat(response.checklists().get(2).getRank()).isEqualTo(3)
        );
    }

    @DisplayName("체크리스트 비교 실패 : 아이디 개수가 유효하지 않을 때")
    @Test
    void readChecklistsComparison_invalidIdCount() {
        // given
        List<Long> invalidChecklistIds = List.of(1L, 2L, 3L, 4L);

        // when & then
        assertThatCode(() -> checklistService.readChecklistsComparison(USER1, invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_COMPARISON_INVALID_COUNT.getMessage());
    }

    @DisplayName("체크리스트 비교 실패 : 유효하지 않은 체크리스트 id 존재")
    @Test
    void readChecklistsComparison_invalidId() {
        // given
        User user1 = UserFixture.USER1;
        Room room1 = RoomFixture.ROOM_1;
        Room room2 = RoomFixture.ROOM_2;
        Room room3 = RoomFixture.ROOM_3;
        Checklist checklist1 = createChecklist(user1, room1);
        Checklist checklist2 = createChecklist(user1, room2);
        Checklist checklist3 = createChecklist(user1, room3);

        roomRepository.saveAll(List.of(room1, room2, room3));
        List<Checklist> checklists = checklistRepository.saveAll(List.of(checklist1, checklist2, checklist3));
        List<Long> invalidChecklistIds = List.of(checklists.get(0).getId(), checklists.get(1).getId(),
                checklists.get(2).getId() + 1);

        // when & then
        assertThatCode(() -> checklistService.readChecklistsComparison(user1, invalidChecklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    @DisplayName("체크리스트 수정 성공")
    @Test
    void updateChecklistById() {
        //given
        long checklistId = checklistService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when
        checklistService.updateChecklistById(UserFixture.USER1, checklistId, ChecklistFixture.CHECKLIST_UPDATE_REQUEST);

        //then
        Checklist checklist = checklistRepository.getById(checklistId);
        assertAll(
                () -> assertThat(checklist.getRoom().getStructure()).isEqualTo(Structure.OPEN_ONE_ROOM),
                () -> assertThat(
                        checklistOptionRepository.findByChecklistId(checklistId).get(3).getOptionId()).isEqualTo(4),
                () -> assertThat(checklist.getQuestions().get(3).getMemo()).isEqualTo("메모")
        );
    }

    @DisplayName("체크리스트 수정 실패 : 질문 id가 유효하지 않을 경우")
    @Test
    void updateChecklistById_invalidQuestionId_exception() {
        //given
        long checklistId = checklistService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER1, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_INVALID_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 질문 id가 중복일 경우")
    @Test
    void updateChecklistById_duplicatedQuestionId_exception() {
        //given
        long checklistId = checklistService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER1, checklistId,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 옵션 id가 유효하지 않을 경우")
    @Test
    void updateChecklistById_invalidOptionId_exception() {
        //given
        long checklistId = checklistService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER1, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_INVALID_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 옵션 id가 중복일 경우")
    @Test
    void updateChecklistById_duplicatedOptionId_exception() {
        //given
        long checklistId = checklistService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER1, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DUPLICATED_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 기존의 체크리스트와 질문 길이가 다를 경우")
    @Test
    void updateChecklistById_differentQuestionLength_exception() {
        //given
        long checklistId = checklistService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER1, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION_LENGTH))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DIFFERENT.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 기존의 체크리스트와 질문이 다를 경우")
    @Test
    void createChecklist_differentQuestion_exception() {
        //given
        long checklistId = checklistService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER1, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DIFFERENT.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST;

        // when
        checklistService.updateCustomChecklist(USER1, request);

        // then
        assertThat(customChecklistQuestionRepository.findByUser(USER1))
                .hasSize(request.questionIds().size());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 선택한 질문 개수가 0개일 때")
    @Test
    void updateCustomChecklist_empty_exception() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY;

        // when & then
        assertThatThrownBy(() -> checklistService.updateCustomChecklist(USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CUSTOM_CHECKLIST_QUESTION_EMPTY.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문이 중복될 때")
    @Test
    void updateCustomChecklist_duplicatedQuestion_exception() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED;

        // when & then
        assertThatThrownBy(() -> checklistService.updateCustomChecklist(USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("커스텀 체크리스트 업데이트 실패 : 질문 id가 유효하지 않을 때")
    @Test
    void updateCustomChecklist_invalidQuestionId_exception() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID;

        // when & then
        assertThatThrownBy(() -> checklistService.updateCustomChecklist(USER1, request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }

    public static Checklist createChecklist(User user, Room room) {
        return new Checklist(user, room, 1000, 60, 24, "방끗부동산");
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        // given
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist checklist = checklistRepository.save(ChecklistFixture.checklist);

        // when
        checklistService.deleteChecklistById(checklist.getId());

        // then
        assertThat(checklistRepository.existsById(checklist.getId().longValue())).isFalse();
    }

    @DisplayName("체크리스트 삭제 실패")
    @Test
    void deleteChecklistById_notFound_exception() {
        // given & when & then
        assertThatThrownBy(() -> checklistService.deleteChecklistById(-1))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }
}