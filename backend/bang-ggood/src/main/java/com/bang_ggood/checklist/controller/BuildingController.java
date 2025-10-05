package com.bang_ggood.checklist.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.checklist.dto.response.BuildingAndChecklistsResponse;
import com.bang_ggood.checklist.service.BuildingManageService;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BuildingController {

    private final BuildingManageService buildingManageService;

    @GetMapping("/buildings/{id}")
    public BuildingAndChecklistsResponse readBuildingAndChecklists(@AuthRequiredPrincipal User user, @PathVariable("id") Long buildingId) {
        return buildingManageService.readBuildingAndChecklists(user, buildingId);
    }
}
