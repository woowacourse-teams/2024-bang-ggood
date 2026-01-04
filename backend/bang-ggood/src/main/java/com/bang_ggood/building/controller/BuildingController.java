package com.bang_ggood.building.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.global.dto.request.CursorRequest;
import com.bang_ggood.building.dto.response.BuildingResponse;
import com.bang_ggood.building.service.BuildingManageService;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BuildingController {

    private final BuildingManageService buildingManageService;

    @GetMapping("/buildings/{id}/checklists")
    public ResponseEntity<BuildingResponse> readBuildingAndChecklists(
            @AuthRequiredPrincipal User user,
            @PathVariable("id") Long buildingId,
            @Valid @ModelAttribute CursorRequest cursorRequest)
    {
        return ResponseEntity.ok(buildingManageService.readBuildingAndChecklists(buildingId, cursorRequest));
    }
}
