package com.bang_ggood.station.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ChecklistStationRepositoryTest extends IntegrationTestSupport {

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    ChecklistRepository checklistRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ChecklistStationRepository checklistStationRepository;

    Room room;
    User user;
    Checklist checklist;

    @BeforeEach
    void setUp() {
        room = roomRepository.save(RoomFixture.ROOM_1());
        user = userRepository.save(UserFixture.USER1());
        checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
    }

    @DisplayName("체크리스트 아이디를 통한 조회 성공")
    @Test
    void findByChecklistId() {
        // given
        ChecklistStation checklistStation1 = new ChecklistStation(checklist, "잠실", "2호선", 5);
        ChecklistStation checklistStation2 = new ChecklistStation(checklist, "잠실", "8호선", 6);
        checklistStationRepository.saveAll(List.of(checklistStation1, checklistStation2));

        // when & then
        assertThat(checklistStationRepository.findByChecklist(checklist))
                .containsExactlyInAnyOrder(checklistStation1, checklistStation2);
    }

    @DisplayName("체크리스트 아이디를 통한 조회 실패: 저장된 값이 없는 경우")
    @Test
    void findByChecklistId_noData_exception() {
        // given & when & then
        assertThat(checklistStationRepository.findByChecklist(checklist))
                .isEmpty();
    }

    @DisplayName("체크리스트 아이디를 통한 삭제 성공")
    @Test
    void deleteAllByChecklistId_noData_exception() {
        // given
        ChecklistStation checklistStation1 = new ChecklistStation(checklist, "잠실", "2호선", 5);
        ChecklistStation checklistStation2 = new ChecklistStation(checklist, "잠실", "8호선", 6);
        checklistStationRepository.saveAll(List.of(checklistStation1, checklistStation2));

        // when
        checklistStationRepository.deleteAllByChecklistId(checklist.getId());

        // then
        assertThat(checklistStationRepository.findByChecklist(checklist)).isEmpty();
    }
}
