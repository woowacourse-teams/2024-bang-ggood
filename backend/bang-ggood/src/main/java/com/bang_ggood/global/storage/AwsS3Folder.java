package com.bang_ggood.global.storage;

public enum AwsS3Folder {
    CHECKLIST("checklist/");

    private final String folderPath;

    AwsS3Folder(String folderPath) {
        this.folderPath = folderPath;
    }

    public String getPath() {
        return folderPath;
    }
}

