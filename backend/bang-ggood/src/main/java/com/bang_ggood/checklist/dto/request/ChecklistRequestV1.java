package com.bang_ggood.checklist.dto.request;

import com.bang_ggood.question.dto.request.QuestionRequest;
import com.bang_ggood.room.dto.request.RoomRequest;
import com.bang_ggood.station.dto.request.ChecklistStationRequest;
import jakarta.validation.Valid;
import java.util.List;

public record ChecklistRequestV1(@Valid RoomRequest room, List<Integer> options,
                                 @Valid List<QuestionRequest> questions,
                                 ChecklistStationRequest geolocation) {

    public ChecklistRequest toChecklistRequest() {
        return new ChecklistRequest(room, options, questions);
    }
}
