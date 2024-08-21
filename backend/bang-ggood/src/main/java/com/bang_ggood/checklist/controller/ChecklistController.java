package com.bang_ggood.checklist.controller;

import com.bang_ggood.auth.config.AuthPrincipal;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
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

    private final ChecklistService checklistService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    @PostMapping("/checklists")
    public ResponseEntity<Void> createChecklist(@AuthPrincipal User user,
                                                @Valid @RequestBody ChecklistRequest checklistRequest) {
        long checklistId = checklistService.createChecklist(user, checklistRequest);
        return ResponseEntity.created(URI.create("/checklists/" + checklistId)).build();
    }

    @PostMapping("/checklists/{id}/like")
    public ResponseEntity<Void> createChecklistLike(@AuthPrincipal User user, @PathVariable("id") long id) {
        checklistService.createChecklistLike(user, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/checklists/questions")
    public ResponseEntity<ChecklistQuestionsResponse> readChecklistQuestions(@AuthPrincipal User user) {
        return ResponseEntity.ok(checklistService.readChecklistQuestions(user));
    }

    @GetMapping("/checklists/{id}")
    public ResponseEntity<SelectedChecklistResponse> readChecklistById(@AuthPrincipal User user,
                                                                       @PathVariable("id") long id) {
        return ResponseEntity.ok(checklistService.readChecklistById(user, id));
    }

    @GetMapping("/checklists")
    public ResponseEntity<UserChecklistsPreviewResponse> readChecklistsPreview(@AuthPrincipal User user) {
        return ResponseEntity.ok(checklistService.readChecklistsPreview(user));
    }

    @GetMapping("/custom-checklist/all")
    public ResponseEntity<CategoryCustomChecklistQuestionsResponse> readAllCustomChecklistQuestions(
            @AuthPrincipal User user) {
        return ResponseEntity.ok(checklistService.readAllCustomChecklistQuestions(user));
    }

    @GetMapping("/checklists/like")
    public ResponseEntity<UserChecklistsPreviewResponse> readLikedChecklistsPreview(@AuthPrincipal User user) {
        return ResponseEntity.ok(checklistService.readLikedChecklistsPreview(user));
    }

    @PutMapping("/checklists/{id}")
    public ResponseEntity<Void> updateChecklistById(
            @AuthPrincipal User user,
            @PathVariable("id") long id,
            @Valid @RequestBody ChecklistRequest checklistRequest) {
        checklistService.updateChecklistById(user, id, checklistRequest);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/custom-checklist")
    public ResponseEntity<Void> updateCustomChecklist(@AuthPrincipal User user,
                                                      @RequestBody CustomChecklistUpdateRequest request) {
        checklistService.updateCustomChecklist(user, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/checklists/{id}")
    public ResponseEntity<Void> deleteChecklistById(@AuthPrincipal User user, @PathVariable("id") long id) {
        checklistService.deleteChecklistById(user, id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/checklists/{id}/like")
    public ResponseEntity<Void> deleteChecklistLikeByChecklistId(@AuthPrincipal User user,
                                                                 @PathVariable("id") long id) {
        checklistService.deleteChecklistLikeByChecklistId(user, id);
        return ResponseEntity.noContent().build();
    }
}
