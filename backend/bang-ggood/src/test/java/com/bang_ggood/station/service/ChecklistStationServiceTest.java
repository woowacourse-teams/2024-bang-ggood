package com.bang_ggood.station.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.repository.ChecklistStationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ChecklistStationServiceTest extends IntegrationTestSupport {

    @Autowired
    ChecklistStationService checklistStationService;

    @Autowired
    ChecklistStationRepository checklistStationRepository;

    @DisplayName("ChecklistStation 객체 생성 성공")
    @Test
    void createChecklistStations() {
        // given & when
        checklistStationService.createChecklistStations(1L, 38, 127);

        // then
        assertThat(checklistStationRepository.findByChecklistId(1L)).isNotEmpty();
    }

    @DisplayName("ChecklistStation 조회 성공")
    @Test
    void readChecklistStations() {
        // given
        ChecklistStation checklistStation1 = new ChecklistStation(1L, "잠실", "2호선", 5);
        ChecklistStation checklistStation2 = new ChecklistStation(1L, "잠실", "8호선", 6);
        checklistStationRepository.saveAll(List.of(checklistStation1, checklistStation2));

        // when & then
        assertThat(checklistStationService.readChecklistStationsByChecklistId(1L))
                .containsExactlyInAnyOrder(checklistStation1, checklistStation2);
    }
}
