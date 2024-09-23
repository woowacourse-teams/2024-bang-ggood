package com.bang_ggood.global;

import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBInitializer implements CommandLineRunner {

    private final UserService userService;
    private final DefaultChecklistService defaultChecklistService;

    public DBInitializer(UserService userService, DefaultChecklistService defaultChecklistService) {
        this.userService = userService;
        this.defaultChecklistService = defaultChecklistService;
    }

    @Override
    public void run(String... args) {
        createGuestUser();
    }

    public void createGuestUser() {
        User guestUser = userService.getOrCreateGuestUser();
        defaultChecklistService.createDefaultChecklistAndQuestions(guestUser);
    }
}
