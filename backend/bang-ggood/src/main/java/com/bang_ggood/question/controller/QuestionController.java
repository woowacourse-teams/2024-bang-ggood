package com.bang_ggood.question.controller;

import com.bang_ggood.auth.config.AuthRequiredPrincipal;
import com.bang_ggood.auth.config.UserPrincipal;
import com.bang_ggood.question.dto.request.CustomChecklistUpdateRequest;
import com.bang_ggood.question.dto.request.QuestionCreateRequest;
import com.bang_ggood.question.dto.response.CategoryCustomChecklistQuestionsResponse;
import com.bang_ggood.question.dto.response.ComparisonCategorizedQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.service.QuestionManageService;
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
public class QuestionController {

    private final QuestionManageService questionManageService;

    public QuestionController(QuestionManageService questionManageService) {
        this.questionManageService = questionManageService;
    }

    @PostMapping("/questions")
    public ResponseEntity<Void> createQuestion(@AuthRequiredPrincipal User user,
                                               @Valid @RequestBody QuestionCreateRequest questionCreateRequest) {
        Integer questionId = questionManageService.createQuestion(questionCreateRequest, user);
        return ResponseEntity.created(URI.create("/questions/" + questionId)).build();
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

    @GetMapping("/v1/comparison/checklists/{checklistId}/categories/{categoryId}/questions")
    public ResponseEntity<ComparisonCategorizedQuestionsResponse> readComparisonChecklistQuestionsByCategory(
            @AuthRequiredPrincipal User user,
            @PathVariable("checklistId") long checklistId, @PathVariable("categoryId") int categoryId) {
        return ResponseEntity.ok(questionManageService.readComparisonChecklistQuestionsByCategory(user, checklistId, categoryId));
    }

    @PutMapping("/custom-checklist")
    public ResponseEntity<Void> updateCustomChecklist(@AuthRequiredPrincipal User user,
                                                      @RequestBody CustomChecklistUpdateRequest request) {
        questionManageService.updateCustomChecklist(user, request);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/questions/{questionId}")
    public ResponseEntity<Void> deleteQuestion(@AuthRequiredPrincipal User user,
                                               @PathVariable("questionId") int questionId) {
        questionManageService.deleteQuestion(user, questionId);
        return ResponseEntity.noContent().build();
    }
}
