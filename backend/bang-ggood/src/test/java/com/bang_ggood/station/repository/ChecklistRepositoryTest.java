package com.bang_ggood.station.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.station.domain.ChecklistStation;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

public class ChecklistRepositoryTest extends IntegrationTestSupport {

    @Autowired
    ChecklistStationRepository checklistStationRepository;

    @DisplayName("체크리스트 아이디를 통한 조회 성공")
    @Test
    void findByChecklistId() {
        // given
        ChecklistStation checklistStation1 = new ChecklistStation(1L, "잠실", "2호선");
        ChecklistStation checklistStation2 = new ChecklistStation(1L, "잠실", "8호선");
        checklistStationRepository.saveAll(List.of(checklistStation1, checklistStation2));

        // when & then
        assertThat(checklistStationRepository.findByChecklistId(1L))
                .containsExactlyInAnyOrder(checklistStation1, checklistStation2);
    }

    @DisplayName("체크리스트 아이디를 통한 조회 실패: 저장된 값이 없는 경우")
    @Test
    void findByChecklistId_noData_exception() {
        // given & when & then
        assertThat(checklistStationRepository.findByChecklistId(1L))
                .isEmpty();
    }
}
