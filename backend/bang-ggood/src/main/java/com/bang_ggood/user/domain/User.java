package com.bang_ggood.user.domain;

import com.bang_ggood.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Objects;

import static lombok.AccessLevel.PROTECTED;

@Table(name = "users")
@Getter
@NoArgsConstructor(access = PROTECTED)
@Entity
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(nullable = false)
    @Embedded
    private Email email;

    @Embedded
    private Password password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private LoginType loginType;

    public User(String name, String email, UserType userType, LoginType loginType) {
        this.name = name;
        this.email = new Email(email);
        this.userType = userType;
        this.loginType = loginType;
    }

    public User(String name, String email, String password, UserType userType, LoginType loginType) {
        this.name = name;
        this.email = new Email(email);
        this.password = new Password(password);
        this.userType = userType;
        this.loginType = loginType;
    }

    public User(Long id, String name, String email) { // TODO 테스트용
        this.id = id;
        this.name = name;
        this.email = new Email(email);
    }

    public boolean isDifferentPassword(String password) {
        return !Objects.equals(this.password, password);
    }

    public String getEmail() {
        return this.email.getValue();
    }

    public String getPassword() {
        return this.password.getValue();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
