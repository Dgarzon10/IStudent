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

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final InstituteRepository instituteRepository;
    private final ModelMapper modelMapper;

    public UserResponseDto createUser(UserRegistrationDto userDto) {
        User user = modelMapper.map(userDto, User.class);

        if (user.getInstitute() == null){
            User savedUser = userRepository.save(user);
            return modelMapper.map(savedUser, UserResponseDto.class);
        }
        Institute institute = instituteRepository.findById(userDto.getInstituteId())
                .orElseThrow(() -> new RuntimeException("Institute not found"));
        user.setInstitute(institute);

        User savedUser = userRepository.save(user);

        UserResponseDto responseDto = modelMapper.map(savedUser, UserResponseDto.class);
        responseDto.setInstituteName(institute.getName());
        return responseDto;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }
}
