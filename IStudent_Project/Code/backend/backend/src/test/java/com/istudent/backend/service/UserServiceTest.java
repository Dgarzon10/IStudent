package com.istudent.backend.service;

import com.istudent.backend.dto.UserRegistrationDto;
import com.istudent.backend.dto.UserResponseDto;

import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.InstituteRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private InstituteRepository instituteRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private ModelMapper modelMapper;

    private UserRegistrationDto userDto;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userDto = new UserRegistrationDto();
        userDto.setEmail("test@correo.com");
        userDto.setPassword("pass");
        userDto.setRole("student");

        user = User.builder().id(1L).email("test@correo.com").role("student").build();
    }

    @Test
    void createUser_shouldSaveUser() {
        when(passwordEncoder.encode(any())).thenReturn("hashedpass");
        when(userRepository.save(any())).thenReturn(user);
        when(modelMapper.map(user, UserResponseDto.class)).thenReturn(new UserResponseDto());

        UserResponseDto response = userService.createUser(userDto);

        assertNotNull(response);
        verify(userRepository).save(any());
    }

    @Test
    void getUserById_shouldReturnUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserResponseDto.class)).thenReturn(new UserResponseDto());

        UserResponseDto result = userService.getUserById(1L);

        assertNotNull(result);
    }
}
