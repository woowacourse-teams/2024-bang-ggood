package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistShare;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.ChecklistRequestV1;
import com.bang_ggood.checklist.dto.response.ChecklistCompareResponses;
import com.bang_ggood.checklist.dto.response.ChecklistPreviewResponse;
import com.bang_ggood.checklist.dto.response.ChecklistShareResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.ChecklistShareRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
import com.bang_ggood.like.service.ChecklistLikeManageService;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.domain.Structure;
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

class ChecklistManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistManageService checklistManageService;
    @Autowired
    private ChecklistLikeManageService checklistLikeManageService;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;
    @Autowired
    private ChecklistShareRepository checklistShareRepository;

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        ChecklistRequest checklist = ChecklistFixture.CHECKLIST_CREATE_REQUEST();

        // when
        long checklistId = checklistManageService.createChecklist(user, checklist);

        //then
        assertThat(checklistId).isGreaterThan(0);
    }

    @DisplayName("체크리스트 작성 성공 : 위도, 경도가 null 인 경우")
    @Test
    void createChecklist_emptyLocation() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        ChecklistRequest checklistRequest = ChecklistFixture.CHECKLIST_CREATE_REQUEST_EMPTY_LOCATION();

        // when
        long checklistId = checklistManageService.createChecklist(user, checklistRequest);

        //then
        assertThat(checklistId).isGreaterThan(0);
    }

    @DisplayName("체크리스트 작성 v1 성공 : 위도, 경도가 null 인 경우")
    @Test
    void createChecklistV1_emptyLocation() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        ChecklistRequestV1 checklistRequestV1 = ChecklistFixture.CHECKLIST_CREATE_REQUEST_V1_EMPTY_LOCATION();

        // when
        long checklistId = checklistManageService.createChecklistV1(user, checklistRequestV1);

        //then
        assertThat(checklistId).isGreaterThan(0);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklist() {
        // given & when
        User user = userRepository.save(UserFixture.USER1());
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        SelectedChecklistResponse selectedChecklistResponse = checklistManageService
                .readChecklist(user, checklist.getId());

        // then
        assertAll(
                () -> assertThat(selectedChecklistResponse.room().roomName()).isEqualTo(room.getName()),
                () -> assertThat(selectedChecklistResponse.room().address()).isEqualTo(room.getAddress())
        );
    }

    @DisplayName("작성된 체크리스트 조회 성공 : 좋아요 여부를 true로 반환한다.")
    @Test
    void readChecklist_returnIsLikedTrue() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        checklistLikeManageService.createLike(user, checklist.getId());

        // when
        SelectedChecklistResponse selectedChecklistResponse = checklistManageService
                .readChecklist(user, checklist.getId());

        // then
        assertThat(selectedChecklistResponse.isLiked()).isTrue();
    }

    @DisplayName("작성된 체크리스트 조회 성공 : 좋아요 여부를 false로 반환한다.")
    @Test
    void readChecklist_returnIsLikedFalse() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        // when
        SelectedChecklistResponse selectedChecklistResponse = checklistManageService
                .readChecklist(user, checklist.getId());

        // then
        assertThat(selectedChecklistResponse.isLiked()).isFalse();
    }


    @DisplayName("작성된 체크리스트 조회 실패 : 체크리스트가 존재하지 않는 id인 경우")
    @Test
    void readChecklistById_invalidChecklistId_exception() {
        // given
        User user = userRepository.save(UserFixture.USER1());

        //when & then
        assertThatThrownBy(() -> checklistManageService.readChecklist(user, 0L))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }

    @DisplayName("공유된 체크리스트 조회 성공")
    @Test
    void readSharedChecklist() {
        // given & when
        User user = userRepository.save(UserFixture.USER1());
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistShare checklistShare = checklistShareRepository.save(ChecklistFixture.CHECKLIST_SHARE(checklist));
        SelectedChecklistResponse selectedChecklistResponse = checklistManageService.readSharedChecklist(
                checklistShare.getToken());

        // then
        assertAll(
                () -> assertThat(selectedChecklistResponse.room().roomName()).isEqualTo(room.getName()),
                () -> assertThat(selectedChecklistResponse.room().address()).isEqualTo(room.getAddress())
        );
    }

    @DisplayName("체크리스트 비교 성공")
    @Test
    void compareChecklists_success() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Room room1 = roomRepository.save(RoomFixture.ROOM_1());
        Room room2 = roomRepository.save(RoomFixture.ROOM_2());
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room1, user));
        Checklist checklist2 = checklistRepository.save(ChecklistFixture.CHECKLIST2_USER1(room2, user));

        List<Long> checklistIds = List.of(checklist1.getId(), checklist2.getId());

        // when
        ChecklistCompareResponses response = checklistManageService.compareChecklists(user, checklistIds);

        // then
        assertAll(
                () -> assertThat(response.checklists()).hasSize(checklistIds.size()),
                () -> assertThat(response.checklists().get(0).checklistId()).isEqualTo(checklist1.getId()),
                () -> assertThat(response.checklists().get(1).checklistId()).isEqualTo(checklist2.getId())
        );
    }

    @DisplayName("체크리스트 비교 실패 : 체크리스트 개수가 2개가 아닌 경우")
    @Test
    void compareChecklists_invalidCount_exception() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        Checklist checklist1 = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        List<Long> checklistIds = List.of(checklist1.getId());

        // when & then
        assertThatThrownBy(() -> checklistManageService.compareChecklists(user, checklistIds))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_COMPARE_INVALID_COUNT.getMessage());
    }

    @DisplayName("체크리스트 삭제 성공")
    @Test
    void deleteChecklistById() {
        // given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        // when
        checklistManageService.deleteChecklistById(user, checklist.getId());

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
                () -> checklistManageService.deleteChecklistById(user2, checklist.getId())
        )
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_OWNED_BY_USER.getMessage());
    }

    @DisplayName("체크리스트 리스트 조회 성공")
    @Test
    void readUserChecklistsPreview() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        ChecklistRequest checklistRequest1 = ChecklistFixture.CHECKLIST_CREATE_REQUEST();
        ChecklistRequest checklistRequest2 = ChecklistFixture.CHECKLIST_CREATE_REQUEST2();

        Long checklistId1 = checklistManageService.createChecklist(user, checklistRequest1);
        Long checklistId2 = checklistManageService.createChecklist(user, checklistRequest2);

        // when
        ChecklistsPreviewResponse response = checklistManageService.readAllChecklistsPreview(user);

        // then
        ChecklistPreviewResponse previewResponse1 = response.checklists().get(0);
        ChecklistPreviewResponse previewResponse2 = response.checklists().get(1);

        assertThat(previewResponse1.checklistId()).isEqualTo(checklistId2); // 최신순으로 조회
        assertThat(previewResponse2.checklistId()).isEqualTo(checklistId1);
    }

    @DisplayName("좋아요된 체크리스트 리스트 최신순으로 조회 성공")
    @Test
    void readLikedChecklistsPreview() {
        //given
        int EXPECTED_LIKE_COUNT = 2;
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
        ChecklistsPreviewResponse response = checklistManageService.readLikedChecklistsPreview(user);

        //then
        assertAll(
                () -> assertThat(response.checklists()).hasSize(EXPECTED_LIKE_COUNT),
                () -> assertThat(response.checklists().get(0).checklistId()).isEqualTo(checklist2.getId()),
                () -> assertThat(response.checklists().get(1).checklistId()).isEqualTo(checklist1.getId())
        );
    }

    @DisplayName("체크리스트 수정 성공")
    @Test
    void updateChecklistById() {
        //given
        User user = userRepository.save(UserFixture.USER1());
        long checklistId = checklistManageService.createChecklist(user, ChecklistFixture.CHECKLIST_CREATE_REQUEST());
        ChecklistRequest updateChecklistRequest = ChecklistFixture.CHECKLIST_UPDATE_REQUEST();

        //when
        checklistManageService.updateChecklistById(user, checklistId, updateChecklistRequest);

        //then
        Checklist checklist = checklistRepository.getById(checklistId);
        assertAll(
                () -> assertThat(checklist.getRoom().getStructure()).isEqualTo(Structure.OPEN_ONE_ROOM),
                () -> assertThat(checklist.getMemo()).isEqualTo(updateChecklistRequest.room().memo())
        );
    }
}
