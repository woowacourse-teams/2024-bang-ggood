package com.bang_ggood.global.storage;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import io.awspring.cloud.s3.S3Exception;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;

@Component
@RequiredArgsConstructor
public class AwsS3Client implements StorageClient {

    private final S3Template s3Template;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;

    @Override
    public String upload(MultipartFile file, String folder, String fileName) {
        if (file.isEmpty()) {
            throw new BangggoodException(ExceptionCode.FILE_EMPTY);
        }

        String fullPath = folder + fileName;

        try (InputStream inputStream = file.getInputStream()) {
            S3Resource upload = s3Template.upload(bucketName, fullPath, inputStream);
            return upload.getURL().toString();
        } catch (IOException | S3Exception e) {
            throw new BangggoodException(ExceptionCode.FILE_UPLOAD_ERROR);
        }
    }

    @Override
    public void delete(String folder, String fileName) {
        String fullPath = folder + fileName;
        try {
            s3Template.deleteObject(bucketName, fullPath);
        } catch (S3Exception e) {
            throw new BangggoodException(ExceptionCode.FILE_NOT_FOUND);
        }
    }
}
