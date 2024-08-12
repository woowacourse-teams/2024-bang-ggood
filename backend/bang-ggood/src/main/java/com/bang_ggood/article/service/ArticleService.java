package com.bang_ggood.article.service;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.ArticleResponseDto;
import com.bang_ggood.article.repository.ArticleRepository;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public ArticleResponseDto readArticle(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new BangggoodException(ExceptionCode.ARTICLE_INVALID));
        return ArticleResponseDto.from(article);
    }
}
