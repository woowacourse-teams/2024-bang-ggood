package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistShare;
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

class ChecklistShareRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistShareRepository checklistShareRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("체크리스트 아이디를 통해 공유 체크리스트 조회 성공")
    @Test
    void findByChecklistId() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistShare savedChecklistShare = checklistShareRepository.save(
                ChecklistFixture.CHECKLIST_SHARE(savedChecklist));

        //when
        Optional<ChecklistShare> foundChecklist = checklistShareRepository.findByChecklistId(savedChecklist.getId());

        //then
        assertThat(foundChecklist).isPresent();
        assertThat(foundChecklist.get()).isEqualTo(savedChecklistShare);
    }

    @DisplayName("토큰을 통해 공유 체크리스트 조회 성공")
    @Test
    void findByToken() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist savedChecklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistShare savedChecklistShare = checklistShareRepository.save(
                ChecklistFixture.CHECKLIST_SHARE(savedChecklist));

        //when
        Optional<ChecklistShare> foundChecklist = checklistShareRepository.findByToken(savedChecklistShare.getToken());

        //then
        assertThat(foundChecklist).isPresent();
        assertThat(foundChecklist.get()).isEqualTo(savedChecklistShare);
    }
}
