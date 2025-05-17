package com.bang_ggood.checklist;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

public class ChecklistImageFixture {

    public static MultipartFile IMAGE() {
        return new MockMultipartFile("image", "image.jpg", "image/jpeg", "image-data".getBytes());
    }
}
