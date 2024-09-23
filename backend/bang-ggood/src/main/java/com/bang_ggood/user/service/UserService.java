package com.bang_ggood.user.service;

import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public User getOrCreateGuestUser() {
        User newGustUser = new User("방끗", "bang-ggood@gmail.com", UserType.GUEST);
        return userRepository.findUserByType(UserType.GUEST)
                .orElseGet(() -> userRepository.save(newGustUser));
    }
}
