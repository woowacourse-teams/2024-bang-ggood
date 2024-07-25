package com.bang_ggood.checklist.controller;

import com.bang_ggood.checklist.dto.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.service.ChecklistService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RestController
public class ChecklistController {

    private final ChecklistService checklistService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    @PostMapping("/checklists")
    public ResponseEntity<Void> createChecklist(@Valid @RequestBody ChecklistCreateRequest checklistCreateRequest) {
        long checklistId = checklistService.createChecklist(checklistCreateRequest);
        return ResponseEntity.created(URI.create("/checklists/" + checklistId)).build();
    }

    @GetMapping("/checklists")
    public ResponseEntity<UserChecklistsPreviewResponse> readUserChecklistsPreview() {
        return ResponseEntity.ok(checklistService.readUserChecklistsPreview());
    }
}
