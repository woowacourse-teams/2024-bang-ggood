package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.ChecklistMaintenance;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

class ChecklistMaintenanceRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private ChecklistMaintenanceRepository checklistMaintenanceRepository;

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
    }


    @DisplayName("관리 항목 체크리스트 ID로 논리적 삭제 성공")
    @Test
    void deleteById() {
        //given
        ChecklistMaintenance saved1 = checklistMaintenanceRepository.save(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_1);
        ChecklistMaintenance saved2 = checklistMaintenanceRepository.save(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_2);

        //when
        checklistMaintenanceRepository.deleteAllByChecklistId(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_1.getChecklist().getId());

        //then
        assertAll(
                () -> assertThat(checklistMaintenanceRepository.existsById(saved1.getId())).isTrue(),
                () -> assertThat(checklistMaintenanceRepository.existsById(saved2.getId())).isTrue(),
                () -> assertThat(
                        checklistMaintenanceRepository.findById(saved1.getId()).get().isDeleted()).isTrue(),
                () -> assertThat(
                        checklistMaintenanceRepository.findById(saved2.getId()).get().isDeleted()).isTrue()
        );
    }
}
