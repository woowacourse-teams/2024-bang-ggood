package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.option.dto.response.SelectedOptionResponse;
import com.bang_ggood.question.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import java.util.List;

public record SelectedChecklistResponse(SelectedRoomResponseV1 room,
                                        List<SelectedOptionResponse> options,
                                        List<SelectedCategoryQuestionsResponse> categories,
                                        boolean isLiked,
                                        List<SubwayStationResponse> stations) {

    public static SelectedChecklistResponse of(SelectedRoomResponse room, List<SelectedOptionResponse> options,
                                               List<SelectedCategoryQuestionsResponse> categories, boolean isLiked,
                                               SubwayStationResponses stations) {
        return new SelectedChecklistResponse(SelectedRoomResponseV1.from(room), options, categories, isLiked,
                stations.getStations());
    }
}
