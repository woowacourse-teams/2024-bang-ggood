package com.bang_ggood.checklist.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.auth.config.UserPrincipal;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.ChecklistRequestV1;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponseV1;
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
    public ResponseEntity<Void> createChecklist(@AuthRequiredPrincipal User user,
                                                @Valid @RequestBody ChecklistRequest checklistRequest) {
        long checklistId = checklistManageService.createChecklist(user, checklistRequest);
        return ResponseEntity.created(URI.create("/checklist/" + checklistId)).build();
    }

    @PostMapping("/v1/checklists")
    public ResponseEntity<Void> createChecklistV1(@AuthRequiredPrincipal User user,
                                                  @Valid @RequestBody ChecklistRequestV1 checklistRequestV1) {
        long checklistId = checklistManageService.createChecklistV1(user, checklistRequestV1);
        return ResponseEntity.created(URI.create("/checklists/" + checklistId)).build();
    }

    @GetMapping("/checklists/{id}")
    public ResponseEntity<SelectedChecklistResponse> readChecklistById(@UserPrincipal User user,
                                                                       @PathVariable("id") Long checklistId) {
        return ResponseEntity.ok(checklistManageService.readChecklist(user, checklistId));
    }

    @GetMapping("v1/checklists/{id}")
    public ResponseEntity<SelectedChecklistResponseV1> readChecklistByIdV1(@UserPrincipal User user,
                                                                           @PathVariable("id") Long checklistId) {
        return ResponseEntity.ok(checklistManageService.readChecklistV1(user, checklistId));
    }

    @GetMapping("/checklists")
    public ResponseEntity<ChecklistsPreviewResponse> readChecklistsPreview(@UserPrincipal User user) {
        return ResponseEntity.ok(checklistManageService.readAllChecklistsPreview(user));
    }

    @GetMapping("/checklists/like")
    public ResponseEntity<ChecklistsPreviewResponse> readLikedChecklistsPreview(@AuthRequiredPrincipal User user) {
        return ResponseEntity.ok(checklistManageService.readLikedChecklistsPreview(user));
    }

    @PutMapping("/checklists/{id}")
    public ResponseEntity<Void> updateChecklistById(
            @AuthRequiredPrincipal User user,
            @PathVariable("id") long id,
            @Valid @RequestBody ChecklistRequest checklistRequest) {
        checklistManageService.updateChecklistById(user, id, checklistRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/checklists/{id}")
    public ResponseEntity<Void> deleteChecklistById(@AuthRequiredPrincipal User user, @PathVariable("id") long id) {
        checklistManageService.deleteChecklistById(user, id);
        return ResponseEntity.noContent().build();
    }
}
