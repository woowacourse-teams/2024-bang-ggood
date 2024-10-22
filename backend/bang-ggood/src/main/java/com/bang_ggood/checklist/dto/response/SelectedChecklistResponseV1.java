package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.option.dto.response.SelectedOptionResponse;
import com.bang_ggood.question.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.room.dto.response.SelectedRoomResponse;
import com.bang_ggood.room.dto.response.SelectedRoomResponseV1;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import java.util.List;

public record SelectedChecklistResponseV1(SelectedRoomResponseV1 room,
                                          List<SelectedOptionResponse> options,
                                          List<SelectedCategoryQuestionsResponse> categories,
                                          boolean isLiked,
                                          SubwayStationResponses stations) {

    public static SelectedChecklistResponseV1 of(SelectedRoomResponse room, List<SelectedOptionResponse> options,
                                                 List<SelectedCategoryQuestionsResponse> categories, boolean isLiked,
                                                 SubwayStationResponses stations) {
        return new SelectedChecklistResponseV1(SelectedRoomResponseV1.from(room), options, categories, isLiked,
                stations);
    }
}
