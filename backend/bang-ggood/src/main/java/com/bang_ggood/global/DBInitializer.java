package com.bang_ggood.global;

import com.bang_ggood.user.domain.LoginType;
import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

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
        List<User> foundGuestUser = userService.readUser(UserType.GUEST);

        if (foundGuestUser.isEmpty()) {
            User guestUser = new User("방끗", "bang-ggood1@gmail.com", UserType.GUEST, LoginType.LOCAL);
            userService.createUser(guestUser);
            defaultChecklistService.createDefaultChecklistAndQuestions(guestUser);
        }
    }
}
