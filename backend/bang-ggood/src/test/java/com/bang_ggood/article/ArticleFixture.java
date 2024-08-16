package com.bang_ggood.article;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;

public class ArticleFixture {

    public static Article ARTICLE = new Article("제목", "내용", "키워드", "요약");
    public static ArticleCreateRequest ARTICLE_CREATE_REQUEST = new ArticleCreateRequest("제목", "내용", "키워드", "요약");
}
