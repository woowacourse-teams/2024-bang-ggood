package com.bang_ggood.room.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import java.time.LocalDateTime;
import java.util.List;

public record SelectedRoomResponseV1(String roomName, Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                     String address, String buildingName, String realEstate,
                                     Double size, String floorLevel, String structure,
                                     Integer occupancyMonth, String occupancyPeriod, String memo, String summary,
                                     List<Integer> includedMaintenances, Integer maintenanceFee, LocalDateTime createdAt) {

    public static SelectedRoomResponseV1 of(Checklist checklist, List<Integer> includedMaintenances) {
        return new SelectedRoomResponseV1(checklist.getRoomName(), checklist.getDeposit(), checklist.getRent(),
                checklist.getContractTerm(), checklist.getRoomFloor(), checklist.getRoomAddress(),
                checklist.getRoomBuildingName(), checklist.getRealEstate(),
                checklist.getRoomSize(), checklist.getRoomFloorLevel().getName(),
                checklist.getRoomStructure().getName(), checklist.getOccupancyMonth(), checklist.getOccupancyPeriod(),
                checklist.getMemo(), checklist.getSummary(), includedMaintenances, checklist.getMaintenanceFee(), checklist.getCreatedAt());
    }

    public static SelectedRoomResponseV1 from(SelectedRoomResponse response) {
        return new SelectedRoomResponseV1(
                response.roomName(), response.deposit(), response.rent(),
                response.contractTerm(), response.floor(), response.address(),
                response.buildingName(), response.realEstate(),
                response.size(), response.floorLevel(), response.structure(),
                response.occupancyMonth(), response.occupancyPeriod(), response.memo(), response.summary(),
                response.includedMaintenances(), response.maintenanceFee(), response.createdAt()
        );
    }
}
