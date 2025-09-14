package com.bang_ggood.checklist.dto.response;

import com.bang_ggood.option.dto.response.SelectedOptionResponse;
import com.bang_ggood.question.dto.response.SelectedCategoryQuestionsResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import java.util.List;

public record SelectedChecklistResponseV2(List<ChecklistImageResponse> images,
                                          SelectedRoomResponseV1 room,
                                          List<SelectedOptionResponse> options,
                                          List<SelectedCategoryQuestionsResponse> categories,
                                          boolean isLiked,
                                          List<SubwayStationResponse> stations) {

    public static SelectedChecklistResponseV2 of(List<ChecklistImageResponse> images, SelectedRoomResponse room,
                                                 List<SelectedOptionResponse> options,
                                                 List<SelectedCategoryQuestionsResponse> categories, boolean isLiked,
                                                 SubwayStationResponses stations) {
        return new SelectedChecklistResponseV2(images, SelectedRoomResponseV1.from(room), options,
                categories, isLiked, stations.getStations());
    }
}
