package com.bang_ggood.checklist.dto.request;

import com.bang_ggood.checklist.domain.Building;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.FloorLevel;
import com.bang_ggood.checklist.domain.Structure;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import java.util.List;

public record ChecklistRequest(@Valid RoomRequest room, List<Integer> options,
                               @Valid List<QuestionRequest> questions) {

    public Checklist toChecklistEntity(User user, Building building) {
        return new Checklist(user, building, room.buildingName(), FloorLevel.from(room.floorLevel()), room.floor(),
                Structure.from(room.structure()), room.size(),
                room.deposit(), room.rent(), room.maintenanceFee(), room.contractTerm(),
                OccupancyMonth.from(room.occupancyMonth()), OccupancyPeriod.from(room.occupancyPeriod()),
                room.realEstate(), room.memo(), room.summary());
    }

    public Building toBuildingEntity() {
        return new Building(room.address(), room.buildingName(), room().latitude(), room().longitude());
    }
}
