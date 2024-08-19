package com.bang_ggood.article.controller;

import com.bang_ggood.article.dto.ArticleResponse;
import com.bang_ggood.article.dto.ArticlesPreviewResponse;
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
    public ResponseEntity<ArticleResponse> readArticle(@PathVariable("id") Long id) {
        return ResponseEntity.ok(articleService.readArticle(id));
    }

    @GetMapping("/articles")
    public ResponseEntity<ArticlesPreviewResponse> readArticles() {
        return ResponseEntity.ok(articleService.readArticles());
    }
}
