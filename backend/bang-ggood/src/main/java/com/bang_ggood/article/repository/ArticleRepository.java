package com.bang_ggood.article.repository;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {

    default Article getById(Long id) {
        return findById(id).orElseThrow(() -> new BangggoodException(ExceptionCode.ARTICLE_NOT_FOUND));
    }

    @Query("SELECT a FROM Article a " +
            "WHERE a.id = :id " +
            "AND a.deleted = false")
    Optional<Article> findById(@Param("id") Long id);

    @Query("SELECT a FROM Article a " +
            "WHERE a.deleted = false " +
            "ORDER BY a.createdAt DESC, a.id DESC")
    List<Article> findLatestArticles();

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("UPDATE Article a " +
            "SET a.deleted = true " +
            "WHERE a.id = :id")
    void deleteById(@Param("id") Long id);
}
