package com.bang_ggood;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class BangggoodApplication {

    public static void main(String[] args) {
        SpringApplication.run(BangggoodApplication.class, args);
    }

}
