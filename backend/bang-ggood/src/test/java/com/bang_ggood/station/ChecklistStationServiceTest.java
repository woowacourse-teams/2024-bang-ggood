package com.bang_ggood.station;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.station.repository.ChecklistStationRepository;
import com.bang_ggood.station.service.ChecklistStationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

public class ChecklistStationServiceTest extends IntegrationTestSupport {

    @Autowired
    ChecklistStationService checklistStationService;

    @Autowired
    ChecklistStationRepository checklistStationRepository;

    @DisplayName("ChecklistStation 객체를 생성 성공")
    @Test
    void createChecklistStations() {
        // given & when
        checklistStationService.createChecklistStations(1L, 38, 127);

        // then
        assertThat(checklistStationRepository.findByChecklistId(1L)).isNotEmpty();
    }
}
