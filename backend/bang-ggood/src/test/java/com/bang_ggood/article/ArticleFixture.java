package com.bang_ggood.article;

import com.bang_ggood.article.domain.Article;
import com.bang_ggood.article.dto.request.ArticleCreateRequest;

public class ArticleFixture {

    public static Article ARTICLE = new Article("제목", "내용", "키워드", "요약");
    public static Article ARTICLE_1 = new Article("제목1", "내용1", "키워드1", "요약1");
    public static Article ARTICLE_2 = new Article("제목2", "내용2", "키워드2", "요약2");
    public static Article ARTICLE_3 = new Article("제목3", "내용3", "키워드3", "요약3");
    public static Article ARTICLE_4 = new Article("제목4", "내용4", "키워드4", "요약4");

    public static ArticleCreateRequest ARTICLE_CREATE_REQUEST = new ArticleCreateRequest("제목", "내용", "키워드", "요약");
}
