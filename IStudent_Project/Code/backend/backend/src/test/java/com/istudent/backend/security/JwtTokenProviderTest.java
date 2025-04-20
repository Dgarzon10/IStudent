package com.istudent.backend.security;

import io.jsonwebtoken.MalformedJwtException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import static org.junit.jupiter.api.Assertions.*;

public class JwtTokenProviderTest {

    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        jwtTokenProvider = new JwtTokenProvider();


        ReflectionTestUtils.setField(jwtTokenProvider, "jwtSecret", "ultraSecretKeyForTestingItMustHave32Char");
        ReflectionTestUtils.setField(jwtTokenProvider, "jwtExpiration", 3600000L); // 1h en ms

        jwtTokenProvider.init();
    }

    @Test
    void generateToken_shouldReturnValidToken() {
        String token = jwtTokenProvider.generateToken("maria@istudent.com");
        assertNotNull(token);
        assertTrue(token.length() > 10);
    }

    @Test
    void getUsernameFromToken_shouldReturnCorrectUsername() {
        String token = jwtTokenProvider.generateToken("maria@istudent.com");
        String username = jwtTokenProvider.getUsernameFromToken(token);
        assertEquals("maria@istudent.com", username);
    }

    @Test
    void validateToken_shouldReturnTrueForValidToken() {
        String token = jwtTokenProvider.generateToken("maria@istudent.com");
        assertTrue(jwtTokenProvider.validateToken(token));
    }

    @Test
    void validateToken_shouldReturnFalseForInvalidToken() {
        String invalidToken = "invalid.jwt.token";
        assertFalse(jwtTokenProvider.validateToken(invalidToken));
    }

    @Test
    void getUsernameFromToken_shouldThrowExceptionForInvalidToken() {
        String invalidToken = "invalid.jwt.token";
        assertThrows(MalformedJwtException.class, () -> jwtTokenProvider.getUsernameFromToken(invalidToken));
    }
}
