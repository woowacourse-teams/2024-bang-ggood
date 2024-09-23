package com.bang_ggood.checklist.controller;

import com.bang_ggood.auth.config.AuthPrincipal;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RestController
public class ChecklistController {

    private final ChecklistManageService checklistManageService;
    private final ChecklistService checklistService;

    public ChecklistController(ChecklistManageService checklistManageService, ChecklistService checklistService) {
        this.checklistManageService = checklistManageService;
        this.checklistService = checklistService;
    }

    @PostMapping("/checklists")
    public ResponseEntity<Void> createChecklist(@AuthPrincipal User user,
                                                @Valid @RequestBody ChecklistRequest checklistRequest) {
        long checklistId = checklistManageService.createChecklist(user, checklistRequest);
        return ResponseEntity.created(URI.create("/checklists/" + checklistId)).build();
    }

    @GetMapping("/checklists/{id}")
    public ResponseEntity<SelectedChecklistResponse> readChecklistById(@AuthPrincipal User user,
                                                                       @PathVariable("id") Long checklistId) {
        return ResponseEntity.ok(checklistManageService.readChecklist(user, checklistId));
    }

    @GetMapping("/checklists")
    public ResponseEntity<ChecklistsPreviewResponse> readChecklistsPreview(@AuthPrincipal User user) {
        return ResponseEntity.ok(checklistService.readChecklistsPreview(user));
    }

    @GetMapping("/checklists/like")
    public ResponseEntity<ChecklistsPreviewResponse> readLikedChecklistsPreview(@AuthPrincipal User user) {
        return ResponseEntity.ok(checklistManageService.readLikedChecklistsPreview(user));
    }

    @PutMapping("/checklists/{id}")
    public ResponseEntity<Void> updateChecklistById(
            @AuthPrincipal User user,
            @PathVariable("id") long id,
            @Valid @RequestBody ChecklistRequest checklistRequest) {
        checklistManageService.updateChecklistById(user, id, checklistRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/checklists/{id}")
    public ResponseEntity<Void> deleteChecklistById(@AuthPrincipal User user, @PathVariable("id") long id) {
        checklistService.deleteChecklistById(user, id);
        return ResponseEntity.noContent().build();
    }
}
