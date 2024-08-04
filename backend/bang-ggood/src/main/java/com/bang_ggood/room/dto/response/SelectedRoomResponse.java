package com.bang_ggood.room.dto.response;

import com.bang_ggood.checklist.domain.Checklist;

public record SelectedRoomResponse(String roomName, Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                   String address, String station, Integer walkingTime, String realEstate,
                                   String type, Integer size, String floorLevel, String structure) {

    public static SelectedRoomResponse of(Checklist checklist) {
        return new SelectedRoomResponse(checklist.getRoomName(), checklist.getDeposit(), checklist.getRent(),
                checklist.getContractTerm(), checklist.getRoomFloor(), checklist.getRoomAddress(),
                checklist.getRoomStation(), checklist.getRoomWalkingTime(), checklist.getRealEstate(),
                checklist.getRoomType().getName(), checklist.getRoomSize(), checklist.getRoomFloorLevel().getName(),
                checklist.getRoomStructure().getName());
    }
}
