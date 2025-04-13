package com.istudent.backend.service;

import com.istudent.backend.persistence.entities.User;
import com.istudent.backend.persistence.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;


    public User registerUser(User user){
        // TO DO: hash password, validated email
        return null;
    }

    public User authenticatedUser(User user){
        // TO DO: Authenticated User Email and Password, grant permissions (ROLE) and JWT token.
        return null;
    }

    public User getUserById(Long id){
        return userRepository.findById(id).orElseThrow();
    }

    public List<User> getUsersByInstitute(Long id){
        return userRepository.findUsersByInstituteId(id).orElseThrow();
    }
}
