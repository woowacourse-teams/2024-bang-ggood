package com.bang_ggood.checklist.dto.request;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.contract.domain.OccupancyMonth;
import com.bang_ggood.contract.domain.OccupancyPeriod;
import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.dto.request.RoomRequest;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChecklistRequestV2 {

    @Valid
    private RoomRequest room;

    private List<Integer> options;

    @Valid
    private List<QuestionRequest> questions;

    private List<MultipartFile> images;

    public Room toRoomEntity() {
        return room.toRoomEntity();
    }

    public Checklist toChecklistEntity(Room roomEntity, User user) {
        return new Checklist(roomEntity, user, room.deposit(), room.rent(), room.maintenanceFee(),
                room.contractTerm(), OccupancyMonth.from(room.occupancyMonth()),
                OccupancyPeriod.from(room.occupancyPeriod()),
                room.realEstate(), room.memo(), room.summary());
    }
}
