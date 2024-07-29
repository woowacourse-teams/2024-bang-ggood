package com.bang_ggood.checklist.controller;

import com.bang_ggood.checklist.dto.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.user.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChecklistController {

    private final ChecklistService checklistService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    @GetMapping("/checklists")
    public ResponseEntity<UserChecklistsPreviewResponse> readUserChecklistsPreview() {
        User user = new User(1L, "방방이");
        return ResponseEntity.ok(checklistService.readUserChecklistsPreview(user));
    }
}
