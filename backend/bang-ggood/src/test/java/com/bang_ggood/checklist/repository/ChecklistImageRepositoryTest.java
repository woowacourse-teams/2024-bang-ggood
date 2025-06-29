package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.ChecklistImageFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistImage;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.service.RoomService;
import com.bang_ggood.user.UserFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

class ChecklistImageRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ChecklistImageRepository checklistImageRepository;

    private Checklist checklist;

    @BeforeEach
    void setUp() {
        Room room = roomService.createRoom(RoomFixture.ROOM_1());
        checklist = checklistService.createChecklist(ChecklistFixture.CHECKLIST1_USER1(room, UserFixture.USER1));
    }

    @DisplayName("체크리스트 이미지 찾기 성공 : 삭제되지 않은 이미지일 경우")
    @Test
    void findById_notDeleted() {
        // given
        ChecklistImage checklistImage = ChecklistImageFixture.CHECKLIST_IMAGE_1(checklist);
        checklistImageRepository.save(checklistImage);

        // when
        Optional<ChecklistImage> foundImage = checklistImageRepository.findById(checklistImage.getId());

        // then
        assertAll(
                () -> assertThat(foundImage).isPresent(),
                () -> assertThat(foundImage.get().getId()).isEqualTo(checklistImage.getId())
        );
    }

    @DisplayName("체크리스트 이미지 찾기 성공 : 삭제된 이미지일 경우")
    @Test
    void findById_deleted() {
        // given
        ChecklistImage checklistImage = ChecklistImageFixture.CHECKLIST_IMAGE_1(checklist);
        checklistImageRepository.save(checklistImage);
        checklistImageRepository.deleteById(checklistImage.getId());

        // when
        Optional<ChecklistImage> foundImage = checklistImageRepository.findById(checklistImage.getId());

        // then
        assertThat(foundImage).isEmpty();
    }

    @DisplayName("체크리트스 이미지 갖고 오기 실패 : 존재하지 않을 경우")
    @Test
    void getById_notFound_exception() {
        assertThatThrownBy(() -> checklistImageRepository.getById(Long.MAX_VALUE))
                .isInstanceOf(BangggoodException.class)
                .hasMessageContaining(ExceptionCode.CHECKLIST_IMAGE_NOT_FOUND.getMessage());
    }

    @DisplayName("체크리스트 ID로 이미지 리스트 조회")
    @Test
    void findByChecklistId() {
        // given
        List<ChecklistImage> checklistImages = ChecklistImageFixture.CHECKLIST_IMAGES(checklist);
        checklistImageRepository.saveAll(checklistImages);

        // when
        List<ChecklistImage> foundImages = checklistImageRepository.findByChecklistId(checklist.getId());

        // then
        assertAll(
                () -> assertThat(foundImages).hasSize(checklistImages.size()),
                () -> assertThat(foundImages)
                        .allMatch(image -> !image.isDeleted()),
                () -> {
                    List<Integer> actualOrderIdxes = foundImages.stream()
                            .map(ChecklistImage::getOrderIndex)
                            .toList();
                    List<Integer> sortedOrderIdxes = new ArrayList<>(actualOrderIdxes);
                    Collections.sort(sortedOrderIdxes);
                    assertThat(actualOrderIdxes).isEqualTo(sortedOrderIdxes);
                }
        );
    }

    @DisplayName("체크리스트 ID로 첫 번째 이미지 조회 성공 ")
    @Test
    void findFirstByChecklistId() {
        // given
        List<ChecklistImage> checklistImages = ChecklistImageFixture.CHECKLIST_IMAGES(checklist);
        checklistImageRepository.saveAll(checklistImages);

        // when
        ChecklistImage firstImage = checklistImageRepository.findFirstByChecklistId(checklist.getId());

        // then
        Integer minOrderIndex = checklistImages.stream()
                .map(ChecklistImage::getOrderIndex)
                .min(Integer::compareTo)
                .orElseThrow();

        assertAll(
                () -> assertThat(firstImage).isNotNull(),
                () -> assertThat(firstImage.getChecklist().getId()).isEqualTo(checklist.getId()),
                () -> assertThat(firstImage.getOrderIndex()).isEqualTo(minOrderIndex)
        );
    }



    @DisplayName("체크리스트 ID로 이미지 수 세기 성공")
    @Test
    void findAllByChecklistId() {
        // given
        List<ChecklistImage> checklistImages = ChecklistImageFixture.CHECKLIST_IMAGES(checklist);
        checklistImageRepository.saveAll(checklistImages);

        // when
        int ChecklistImageCount = checklistImageRepository.countByChecklistId(checklist.getId());

        // then
        assertThat(ChecklistImageCount).isEqualTo(checklistImages.size());
    }

    @DisplayName("체크리스트 ID로 이미지 전체 논리적 삭제 성공")
    @Test
    void deleteAllByChecklistId() {
        // given
        List<ChecklistImage> checklistImages = ChecklistImageFixture.CHECKLIST_IMAGES(checklist);
        checklistImageRepository.saveAll(checklistImages);

        // when
        checklistImageRepository.deleteAllByChecklistId(checklist.getId());

        // then
        List<ChecklistImage> foundImages = checklistImageRepository.findByChecklistId(checklist.getId());
        assertThat(foundImages).isEmpty();
    }
}
