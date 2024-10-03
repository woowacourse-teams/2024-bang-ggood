package com.bang_ggood.auth.service.oauth;

import com.bang_ggood.auth.dto.request.OauthLoginRequest;
import com.bang_ggood.auth.dto.response.OauthInfoApiResponse;
import com.bang_ggood.auth.dto.response.OauthTokenApiResponse;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

@Component
public class OauthClient {

    private final RestClient restClient;
    private final OauthRequestProperties oauthRequestProperties;

    public OauthClient(
            RestClient restClient,
            OauthRequestProperties oauthRequestProperties) {
        this.restClient = restClient;
        this.oauthRequestProperties = oauthRequestProperties;
    }

    public OauthInfoApiResponse requestOauthInfo(OauthLoginRequest request) {
        OauthTokenApiResponse oauthTokenApiResponse = requestToken(request);

        String userInfoRequestUri = oauthRequestProperties.getUserInfoRequestUri();
        String headerName = "Authorization";
        String headerValue = "Bearer " + oauthTokenApiResponse.access_token();

        return restClient.get()
                .uri(userInfoRequestUri)
                .header(headerName, headerValue)
                .retrieve()
                .body(OauthInfoApiResponse.class);
    }

    private OauthTokenApiResponse requestToken(OauthLoginRequest request) {
        String tokenRequestUri = oauthRequestProperties.getTokenRequestUri();
        MultiValueMap<String, String> tokenRequestBody = oauthRequestProperties.createTokenRequestBody(request);

        return restClient.post()
                .uri(tokenRequestUri)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(tokenRequestBody)
                .retrieve()
                .body(OauthTokenApiResponse.class);
    }
}
