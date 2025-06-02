package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.ChecklistImageFixture;
import com.bang_ggood.checklist.domain.Checklist;
import com.bang_ggood.checklist.domain.ChecklistImage;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.room.RoomFixture;
import com.bang_ggood.room.domain.Room;
import com.bang_ggood.room.service.RoomService;
import com.bang_ggood.user.UserFixture;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

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

}
