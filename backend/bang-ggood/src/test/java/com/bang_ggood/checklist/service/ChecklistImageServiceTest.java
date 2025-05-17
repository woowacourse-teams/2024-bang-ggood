package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.ChecklistImageFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistImage;
import com.bang_ggood.checklist.repository.ChecklistImageRepository;
import com.bang_ggood.checklist.repository.ChecklistRepository;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.global.storage.AwsS3Client;
import com.bang_ggood.global.util.ImageOptimizationUtil;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.repository.RoomRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

class ChecklistImageServiceTest extends IntegrationTestSupport {

    private static final int MAX_IMAGE_SIZE = 5;

    @Autowired
    private ChecklistImageService checklistImageService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistImageRepository checklistImageRepository;

    @MockBean
    private AwsS3Client awsS3Client;

    private MockedStatic<ImageOptimizationUtil> imageOptimizationUtilMock;

    private Checklist checklist;

    @BeforeEach
    void beforeEach() {
        User user = userRepository.save(UserFixture.USER1());
        Room room = roomRepository.save(RoomFixture.ROOM_1());
        checklist = checklistRepository.save(ChecklistFixture.CHECKLIST1_USER1(room, user));
    }

    @BeforeEach
    void setUpMocks() {
        when(awsS3Client.upload(any(), anyString(), anyString()))
                .thenReturn("https://s3.fake-url.com/image.jpg");

        imageOptimizationUtilMock = Mockito.mockStatic(ImageOptimizationUtil.class);
        imageOptimizationUtilMock.when(() -> ImageOptimizationUtil.compress(any(), anyInt()))
                .thenAnswer(invocation -> invocation.getArgument(0));
    }

    @AfterEach
    void tearDownMocks() {
        imageOptimizationUtilMock.close();
    }

    @DisplayName("체크리스트 이미지 저장 성공")
    @Test
    void createChecklistImages_success() {
        // given
        List<MultipartFile> images = List.of(ChecklistImageFixture.IMAGE(), ChecklistImageFixture.IMAGE());

        // when
        checklistImageService.createChecklistImages(checklist, images);

        // then
        List<ChecklistImage> savedImages = checklistImageRepository.findAll();
        assertAll(
                () -> assertThat(savedImages).hasSize(2),
                () -> assertThat(savedImages.get(0).getChecklist().getId()).isEqualTo(checklist.getId()),
                () -> assertThat(savedImages.get(0).getImageUrl()).contains("image.jpg")
        );

    }

    @DisplayName("체크리스트 이미지 저장 실패: 이미지 개수 초과")
    @Test
    void createChecklistImages_exceedLimit_exception() {
        // given
        List<MultipartFile> images = IntStream.range(0, MAX_IMAGE_SIZE + 1)
                .mapToObj(i -> ChecklistImageFixture.IMAGE())
                .collect(Collectors.toList());

        // when & then
        assertThatThrownBy(() -> checklistImageService.createChecklistImages(checklist, images))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.CHECKLIST_IMAGE_INVALID_SIZE.getMessage());
    }
}
