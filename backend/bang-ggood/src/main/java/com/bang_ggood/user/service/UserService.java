package com.bang_ggood.user.service;

import com.bang_ggood.user.domain.User;
import com.bang_ggood.user.domain.UserType;
import com.bang_ggood.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void createUser(User user) {
        userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> readUser(UserType userType) {
        return userRepository.findUserByUserType(userType);
    }
}
