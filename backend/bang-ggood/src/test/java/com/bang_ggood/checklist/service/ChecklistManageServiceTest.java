package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

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

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
    }

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        ChecklistRequest checklist = ChecklistFixture.CHECKLIST_CREATE_REQUEST;

        // when
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1, checklist);

        //then
        assertThat(checklistId).isGreaterThan(0);
    }

    @DisplayName("작성된 체크리스트 조회 성공")
    @Test
    void readChecklist() {
        // given & when
        SelectedChecklistResponse selectedChecklistResponse = checklistManageService
                .readChecklist(UserFixture.USER1, ChecklistFixture.CHECKLIST1_USER1.getId());

        // then
        assertAll(
                () -> assertThat(selectedChecklistResponse.room().roomName()).isEqualTo(RoomFixture.ROOM_1.getName()),
                () -> assertThat(selectedChecklistResponse.room().address()).isEqualTo(RoomFixture.ROOM_1.getAddress())
        );
    }

    @DisplayName("작성된 체크리스트 조회 실패 : 체크리스트가 존재하지 않는 id인 경우")
    @Test
    void readChecklistById_invalidChecklistId_exception() {
        // given & when & then
        assertThatThrownBy(() -> checklistManageService.readChecklist(UserFixture.USER1, 0L))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_NOT_FOUND.getMessage());
    }
}
