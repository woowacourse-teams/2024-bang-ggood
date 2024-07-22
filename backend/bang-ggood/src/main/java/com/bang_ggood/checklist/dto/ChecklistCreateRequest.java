package com.bang_ggood.checklist.dto;

import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.RoomCreateRequest;
import java.util.List;

public record ChecklistCreateRequest(RoomCreateRequest room, List<Integer> options, QuestionsCreateRequest questions) {

    public Room toRoomEntity() {
        return room.toRoomEntity();
    }

    public ChecklistInfo toChecklistInfo() {
        return new ChecklistInfo(room.deposit(), room.rent(), room.contractTerm(), room.realEstate());
    }
}
