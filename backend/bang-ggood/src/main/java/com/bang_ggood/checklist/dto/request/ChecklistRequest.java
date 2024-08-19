package com.bang_ggood.checklist.dto.request;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.OccupancyMonth;
import com.bang_ggood.checklist.domain.OccupancyPeriod;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.request.RoomRequest;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import java.util.List;

public record ChecklistRequest(@Valid RoomRequest room, List<Integer> options,
                               @Valid List<QuestionRequest> questions) {

    public Room toRoomEntity() {
        return room.toRoomEntity();
    }

    public Checklist toChecklistEntity(Room roomEntity, User user) {
        return new Checklist(roomEntity, user, room.deposit(), room.rent(),
                room.contractTerm(), room.realEstate(), room.memo(), room.summary(),
                OccupancyMonth.from(room.occupancyMonth()), OccupancyPeriod.from(room.occupancyPeriod()));
    }
}
