package com.bang_ggood.auth.service;

import com.bang_ggood.IntegrationTestSupport;
import com.bang_ggood.auth.domain.PasswordResetCode;
import com.bang_ggood.auth.dto.request.ConfirmPasswordResetCodeRequest;
import com.bang_ggood.auth.dto.request.LocalLoginRequestV1;
import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.request.RegisterRequestV1;
import com.bang_ggood.auth.dto.request.ResetPasswordRequest;
import com.bang_ggood.auth.dto.response.AuthTokenResponse;
import com.bang_ggood.auth.repository.PasswordResetCodeRepository;
import com.bang_ggood.auth.service.jwt.JwtTokenProvider;
import com.bang_ggood.auth.service.oauth.OauthClient;
import com.bang_ggood.checklist.dto.response.ChecklistsPreviewResponse;
import com.bang_ggood.checklist.service.ChecklistManageService;
import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import com.bang_ggood.question.dto.response.CategoryQuestionsResponse;
import com.bang_ggood.question.dto.response.CustomChecklistQuestionsResponse;
import com.bang_ggood.question.service.QuestionManageService;
import com.bang_ggood.question.service.QuestionService;
import com.bang_ggood.user.UserFixture;
import com.bang_ggood.user.domain.Password;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

import static com.bang_ggood.auth.AuthFixture.LOCAL_LOGIN_REQUEST;
import static com.bang_ggood.auth.AuthFixture.LOCAL_LOGIN_REQUEST_INVALID_EMAIL;
import static com.bang_ggood.auth.AuthFixture.LOCAL_LOGIN_REQUEST_INVALID_PASSWORD;
import static com.bang_ggood.auth.AuthFixture.OAUTH_LOGIN_REQUEST;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest extends IntegrationTestSupport {

    @MockBean
    private OauthClient oauthClient;
    @Autowired
    private AuthService authService;
    @Autowired
    private QuestionService questionService;
    @Autowired
    private ChecklistManageService checklistManageService;
    @Autowired
    private QuestionManageService questionManageService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private PasswordResetCodeRepository passwordResetCodeRepository;
    @SpyBean
    private Clock clock;

    @DisplayName("로컬 로그인 성공")
    @Test
    void localLogin() {
        // given & when
        AuthTokenResponse response = authService.localLogin(LOCAL_LOGIN_REQUEST);

        // then
        assertAll(
                () -> assertThat(response.accessToken()).isNotBlank(),
                () -> assertThat(response.refreshToken()).isNotBlank()
        );
    }

    @DisplayName("로컬 로그인 실패: 일치하는 유저가 없는 경우")
    @Test
    void localLogin_userNotFound() {
        // given & when & then
        assertThatThrownBy(() -> authService.localLogin(LOCAL_LOGIN_REQUEST_INVALID_EMAIL))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.USER_NOT_FOUND.getMessage());
    }

    @DisplayName("로컬 로그인 실패: 비밀번호가 일치하지 않는 경우")
    @Test
    void localLogin_userInvalidPassword() {
        // given & when & then
        assertThatThrownBy(() -> authService.localLogin(LOCAL_LOGIN_REQUEST_INVALID_PASSWORD))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.USER_INVALID_PASSWORD.getMessage());
    }

    @DisplayName("회원가입 성공 : 회원가입 이력 없는 회원인 경우")
    @Test
    void register_newUser() {
        //given
        RegisterRequestV1 request = new RegisterRequestV1("방방이", "bang@gmail.com", "password1234");

        //when
        Long userId = authService.register(request);

        //then
        User findUser = userRepository.findById(userId).orElseThrow();
        assertThat(findUser.getId()).isEqualTo(userId);
    }

    @DisplayName("회원가입 성공 : 탈퇴한 회원인 경우")
    @Test
    void register_deletedUser() {
        // given
        RegisterRequestV1 request = new RegisterRequestV1("방방이", "bang@gmail.com", "password1234");
        User existingUser = userRepository.save(request.toUserEntity());
        userRepository.deleteById(existingUser.getId());

        // when
        Long userId = authService.register(request);

        // then
        User findUser = userRepository.findById(userId).orElseThrow();
        assertThat(findUser.getId()).isEqualTo(userId);
    }

    @DisplayName("회원 가입 성공 : 회원 가입 시 디폴트 체크리스트 질문을 추가")
    @Test
    void register_default_checklist_question() {
        // given
        RegisterRequestV1 request = new RegisterRequestV1("방방이", "bang@gmail.com", "password1234");
        authService.register(request);

        // when
        AuthTokenResponse token = authService.localLogin(new LocalLoginRequestV1("bang@gmail.com", "password1234"));

        // then
        User user = authService.getAuthUser(token.accessToken());
        CustomChecklistQuestionsResponse customChecklistQuestions = questionManageService.readCustomChecklistQuestions(
                user);

        int sum = 0;
        for (CategoryQuestionsResponse response : customChecklistQuestions.categories()) {
            sum += response.questions().size();
        }

        assertThat(sum).isEqualTo(questionService.findDefaultQuestions().size());
    }

    @DisplayName("회원 가입 성공 : 회원 가입시 디폴트 체크리스트를 추가")
    @Test
    void register_default_checklist() {
        // given
        RegisterRequestV1 request = new RegisterRequestV1("방방이", "bang@gmail.com", "password1234");
        Long userId = authService.register(request);

        // when
        AuthTokenResponse token = authService.localLogin(new LocalLoginRequestV1("bang@gmail.com", "password1234"));

        // then
        User user = authService.getAuthUser(token.accessToken());
        ChecklistsPreviewResponse response = checklistManageService.readAllChecklistsPreview(user);
        assertThat(response.checklists()).hasSize(1);
    }


    @DisplayName("회원가입 성공 : 비밀번호 암호화")
    @Test
    void register_encodePassword() {
        // given
        String password = "password1234";
        RegisterRequestV1 request = new RegisterRequestV1("방방이", "bang@gmail.com", password);

        // when
        Long userId = authService.register(request);
        User findUser = userRepository.findById(userId).orElseThrow();
        String findPassword = findUser.getPassword().getValue();

        String expectedPassword = PasswordEncoder.encodeWithSpecificSalt(password, findPassword);

        // then
        assertThat(findPassword).isEqualTo(expectedPassword);
    }

    @DisplayName("회원가입 실패 : 이미 사용되는 이메일인 경우")
    @Test
    void register_emailAlreadyUsed() {
        //given
        RegisterRequestV1 request = new RegisterRequestV1("방방이", "bang@gmail.com", "password1234");

        //when
        authService.register(request);

        //then
        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.USER_EMAIL_ALREADY_USED.getMessage());
    }

    @DisplayName("회원 탈퇴 성공")
    @Test
    void withdraw() {
        //given
        userRepository.save(UserFixture.USER1());

        //when
        authService.withdraw(UserFixture.USER1_WITH_ID());

        //then
        Optional<User> findUser = userRepository.findById(UserFixture.USER1_WITH_ID().getId());
        assertThat(findUser).isEmpty();
    }

    @DisplayName("카카오 로그인 성공 : 존재하지 않는 회원이면 회원 가입 후 로그인")
    @Test
    void oauthLogin_signup() {
        // given
        when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2());

        // when
        AuthTokenResponse token = authService.oauthLogin(OAUTH_LOGIN_REQUEST);

        // then
        assertAll(
                () ->  assertThat(token.accessToken()).isNotBlank(),
                () -> assertThat(token.refreshToken()).isNotBlank()
        );
    }

    @DisplayName("카카오 로그인 성공 : 존재하는 회원이면 로그인")
    @Test
    void oauthLogin() {
        // given
        userRepository.save(UserFixture.USER1());
        when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER1());

        // when
        AuthTokenResponse token = authService.oauthLogin(OAUTH_LOGIN_REQUEST);

        // then
        assertAll(
                () ->  assertThat(token.accessToken()).isNotBlank(),
                () -> assertThat(token.refreshToken()).isNotBlank()
        );
    }

    @DisplayName("카카오 로그인 성공 : 탈퇴한 회원이면 재가입")
    @Test
    void oauthLogin_withdrawUser() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        userRepository.deleteById(user.getId());
        when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER1());

        // when
        AuthTokenResponse token = authService.oauthLogin(OAUTH_LOGIN_REQUEST);

        // then
        assertAll(
                () ->  assertThat(token.accessToken()).isNotBlank(),
                () -> assertThat(token.refreshToken()).isNotBlank()
        );
    }

    @DisplayName("카카오 로그인 성공 : 회원 가입시 디폴트 체크리스트 질문을 추가")
    @Test
    void oauthLogin_default_checklist_question() {
        // given
        when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2());

        // when
        AuthTokenResponse token = authService.oauthLogin(OAUTH_LOGIN_REQUEST);

        // then
        User user = authService.getAuthUser(token.accessToken());
        CustomChecklistQuestionsResponse customChecklistQuestions = questionManageService.readCustomChecklistQuestions(
                user);

        int sum = 0;
        for (CategoryQuestionsResponse response : customChecklistQuestions.categories()) {
            sum += response.questions().size();
        }

        assertThat(sum).isEqualTo(questionService.findDefaultQuestions().size());
    }

    @DisplayName("카카오 로그인 성공 : 회원 가입시 디폴트 체크리스트를 추가")
    @Test
    void oauthLogin_default_checklist() {
        // given
        when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER2());

        // when
        AuthTokenResponse token = authService.oauthLogin(OAUTH_LOGIN_REQUEST);

        // then
        User user = authService.getAuthUser(token.accessToken());
        ChecklistsPreviewResponse response = checklistManageService.readAllChecklistsPreview(user);
        assertThat(response.checklists()).hasSize(1);
    }

    @DisplayName("로그아웃 성공")
    @Test
    void logout() {
        // given
        User user = userRepository.save(UserFixture.USER1());
        String accessToken = jwtTokenProvider.createAccessToken(user);
        String refreshToken = jwtTokenProvider.createRefreshToken(user);

        // when & then
        assertThatCode(() -> authService.logout(accessToken, refreshToken))
                .doesNotThrowAnyException();
    }

    @DisplayName("로그아웃 실패 : accessToken 유저와 refreshToken 유저가 다른 경우")
    @Test
    void logout_userMismatch_exception() {
        // given
        User user1 = userRepository.save(UserFixture.USER1());
        User user2 = userRepository.save(UserFixture.USER2());
        String accessToken = jwtTokenProvider.createAccessToken(user1);
        String refreshToken = jwtTokenProvider.createRefreshToken(user2);

        // when & then
        assertThatThrownBy(() -> authService.logout(accessToken, refreshToken))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_TOKEN_USER_MISMATCH.getMessage());
    }

    @DisplayName("게스트 유저 할당 실패 : 게스트 유저의 수가 2명이면 예외를 발생")
    @Test
    void assignGuestUser_UnexpectedGuestUserExist() {
        // given
        userRepository.save(UserFixture.GUEST_USER1());
        userRepository.save(UserFixture.GUEST_USER2());

        // when & then
        assertThatThrownBy(() -> authService.assignGuestUser())
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.GUEST_USER_UNEXPECTED_EXIST.getMessage());
    }

    @DisplayName("게스트 유저 할당 실패 : 게스트 유저가 존재하지 않으면 예외를 발생")
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
        User guestUser = userRepository.save(UserFixture.GUEST_USER1());

        // when
        User assignedGuestUser = authService.assignGuestUser();

        // then
        assertThat(assignedGuestUser).isEqualTo(guestUser);
    }

    @DisplayName("비밀번호 초기화 코드 인증 성공")
    @Test
    void confirmPasswordResetCode() {
        //given
        int VALID_TIME_MINUTES = 2;
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        ConfirmPasswordResetCodeRequest request = new ConfirmPasswordResetCodeRequest(email, code);

        //when
        PasswordResetCode resetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = resetCode.getCreatedAt();
        Instant instant = createdAt.plusMinutes(VALID_TIME_MINUTES).toInstant(ZoneOffset.UTC);
        when(clock.instant()).thenReturn(instant);
        when(clock.getZone()).thenReturn(ZoneOffset.UTC);

        //then
        assertThatCode(() -> authService.confirmPasswordResetCode(request))
                .doesNotThrowAnyException();
    }

    @DisplayName("비밀번호 초기화 코드 인증 실패 : 유효기간이 지난 경우")
    @Test
    void confirmPasswordResetCode_timeOver_exception() {
        //given
        int EXPIRED_TIME_MINUTES = 4;
        String email = "bang-ggood@gmail.com";
        String code = "abc123";
        ConfirmPasswordResetCodeRequest request = new ConfirmPasswordResetCodeRequest(email, code);

        //when
        PasswordResetCode resetCode = passwordResetCodeRepository.save(new PasswordResetCode(email, code));
        LocalDateTime createdAt = resetCode.getCreatedAt();
        Instant instant = createdAt.plusMinutes(EXPIRED_TIME_MINUTES).toInstant(ZoneOffset.UTC);
        when(clock.instant()).thenReturn(instant);
        when(clock.getZone()).thenReturn(ZoneOffset.UTC);

        //then
        assertThatThrownBy(() -> authService.confirmPasswordResetCode(request))
                .isInstanceOf(BangggoodException.class)
                .hasMessage(ExceptionCode.AUTHENTICATION_PASSWORD_CODE_NOT_FOUND.getMessage());
    }

    @DisplayName("비밀번호 재설정 선공")
    @Test
    void resetPassword() {
        //given
        User user = UserFixture.USER1();
        userRepository.save(user);
        Password oldPassword = user.getPassword();
        String code = "abc123";
        String newPassword = "newPassword1234";
        ResetPasswordRequest request = new ResetPasswordRequest(
                user.getEmail().getValue(), code, newPassword);
        passwordResetCodeRepository.save(new PasswordResetCode(user.getEmail().getValue(), code));

        //when
        authService.resetPassword(request);

        //then
        Password changedPassword = userRepository.findById(user.getId()).get().getPassword();
        assertThat(changedPassword).isNotEqualTo(oldPassword);
    }

    @DisplayName("액세스 토큰 재발행 성공")
    @Test
    void reissueAccessToken() {
        // given
        userRepository.save(UserFixture.USER1());
        when(oauthClient.requestOauthInfo(any(OauthLoginRequest.class)))
                .thenReturn(UserFixture.OAUTH_INFO_RESPONSE_USER1());
        AuthTokenResponse tokenResponse = authService.oauthLogin(OAUTH_LOGIN_REQUEST);

        // when & then
        assertThatCode(() -> authService.reissueAccessToken(tokenResponse.refreshToken()))
                .doesNotThrowAnyException();

    }
}
