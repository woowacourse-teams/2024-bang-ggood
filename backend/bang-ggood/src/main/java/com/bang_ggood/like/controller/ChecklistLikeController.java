package com.bang_ggood.like.controller;

import com.bang_ggood.auth.config.AuthPrincipal;
import com.bang_ggood.like.service.ChecklistLikeManageService;
import com.bang_ggood.user.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChecklistLikeController {

    private final ChecklistLikeManageService checklistLikeManageService;

    public ChecklistLikeController(ChecklistLikeManageService checklistLikeManageService) {
        this.checklistLikeManageService = checklistLikeManageService;
    }

    @PostMapping("/checklists/{id}/like")
    public ResponseEntity<Void> createChecklistLike(@AuthPrincipal User user, @PathVariable("id") Long id) {
        checklistLikeManageService.createLike(user, id);
        return ResponseEntity.noContent().build();
    }
}
