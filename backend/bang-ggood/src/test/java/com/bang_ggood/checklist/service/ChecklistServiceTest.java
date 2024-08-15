package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.category.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.CustomChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistLike;
import com.bang_ggood.checklist.domain.CustomChecklistQuestion;
import com.bang_ggood.checklist.domain.Question;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.CustomChecklistQuestionResponse;
import com.bang_ggood.checklist.dto.response.QuestionResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistPreviewResponse;
import com.bang_ggood.checklist.repository.ChecklistLikeRepository;
import com.bang_ggood.checklist.repository.ChecklistOptionRepository;
import com.bang_ggood.checklist.repository.ChecklistQuestionRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.CustomChecklistQuestionRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Collection;
import java.util.List;

import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_QUESTION_DEFAULT;
import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST;
import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_DUPLICATED;
import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_EMPTY;
import static com.bang_ggood.checklist.CustomChecklistFixture.CUSTOM_CHECKLIST_UPDATE_REQUEST_INVALID;
import static com.bang_ggood.user.UserFixture.USER1;
import static org.assertj.core.api.Assertions.assertThat;
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

    @DisplayName("체크리스트 작성 실패: 질문 id가 유효하지 않을 경우")
    @Test
    void createChecklist_invalidQuestionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_INVALID_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 작성 실패: 질문 id가 중복일 경우")
    @Test
    void createChecklist_duplicatedQuestionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 작성 실패: 옵션 id가 유효하지 않을 경우")
    @Test
    void createChecklist_invalidOptionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_INVALID_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 작성 실패: 옵션 id가 중복일 경우")
    @Test
    void createChecklist_duplicatedOptionId_exception() {
        //given & when & then
        assertThatThrownBy(
                () -> checklistService.createChecklist(UserFixture.USER1,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_OPTION_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
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
                .map(QuestionResponse::questionId)
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

    /*@DisplayName("체크리스트 수정 성공")
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
                        checklistOptionRepository.findByChecklistId(checklistId).get(3).getOptionId()).isEqualTo(4)
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
    }*/

    @DisplayName("커스텀 체크리스트 조회 성공")
    @Test
    void readCustomChecklistQuestions() {
        // given
        CustomChecklistQuestion question1 = new CustomChecklistQuestion(USER1, Question.ROOM_CONDITION_5);
        CustomChecklistQuestion question2 = new CustomChecklistQuestion(USER1, Question.BATHROOM_1);
        List<CustomChecklistQuestion> questions = List.of(question1, question2);
        customChecklistQuestionRepository.saveAll(questions);

        // when
        CategoryCustomChecklistQuestionsResponse response = checklistService.readAllCustomChecklistQuestions(USER1);

        // then
        long selectedCount = response.categories().stream()
                .flatMap(category -> category.questions().stream())
                .filter(CustomChecklistQuestionResponse::isSelected)
                .count();

        Assertions.assertThat(selectedCount).isEqualTo(questions.size());
    }

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
    @Test
    void readLikedUserChecklistsPreview() {
        //given
        checklistRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_USER1,
                        ChecklistFixture.CHECKLIST2_USER1,
                        ChecklistFixture.CHECKLIST3_USER1)
        );
        checklistLikeRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST_LIKE_1,
                        ChecklistFixture.CHECKLIST_LIKE_2)
        );

        //when
        List<UserChecklistPreviewResponse> checklists =
                checklistService.readLikedUserChecklistsPreview(USER1).checklists();

        //then
        assertAll(
                () -> assertThat(checklists.size()).isEqualTo(2),
                () -> assertThat(checklists.get(0).checklistId()).isEqualTo(1),
                () -> assertThat(checklists.get(1).checklistId()).isEqualTo(2)
        );
    }

    @DisplayName("커스텀 체크리스트 업데이트 성공")
    @Test
    void updateCustomChecklist() {
        // given
        CustomChecklistUpdateRequest request = CUSTOM_CHECKLIST_UPDATE_REQUEST;

        // when
        checklistService.updateCustomChecklist(USER1, request);

        // then
        assertThat(customChecklistQuestionRepository.findAllByUser(USER1))
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

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        // given
        roomRepository.save(RoomFixture.ROOM_1);
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);

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

    @DisplayName("체크리스트 좋아요 삭제 성공")
    @Test
    void deleteChecklistLikeByChecklistId() {
        // given
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
        ChecklistLike checklistLike = checklistLikeRepository.save(ChecklistFixture.CHECKLIST_LIKE_1);

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
