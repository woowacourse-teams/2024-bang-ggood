package com.bang_ggood.room.dto;

import com.bang_ggood.checklist.domain.Checklist;

public record WrittenRoomResponse(String name, Integer deposit, Integer rent, Integer contractTerm, Integer floor,
                                  String address, String station, Integer walkingTime, String realEstate) {

    public static WrittenRoomResponse of(Checklist checklist) {
        return new WrittenRoomResponse(
                checklist.getRoomName(),
                checklist.getDeposit(),
                checklist.getRent(),
                checklist.getContractTerm(),
                checklist.getRoomFloor(),
                checklist.getRoomAddress(),
                checklist.getRoomStation(),
                checklist.getRoomWalkingTime(),
                checklist.getRealEstate());
    }
}
