package com.bang_ggood.auth.service;

import com.bang_ggood.global.exception.BangggoodException;
import com.bang_ggood.global.exception.ExceptionCode;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

public class PasswordEncoder {

    private static final String DELIMITER = ":";

    private PasswordEncoder() {
    }

    public static String encodeWithGeneralSalt(String password) {
        return encode(password, getSalt());
    }

    public static String encodeWithSpecificSalt(String password, String passwordWithSalt) {
        return encode(password, extractSaltByPassword(passwordWithSalt));
    }

    private static String encode(String password, byte[] salt) {
        try {
            KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 65536, 512);
            SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
            byte[] hash = factory.generateSecret(spec).getEncoded();
            String encodedPassword = Base64.getEncoder().encodeToString(hash);
            String encodedSalt = Base64.getEncoder().encodeToString(salt);
            return encodedPassword + DELIMITER + encodedSalt;
        } catch (NoSuchAlgorithmException | InvalidKeySpecException e) {
            throw new BangggoodException(ExceptionCode.PASSWORD_HASHING_ERROR);
        }
    }

    private static byte[] getSalt() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] salt = new byte[64];
        secureRandom.nextBytes(salt);
        return salt;
    }

    private static byte[] extractSaltByPassword(String encodedPassword) {
        String[] parts = encodedPassword.split(DELIMITER);
        if (parts.length != 2) {
            throw new BangggoodException(ExceptionCode.PASSWORD_HASHING_ERROR);
        }

        String encodedSalt = parts[1];
        return Base64.getDecoder().decode(encodedSalt);
    }
}
