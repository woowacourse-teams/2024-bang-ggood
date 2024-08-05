package com.bang_ggood.user.controller;

import com.bang_ggood.AcceptanceMockTestSupport;
import com.bang_ggood.user.dto.request.OauthLoginRequest;
import com.bang_ggood.user.service.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class LoginMockE2ETest extends AcceptanceMockTestSupport {

    @MockBean
    UserService userService;

    @DisplayName("로그인 성공")
    @Test
    void login() throws Exception {
        String testToken = "testToken";
        Mockito.when(userService.login(any(OauthLoginRequest.class))).thenReturn(testToken);

        mockMvc.perform(post("/oauth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"code\":\"code\"}"))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.SET_COOKIE, "token=" + testToken + "; Path=/; HttpOnly"));
    }
}
