package com.istudent.backend.service;

import com.istudent.backend.dto.UserRegistrationDto;
import com.istudent.backend.dto.UserResponseDto;
import com.istudent.backend.persistence.entities.Institute;
import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.InstituteRepository;
import com.istudent.backend.persistence.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final InstituteRepository instituteRepository;
    private final ModelMapper modelMapper;

    public UserResponseDto createUser(UserRegistrationDto userDto) {
        User user = User.builder()
                .email(userDto.getEmail())
                .role(userDto.getRole())
                .hashedPassword(userDto.getHashedPassword())
                .createdAt(LocalDateTime.now())
                .build();

        if (userDto.getInstitute_Id() != null){
            Institute institute = instituteRepository.findById(userDto.getInstitute_Id())
                    .orElseThrow(() -> new RuntimeException("Institute not found"));
            user.setInstitute(institute);
        }


        User savedUser = userRepository.save(user);

        UserResponseDto responseDto = modelMapper.map(savedUser, UserResponseDto.class);
        if(savedUser.getInstitute()  != null){
            responseDto.setInstituteName(savedUser.getInstitute().getName());
        }
        return responseDto;
    }

    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map((user) -> modelMapper.map(user, UserResponseDto.class))
                .toList();
    }

    public UserResponseDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow();
        return modelMapper.map(user, UserResponseDto.class);
    }
}
