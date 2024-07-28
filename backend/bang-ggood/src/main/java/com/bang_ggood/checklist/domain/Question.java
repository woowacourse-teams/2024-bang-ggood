package com.bang_ggood.checklist.domain;

import com.bang_ggood.category.domain.Category;

public class Question {

    private final Category category;
    private final String title;
    private final String subtitle;

    public Question(Category category, String title, String subtitle) {
        this.category = category;
        this.title = title;
        this.subtitle = subtitle;
    }

    public boolean isCategory(Category category) {
        return this.category == category;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }
}
