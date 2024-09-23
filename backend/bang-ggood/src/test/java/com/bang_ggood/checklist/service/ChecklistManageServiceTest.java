package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.like.repository.ChecklistLikeRepository;
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
    private RoomRepository roomRepository;
    @Autowired
    private ChecklistRepository checklistRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ChecklistLikeRepository checklistLikeRepository;

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

    @DisplayName("좋아요된 체크리스트 리스트 조회 성공")
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
                () -> assertThat(response.checklists().get(0).checklistId()).isEqualTo(checklist1.getId()),
                () -> assertThat(response.checklists().get(1).checklistId()).isEqualTo(checklist2.getId())
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
