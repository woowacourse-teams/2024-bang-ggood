package com.bang_ggood.station.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.request.ChecklistStationRequest;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.repository.ChecklistStationRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ChecklistStationManageServiceTest extends IntegrationTestSupport {

    @Autowired
    ChecklistStationManageService checklistStationManageService;

    @Autowired
    ChecklistStationRepository checklistStationRepository;

    @DisplayName("ChecklistStation 객체 생성 성공")
    @Test
    void createChecklistStations() {
        // given & when
        checklistStationManageService.createChecklistStations(1L, ChecklistStationRequest.of(38, 127));

        // then
        assertThat(checklistStationRepository.findByChecklistId(1L)).isNotEmpty();
    }

    @DisplayName("체크리스트 아이디로 역 조회 성공")
    @Test
    void readStationsByChecklistId() {
        // given
        ChecklistStation checklistStation1 = new ChecklistStation(1L, "잠실", "2호선", 5);
        ChecklistStation checklistStation2 = new ChecklistStation(1L, "잠실", "8호선", 6);
        checklistStationRepository.saveAll(List.of(checklistStation1, checklistStation2));

        // when
        List<SubwayStationResponse> responses = checklistStationManageService.readStationsByChecklistId(1L);

        // then
        assertThat(responses).hasSize(1);
        assertThat(responses.get(0).getStationName()).isEqualTo("잠실");
        assertThat(responses.get(0).getStationLine()).containsExactlyInAnyOrder("2호선", "8호선");
    }

    @DisplayName("저장된 역이 없는 경우 빈 리스트 반환 성공")
    @Test
    void readStationsByChecklistId_noData() {
        // given & when
        List<SubwayStationResponse> responses = checklistStationManageService.readStationsByChecklistId(1L);

        // then
        assertThat(responses).hasSize(0);
    }
}
