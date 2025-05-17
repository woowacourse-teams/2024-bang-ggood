package com.bang_ggood.global.util;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.storage.BangggoodMultipart;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.web.multipart.MultipartFile;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ImageOptimizationUtil {

    private static final String JPG = "jpg";
    private static final String CONTENT_TYPE_JPEG = "image/jpeg";

    public static MultipartFile optimize(MultipartFile file, int width, int height, float quality) {
        try {
            BufferedImage originalImage = ImageIO.read(file.getInputStream());

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Thumbnails.of(originalImage)
                    .size(width, height)
                    .outputQuality(quality)
                    .outputFormat(JPG)
                    .toOutputStream(outputStream);

            byte[] bytes = outputStream.toByteArray();

            return BangggoodMultipart.from(file, CONTENT_TYPE_JPEG, bytes);
        } catch (IOException e) {
            throw new BangggoodException(ExceptionCode.IMAGE_OPTIMIZE_ERROR);
        }
    }

    public static MultipartFile compress(MultipartFile file, float quality) {
        try {
            BufferedImage originalImage = ImageIO.read(file.getInputStream());

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

            Thumbnails.of(originalImage)
                    .scale(1.0)
                    .outputQuality(quality)
                    .outputFormat(JPG)
                    .toOutputStream(outputStream);

            byte[] bytes = outputStream.toByteArray();

            return BangggoodMultipart.from(file, CONTENT_TYPE_JPEG, bytes);
        } catch (IOException e) {
            throw new BangggoodException(ExceptionCode.IMAGE_OPTIMIZE_ERROR);
        }
    }
}
