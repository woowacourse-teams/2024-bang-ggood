package com.bang_ggood.checklist.domain;

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
}
