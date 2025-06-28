package com.bang_ggood.global.storage;


import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import io.awspring.cloud.s3.S3Exception;
import io.awspring.cloud.s3.S3Resource;
import io.awspring.cloud.s3.S3Template;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class AwsS3ClientTest {

    private final String bucketName = "test-bucket";
    private final String folder = "folder/";
    private final String fileName = "image.png";
    private final String fullPath = folder + fileName;
    @InjectMocks
    private AwsS3Client awsS3Client;
    @Mock
    private S3Template s3Template;
    @Mock
    private MultipartFile multipartFile;

    @BeforeEach
    void setup() {
        ReflectionTestUtils.setField(awsS3Client, "bucketName", bucketName);
    }

    @DisplayName("파일 업로드 성공")
    @Test
    void upload_success() throws IOException {
        // given
        String url = "https://s3.amazonaws.com/test-bucket/" + fullPath;
        InputStream inputStream = new ByteArrayInputStream("image content".getBytes());

        given(multipartFile.isEmpty()).willReturn(false);
        given(multipartFile.getInputStream()).willReturn(inputStream);

        S3Resource mockResource = mock(S3Resource.class);
        given(mockResource.getURL()).willReturn(new URL(url));
        given(s3Template.upload(bucketName, fullPath, inputStream)).willReturn(mockResource);

        // when
        String result = awsS3Client.upload(multipartFile, folder, fileName);

        // then
        assertThat(result).isEqualTo(url);
    }

    @DisplayName("파일 업로드 실패: 파일이 비어 있음")
    @Test
    void upload_emptyFile_throwsException() {
        // given
        given(multipartFile.isEmpty()).willReturn(true);

        // when & then
        assertThatThrownBy(() -> awsS3Client.upload(multipartFile, folder, fileName))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.FILE_EMPTY.getMessage());
    }

    @DisplayName("파일 업로드 실패: 파일 업로드 중 에러")
    @Test
    void upload_ioException_throwsException() throws IOException {
        // given
        given(multipartFile.isEmpty()).willReturn(false);
        given(multipartFile.getInputStream()).willThrow(new IOException());

        // when & then
        assertThatThrownBy(() -> awsS3Client.upload(multipartFile, folder, fileName))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.FILE_UPLOAD_ERROR.getMessage());
    }

    @DisplayName("파일 삭제 성공")
    @Test
    void delete_success() {
        // given & when
        awsS3Client.delete(folder, fileName);

        // then
        verify(s3Template, times(1)).deleteObject(bucketName, fullPath);
    }

    @DisplayName("파일 삭제 실패: 파일이 존재하지 않을 때")
    @Test
    void delete_s3Exception_throwsException() {
        // given

        doThrow(S3Exception.class).when(s3Template).deleteObject(bucketName, fullPath);

        // when & then
        assertThatThrownBy(() -> awsS3Client.delete(folder, fileName))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.FILE_NOT_FOUND.getMessage());
    }
}
