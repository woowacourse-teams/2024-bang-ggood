package com.bang_ggood.article.controller;

import com.bang_ggood.article.dto.request.ArticleCreateRequest;
import com.bang_ggood.article.dto.response.ArticleResponse;
import com.bang_ggood.article.dto.response.ArticlesResponses;
import com.bang_ggood.article.service.ArticleManageService;
import com.bang_ggood.auth.config.AdminPrincipal;
import com.bang_ggood.user.domain.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RequiredArgsConstructor
@RestController
public class ArticleController {

    private final ArticleManageService articleManageService;

    @PostMapping("/articles")
    public ResponseEntity<Void> createArticle(@AdminPrincipal User user,
                                              @Valid @RequestBody ArticleCreateRequest request) {
        Long id = articleManageService.createArticle(request);
        return ResponseEntity.created(URI.create("/article/" + id)).build();
    }

    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleResponse> readArticle(@PathVariable("id") Long id) {
        return ResponseEntity.ok(articleManageService.readArticle(id));
    }

    @GetMapping("/articles")
    public ResponseEntity<ArticlesResponses> readArticles() {
        return ResponseEntity.ok(articleManageService.readArticles());
    }

    @DeleteMapping("/articles/{id}")
    public ResponseEntity<ArticleResponse> deleteArticle(@AdminPrincipal User user,
                                                         @PathVariable("id") Long id) {
        articleManageService.deleteArticle(id);
        return ResponseEntity.noContent().build();
    }
}
