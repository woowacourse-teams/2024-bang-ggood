package com.bang_ggood.user.service;

import com.bang_ggood.user.dto.request.OauthLoginRequest;
import com.bang_ggood.user.dto.response.OauthInfoResponse;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final OauthClient oauthClient;

    public UserService(OauthClient oauthClient) {
        this.oauthClient = oauthClient;
    }

    public void login(OauthLoginRequest request) {
        OauthInfoResponse oauthInfoResponse = oauthClient.requestOauthInfo(request);
    }
}
