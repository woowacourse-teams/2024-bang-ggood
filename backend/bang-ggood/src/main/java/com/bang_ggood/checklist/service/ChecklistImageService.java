package com.bang_ggood.checklist.service;

import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistImage;
import com.bang_ggood.checklist.repository.ChecklistImageRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.storage.AwsS3Client;
import com.bang_ggood.global.storage.AwsS3Folder;
import com.bang_ggood.global.storage.FileType;
import com.bang_ggood.global.util.ImageOptimizationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ChecklistImageService {

    private static final int MAX_CHECKLIST_IMAGE_COUNT = 5;
    private static final float IMAGE_QUALITY = 0.8F;
    private static final String FILE_NAME_DELIMITER = "_";

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

    @Transactional
    public void deleteById(long imageId) {
        ChecklistImage checklistImage = checklistImageRepository.getById(imageId);
        String fileName = checklistImage.getFileName();
        awsS3Client.delete(AwsS3Folder.CHECKLIST.getPath(), fileName);
        checklistImageRepository.deleteById(imageId);
    }

    @Transactional
    public void deleteAllByChecklistId(Long checklistId) {
        checklistImageRepository.findByChecklistId(checklistId)
                .forEach(image -> awsS3Client.delete(AwsS3Folder.CHECKLIST.getPath(), image.getFileName()));
        checklistImageRepository.deleteAllByChecklistId(checklistId);
    }

    private void saveAllImages(Checklist checklist, List<MultipartFile> images) {
        for (int i = 0; i < images.size(); i++) {
            MultipartFile image = ImageOptimizationUtil.compress(images.get(i), IMAGE_QUALITY);
            String fileName = makeFileName();
            String imageUrl = awsS3Client.upload(image, AwsS3Folder.CHECKLIST.getPath(), fileName);
            checklistImageRepository.save(new ChecklistImage(checklist, fileName, imageUrl, i));
        }
    }

    private String makeFileName() {
        return UUID.randomUUID() + FileType.JPG.getName();
    }

    private void validateImageCount(int count) {
        if (count > MAX_CHECKLIST_IMAGE_COUNT) {
            throw new BangggoodException(ExceptionCode.CHECKLIST_IMAGE_INVALID_COUNT);
        }
    }

    @Transactional
    public List<ChecklistImage> readChecklistImages(Checklist checklist) {
        return checklistImageRepository.findByChecklistId(checklist.getId());
    }
}
