package com.bang_ggood.checklist.controller;

import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;
import java.util.List;


@RestController
public class ChecklistController {

    private final ChecklistService checklistService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

    @PostMapping("/checklists")
    public ResponseEntity<Void> createChecklist(@Valid @RequestBody ChecklistRequest checklistRequest) {
        User user = new User(1L, "방방이", "bang-ggood@gmail.com");
        long checklistId = checklistService.createChecklist(user, checklistRequest);
        return ResponseEntity.created(URI.create("/checklists/" + checklistId)).build();
    }

    @GetMapping("/checklists/questions")
    public ResponseEntity<ChecklistQuestionsResponse> readChecklistQuestions() {
        return ResponseEntity.ok(checklistService.readChecklistQuestions());
    }

    @GetMapping("/checklists/{id}")
    public ResponseEntity<SelectedChecklistResponse> readChecklistById(@PathVariable("id") long id) {
        User user = new User(1L, "방방이", "bang-ggood@gmail.com");
        return ResponseEntity.ok(checklistService.readChecklistById(user, id));
    }

    @GetMapping("/checklists")
    public ResponseEntity<UserChecklistsPreviewResponse> readUserChecklistsPreview() {
        User user = new User(1L, "방방이", "bang-ggood@gmail.com");
        return ResponseEntity.ok(checklistService.readUserChecklistsPreview(user));
    }

    @GetMapping("/checklists/comparison")
    public ResponseEntity<ChecklistsWithScoreReadResponse> readChecklistsComparison(
            @RequestParam("id") List<Long> checklistIds) {
        User user = new User(1L, "방끗", "bang-ggood@gmail.com");
        return ResponseEntity.ok(checklistService.readChecklistsComparison(user, checklistIds));
    }

    @PutMapping("/checklists/{id}")
    public ResponseEntity<Void> updateChecklistById(@PathVariable("id") long id, @Valid @RequestBody ChecklistRequest checklistRequest) {
        User user = new User(1L, "방방이", "bang-ggood@gmail.com");
        checklistService.updateChecklistById(user, id, checklistRequest);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/custom-checklist")
    public ResponseEntity<Void> updateCustomChecklist(@RequestBody CustomChecklistUpdateRequest request) {
        checklistService.updateCustomChecklist(request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/checklists/{id}")
    public ResponseEntity<Void> deleteChecklistById(@PathVariable("id") long id) {
        checklistService.deleteChecklistById(id);
        return ResponseEntity.noContent().build();
    }
}
