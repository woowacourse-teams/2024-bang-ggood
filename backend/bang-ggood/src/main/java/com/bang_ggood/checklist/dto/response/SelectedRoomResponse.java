package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import java.time.LocalDateTime;
import java.util.List;

public record SelectedRoomResponse(String roomName, Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                   String address, String buildingName, String realEstate,
                                   Double size, String floorLevel, String structure,
                                   Integer occupancyMonth, String  occupancyPeriod, String memo, String summary,
                                   List<Integer> includedMaintenances, Integer maintenanceFee,
                                   LocalDateTime createdAt) {

    public static SelectedRoomResponse of(Checklist checklist, List<Integer> includedMaintenances) {
        return new SelectedRoomResponse(checklist.getName(), checklist.getDeposit(), checklist.getRent(),
                checklist.getContractTerm(), checklist.getFloor(), checklist.getBuildingAddress(),
                checklist.getBuildingName(), checklist.getRealEstate(),
                checklist.getSize(), checklist.getFloorLevel().getName(),
                checklist.getStructure().getName(), checklist.getOccupancyMonth(), checklist.getOccupancyPeriod(),
                checklist.getMemo(), checklist.getSummary(), includedMaintenances, checklist.getMaintenanceFee(),
                checklist.getCreatedAt());
    }
}
