package com.bang_ggood.config;

import com.bang_ggood.handler.OauthClientExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class OauthClientConfig {

    @Bean
    RestClient restClient(OauthClientExceptionHandler handler) {
        return RestClient.builder()
                .defaultStatusHandler(handler)
                .build();
    }
}
