package com.istudent.backend.controllers;

import com.istudent.backend.dto.UserRegistrationDto;
import com.istudent.backend.dto.UserResponseDto;
import com.istudent.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "Operations over Users")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Created an User")
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRegistrationDto userDto) {
        UserResponseDto createdUser = userService.createUser(userDto);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping
    @Operation(summary = "Get all Users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get an specific User")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deleted an User")
    public ResponseEntity<Void> deleteUSerById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
