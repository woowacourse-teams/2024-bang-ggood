package com.bang_ggood.checklist.controller;

import com.bang_ggood.checklist.dto.request.ChecklistCreateRequest;
import com.bang_ggood.checklist.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.checklist.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.checklist.dto.response.ChecklistsWithScoreReadResponse;
import com.bang_ggood.checklist.dto.response.SelectedChecklistResponse;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


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

    @GetMapping("/checklists/questions")
    public ResponseEntity<ChecklistQuestionsResponse> readChecklistQuestions() {
        return ResponseEntity.ok(checklistService.readChecklistQuestions());
    }

    @GetMapping("/checklists/{id}")
    public ResponseEntity<SelectedChecklistResponse> readChecklistById(@PathVariable("id") long id) {
        return ResponseEntity.ok(checklistService.readChecklistById(id));
    }

    @GetMapping("/checklists")
    public ResponseEntity<UserChecklistsPreviewResponse> readUserChecklistsPreview() {
        User user = new User(1L, "방방이");
        return ResponseEntity.ok(checklistService.readUserChecklistsPreview(user));
    }

    @GetMapping("/checklists/comparison")
    public ResponseEntity<ChecklistsWithScoreReadResponse> readChecklistsComparison(
            @RequestParam("id") List<Long> checklistIds) {
        return ResponseEntity.ok(checklistService.readChecklistsComparison(checklistIds));
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
