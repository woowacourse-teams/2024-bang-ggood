package com.bang_ggood.checklist.controller;

import com.bang_ggood.checklist.dto.WrittenChecklistResponse;
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

    @GetMapping("/checklists/{id}")
    public ResponseEntity<WrittenChecklistResponse> readChecklistById(@PathVariable long id) {
        return ResponseEntity.ok(checklistService.readChecklistById(id));
    }
}
