package com.bang_ggood.checklist;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistImage;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public class ChecklistImageFixture {

    public static List<ChecklistImage> CHECKLIST_IMAGES(Checklist checklist) {
        return List.of(
                CHECKLIST_IMAGE_1(checklist), CHECKLIST_IMAGE_2(checklist)
        );
    }

    public static ChecklistImage CHECKLIST_IMAGE_1(Checklist checklist) {
        return new ChecklistImage(checklist, "image-url", 1);
    }

    public static ChecklistImage CHECKLIST_IMAGE_2(Checklist checklist) {
        return new ChecklistImage(checklist, "image-url", 1);
    }

    public static MultipartFile IMAGE() {
        return new MockMultipartFile("image", "image.jpg", "image/jpeg", "image-data".getBytes());
    }

    public static List<MultipartFile> IMAGES() {
        return List.of(IMAGE());
    }
}
