package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.checklist.dto.response.UserChecklistsPreviewResponse;
import com.bang_ggood.checklist.service.ChecklistService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.ChecklistQuestionsResponse;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static com.bang_ggood.user.UserFixture.USER1;
import static com.bang_ggood.user.UserFixture.USER1_WITH_ID;
import static com.bang_ggood.user.UserFixture.USER2_WITH_ID;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest extends IntegrationTestSupport {

    private static final OauthLoginRequest oauthLoginRequest = new OauthLoginRequest("testCode");
    @MockBean
    private OauthClient oauthClient;
    @Autowired
    private AuthService authService;
    @Autowired
    private ChecklistService checklistService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("로그인 성공 : 존재하지 않는 회원이면 데이터베이스에 새로운 유저를 추가하고 토큰을 반환한다.")
    @Test
    void login_signup() {
        // given
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2);

        // when
        String token = authService.login(oauthLoginRequest);

        // then
        assertThat(token).isNotBlank();
    }

    @DisplayName("로그인 성공 : 존재하는 회원이면 데이터베이스에 새로운 유저를 추가하지않고 토큰을 바로 반환한다.")
    @Test
    void login() {
        // given
        userRepository.save(USER1);
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER1);

        // when
        String token = authService.login(oauthLoginRequest);

        // then
        assertThat(token).isNotBlank();
    }

    @DisplayName("로그인 성공 : 회원 가입시 디폴트 체크리스트 질문을 추가한다.")
    @Test
    void login_default_checklist_question() {
        // given
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2);

        // when
        String token = authService.login(oauthLoginRequest);

        // then
        User user = authService.extractUser(token);
        ChecklistQuestionsResponse checklistQuestions = checklistService.readChecklistQuestions(user);

        int sum = 0;
        for (CategoryQuestionsResponse response : checklistQuestions.categories()) {
            sum += response.questions().size();
        }

        assertThat(sum).isEqualTo(Question.findDefaultQuestions().size());
    }

    @DisplayName("로그인 성공 : 회원 가입시 디폴트 체크리스트를 추가한다.")
    @Test
    void login_default_checklist() {
        // given
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2);

        // when
        String token = authService.login(oauthLoginRequest);

        // then
        User user = authService.extractUser(token);
        UserChecklistsPreviewResponse response = checklistService.readChecklistsPreview(user);
        assertThat(response.checklists()).hasSize(1);
    }

    @DisplayName("로그아웃 실패 : 다른 유저의 토큰인 경우")
    @Test
    void logout_invalid_ownership_exception() {
        // given
        String token = jwtTokenProvider.createToken(USER1_WITH_ID);

        //when & then
        assertThatThrownBy(() -> authService.logout("token=" + token, USER2_WITH_ID))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_NOT_OWNED_BY_USER.getMessage());
    }
}
