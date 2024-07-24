package com.bang_ggood.checklist.domain;

public class Question {

    private final String title;
    private final String subtitle;

    public Question(String title, String subtitle) {
        this.title = title;
        this.subtitle = subtitle;
    }

    public String getTitle() {
        return title;
    }

    public String getSubtitle() {
        return subtitle;
    }
}
