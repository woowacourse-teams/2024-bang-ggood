package com.bang_ggood.auth.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

@Component
public class PasswordEncoder {

    public String encode(String password) {
        try {
            byte[] salt = getSalt();
            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 512);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            byte[] hash = factory.generateSecret(spec).getEncoded();
            String encodedPassword = Base64.getEncoder().encodeToString(hash);
            String encodedSalt = Base64.getEncoder().encodeToString(salt);
            return encodedPassword + ":" + encodedSalt;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new BangggoodException(ExceptionCode.PASSWORD_HASHING_ERROR);
        }
    }

    private byte[] getSalt() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[64];
        secureRandom.nextBytes(salt);
        return salt;
    }
}
