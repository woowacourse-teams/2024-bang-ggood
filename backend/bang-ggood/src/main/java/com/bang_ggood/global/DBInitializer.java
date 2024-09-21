package com.bang_ggood.global;

import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DBInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DefaultChecklistService defaultChecklistService;

    public DBInitializer(UserRepository userRepository, DefaultChecklistService defaultChecklistService) {
        this.userRepository = userRepository;
        this.defaultChecklistService = defaultChecklistService;
    }

    @Override
    public void run(String... args) {
        createGuestUser();
    }

    public void createGuestUser() {
        User guestUser = new User("방끗", "bang-ggood@gmail.com", UserType.GUEST);
        userRepository.save(guestUser);

        defaultChecklistService.createDefaultChecklistQuestions(guestUser);
        defaultChecklistService.createDefaultChecklist(guestUser);
    }
}
