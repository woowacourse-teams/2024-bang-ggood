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
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
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

    private Checklist checklist;

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
        roomRepository.save(RoomFixture.ROOM_1);
        checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1);
    }

    @DisplayName("관리비 포함 항목 작성 성공")
    @Test
    void createChecklistMaintenance() {
        //given
        List<ChecklistMaintenance> checklistMaintenances = List.of(
                ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCE_WATERWORKS,
                ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCE_INTERNET
        );

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
        List<ChecklistMaintenance> checklistMaintenances = List.of(
                ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCE_WATERWORKS,
                ChecklistMaintenanceFixture.CHECKLIST1_MAINTENANCE_WATERWORKS
        );

        // when & then
        assertThatThrownBy(
                () -> checklistMaintenanceService.createMaintenances(checklistMaintenances))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.MAINTENANCE_ITEM_DUPLICATE.getMessage());
    }
}
