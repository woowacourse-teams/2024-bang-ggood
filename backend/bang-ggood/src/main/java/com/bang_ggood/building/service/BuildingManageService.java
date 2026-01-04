package com.bang_ggood.building.service;

import com.bang_ggood.building.domain.Building;
import com.bang_ggood.building.domain.BuildingImage;
import com.bang_ggood.global.dto.request.CursorRequest;
import com.bang_ggood.building.dto.response.BuildingChecklistResponse;
import com.bang_ggood.building.dto.response.BuildingResponse;
import com.bang_ggood.building.service.image.BuildingImageService;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.global.domain.CursorResult;
import com.bang_ggood.option.service.ChecklistOptionService;
import com.bang_ggood.question.domain.Category;
import com.bang_ggood.question.dto.response.CategoryScoreResponse;
import com.bang_ggood.question.dto.response.CategoryScoreResponses;
import com.bang_ggood.question.service.ChecklistQuestionService;
import com.bang_ggood.station.dto.response.SubwayStationResponse;
import com.bang_ggood.station.dto.response.SubwayStationResponses;
import com.bang_ggood.station.service.BuildingStationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class BuildingManageService {

    private final BuildingService buildingService;
    private final BuildingImageService buildingImageService;
    private final BuildingStationService buildingStationService;
    private final ChecklistOptionService checklistOptionService;
    private final ChecklistQuestionService checklistQuestionService;

    @Transactional(readOnly = true)
    public BuildingResponse readBuildingAndChecklists(Long buildingId, CursorRequest cursorRequest) {
        Building building = buildingService.readBuilding(buildingId);
        Integer checklistCount = buildingService.countChecklists(building);
        // TODO 좋아요 여부
        SubwayStationResponses stations = readSubwayStations(building);
        List<String> photos = readBuildingImages(building);

        CursorResult<Checklist> buildingChecklists = buildingService.readChecklists(building, cursorRequest.cursor(), cursorRequest.toPageable());
        List<BuildingChecklistResponse> checklists = buildingChecklists.getItems().stream()
                .map(this::assembleChecklistBuilding)
                .toList();
        return BuildingResponse.of(building, checklistCount, stations, photos, false, checklists, buildingChecklists.getLastCursor());
    }

    private SubwayStationResponses readSubwayStations(Building building) {
        List<SubwayStationResponse> subwayStations = buildingStationService.readBuildingStations(building)
                .stream()
                .map(SubwayStationResponse::from)
                .toList();
        return SubwayStationResponses.from(subwayStations);
    }

    private List<String> readBuildingImages(Building building) {
        return buildingImageService.readBuildingImages(building)
                .stream()
                .map(BuildingImage::getImageUrl)
                .toList();
    }

    private BuildingChecklistResponse assembleChecklistBuilding(Checklist checklist) {
        Integer optionCount = checklistOptionService.countChecklistOptions(checklist.getId());
        CategoryScoreResponses categoryScoreResponses = calculateCategoryScores(checklist.getId());
        return BuildingChecklistResponse.of(checklist, checklist.getUserName(), optionCount, categoryScoreResponses);
    }

    private CategoryScoreResponses calculateCategoryScores(Long checklistId) {
        List<CategoryScoreResponse> categoryScoreResponses = new ArrayList<>();
        List<Category> categories = checklistQuestionService.findCategories(checklistId);
        for (Category category : categories) {
            Integer score = checklistQuestionService.calculateCategoryScore(checklistId, category.getId());
            categoryScoreResponses.add(new CategoryScoreResponse(category.getId(), category.getName(), score));
        }
        return new CategoryScoreResponses(categoryScoreResponses);
    }
}
