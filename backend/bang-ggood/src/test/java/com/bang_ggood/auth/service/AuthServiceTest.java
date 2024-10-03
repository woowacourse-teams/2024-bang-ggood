package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.service.jwt.JwtTokenProvider;
import com.bang_ggood.auth.service.oauth.OauthClient;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.domain.Question;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.service.QuestionManageService;
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

import static com.bang_ggood.auth.OauthFixture.OAUTH_LOGIN_REQUEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest extends IntegrationTestSupport {

    @MockBean
    private OauthClient oauthClient;
    @Autowired
    private AuthService authService;
    @Autowired
    private ChecklistManageService checklistManageService;
    @Autowired
    private QuestionManageService questionManageService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("로그인 성공 : 존재하지 않는 회원이면 데이터베이스에 새로운 유저를 추가하고 토큰을 반환한다.")
    @Test
    void login_signup() {
        // given
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2());

        // when
        AuthTokenResponse token = authService.login(OAUTH_LOGIN_REQUEST);

        // then
        assertThat(token.accessToken()).isNotBlank();
        assertThat(token.refreshToken()).isNotBlank();
    }

    @DisplayName("로그인 성공 : 존재하는 회원이면 데이터베이스에 새로운 유저를 추가하지않고 토큰을 바로 반환한다.")
    @Test
    void login() {
        // given
        userRepository.save(UserFixture.USER1());
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER1());

        // when
        AuthTokenResponse token = authService.login(OAUTH_LOGIN_REQUEST);

        // then
        assertThat(token.accessToken()).isNotBlank();
        assertThat(token.refreshToken()).isNotBlank();
    }

    @DisplayName("로그인 성공 : 회원 가입시 디폴트 체크리스트 질문을 추가한다.")
    @Test
    void login_default_checklist_question() {
        // given
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2());

        // when
        AuthTokenResponse token = authService.login(OAUTH_LOGIN_REQUEST);

        // then
        User user = authService.getAuthUser(token.accessToken());
        CustomChecklistQuestionsResponse customChecklistQuestions = questionManageService.readCustomChecklistQuestions(
                user);

        int sum = 0;
        for (CategoryQuestionsResponse response : customChecklistQuestions.categories()) {
            sum += response.questions().size();
        }

        assertThat(sum).isEqualTo(Question.findDefaultQuestions().size());
    }

    @DisplayName("로그인 성공 : 회원 가입시 디폴트 체크리스트를 추가한다.")
    @Test
    void login_default_checklist() {
        // given
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2());

        // when
        AuthTokenResponse token = authService.login(OAUTH_LOGIN_REQUEST);

        // then
        User user = authService.getAuthUser(token.accessToken());
        ChecklistsPreviewResponse response = checklistManageService.readAllChecklistsPreview(user);
        assertThat(response.checklists()).hasSize(1);
    }

    @DisplayName("게스트 유저 할당 실패 : 게스트 유저의 수가 2명이면 예외를 발생시킨다.")
    @Test
    void assignGuestUser_UnexpectedGuestUserExist() {
        // given
        userRepository.save(UserFixture.GUEST_USER());
        userRepository.save(UserFixture.GUEST_USER());

        // when & then
        assertThatThrownBy(() -> authService.assignGuestUser())
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.GUEST_USER_UNEXPECTED_EXIST.getMessage());
    }

    @DisplayName("게스트 유저 할당 실패 : 게스트 유저가 존재하지 않으면 예외를 발생시킨다.")
    @Test
    void assingGuestUser_GuestUserNotExist() {
        // when & then
        assertThatThrownBy(() -> authService.assignGuestUser())
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.GUEST_USER_NOT_FOUND.getMessage());
    }

    @DisplayName("게스트 유저 할당 성공")
    @Test
    void assignGuestUser() {
        // given
        User guestUser = userRepository.save(UserFixture.GUEST_USER());

        // when
        User assignedGuestUser = authService.assignGuestUser();

        // then
        assertThat(assignedGuestUser).isEqualTo(guestUser);
    }

    @DisplayName("로그아웃 실패 : 다른 유저의 토큰인 경우")
    @Test
    void logout_invalid_ownership_exception() {
        // given
        String accessToken = jwtTokenProvider.createAccessToken(UserFixture.USER1_WITH_ID());
        String refreshToken = jwtTokenProvider.createRefreshToken(UserFixture.USER1_WITH_ID());

        //when & then
        assertThatThrownBy(() -> authService.logout(
                accessToken,
                refreshToken,
                UserFixture.USER2_WITH_ID()))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_NOT_OWNED_BY_USER.getMessage());
    }

    @DisplayName("액세스 토큰 재발행 성공")
    @Test
    void reIssueAccessToken() {
        // given
        userRepository.save(UserFixture.USER1());
        Mockito.when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER1());
        AuthTokenResponse tokenResponse = authService.login(OAUTH_LOGIN_REQUEST);

        // when & then
        assertThatCode(() -> authService.reIssueAccessToken(tokenResponse.refreshToken()))
                .doesNotThrowAnyException();

    }
}
