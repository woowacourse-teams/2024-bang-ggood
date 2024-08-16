package com.bang_ggood.article.controller;

import com.bang_ggood.article.dto.ArticleCreateRequest;
import com.bang_ggood.article.dto.ArticleResponse;
import com.bang_ggood.article.dto.ArticlesPreviewResponse;
import com.bang_ggood.article.service.ArticleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RestController
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping("/articles")
    public ResponseEntity<Void> createArticle(@Valid @RequestBody ArticleCreateRequest request) {
        Long id = articleService.createArticle(request);
        return ResponseEntity.created(URI.create("articles/" + id)).build();
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleResponse> readArticle(@PathVariable("id") Long id) {
        return ResponseEntity.ok(articleService.readArticle(id));
    }

    @GetMapping("/articles")
    public ResponseEntity<ArticlesPreviewResponse> readArticles() {
        return ResponseEntity.ok(articleService.readArticles());
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<ArticleResponse> deleteArticle(@PathVariable("id") Long id) {
        articleService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
