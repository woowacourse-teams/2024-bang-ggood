package com.bang_ggood.station.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.repository.ChecklistStationRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ChecklistStationServiceTest extends IntegrationTestSupport {

    @Autowired
    RoomRepository roomRepository;

    @Autowired
    ChecklistRepository checklistRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ChecklistStationService checklistStationService;

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

    @DisplayName("ChecklistStation 객체 생성 성공")
    @Test
    void createChecklistStations() {
        // given & when
        checklistStationService.createChecklistStations(checklist, 38, 127);

        // then
        assertThat(checklistStationRepository.findByChecklist(checklist)).isNotEmpty();
    }

    @DisplayName("ChecklistStation 조회 성공")
    @Test
    void readChecklistStations() {
        // given
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        User user = userRepository.save(UserFixture.USER1());
        Checklist checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));

        ChecklistStation checklistStation1 = new ChecklistStation(checklist, "잠실", "2호선", 5);
        ChecklistStation checklistStation2 = new ChecklistStation(checklist, "잠실", "8호선", 6);
        checklistStationRepository.saveAll(List.of(checklistStation1, checklistStation2));

        // when & then
        assertThat(checklistStationService.readChecklistStationsByChecklist(checklist))
                .containsExactlyInAnyOrder(checklistStation1, checklistStation2);
    }
}
