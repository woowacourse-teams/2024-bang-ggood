package com.bang_ggood.checklist.repository;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.option.domain.ChecklistOption;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.option.repository.ChecklistOptionRepository;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistOptionRepositoryTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistService checklistService;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private ChecklistOptionRepository checklistOptionRepository;
    @Autowired
    private UserRepository userRepository;

    private long checklistId;

    @BeforeEach
    void setUp() {
        User user = userRepository.save(UserFixture.USER1);
        checklistId = checklistService.createChecklist(user, ChecklistFixture.CHECKLIST_CREATE_REQUEST);
    }

    @DisplayName("체크리스트 ID로 옵션 찾기 성공")
    @Test
    void findByChecklistId() {
        // given & when
        List<ChecklistOption> checklistOptions = checklistOptionRepository.findByChecklistId(checklistId);

        // then
        assertThat(checklistOptions)
                .allSatisfy(option ->
                        assertThat(option.isDeleted()).isFalse()
                );
    }

    @DisplayName("체크리스트 옵션 수 세기 성공")
    @Test
    void countByChecklist() {
        // given & when
        int optionCount = checklistOptionRepository.countByChecklist(checklistRepository.getById(checklistId));

        // then
        assertThat(optionCount).isEqualTo(ChecklistFixture.CHECKLIST_CREATE_REQUEST.options().size());

    }

    @DisplayName("체크리스트 ID로 옵션 삭제 성공")
    @Test
    void deleteAllByChecklistId() {
        // given
        List<ChecklistOption> checklistOptions = checklistOptionRepository.findByChecklistId(checklistId);

        // when
        checklistOptionRepository.deleteAllByChecklistId(checklistId);

        // then
        assertThat(checklistOptions)
                .allSatisfy(option ->
                        assertThat(checklistOptionRepository.findById(option.getId()).get().isDeleted()).isTrue()
                );
    }
}
