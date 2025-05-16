package com.bang_ggood.global.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class ImageOptimizationUtilTest {

    private static final String TEST_IMAGE_PATH = "/test-image.png";

    @DisplayName("optimize 성공")
    @Test
    void optimize() throws IOException {
        // given
        MockMultipartFile image = getMockImage();
        int targetWidth = 100;
        int targetHeight = 100;
        float quality = 0.7f;

        // when
        InputStream optimized = ImageOptimizationUtil.optimize(image, targetWidth, targetHeight, quality);
        BufferedImage resultImage = ImageIO.read(optimized);

        // then
        assertThat(resultImage.getWidth()).isLessThanOrEqualTo(targetWidth);
        assertThat(resultImage.getHeight()).isLessThanOrEqualTo(targetHeight);
    }

    @DisplayName("compress 성공")
    @Test
    void compress() throws IOException {
        // given
        MockMultipartFile image = getMockImage();
        float quality = 0.5f;

        BufferedImage original = ImageIO.read(image.getInputStream());

        // when
        InputStream compressed = ImageOptimizationUtil.compress(image, quality);
        BufferedImage resultImage = ImageIO.read(compressed);

        // then
        assertThat(resultImage.getWidth()).isEqualTo(original.getWidth());
        assertThat(resultImage.getHeight()).isEqualTo(original.getHeight());
    }

    private MockMultipartFile getMockImage() throws IOException {
        try (InputStream is = getClass().getResourceAsStream(TEST_IMAGE_PATH)) {
            if (is == null) {
                throw new FileNotFoundException("테스트 이미지 파일을 찾을 수 없습니다: " + TEST_IMAGE_PATH);
            }
            return new MockMultipartFile("file", "test-image.png", "image/png", is);
        }
    }
}
