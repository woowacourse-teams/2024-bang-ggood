package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.domain.ChecklistLike;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import com.bang_ggood.question.CustomChecklistFixture;
import com.bang_ggood.question.domain.CustomChecklistQuestion;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.QuestionResponse;
import com.bang_ggood.question.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Structure;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collection;
import java.util.List;

import static com.bang_ggood.question.CustomChecklistFixture.CUSTOM_CHECKLIST_QUESTION_DEFAULT;
import static com.bang_ggood.user.UserFixture.USER1;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;


class ChecklistServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistManageService checklistManageService;

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private CustomChecklistQuestionRepository customChecklistQuestionRepository;

    @Autowired
    private ChecklistOptionRepository checklistOptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @BeforeEach()
    public void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        roomRepository.save(RoomFixture.ROOM_2);
        roomRepository.save(RoomFixture.ROOM_3);
    }

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1;

        //when
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //then
        assertAll(
                () -> assertThat(savedChecklist.getRealEstate()).isEqualTo(checklist.getRealEstate()),
                () -> assertThat(savedChecklist.getMemo()).isEqualTo(checklist.getMemo()),
                () -> assertThat(savedChecklist.getSummary()).isEqualTo(checklist.getSummary())
        );

    }

    @DisplayName("체크리스트 좋아요 추가 성공")
    @Test
    void createChecklistLike() {
        //given
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        // when
        checklistService.createChecklistLike(USER1, checklist.getId());

        //then
        assertThat(checklistLikeRepository.existsByChecklist(checklist)).isTrue();
    }

    @DisplayName("체크리스트 좋아요 추가 실패 : 이미 좋아요가 추가가 된 체크리스트인 경우")
    @Test
    void createChecklistLike_checklistAlreadyLiked_exception() {
        //given
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        // when
        checklistService.createChecklistLike(USER1, checklist.getId());

        //then
        assertThatThrownBy(() -> checklistService.createChecklistLike(USER1, checklist.getId()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.LIKE_ALREADY_EXISTS.getMessage());
    }

    @DisplayName("체크리스트 질문 조회 성공")
    @Test
    void readChecklistQuestions() {
        // given
        customChecklistQuestionRepository.saveAll(CustomChecklistFixture.CUSTOM_CHECKLIST_QUESTION_DEFAULT);

        // given & when
        ChecklistQuestionsResponse checklistQuestionsResponse = checklistService.readChecklistQuestions(USER1);

        // then
        List<Integer> defaultQuestionsIds = CUSTOM_CHECKLIST_QUESTION_DEFAULT.stream()
                .map(CustomChecklistQuestion::getQuestion)
                .map(Question::getId)
                .toList();
        List<Integer> responseQuestionsIds = checklistQuestionsResponse.categories().stream()
                .map(CategoryQuestionsResponse::questions)
                .flatMap(Collection::stream)
                .map(QuestionResponse::getQuestionId)
                .toList();

        assertThat(responseQuestionsIds).containsExactlyElementsOf(defaultQuestionsIds);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklistById() {
        // given
        roomRepository.save(RoomFixture.ROOM_1);
        checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        // when
        SelectedChecklistResponse selectedChecklistResponse = checklistService.readChecklistById(UserFixture.USER1, 1L);

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
        assertThatThrownBy(() -> checklistService.readChecklistById(UserFixture.USER1, 0))
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
//                new ChecklistQuestion(checklist, Question.CLEAN_1, Answer.GOOD),
//                new ChecklistQuestion(checklist, Question.CLEAN_2, Answer.GOOD),
//                new ChecklistQuestion(checklist, Question.CLEAN_3, Answer.GOOD),
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

    @DisplayName("체크리스트 수정 성공")
    @Test
    void updateChecklistById() {
        //given
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when
        checklistService.updateChecklistById(UserFixture.USER1, checklistId, ChecklistFixture.CHECKLIST_UPDATE_REQUEST);

        //then
        Checklist checklist = checklistRepository.getById(checklistId);
        assertAll(
                () -> assertThat(checklist.getRoom().getStructure()).isEqualTo(Structure.OPEN_ONE_ROOM),
                () -> assertThat(
                        checklistOptionRepository.findAllByChecklistId(checklistId).get(3).getOptionId()).isEqualTo(4)
        );
    }

    @DisplayName("체크리스트 수정 실패 : 질문 id가 유효하지 않을 경우")
    @Test
    void updateChecklistById_invalidQuestionId_exception() {
        //given
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
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
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
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
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
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
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
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
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
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
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER1, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DIFFERENT.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 해당 유저의 체크리스트가 아닐 경우")
    @Test
    void createChecklist_notOwnedBy_exception() {
        //given
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST);

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(UserFixture.USER2, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER.getMessage());
    }

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
    @Test
    void readLikedChecklistsPreview() {
        //given
        checklistRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_USER1,
                        ChecklistFixture.CHECKLIST2_USER1,
                        ChecklistFixture.CHECKLIST3_USER1)
        );
        checklistLikeRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_LIKE,
                        ChecklistFixture.CHECKLIST2_LIKE)
        );

        //when
        List<UserChecklistPreviewResponse> checklists =
                checklistService.readLikedChecklistsPreview(USER1).checklists();

        //then
        assertAll(
                () -> assertThat(checklists.size()).isEqualTo(2),
                () -> assertThat(checklists.get(0).checklistId()).isEqualTo(ChecklistFixture.CHECKLIST1_USER1.getId()),
                () -> assertThat(checklists.get(1).checklistId()).isEqualTo(ChecklistFixture.CHECKLIST2_USER1.getId())
        );
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        // given
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        // when
        checklistService.deleteChecklistById(UserFixture.USER1, checklist.getId());

        // then
        assertThat(checklistRepository.existsById(checklist.getId().longValue())).isFalse();
    }

    @DisplayName("체크리스트 삭제 실패 : 체크리스트 작성 유저와 삭제하려는 유저가 다른 경우")
    @Test
    void deleteChecklistById_notOwnedByUser_exception() {
        // given
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        // when & then
        assertThatThrownBy(
                () -> checklistService.deleteChecklistById(UserFixture.USER2, checklist.getId())
        )
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER.getMessage());
    }

    @DisplayName("체크리스트 좋아요 삭제 성공")
    @Test
    void deleteChecklistLikeByChecklistId() {
        // given
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
        ChecklistLike checklistLike = checklistLikeRepository.save(ChecklistFixture.CHECKLIST1_LIKE);

        // when
        checklistService.deleteChecklistLikeByChecklistId(USER1, checklist.getId());

        // then
        assertThat(checklistLikeRepository.existsById(checklistLike.getId())).isFalse();
    }

    @DisplayName("체크리스트 좋아요 삭제 실패 : 체크리스트 좋아요가 없는 경우")
    @Test
    void deleteChecklistLikeByChecklistId_notFound_exception() {
        // given
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

        // when & then
        assertThatThrownBy(() -> checklistService.deleteChecklistLikeByChecklistId(USER1, checklist.getId()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.LIKE_NOT_EXISTS.getMessage());
    }
}
