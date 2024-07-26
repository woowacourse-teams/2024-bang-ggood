package com.bang_ggood.checklist.domain;

import java.util.Objects;

public class Question {

    private final int categoryId;
    private final String title;
    private final String subtitle;

    public Question(int categoryId, String title, String subtitle) {
        this.categoryId = categoryId;
        this.title = title;
        this.subtitle = subtitle;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return categoryId == question.categoryId && Objects.equals(title, question.title) && Objects.equals(subtitle, question.subtitle);
    }

    @Override
    public int hashCode() {
        return Objects.hash(categoryId, title, subtitle);
    }

    @Override
    public String toString() {
        return "Question{" +
                "categoryId=" + categoryId +
                ", title='" + title + '\'' +
                ", subtitle='" + subtitle + '\'' +
                '}';
    }
}
