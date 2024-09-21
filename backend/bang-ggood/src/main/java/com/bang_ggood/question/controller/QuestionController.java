package com.bang_ggood.question.controller;

import com.bang_ggood.auth.config.AuthPrincipal;
import com.bang_ggood.auth.config.UserPrincipal;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.service.QuestionManageService;
import com.bang_ggood.user.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuestionController {

    private final QuestionManageService questionManageService;

    public QuestionController(QuestionManageService questionManageService) {
        this.questionManageService = questionManageService;
    }

    // TODO : 엔드포인트 통일 with CustomChecklist
    @GetMapping("/checklists/questions")
    public ResponseEntity<CustomChecklistQuestionsResponse> readCustomChecklistQuestions(@UserPrincipal User user) {
        return ResponseEntity.ok(questionManageService.readCustomChecklistQuestions(user));
    }

    @GetMapping("/custom-checklist/all")
    public ResponseEntity<CategoryCustomChecklistQuestionsResponse> readAllCustomChecklistQuestions(
            @UserPrincipal User user) {
        return ResponseEntity.ok(questionManageService.readAllCustomChecklistQuestions(user));
    }

    @PutMapping("/custom-checklist")
    public ResponseEntity<Void> updateCustomChecklist(@AuthPrincipal User user,
                                                      @RequestBody CustomChecklistUpdateRequest request) {
        questionManageService.updateCustomChecklist(user, request);
        return ResponseEntity.noContent().build();
    }
}
