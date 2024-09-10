package com.bang_ggood.checklist.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.checklist.ChecklistFixture;
import com.bang_ggood.checklist.dto.request.ChecklistRequest;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class ChecklistManageServiceTest extends IntegrationTestSupport {

    @Autowired
    private ChecklistManageService checklistManageService;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.save(UserFixture.USER1);
    }

    @DisplayName("체크리스트 작성 성공")
    @Test
    void createChecklist() {
        //given
        ChecklistRequest checklist = ChecklistFixture.CHECKLIST_CREATE_REQUEST;

        // when
        long checklistId = checklistManageService.createChecklist(UserFixture.USER1, checklist);

        //then
        assertThat(checklistId).isGreaterThan(0);
    }
}
