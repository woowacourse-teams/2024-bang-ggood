package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.maintenance.domain.ChecklistMaintenance;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.question.dto.response.CategoryScoreResponsesV1;
import com.bang_ggood.station.domain.ChecklistStation;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import java.time.LocalDateTime;
import java.util.List;

public record ChecklistCompareResponseV1(
        Long checklistId, String roomName, String address, String buildingName,
        Double latitude, Double longitude,
        List<Integer> options, String structure, Double size,
        String floorLevel, Integer floor,
        SubwayStationResponses stations,
        Integer deposit, Integer rent,
        Integer maintenanceFee, List<Integer> includedMaintenances,
        Integer contractTerm, Integer occupancyMonth, String occupancyPeriod,
        String realEstate, LocalDateTime createdAt,
        CategoryScoreResponsesV1 categories
) {
    public static ChecklistCompareResponseV1 of(Checklist checklist, List<ChecklistOption> options,
                                                List<ChecklistStation> stations,
                                                List<ChecklistMaintenance> maintenances,
                                                CategoryScoreResponsesV1 categories) {
        return new ChecklistCompareResponseV1(
                checklist.getId(), checklist.getRoomName(), checklist.getRoomAddress(), checklist.getRoomBuildingName(),
                checklist.getRoomLatitude(), checklist.getRoomLongitude(),
                convertToOptionIds(options), checklist.getRoomStructure().getName(), checklist.getRoomSize(),
                checklist.getRoomFloorLevel().getName(), checklist.getRoomFloor(),
                convertToSubwayStationResponses(stations),
                checklist.getDeposit(), checklist.getRent(),
                checklist.getMaintenanceFee(), convertToMaintenancesIds(maintenances),
                checklist.getContractTerm(), checklist.getOccupancyMonth(), checklist.getOccupancyPeriod(),
                checklist.getRealEstate(), checklist.getCreatedAt(),
                categories);
    }

    private static List<Integer> convertToOptionIds(List<ChecklistOption> options) {
        return options.stream()
                .map(ChecklistOption::getOptionId)
                .toList();
    }

    private static SubwayStationResponses convertToSubwayStationResponses(List<ChecklistStation> stations) {
        List<SubwayStationResponse> subwayStationResponses = stations.stream()
                .map(SubwayStationResponse::from)
                .toList();
        return SubwayStationResponses.from(subwayStationResponses);
    }

    private static List<Integer> convertToMaintenancesIds(List<ChecklistMaintenance> maintenances) {
        return maintenances.stream()
                .map(ChecklistMaintenance::getMaintenanceItemId)
                .toList();
    }

}
