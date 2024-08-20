package com.bang_ggood.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class CorsConfigTest {

    @Autowired
    CorsConfig corsConfig;

    @DisplayName("daf")
    @Test
    void df() {
        // given
//        System.out.println("start");
//        System.out.println(corsConfig.allowOrigins);
        // when

        // then
    }

}
