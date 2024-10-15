package com.bang_ggood.room.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public record SelectedRoomResponseV1(String roomName, Integer deposit, Integer rent, Integer contractTerm,
                                     Integer floor,
                                     String address, String buildingName, String realEstate,
                                     Double size, String floorLevel, String structure,
                                     Integer occupancyMonth, String occupancyPeriod, String memo, String summary,
                                     List<Integer> includedMaintenances, Integer maintenanceFee,
                                     LocalDateTime createdAt) {

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
