package com.bang_ggood.user.service;

import com.bang_ggood.user.dto.request.OauthLoginRequest;
import com.bang_ggood.user.dto.response.OauthTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Component
public class OauthClient {

    private final RestClient restClient;
    private final String tokenRequestUri;
    private final String grantType;
    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;

    public OauthClient(
            RestClient restClient,
            @Value("${kakao.token_post_uri}") String tokenRequestUri,
            @Value("${kakao.grant_type}") String grantType,
            @Value("${kakao.client_id}") String clientId,
            @Value("${kakao.redirect_uri}")String redirectUrl,
            @Value("${kakao.client_secret}")String clientSecret) {
        this.restClient = restClient;
        this.tokenRequestUri = tokenRequestUri;
        this.grantType = grantType;
        this.clientId = clientId;
        this.redirectUri = redirectUrl;
        this.clientSecret = clientSecret;
    }

    public OauthTokenResponse requestToken(OauthLoginRequest request) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", grantType);
        map.add("client_id", clientId);
        map.add("redirect_uri", redirectUri);
        map.add("code", request.code());
        map.add("client_secret", clientSecret);

        return restClient.post()
                .uri(tokenRequestUri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(map)
                .retrieve()
                .body(OauthTokenResponse.class);
    }
}
