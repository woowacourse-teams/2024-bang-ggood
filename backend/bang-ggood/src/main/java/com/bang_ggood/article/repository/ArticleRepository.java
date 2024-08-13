package com.bang_ggood.article.repository;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.exception.BangggoodException;
import com.bang_ggood.exception.ExceptionCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    default Article getById(Long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.ARTICLE_NOT_FOUND));
    }
}
