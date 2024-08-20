package com.bang_ggood.room.dto.response;

import com.bang_ggood.checklist.domain.Checklist;
import java.time.LocalDateTime;

public record SelectedRoomResponse(String roomName, Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                   String address, String station, Integer walkingTime, String realEstate,
                                   String type, Double size, String floorLevel, String structure,
                                   Integer occupancyMonth, String occupancyPeriod, String memo, String summary, LocalDateTime createdAt) {

    public static SelectedRoomResponse of(Checklist checklist) {
        return new SelectedRoomResponse(checklist.getRoomName(), checklist.getDeposit(), checklist.getRent(),
                checklist.getContractTerm(), checklist.getRoomFloor(), checklist.getRoomAddress(),
                checklist.getRoomStation(), checklist.getRoomWalkingTime(), checklist.getRealEstate(),
                null, checklist.getRoomSize(), checklist.getRoomFloorLevel().getName(),
                checklist.getRoomStructure().getName(), checklist.getOccupancyMonth(), checklist.getOccupancyPeriod(),
                checklist.getMemo(), checklist.getSummary(), checklist.getCreatedAt());
    }
}
