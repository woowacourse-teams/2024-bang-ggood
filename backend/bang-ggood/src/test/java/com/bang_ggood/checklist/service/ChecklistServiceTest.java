package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

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
    private ChecklistOptionRepository checklistOptionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(room, user);

        //when
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //then
        assertAll(
                () -> assertThat(savedChecklist.getRealEstate()).isEqualTo(checklist.getRealEstate()),
                () -> assertThat(savedChecklist.getMemo()).isEqualTo(checklist.getMemo()),
                () -> assertThat(savedChecklist.getSummary()).isEqualTo(checklist.getSummary())
        );

    }

//
//    @DisplayName("체크리스트 수정 성공")
//    @Test
//    void updateChecklistById() {
//        //given
//        long checklistId = checklistManageService.createChecklist(UserFixture.USER1(),
//                ChecklistFixture.CHECKLIST_CREATE_REQUEST());
//
//        //when
//        checklistService.updateChecklistById(UserFixture.USER1(), checklistId, ChecklistFixture.CHECKLIST_UPDATE_REQUEST);
//
//        //then
//        Checklist checklist = checklistRepository.getById(checklistId);
//        assertAll(
//                () -> assertThat(checklist.getRoom().getStructure()).isEqualTo(Structure.OPEN_ONE_ROOM),
//                () -> assertThat(
//                        checklistOptionRepository.findAllByChecklistId(checklistId).get(3).getOptionId()).isEqualTo(4)
//        );
//    }

    @DisplayName("체크리스트 수정 실패 : 질문 id가 유효하지 않을 경우")
    @Test
    void updateChecklistById_invalidQuestionId_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        long checklistId = checklistManageService.createChecklist(user,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(user, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_INVALID_QUESTION_ID()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 질문 id가 중복일 경우")
    @Test
    void updateChecklistById_duplicatedQuestionId_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        long checklistId = checklistManageService.createChecklist(user,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(user, checklistId,
                        ChecklistFixture.CHECKLIST_CREATE_REQUEST_DUPLICATED_QUESTION_ID()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 옵션 id가 유효하지 않을 경우")
    @Test
    void updateChecklistById_invalidOptionId_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        long checklistId = checklistManageService.createChecklist(user,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(user, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_INVALID_OPTION_ID()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_INVALID.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 옵션 id가 중복일 경우")
    @Test
    void updateChecklistById_duplicatedOptionId_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        long checklistId = checklistManageService.createChecklist(user,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(user, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DUPLICATED_OPTION_ID()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.OPTION_DUPLICATED.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 기존의 체크리스트와 질문 길이가 다를 경우")
    @Test
    void updateChecklistById_differentQuestionLength_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Long checklistId = checklistManageService.createChecklist(user,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(user, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION_LENGTH()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DIFFERENT.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 기존의 체크리스트와 질문이 다를 경우")
    @Test
    void createChecklist_differentQuestion_exception() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Long checklistId = checklistManageService.createChecklist(user,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(user, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.QUESTION_DIFFERENT.getMessage());
    }

    @DisplayName("체크리스트 수정 실패 : 해당 유저의 체크리스트가 아닐 경우")
    @Test
    void createChecklist_notOwnedBy_exception() {
        //given
        User user1 = userRepository.save(UserFixture.USER1());
        User user2 = userRepository.save(UserFixture.USER2());
        long checklistId = checklistManageService.createChecklist(user1,
                ChecklistFixture.CHECKLIST_CREATE_REQUEST());

        //when & then
        assertThatThrownBy(
                () -> checklistService.updateChecklistById(user2, checklistId,
                        ChecklistFixture.CHECKLIST_UPDATE_REQUEST_DIFFERENT_QUESTION()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER.getMessage());
    }

    @DisplayName("체크리스트 리스트 최신순으로 조회 성공")
    @Test
    void readAllChecklistsOrderByLatest() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());

        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1(room1, user);
        Checklist checklist2 = ChecklistFixture.CHECKLIST3_USER2(room2, user);

        checklistService.createChecklist(checklist1);
        checklistService.createChecklist(checklist2);

        // when
        List<Checklist> checklists = checklistService.readAllChecklistsOrderByLatest(user);

        // then
        assertThat(checklists).containsExactly(checklist2, checklist1);
    }

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
    @Test
    void readLikedChecklistsPreview() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        Room room3 = roomRepository.save(RoomFixture.ROOM_3());
        Checklist checklist1 = ChecklistFixture.CHECKLIST1_USER1(room1, user);
        Checklist checklist2 = ChecklistFixture.CHECKLIST2_USER1(room2, user);
        Checklist checklist3 = ChecklistFixture.CHECKLIST3_USER1(room3, user);
        checklistRepository.saveAll(
                List.of(checklist1, checklist2, checklist3)
        );
        checklistLikeRepository.saveAll(
                List.of(ChecklistFixture.CHECKLIST1_LIKE(checklist1),
                        ChecklistFixture.CHECKLIST2_LIKE(checklist2))
        );

        //when
        List<Checklist> checklists = checklistService.readLikedChecklistsPreview(user);

        //then
        assertAll(
                () -> assertThat(checklists.size()).isEqualTo(2),
                () -> assertThat(checklists.get(0).getId()).isEqualTo(checklist1.getId()),
                () -> assertThat(checklists.get(1).getId()).isEqualTo(checklist2.getId())
        );
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        // given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        // when
        checklistService.deleteChecklistById(user, checklist.getId());

        // then
        assertThat(checklistRepository.existsById(checklist.getId().longValue())).isFalse();
    }

    @DisplayName("체크리스트 삭제 실패 : 체크리스트 작성 유저와 삭제하려는 유저가 다른 경우")
    @Test
    void deleteChecklistById_notOwnedByUser_exception() {
        // given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user1 = userRepository.save(UserFixture.USER1());
        User user2 = userRepository.save(UserFixture.USER2());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user1));

        // when & then
        assertThatThrownBy(
                () -> checklistService.deleteChecklistById(user2, checklist.getId())
        )
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER.getMessage());
    }
}
