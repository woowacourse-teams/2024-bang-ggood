package com.bang_ggood.global.storage;

import org.springframework.web.multipart.MultipartFile;

public interface StorageClient {

    String upload(MultipartFile file, String folder, String fileName);

    void delete(String folder, String fileName);
}
