package com.bang_ggood.article.controller;

import com.bang_ggood.article.dto.ArticleResponseDto;
import com.bang_ggood.article.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleResponseDto> readArticle(@PathVariable("id") Long id) {
        return ResponseEntity.ok(articleService.readArticle(id));
    }
}
