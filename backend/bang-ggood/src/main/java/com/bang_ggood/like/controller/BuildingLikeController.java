package com.bang_ggood.like.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.like.service.BuildingLikeManageService;
import com.bang_ggood.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class BuildingLikeController {

    private final BuildingLikeManageService buildingLikeManageService;

    @PostMapping("/buildings/{id}/like")
    public ResponseEntity<Void> createBuildingLike(@AuthRequiredPrincipal User user, @PathVariable("id") Long id) {
        buildingLikeManageService.createLike(user, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/buildings/{id}/like")
    public ResponseEntity<Void> deleteBuildingLike(@AuthRequiredPrincipal User user, @PathVariable("id") long id) {
        buildingLikeManageService.deleteLike(user, id);
        return ResponseEntity.noContent().build();
    }
}
