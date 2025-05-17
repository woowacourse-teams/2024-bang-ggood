package com.bang_ggood.checklist;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public class ChecklistImageFixture {

    public static MultipartFile IMAGE() {
        return new MockMultipartFile("image", "image.jpg", "image/jpeg", "image-data".getBytes());
    }

    public static List<MultipartFile> IMAGES() {
        return List.of(IMAGE());
    }
}
