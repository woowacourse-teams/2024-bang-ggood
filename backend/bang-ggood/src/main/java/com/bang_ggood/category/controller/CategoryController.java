package com.bang_ggood.category.controller;

import com.bang_ggood.auth.config.AuthPrincipal;
import com.bang_ggood.category.dto.request.CategoryPriorityCreateRequest;
import com.bang_ggood.category.dto.response.CategoriesReadResponse;
import com.bang_ggood.category.service.CategoryService;
import com.bang_ggood.user.domain.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping("/categories/priority")
    public ResponseEntity<Void> createCategoriesPriority(@AuthPrincipal User user, @RequestBody CategoryPriorityCreateRequest request) {
        categoryService.createCategoriesPriority(user, request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/categories")
    public ResponseEntity<CategoriesReadResponse> readCategories(@AuthPrincipal User user) {
        return ResponseEntity.ok(categoryService.readCategories());
    }
}