package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistImage;
import com.bang_ggood.checklist.repository.ChecklistImageRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.storage.AwsS3Client;
import com.bang_ggood.global.storage.AwsS3Folder;
import com.bang_ggood.global.util.ImageOptimizationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ChecklistImageService {

    private static final int MAX_CHECKLIST_IMAGE_COUNT = 5;
    private static final float IMAGE_QUALITY = 0.8F;

    private final ChecklistImageRepository checklistImageRepository;
    private final AwsS3Client awsS3Client;

    @Transactional
    public void createChecklistImages(Checklist checklist, List<MultipartFile> images) {
        validateImageCount(images.size());
        saveAllImages(checklist, images);
    }

    @Transactional
    public void updateChecklistImage(Checklist checklist, List<MultipartFile> images) {
        int originalImageCount = checklistImageRepository.countByChecklistId(checklist.getId());
        validateImageCount(originalImageCount + images.size());
        saveAllImages(checklist, images);
    }

    private void saveAllImages(Checklist checklist, List<MultipartFile> images) {
        for (int i = 0; i < images.size(); i++) {
            MultipartFile image = ImageOptimizationUtil.compress(images.get(i), IMAGE_QUALITY);
            String imageUrl = awsS3Client.upload(image, AwsS3Folder.CHECKLIST.getPath(), checklist.getId() + "_" + i);
            checklistImageRepository.save(new ChecklistImage(checklist, imageUrl, i));
        }
    }

    private void validateImageCount(int count) {
        if (count > MAX_CHECKLIST_IMAGE_COUNT) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_IMAGE_INVALID_COUNT);
        }
    }
}
