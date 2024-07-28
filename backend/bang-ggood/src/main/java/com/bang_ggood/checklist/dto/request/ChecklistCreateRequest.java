package com.bang_ggood.checklist.dto.request;

import com.bang_ggood.checklist.dto.ChecklistInfo;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.request.RoomCreateRequest;
import jakarta.validation.Valid;
import java.util.List;

public record ChecklistCreateRequest(@Valid RoomCreateRequest room, List<Integer> options,
                                     @Valid List<QuestionCreateRequest> questions) {

    public Room toRoomEntity() {
        return room.toRoomEntity();
    }

    public ChecklistInfo toChecklistInfo() {
        return new ChecklistInfo(room.deposit(), room.rent(), room.contractTerm(), room.realEstate());
    }
}
