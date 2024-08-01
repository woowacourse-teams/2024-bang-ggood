package com.bang_ggood.config;

import com.bang_ggood.handler.RestClientExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class RestClientConfig {

    @Bean
    RestClient restClient(RestClientExceptionHandler handler) {
        return RestClient.builder()
                .defaultStatusHandler(handler)
                .build();
    }
}
