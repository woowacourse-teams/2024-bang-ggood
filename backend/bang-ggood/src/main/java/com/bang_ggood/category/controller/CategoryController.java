package com.bang_ggood.category.controller;

import com.bang_ggood.category.dto.CategoriesReadResponse;
import com.bang_ggood.category.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/categories")
    public ResponseEntity<CategoriesReadResponse> readCategories() {
        return ResponseEntity.ok(categoryService.readCategories());
    }
}
