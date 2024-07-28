package com.bang_ggood.checklist.controller;

import com.bang_ggood.checklist.dto.response.WrittenChecklistResponse;
import com.bang_ggood.checklist.service.ChecklistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChecklistController {

    private final ChecklistService checklistService;

    public ChecklistController(ChecklistService checklistService) {
        this.checklistService = checklistService;
    }

//    @PostMapping("/checklists")
//    public ResponseEntity<Void> createChecklist(@Valid @RequestBody ChecklistCreateRequest checklistCreateRequest) {
//        long checklistId = checklistService.createChecklist(checklistCreateRequest);
//        return ResponseEntity.created(URI.create("/checklists/" + checklistId)).build();
//    }

    @GetMapping("/checklists/{id}")
    public ResponseEntity<WrittenChecklistResponse> readChecklistById(@PathVariable long id) {
        return ResponseEntity.ok(checklistService.readChecklistById(id));
    }

//    @GetMapping("/checklists")
//    public ResponseEntity<UserChecklistsPreviewResponse> readUserChecklistsPreview() {
//        return ResponseEntity.ok(checklistService.readUserChecklistsPreview());
//    }
//
//    @GetMapping("/checklists/questions")
//    public ResponseEntity<ChecklistQuestionsResponse> readChecklistQuestions() {
//        return ResponseEntity.ok(checklistService.readChecklistQuestions());
//    }
//
//    @GetMapping("/checklists/comparison")
//    public ResponseEntity<ChecklistsComparisonReadResponse> readChecklistsComparison(@RequestParam("id")List<Long> checklistIds) {
//        return ResponseEntity.ok(checklistService.readChecklistsComparison(checklistIds));
//    }
}
