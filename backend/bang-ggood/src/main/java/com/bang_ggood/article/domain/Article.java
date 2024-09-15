package com.bang_ggood.article.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Objects;

@Entity
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    private String keyword;

    private String summary;

    private String thumbnail;

    public Article(String title, String content, String keyword, String summary, String thumbnail) {
        this.title = title;
        this.content = content;
        this.keyword = keyword;
        this.summary = summary;
        this.thumbnail = thumbnail;
    }

    protected Article() {
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getKeyword() {
        return keyword;
    }

    public String getSummary() {
        return summary;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Article article = (Article) o;
        return Objects.equals(id, article.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Article{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", keyword='" + keyword + '\'' +
                ", summary='" + summary + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                '}';
    }
}
