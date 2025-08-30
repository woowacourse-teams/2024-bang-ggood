package com.bang_ggood.maintenance.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.checklist.repository.RoomRepository;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

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

    @DisplayName("체크리스트 관리비 포함 항목 조회 성공")
    @Test
    void findAllByChecklist() {
        // given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistMaintenance saved1 = checklistMaintenanceRepository.save(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_1(checklist));
        ChecklistMaintenance saved2 = checklistMaintenanceRepository.save(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_2(checklist));

        // when
        List<ChecklistMaintenance> checklistMaintenances = checklistMaintenanceRepository
                .findAllByChecklistId(checklist.getId());

        // then
        Assertions.assertThat(checklistMaintenances).containsExactly(saved1, saved2);
    }

    @DisplayName("체크리스트 관리비 포함 항목 조회 성공 : 삭제된 항목은 조회하지 않는다.")
    @Test
    void findAllByChecklist_() {
        // given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        checklistMaintenanceRepository.save(ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_1(checklist));
        checklistMaintenanceRepository.save(ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_2(checklist));
        checklistMaintenanceRepository.deleteAllByChecklistId(ChecklistFixture.CHECKLIST1_USER1(room, user).getId());

        // when
        List<ChecklistMaintenance> checklistMaintenances = checklistMaintenanceRepository
                .findAllByChecklistId(ChecklistFixture.CHECKLIST1_USER1(room, user).getId());

        // then
        Assertions.assertThat(checklistMaintenances).isEmpty();
    }

    @DisplayName("관리 항목 체크리스트 ID로 논리적 삭제 성공")
    @Test
    void deleteById() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        ChecklistMaintenance saved1 = checklistMaintenanceRepository.save(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_1(checklist));
        ChecklistMaintenance saved2 = checklistMaintenanceRepository.save(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_2(checklist));

        //when
        checklistMaintenanceRepository.deleteAllByChecklistId(
                ChecklistFixture.CHECKLIST1_INCLUDED_MAINTENANCE_1(checklist).getChecklist().getId());

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
