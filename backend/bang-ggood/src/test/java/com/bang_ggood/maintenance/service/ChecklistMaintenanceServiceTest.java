package com.bang_ggood.maintenance.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.maintenance.ChecklistMaintenanceFixture;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.maintenance.repository.ChecklistMaintenanceRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.checklist.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class ChecklistMaintenanceServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistMaintenanceService checklistMaintenanceService;

    @Autowired
    private ChecklistMaintenanceRepository checklistMaintenanceRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @DisplayName("관리비 포함 항목 작성 성공")
    @Test
    void createChecklistMaintenance() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        List<ChecklistMaintenance> checklistMaintenances = ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCES(
                checklist);

        //when
        checklistMaintenanceService.createMaintenances(checklistMaintenances);

        //then
        assertThat(checklistMaintenanceRepository.findAllByChecklistId(checklist.getId())).hasSize(
                checklistMaintenances.size());
    }

    @DisplayName("관리비 포함 항목 작성 실패: 관리 항목 id가 중복일 경우")
    @Test
    void createChecklistMaintenance_duplicatedId_exception() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        List<ChecklistMaintenance> checklistMaintenances = ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCES_DUPLICATE(
                checklist);

        // when & then
        assertThatThrownBy(
                () -> checklistMaintenanceService.createMaintenances(checklistMaintenances))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.MAINTENANCE_ITEM_DUPLICATE.getMessage());
    }

    @DisplayName("관리비 포함 항목 삭제 성공")
    @Test
    void deleteAllByChecklistId() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        List<ChecklistMaintenance> checklistMaintenances = List.of(
                ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCE_WATERWORKS(checklist),
                ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCE_INTERNET(checklist)
        );
        checklistMaintenanceService.createMaintenances(checklistMaintenances);

        //when
        checklistMaintenanceService.deleteAllByChecklistId(checklist.getId());

        //then
        assertThat(checklistMaintenanceRepository.findAllByChecklistId(checklist.getId())).hasSize(0);
    }

    @DisplayName("관리비 포함 항목 수정 성공")
    @Test
    void updateChecklistMaintenance() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        List<ChecklistMaintenance> checklistMaintenances = ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCES(
                checklist);
        checklistMaintenanceService.createMaintenances(checklistMaintenances);

        //when
        List<ChecklistMaintenance> updateMaintenances = ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCES_UPDATE(
                checklist);
        checklistMaintenanceService.updateMaintenances(checklist.getId(), updateMaintenances);

        //then
        assertThat(checklistMaintenanceRepository.findAllByChecklistId(checklist.getId())).hasSize(
                updateMaintenances.size());
    }

    @DisplayName("관리비 포함 항목 수정 실패: : 관리 항목 id가 중복일 경우")
    @Test
    void updateChecklistMaintenance_duplicatedId_exception() {
        //given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
        List<ChecklistMaintenance> checklistMaintenances = ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCES(
                checklist);
        checklistMaintenanceService.createMaintenances(checklistMaintenances);

        //when & then
        List<ChecklistMaintenance> updateMaintenances = ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCES_DUPLICATE(
                checklist);
        assertThatThrownBy(
                () -> checklistMaintenanceService.updateMaintenances(checklist.getId(), updateMaintenances))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.MAINTENANCE_ITEM_DUPLICATE.getMessage());
    }
}
