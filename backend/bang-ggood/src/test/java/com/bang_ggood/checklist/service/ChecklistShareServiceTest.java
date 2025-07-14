package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistShare;
import com.bang_ggood.checklist.repository.ChecklistShareRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;

class ChecklistShareServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistShareService checklistShareService;
    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistShareRepository checklistShareRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private UserRepository userRepository;

    @DisplayName("체크리스트 공유 생성 성공")
    @Test
    void createChecklistShare() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(room, user);
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //when
        ChecklistShare checklistShare = checklistShareService.createChecklistShare(savedChecklist);

        //then
        assertAll(
                () -> assertThat(checklistShare.getChecklistId()).isEqualTo(savedChecklist.getId()),
                () -> assertThat(checklistShare.getToken()).isNotBlank()
        );
    }

    @DisplayName("체크리스트 공유가 이미 존재하면 생성하지 않음")
    @Test
    void createChecklistShare_alreadyExist() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(room, user);
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        //when
        ChecklistShare firstShare = checklistShareService.createChecklistShare(savedChecklist);
        ChecklistShare secondShare = checklistShareService.createChecklistShare(savedChecklist);

        //then
        assertThat(firstShare).isEqualTo(secondShare);
    }

    @DisplayName("체크리스트 공유 삭제 성공")
    @Test
    void deleteChecklistShare() {
        // given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(room, user);
        Checklist savedChecklist = checklistService.createChecklist(checklist);
        ChecklistShare checklistShare = checklistShareService.createChecklistShare(savedChecklist);

        // when
        checklistShareService.deleteChecklistShare(savedChecklist);

        // then
        Optional<ChecklistShare> result = checklistShareRepository.findByChecklistId(checklistShare.getChecklistId());
        assertThat(result).isEmpty();
    }

    @DisplayName("체크리스트 공유가 존재하지 않으면 삭제하지 않음")
    @Test
    void deleteChecklistShare_notExist() {
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = ChecklistFixture.CHECKLIST1_USER1(room, user);
        Checklist savedChecklist = checklistService.createChecklist(checklist);

        // then
        assertThatCode(() -> checklistShareService.deleteChecklistShare(savedChecklist))
                .doesNotThrowAnyException();
    }
}
