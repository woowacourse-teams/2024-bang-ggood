package com.bang_ggood.global.util;

import net.coobird.thumbnailator.Thumbnails;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class ImageOptimizationUtil {

    private static final String JPG = "jpg";

    public static InputStream optimize(MultipartFile file, int width, int height, float quality) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(originalImage)
                .size(width, height)
                .outputQuality(quality)
                .outputFormat(JPG)
                .toOutputStream(outputStream);

        return new ByteArrayInputStream(outputStream.toByteArray());
    }

    public static InputStream compress(MultipartFile file, float quality) throws IOException {
        BufferedImage originalImage = ImageIO.read(file.getInputStream());

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Thumbnails.of(originalImage)
                .scale(1.0)
                .outputQuality(quality)
                .outputFormat(JPG)
                .toOutputStream(outputStream);

        return new ByteArrayInputStream(outputStream.toByteArray());
    }
}
